import { memo, useEffect, useState, useRef } from 'react'
import Carousel from 'react-multi-carousel';
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { useNavigate, useLocation } from 'react-router-dom';

import GoogleMapLayout from '../../Layout/GoogleMapLayout';
import { AiOutlineLeft, AiOutlineRight, AiOutlineLike, AiOutlineDislike } from 'react-icons/ai'
import { StickyContainer, Sticky } from 'react-sticky';

import 'react-multi-carousel/lib/styles.css';
import 'react-quill/dist/quill.bubble.css'
import { english, vietnamese } from '../../Languages/TourTag';

import { english as englishTourDetail, vietnamese as vietnameseTourDetail } from '../../Languages/TourDetail';

import { API_GET_DETAIL_TOUR } from '../../API'
import LoadingDialog from '../../Layout/LoadingDialog'
import axios from 'axios'
import { ref, listAll, getDownloadURL } from 'firebase/storage'
import { storage } from "../../../firebase/Upload";

import './TourDetail.scss'

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

function TourDetail({ languageSelected }) {
    const id = useLocation()

    const navigate = useNavigate()
    const tagList = (languageSelected === 'EN' ? english : vietnamese)

    const languageList = (languageSelected === 'EN' ? englishTourDetail : vietnameseTourDetail)

    const [getDataComplete, setGetDataComplete] = useState(false)
    const [daySelected, setDaySelected] = useState(0)
    const [tour, setTour] = useState({
        images: [],
        name: '',
        tag: [],
        introduce: '',
        schedule: [{
            name: '',
            content: ''
        }],
        city: '',
        address: '',
        latitude: 0,
        longitude: 0,
        include: '',
        nonInclude: '',
        generalTerms: '',
        moreDescription: '',
        feedback: [{
            avatar: "https://cdn5.vectorstock.com/i/1000x1000/89/79/funny-avatar-cunning-emoji-flat-vector-27638979.jpg",
            name: 'Mê du lịch',
            time: 'CN, 3 thg 4 2022',
            comment: 'Trải nghiệm thật tuyệt vời'
        }, {
            avatar: "https://img.freepik.com/premium-vector/laughing-boy-avatar-funny-kid-profile-picture_176411-3537.jpg?w=2000",
            name: 'Mê vui  zẻ',
            time: 'Thứ 2, 8 thg 3 2021',
            comment: 'Chuyến đi vui vẻ, hướng dẫn và bác tài nhiệt tình, cảnh đẹp, chỉ có cái là tour của mình bị thay đổi từ Tam Chúc sang Bái Đính mà không thấy ai giảm giá chênh lệch lại cho mình. '
        }],
        price: 0,
        adultPrice: 0,
        childrenPrice: 0
    })

    const [numberPage, setNumberPage] = useState(1)

    const [optionIndexMoreInformationSelected, setIndexOptionMoreInformationSelected] = useState(0)
    const [optionMoreInformationSelected, setOptionMoreInformationSelected] = useState([])

    const countFeedbackOnPage = 2

    const numberOfPagesFeedback = Math.ceil(8 / countFeedbackOnPage)

    let numberPageFeedback = []

    for (let i = 0; i < numberOfPagesFeedback; i++) {
        numberPageFeedback.push(i + 1)
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND'
    });

    useEffect(() => {
        axios.get(`${API_GET_DETAIL_TOUR}/${id.state.id}`).then((res) => {
            const data = res.data.data
            let tagRaw = []
            data.tourDetailDTO.tagOfTourDTOList.forEach(element => {
                tagRaw.push(element.tagId)
            })

            let scheduleRaw = []
            data.tourScheduleDTOList.forEach(element => {
                const contentRaw = element.content.split('<p>')
                let contentAdd = '';
                for (let i = 1; i < contentRaw.length; i++) {
                    contentAdd += ('<div class="circle-line-content"></div><p class="d-block content-schedule-inline">' + contentRaw[i])
                }
                scheduleRaw.push({
                    name: element.tourScheduleName,
                    content: contentAdd
                })
            })
            let informationRaw = [];
            let informationAdd = '';
            informationRaw = data.tourDetailDTO.tourInclude.split('<p>')
            for (let i = 1; i < informationRaw.length; i++) {
                informationAdd += ('<div class="circle-line-content-small"></div><p class="d-block content-schedule-inline-information">' + informationRaw[i])
            }

            let generalTermsRaw = [];
            let generalTermsAdd = '';
            generalTermsRaw = data.tourDetailDTO.generalTerms.split('<p>')
            for (let i = 1; i < generalTermsRaw.length; i++) {
                generalTermsAdd += ('<div class="circle-line-content-small"></div><p class="d-block content-schedule-inline-information">' + generalTermsRaw[i])
            }

            let nonIncludeRaw = [];
            let nonIncludeAdd = '';
            nonIncludeRaw = data.tourDetailDTO.tourNonInclude.split('<p>')
            for (let i = 1; i < nonIncludeRaw.length; i++) {
                nonIncludeAdd += ('<div class="circle-line-content-small"></div><p class="d-block content-schedule-inline-information">' + nonIncludeRaw[i])
            }

            let moreDescriptionRaw = [];
            let moreDescriptionAdd = '';
            moreDescriptionRaw = data.tourDetailDTO.moreDescription.split('<p>')
            for (let i = 1; i < moreDescriptionRaw.length; i++) {
                moreDescriptionAdd += ('<div class="circle-line-content-small"></div><p class="d-block content-schedule-inline-information">' + moreDescriptionRaw[i])
            }

            let tourRaw = {
                id: data.tourId,
                name: data.tourName,
                price: data.priceAdult,
                adultPrice: data.priceAdult,
                childrenPrice: data.priceChildren,
                minAdult: data.minAdult,
                maxAdult: data.maxAdult,
                minChildren: data.minChildren,
                maxChildren: data.maxChildren,
                startDate: data.startDate,
                minToActive: data.minToStart,
                introduce: data.tourDetailDTO.tourIntroduce,
                tag: tagRaw,
                type: data.tourType,
                totalPrice: data.totalPrice,
                deposit: data.deposit,
                schedule: scheduleRaw,
                type: data.tourType,
                startDate: data.startDate,
                city: data.startPlace,
                address: data.tourDetailDTO.addressStart,
                include: informationAdd,
                nonInclude: nonIncludeAdd,
                generalTerms: generalTermsAdd,
                moreDescription: moreDescriptionAdd,
                latitude: data.tourDetailDTO.latitude,
                longitude: data.tourDetailDTO.longitude
            }
            listAll(ref(storage, `tour/${tourRaw.id}/information/images`)).then((res) => {
                let tourImages = []
                let count = res.items.length;
                let leng = 0;
                res.items.forEach((item) => {
                    getDownloadURL(ref(storage, item.fullPath))
                        .then((url) => {
                            axios({
                                url: url,
                                method: 'GET',
                                responseType: 'blob',
                            }).then(blob => {
                                tourImages.push(URL.createObjectURL(blob.data))
                                leng++
                                if (leng === count) {
                                    setTour({
                                        ...tour, images: tourImages, ...tourRaw
                                    })
                                    setOptionMoreInformationSelected([tourRaw.include, tourRaw.nonInclude,
                                    tourRaw.generalTerms, tourRaw.moreDescription])
                                    setGetDataComplete(true)
                                }
                            })
                        })
                })
            })

        })
    }, [])

    const googleMapStyle = {
        width: '100%',
        height: '400px'
    }

    const handleClickMap = () => {
        window.open(`https://www.google.com/maps/search/${tour.latitude},${tour.longitude}`, '_blank');
    }

    const handleOnClickBookTour = () => {
        if (sessionStorage.getItem('role') === null) {
            navigate('/register')
        }
        else if (window.location.pathname != '/admin/preview') {
            navigate('/booking-tour', { state: { data: tour } })
        }
    }

    const handleHoverQuestionIcon = () => {
        document.getElementById('note-waiting').style.display = 'block'
    }

    const handleBlurQuestionIcon = () => {
        document.getElementById('note-waiting').style.display = 'none'
    }

    return (
        <div className='container home-main'>
            {!getDataComplete && <LoadingDialog />}
            <div className='container pd-tour-detail'>
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
                    {tour.images.map((item, index) => (<img src={item} key={index} className='carousel-tour-detail' />))}
                </Carousel>
            </div>
            <StickyContainer>
                <div className='container d-flex'>
                    <div className='section-tour-detail w-75 mr-20'>
                        <div className='title name-tour-detail'>{tour.name}</div>
                        <div className='all-tag-tour-detail'>
                            {tour.tag.map((id) => (<label className='tag-tour-detail'>{tagList[id - 1].label}</label>))}
                        </div>
                        <div>
                            <label className='title-introduce-tour-detail'>{languageList.txtIntroduce}</label>
                            <div dangerouslySetInnerHTML={{ __html: tour.introduce }} className='introduce-tour-detail'></div>
                        </div>
                    </div>
                    <div className='w-25'>
                        <Sticky>
                            {({ style }) => (
                                <div style={style} className='section-tour-detail sticky'>
                                    <div className='title price-tour-detail'>{languageList.txtPrice}</div>
                                    {tour.type === 1 ?
                                        <div className='title price-tour-detail color-yellow-custom'>{formatter.format(tour.price)}</div>
                                        :
                                        <>
                                            <div className='title price-tour-detail color-yellow-custom font-17'>
                                                {formatter.format(tour.totalPrice / (tour.maxAdult + tour.maxChildren))} - {formatter.format(tour.totalPrice / tour.minToActive)}
                                                <AiOutlineQuestionCircle onMouseLeave={handleBlurQuestionIcon} onMouseEnter={handleHoverQuestionIcon} id='icon-question-waiting' className='icon-question-waiting' />
                                            </div>
                                            <div className='note-waiting font-14 mt-negative-100' id='note-waiting'>{languageList.txtWarningPrice}</div>
                                        </>
                                    }
                                    <div onClick={handleOnClickBookTour} className='btn btn-book-tour-detail mb-30'>{languageList.txtBookTour}</div>
                                    {tour.type == 2 &&
                                        <>
                                            <div className='d-flex line-price-tour-detail'>
                                                <label className='title-ac-price'>{languageList.txtStartDate}</label>
                                                <label className='price-ac'>{tour.startDate}</label>
                                            </div>
                                            <div className='d-flex line-price-tour-detail mt-20'>
                                                <label className='title-ac-price'>{languageList.txtDepositPrice}</label>
                                                <label className='price-ac'>{formatter.format(tour.deposit)}</label>
                                            </div>
                                        </>
                                    }
                                    {tour.type == 1 &&
                                        <>
                                            <div className='d-flex mt-20 line-price-tour-detail'>
                                                <label className='title-ac-price'>{languageList.txtAdult}</label>
                                                <label className='price-ac'>{formatter.format(tour.adultPrice)}</label>
                                            </div>
                                            <div className='d-flex mt-20 line-price-tour-detail'>
                                                <label className='title-ac-price'>{languageList.txtChildren}</label>
                                                <label className='price-ac'>{formatter.format(tour.childrenPrice)}</label>
                                            </div>
                                            <div className='tour-detail-children-age'>{languageList.txtChildrenAge}</div>
                                        </>
                                    }
                                </div>
                            )}
                        </Sticky>
                    </div>
                </div>
                <div className='container d-flex mt-20'>
                    <div className='section-tour-detail w-75 mr-20'>
                        <label className='title mb-20'>{languageList.txtScheduled}</label>
                        <div className='d-flex mb-20'>
                            {tour.schedule.map((item, index) => (
                                <div onClick={() => setDaySelected(index)} className={daySelected == index ? 'day-tour-detail-selected' : 'day-tour-detail-unselected'}>
                                    {languageList.txtDay} {index + 1}
                                </div>))}
                        </div>
                        <div className='title mb-20 name-schedule-detail'>{tour.schedule[daySelected].name}</div>
                        <div className='content-schedule-detail' dangerouslySetInnerHTML={{ __html: tour.schedule[daySelected].content }}></div>
                    </div>
                    <div className='w-25' />
                </div>
                <div className='container d-flex mt-20'>
                    <div className='section-tour-detail w-75 mr-20'>
                        <label className='title mb-20'>{languageList.txtLocation}</label>
                        <div className='address-tour-detail'>{languageList.txtAddress}: {tour.address}, {tour.city}</div>
                        <GoogleMapLayout style={googleMapStyle} tour={tour} setTour={setTour} clickMarker={handleClickMap} />
                    </div>
                    <div className='w-25' />
                </div>
                <div className='container d-flex mt-20'>
                    <div className='section-tour-detail w-75 mr-20 p-0'>
                        <div className='d-flex tag-more-information-tour-detail'>
                            <label onClick={() => setIndexOptionMoreInformationSelected(0)}
                                className={`w-25 ${optionIndexMoreInformationSelected == 0 && 'tag-more-information-tour-detail-selected'}`}>
                                {languageList.txtInclude}
                            </label>
                            <label onClick={() => setIndexOptionMoreInformationSelected(1)}
                                className={`w-25 ${optionIndexMoreInformationSelected == 1 && 'tag-more-information-tour-detail-selected'}`}>
                                {languageList.txtNonInclude}
                            </label>
                            <label onClick={() => setIndexOptionMoreInformationSelected(2)}
                                className={`w-25 ${optionIndexMoreInformationSelected == 2 && 'tag-more-information-tour-detail-selected'}`}>
                                {languageList.txtGeneralTerms}
                            </label>
                            <label onClick={() => setIndexOptionMoreInformationSelected(3)}
                                className={`w-25 ${optionIndexMoreInformationSelected == 3 && 'tag-more-information-tour-detail-selected'}`}>
                                {languageList.txtMoreDescription}
                            </label>
                        </div>
                        <div className='more-information-detail' dangerouslySetInnerHTML={{ __html: optionMoreInformationSelected[optionIndexMoreInformationSelected] }}></div>
                    </div>
                    <div className='w-25' />
                </div>
            </StickyContainer>
            <div className='container d-flex mt-20 mb-40'>
                <div className='section-tour-detail'>
                    <label className='title mb-20'>{languageList.txtFeedback}</label>
                    {tour.feedback.map((item) => (
                        <div className='each-feedback'>
                            <div className='d-flex'>
                                <div className='information-feedback w-100'>
                                    <div className='d-flex react-feedback'>
                                        <div className='name-feedback'>{item.name}</div>
                                    </div>
                                    <div className='time-feedback'>{item.time}</div>
                                    <div className='feedback'>{item.comment}</div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className='d-flex paging float-end'>
                        {numberPage > 1 && <label onClick={() => setNumberPage(pre => pre - 1)} className='btn-paging unseleted'>
                            <AiOutlineLeft />
                        </label>}
                        {numberPageFeedback.map((item) => (
                            <label className={`btn-paging ${numberPage === item ? 'selected-paging' : 'unseleted'}`} onClick={() => setNumberPage(item)}>{item}</label>
                        ))}
                        {numberPage < numberPageFeedback.length && numberPageFeedback.length > 1 && <label onClick={() => setNumberPage(pre => pre + 1)} className='btn-paging unseleted'>
                            <AiOutlineRight />
                        </label>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(TourDetail)