import { memo, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ref, getDownloadURL, listAll } from 'firebase/storage'
import { storage } from "../../../firebase/Config";
import LoadingDialog from '../../Layout/LoadingDialog';
import { API_SERVICE_DETAIL_INFORMATION } from '../../API';
import axios from 'axios';
import './ServiceDetail.scss'
import { Rating } from 'react-simple-star-rating'
import { englishTypeService, vietnameseTypeService } from '../../Languages/ServiceType';
import { MdLocationOn, MdPhone } from 'react-icons/md'
import Carousel from 'react-multi-carousel';
import { MdVerifiedUser } from 'react-icons/md'
import { english, vietnamese } from '../../Languages/ServiceDetail';
import { englishUtilitiesAndServicesDetail, vietnameseUtilitiesAndServicesDetail } from '../../Languages/UtilitiesAndServices';

const responsive = {
    desktop: {
        breakpoint: { max: 1920, min: 1080 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};

const responsiveService = {
    desktop: {
        breakpoint: { max: 1920, min: 1080 },
        items: 3,
        slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 3,
        slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 3,
        slidesToSlide: 1 // optional, default to 1.
    }
};

function ServicesDetail({ languageSelected }) {
    const serviceRaw = useLocation().state.service
    const data = useLocation().state

    const navigate = useNavigate()

    const languageDisplay = languageSelected === 'EN' ? englishTypeService : vietnameseTypeService
    const languageDisplayMain = languageSelected === 'EN' ? english : vietnamese
    let languageListUtilitiesAndServicesDetail = (languageSelected === 'EN' ? englishUtilitiesAndServicesDetail : vietnameseUtilitiesAndServicesDetail)

    const [service, setService] = useState()
    const [getDataComplete, setGetDataComplete] = useState(false)
    const [changeService, setChangeService] = useState(false)

    const [openUtility, setOpenUtility] = useState(false)

    useEffect(() => {
        axios.get(`${API_SERVICE_DETAIL_INFORMATION}?serviceId=${serviceRaw.serviceId}`).then((resService) => {
            const refAccommodation = `/service/accomodation/${serviceRaw.serviceId}/information`
            const refEntertainment = `/service/entertainment/${serviceRaw.serviceId}/information`
            const refRestaurant = `/service/restaurant/${serviceRaw.serviceId}/information`
            let refData
            if (serviceRaw.serviceCategory === 1) {
                refData = refAccommodation
            } else if (serviceRaw.serviceCategory === 2) {
                refData = refEntertainment
            } else {
                refData = refRestaurant
            }

            listAll(ref(storage, `${refData}/receptionHallPhoto`)).then((resHall) => {
                let images = []
                let imageInDb = [...resHall.items];
                listAll(ref(storage, `${refData}/outdoorPhoto`)).then((resDoor) => {
                    imageInDb = [...imageInDb, ...resDoor.items];
                    listAll(ref(storage, `${refData}/otherPhoto`)).then((resOther) => {
                        imageInDb = [...imageInDb, ...resOther.items];
                        imageInDb.forEach((item) => {
                            getDownloadURL(ref(storage, item.fullPath))
                                .then((url) => {
                                    images.push(url)
                                    if (images.length === imageInDb.length) {
                                        setService({ ...resService.data.data, images: images })
                                        setGetDataComplete(true)
                                    }
                                })
                        })
                    })
                })
            })
        })
    }, [changeService])

    if (!getDataComplete) {
        return (<LoadingDialog />)
    }

    const handleChangeService = (item, index) => {
        navigate(role != 1 ? '/service-detail' : '/admin/service-detail', { state: { service: item, listService: data.listService, index: index } })
        setGetDataComplete(false)
        setChangeService(pre => !pre)
    }

    const role = sessionStorage.getItem('role')

    let utilityShowShort = []
    if (service.utilitiesServiceDTOList.length > 15) {
        for (let i = 0; i < 15; i++) {
            utilityShowShort.push(service.utilitiesServiceDTOList[i])
        }
    }

    let descriptionRaw = service.description.split('\n')
    for (let i = 0; i < descriptionRaw.length; i++) {
        descriptionRaw[i] = `<p>${descriptionRaw[i]}</p>`
    }
    const description = { __html: descriptionRaw.join("<div className='mb - 10'></div>") }

    return (
        <div className='container'>
            <div className='d-flex center-horizontal'>
                <div className='bg-white br-10 plr-20 box-shadow-common mt-20 mb-20 w-75 ptb-20'>
                    <div>
                        <Carousel autoPlay={true}
                            autoPlaySpeed={3000}
                            swipeable={false}
                            showDots={true}
                            draggable={false}
                            responsive={responsive}
                            ssr={true} // means to render carousel on server-side.
                            infinite={true}
                            containerClass="carousel-container"
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            dotListClass="custom-dot-list-style">
                            {service.images.map((item, index) => (<img src={item} key={index} className='carousel-tour-detail' />))}
                        </Carousel>
                    </div>
                    <div className='d-flex space-between mt-10 mb-20'>
                        <div className='w-75'>
                            <div className='text-bold font-24'>{service.serviceDTO.serviceName}</div>
                            <div className='d-flex center-vertical'>
                                <div className='type-service-detail'>
                                    {languageDisplay[service.serviceDTO.serviceCategory - 1][parseInt(serviceRaw.typeOfServiceCategory)].title}
                                </div>
                                {service.serviceDTO.serviceCategory != 2 &&
                                    <Rating SVGclassName='w-45-px' className='star-rating-service-detail' allowHover={false} readonly initialValue={service.rate} />
                                }
                            </div>
                            <div className='color-gray font-16 mt-5-import d-flex center-vertical'>
                                <MdPhone />
                                <label className='ml-10'>{`${serviceRaw.phone}`}</label>
                            </div>
                            <div className='color-gray font-16 mt-5-import d-flex center-vertical'>
                                <MdLocationOn />
                                <label className='ml-10'>{`${serviceRaw.address}, ${serviceRaw.city}`}</label>
                            </div>
                        </div>
                        <div className='w-25 color-gray font-14'>
                            <div className='text-right mb-30'><MdVerifiedUser className='mr-10' />
                                {languageDisplayMain.txtVerifiedByWeTravel}
                            </div>
                            {service.serviceDTO.link !== "" &&
                                <div>
                                    <div className='font-20 text-bold text-right'>{languageDisplayMain.txtDirectContact}</div>
                                    <div className='btn btn-go-to-website float-end' onClick={() => window.open('https://' + service.serviceDTO.link)}>
                                        {languageDisplayMain.txtGoToWebsite}
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='w-100'>
                        <div className='mb-20'>
                            <div className='font-24 text-bold'>{languageDisplayMain.txtIntroduce}</div>
                            <label className='font-15'>
                                <div className='mb-10'></div>
                                <div dangerouslySetInnerHTML={description}></div>
                            </label>
                        </div>

                        {service.utilitiesServiceDTOList.length > 0 &&
                            <div className='utility-service-detail mb-20'>
                                <div className='font-24 text-bold mb-10'>{languageDisplayMain.txtTheAmenities}</div>
                                {service.utilitiesServiceDTOList.length > 15 && !openUtility ?
                                    <>
                                        {utilityShowShort.map((utiliti) => (
                                            <>
                                                {utiliti.utilitiesCategoryId === 1 && (
                                                    <label className='tag-utility'>{languageListUtilitiesAndServicesDetail[0][utiliti.utilitiesSubcategoryId - 1].label}</label>
                                                )}
                                                {utiliti.utilitiesCategoryId === 2 && (
                                                    <label className='tag-utility'>{languageListUtilitiesAndServicesDetail[1][utiliti.utilitiesSubcategoryId - 4].label}</label>
                                                )}
                                                {utiliti.utilitiesCategoryId === 3 && (
                                                    <label className='tag-utility'>{languageListUtilitiesAndServicesDetail[2][utiliti.utilitiesSubcategoryId - 9].label}</label>
                                                )}
                                                {utiliti.utilitiesCategoryId === 4 && (
                                                    <label className='tag-utility'>{languageListUtilitiesAndServicesDetail[3][utiliti.utilitiesSubcategoryId - 14].label}</label>
                                                )}
                                                {utiliti.utilitiesCategoryId === 5 && (
                                                    <label className='tag-utility'>{languageListUtilitiesAndServicesDetail[4][utiliti.utilitiesSubcategoryId - 18].label}</label>
                                                )}
                                                {utiliti.utilitiesCategoryId === 6 && (
                                                    <label className='tag-utility'>{languageListUtilitiesAndServicesDetail[5][utiliti.utilitiesSubcategoryId - 26].label}</label>
                                                )}
                                                {utiliti.utilitiesCategoryId === 7 && (
                                                    <label className='tag-utility'>{languageListUtilitiesAndServicesDetail[6][utiliti.utilitiesSubcategoryId - 32].label}</label>
                                                )}
                                                {utiliti.utilitiesCategoryId === 8 && (
                                                    <label className='tag-utility'>{languageListUtilitiesAndServicesDetail[7][utiliti.utilitiesSubcategoryId - 35].label}</label>
                                                )}
                                                {utiliti.utilitiesCategoryId === 9 && (
                                                    <label className='tag-utility'>{languageListUtilitiesAndServicesDetail[8][utiliti.utilitiesSubcategoryId - 39].label}</label>
                                                )}
                                                {utiliti.utilitiesCategoryId === 10 && (
                                                    <label className='tag-utility'>{languageListUtilitiesAndServicesDetail[9][utiliti.utilitiesSubcategoryId - 44].label}</label>
                                                )}
                                            </>
                                        ))}
                                        <label className='font-14 color-gray p-5-import show-hide-utility'
                                            onClick={() => setOpenUtility(true)}>
                                            {languageSelected === 'EN' ? 'Show all' : 'Tất cả'}
                                        </label>
                                    </>
                                    :
                                    <>
                                        {service.utilitiesServiceDTOList.map((utiliti) => (
                                            <>
                                                {utiliti.utilitiesCategoryId === 1 && (
                                                    <label className='tag-utility'>{languageListUtilitiesAndServicesDetail[0][utiliti.utilitiesSubcategoryId - 1].label}</label>
                                                )}
                                                {utiliti.utilitiesCategoryId === 2 && (
                                                    <label className='tag-utility'>{languageListUtilitiesAndServicesDetail[1][utiliti.utilitiesSubcategoryId - 4].label}</label>
                                                )}
                                                {utiliti.utilitiesCategoryId === 3 && (
                                                    <label className='tag-utility'>{languageListUtilitiesAndServicesDetail[2][utiliti.utilitiesSubcategoryId - 9].label}</label>
                                                )}
                                                {utiliti.utilitiesCategoryId === 4 && (
                                                    <label className='tag-utility'>{languageListUtilitiesAndServicesDetail[3][utiliti.utilitiesSubcategoryId - 14].label}</label>
                                                )}
                                                {utiliti.utilitiesCategoryId === 5 && (
                                                    <label className='tag-utility'>{languageListUtilitiesAndServicesDetail[4][utiliti.utilitiesSubcategoryId - 18].label}</label>
                                                )}
                                                {utiliti.utilitiesCategoryId === 6 && (
                                                    <label className='tag-utility'>{languageListUtilitiesAndServicesDetail[5][utiliti.utilitiesSubcategoryId - 26].label}</label>
                                                )}
                                                {utiliti.utilitiesCategoryId === 7 && (
                                                    <label className='tag-utility'>{languageListUtilitiesAndServicesDetail[6][utiliti.utilitiesSubcategoryId - 32].label}</label>
                                                )}
                                                {utiliti.utilitiesCategoryId === 8 && (
                                                    <label className='tag-utility'>{languageListUtilitiesAndServicesDetail[7][utiliti.utilitiesSubcategoryId - 35].label}</label>
                                                )}
                                                {utiliti.utilitiesCategoryId === 9 && (
                                                    <label className='tag-utility'>{languageListUtilitiesAndServicesDetail[8][utiliti.utilitiesSubcategoryId - 39].label}</label>
                                                )}
                                                {utiliti.utilitiesCategoryId === 10 && (
                                                    <label className='tag-utility'>{languageListUtilitiesAndServicesDetail[9][utiliti.utilitiesSubcategoryId - 44].label}</label>
                                                )}
                                            </>
                                        ))}
                                        {service.utilitiesServiceDTOList.length > 15 && openUtility &&
                                            <label className='font-14 color-gray p-5-import show-hide-utility'
                                                onClick={() => setOpenUtility(false)}>
                                                {languageSelected === 'EN' ? 'Hide less' : 'Ẩn bớt'}
                                            </label>
                                        }
                                    </>
                                }
                            </div>
                        }

                        {data.listService &&
                            <div className='mb-20'>
                                <div className='font-24 text-bold mb-10'>{languageDisplayMain.txtOtherService}</div>
                                <div className='space-slide-service'>
                                    <Carousel autoPlay={true}
                                        autoPlaySpeed={3000}
                                        swipeable={false}
                                        showDots={true}
                                        draggable={false}
                                        responsive={responsiveService}
                                        ssr={true}
                                        infinite={true}
                                        containerClass="carousel-container"
                                        removeArrowOnDeviceType={["tablet", "mobile"]}
                                        dotListClass="custom-dot-list-style"
                                        itemClass="carousel-item-padding-40-px">
                                        {data.listService.map((item, indexPost) => (
                                            indexPost !== data.index &&
                                            <div className='each-post-another' onClick={() => handleChangeService(item, indexPost)}>
                                                <img src={item.image} className='image-another-service-slide' />
                                                <div className='text-bold mt-10 text-left'>{item.serviceName}</div>
                                                <div className='color-gray font-14 text-left'>{item.address.substring(0, 20)} {item.address.length > 20 && '...'}</div>
                                            </div>
                                        ))}
                                    </Carousel>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ServicesDetail)