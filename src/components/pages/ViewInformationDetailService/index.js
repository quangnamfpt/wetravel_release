import { memo, useState, createContext, useEffect, useRef } from 'react'
import { english, vietnamese } from '../../Languages/OptionInputInformationService'
import ViewInformationAccommodation from '../ViewInformationAccommodation'
import ViewInformationEntertainment from '../ViewInformationEntertainment'
import ViewInformationRestaurant from '../ViewInformationRestaurant'
import ViewInfomationRooms from '../ViewInfomationRooms'
import ViewUtilitiesAndServices from '../ViewUtilitiesAndServices'
import ViewPhotos from '../ViewPhotos'
import axios from 'axios'
import { ref, listAll, getDownloadURL } from 'firebase/storage'
import { storage } from "../../../firebase/Config";
import { API_SERVICE_DETAIL_INFORMATION, API_SERVICE_CONFIRM } from '../../API'
import LoadingDialog from '../../Layout/LoadingDialog'
import { toast } from 'react-toastify'
import { useNavigate, useLocation } from 'react-router-dom'
import ConfirmDialog from '../../Layout/ConfirmDialog'
import { english as englishBtn, vietnamese as vietnameseBtn } from '../../Languages/ViewInformationDetailService'
import './ViewInformationServicePending.scss'

export const CommonDataForAllViewService = createContext()

function ViewInformationDetailService({ languageSelected }) {
    const [showConfirm, setShowConfirm] = useState(false)
    const [titleConfirm, setTitleConfirm] = useState('asd')
    const [contentConfirm, setContentConfirm] = useState('asd')
    const callbackConfirm = useRef(() => { })
    const [isRed, setIsRed] = useState(true)
    const [textOk, setTextOk] = useState('Ok')
    const [textCancel, setTextCancel] = useState('Cancel')

    const titleLanguage = languageSelected === 'EN' ? english : vietnamese
    const languageList = languageSelected === 'EN' ? englishBtn : vietnameseBtn

    const serviceId = useLocation().state.serviceId
    const categoryService = useRef(0);

    const [serviceData, setServiceData] = useState({
        propertyName: '',
        status: 1,
        starRating: 1,
        city: 'Hà Nội',
        address: '',
        website: '',
        taxCode: '',
        description: '',
        fax: '',
        phoneNumberContact: '',
        emailContact: '',
        numberOfFloors: 0,
        timeOpen: '',
        timeClose: '',
        typeOfCuisine: [],
        dateOpen: [],
        childTiketPrice: 0,
        adultTicketPrice: 0,
        utilitiesInternet: [],
        utilitiesFacilities: [],
        utilitiesAccomodationService: [],
        utilitiesBeautyRelaxation: [],
        utilitiesFoodService: [],
        utilitiesEntertainment: [],
        utilitiesChildrenService: [],
        utilitiesShopping: [],
        utilitiesBusinessService: [],
        utilitiesVehicle: [],
        receptionHallPhoto: [],
        outdoorPhoto: [],
        otherPhoto: [],
        isBlock: true
    })

    //form input rooms
    const [roomsData, setRoomsData] = useState([
        {
            showHide: false,
            roomName: '',
            roomType: 0,
            numberOfRoom: 0,
            bedType: 0,
            numberOfPeopleRoom: 0,
            roomSize: 0,
            dailyPrice: 0,
            holidayPrice: 0,
            description: '',
            bedRoomPhoto: [],
            wcPhoto: [],
            otherPhoto: []
        }
    ])

    const [getDataComplete, setGetDataComplete] = useState(false)

    function setAllImageDataForEdit(serviceDataRaw, receptionHallPhoto, outdoorPhoto, otherPhoto, roomsData) {
        serviceDataRaw.receptionHallPhoto = receptionHallPhoto
        serviceDataRaw.outdoorPhoto = outdoorPhoto
        serviceDataRaw.otherPhoto = otherPhoto
        setServiceData({ ...serviceDataRaw, receptionHallPhoto: receptionHallPhoto, outdoorPhoto: outdoorPhoto, otherPhoto: otherPhoto })
        setRoomsData(roomsData)
        setGetDataComplete(true)
    }

    useEffect(() => {
        axios.get(API_SERVICE_DETAIL_INFORMATION, {
            params: {
                serviceId: serviceId
            },
        }).then((res) => {
            //data of Accomodation Information
            let serviceDataRaw = {
                propertyName: '',
                status: 1,
                starRating: 1,
                city: 'Hà Nội',
                address: '',
                website: '',
                taxCode: '',
                description: '',
                fax: '',
                phoneNumberContact: '',
                emailContact: '',
                numberOfFloors: 0,
                timeOpen: '',
                timeClose: '',
                typeOfCuisine: [],
                dateOpen: [],
                childTiketPrice: 0,
                adultTicketPrice: 0,
                utilitiesInternet: [],
                utilitiesFacilities: [],
                utilitiesAccomodationService: [],
                utilitiesBeautyRelaxation: [],
                utilitiesFoodService: [],
                utilitiesEntertainment: [],
                utilitiesChildrenService: [],
                utilitiesShopping: [],
                utilitiesBusinessService: [],
                utilitiesVehicle: [],
                receptionHallPhoto: [],
                outdoorPhoto: [],
                otherPhoto: [],
                isBlock: true
            }

            serviceDataRaw.propertyName = res.data.data.serviceDTO.serviceName
            serviceDataRaw.status = res.data.data.serviceDTO.status
            serviceDataRaw.city = res.data.data.serviceDTO.city
            serviceDataRaw.address = res.data.data.serviceDTO.address
            serviceDataRaw.website = res.data.data.serviceDTO.link
            serviceDataRaw.taxCode = res.data.data.serviceDTO.taxCode
            serviceDataRaw.description = res.data.data.description
            serviceDataRaw.phoneNumberContact = res.data.data.serviceDTO.phone
            serviceDataRaw.fax = res.data.data.serviceDTO.fax
            serviceDataRaw.emailContact = res.data.data.serviceDTO.email
            serviceDataRaw.phone = res.data.data.serviceDTO.phone
            serviceDataRaw.isBlock = res.data.data.serviceDTO.isBlock

            categoryService.current = res.data.data.serviceDTO.serviceCategory - 1

            if (res.data.data.serviceDTO.serviceCategory == 1) {
                serviceDataRaw.starRating = res.data.data.rate
                serviceDataRaw.numberOfFloors = res.data.data.numberFloors
            }
            else if (res.data.data.serviceDTO.serviceCategory == 2) {
                serviceDataRaw.timeOpen = res.data.data.timeOpen
                serviceDataRaw.timeClose = res.data.data.timeClose
                serviceDataRaw.dateOpen = res.data.data.dowOpen.split(' ')
                serviceDataRaw.childTiketPrice = res.data.data.priceTicketChildren
                serviceDataRaw.adultTicketPrice = res.data.data.priceTicketAdult
            }
            else {
                serviceDataRaw.timeOpen = res.data.data.timeOpen
                serviceDataRaw.timeClose = res.data.data.timeClose
                serviceDataRaw.starRating = res.data.data.rate
                serviceDataRaw.typeOfCuisine = res.data.data.typeCuisineServiceDTOList
            }

            const utilitiesListDTO = res.data.data.utilitiesServiceDTOList

            utilitiesListDTO.map((item) => {
                switch (item.utilitiesCategoryId) {
                    case 1:
                        serviceDataRaw.utilitiesInternet.push({
                            utilitiesSubcategoryId: item.utilitiesSubcategoryId,
                            utilitiesCategoryId: 1
                        })
                        break;
                    case 2:
                        serviceDataRaw.utilitiesFacilities.push({
                            utilitiesSubcategoryId: item.utilitiesSubcategoryId,
                            utilitiesCategoryId: 2
                        })
                        break;
                    case 3:
                        serviceDataRaw.utilitiesAccomodationService.push({
                            utilitiesSubcategoryId: item.utilitiesSubcategoryId,
                            utilitiesCategoryId: 3
                        })
                        break;
                    case 4:
                        serviceDataRaw.utilitiesBeautyRelaxation.push({
                            utilitiesSubcategoryId: item.utilitiesSubcategoryId,
                            utilitiesCategoryId: 4
                        })
                        break;
                    case 5:
                        serviceDataRaw.utilitiesFoodService.push({
                            utilitiesSubcategoryId: item.utilitiesSubcategoryId,
                            utilitiesCategoryId: 5
                        })
                        break;
                    case 6:
                        serviceDataRaw.utilitiesEntertainment.push({
                            utilitiesSubcategoryId: item.utilitiesSubcategoryId,
                            utilitiesCategoryId: 6
                        })
                        break;
                    case 7:
                        serviceDataRaw.utilitiesChildrenService.push({
                            utilitiesSubcategoryId: item.utilitiesSubcategoryId,
                            utilitiesCategoryId: 7
                        })
                        break;
                    case 8:
                        serviceDataRaw.utilitiesShopping.push({
                            utilitiesSubcategoryId: item.utilitiesSubcategoryId,
                            utilitiesCategoryId: 8
                        })
                        break;
                    case 9:
                        serviceDataRaw.utilitiesBusinessService.push({
                            utilitiesSubcategoryId: item.utilitiesSubcategoryId,
                            utilitiesCategoryId: 9
                        })
                        break;
                    case 10:
                        serviceDataRaw.utilitiesVehicle.push({
                            utilitiesSubcategoryId: item.utilitiesSubcategoryId,
                            utilitiesCategoryId: 10
                        })
                        break;
                }
            })

            let countAllImage = 0;
            let countImageGeted = 0;

            let receptionHallPhotoRef = ref(storage, `service/accomodation/${serviceId}/information/receptionHallPhoto`)
            let outdoorPhotoRef = ref(storage, `service/accomodation/${serviceId}/information/outdoorPhoto`)
            let otherPhotoRef = ref(storage, `service/accomodation/${serviceId}/information/otherPhoto`)

            if (res.data.data.serviceDTO.serviceCategory == 2) {
                receptionHallPhotoRef = ref(storage, `service/entertainment/${serviceId}/information/receptionHallPhoto`)
                outdoorPhotoRef = ref(storage, `service/entertainment/${serviceId}/information/outdoorPhoto`)
                otherPhotoRef = ref(storage, `service/entertainment/${serviceId}/information/otherPhoto`)
            } else if (res.data.data.serviceDTO.serviceCategory == 3) {
                receptionHallPhotoRef = ref(storage, `service/restaurant/${serviceId}/information/receptionHallPhoto`)
                outdoorPhotoRef = ref(storage, `service/restaurant/${serviceId}/information/outdoorPhoto`)
                otherPhotoRef = ref(storage, `service/restaurant/${serviceId}/information/otherPhoto`)
            }

            if (res.data.data.serviceDTO.serviceCategory == 1) {
                console.log('lay phong')
                res.data.data.roomDTOList.map((room, index) => {
                    let countAllImageInRoom = 0;
                    let countImageInRoomGeted = 0;

                    let roomItem = {
                        showHide: false,
                        roomName: room.roomName,
                        roomType: room.roomType,
                        numberOfRoom: room.numberOfRoom,
                        bedType: room.bedType,
                        numberOfPeopleRoom: room.numberOfPeopleRoom,
                        roomSize: room.roomSize,
                        dailyPrice: room.dailyPrice,
                        holidayPrice: room.holidayPrice,
                        description: room.description,
                        bedRoomPhoto: [],
                        wcPhoto: [],
                        otherPhoto: []
                    }

                    const bedRoomPhotoRef = ref(storage, `service/accomodation/${serviceId}/room/${index + 1}/bedRoomPhoto`)
                    const wcPhotoRef = ref(storage, `service/accomodation/${serviceId}/room/${index + 1}/wcPhoto`)
                    const otherRoomPhotoRef = ref(storage, `service/accomodation/${serviceId}/room/${index + 1}/otherPhoto`)

                    listAll(bedRoomPhotoRef).then((res) => {
                        countAllImage += res.items.length
                        countAllImageInRoom += res.items.length
                        res.items.forEach((itemRef) => {
                            getDownloadURL(ref(storage, itemRef.fullPath))
                                .then((url) => {
                                    axios({
                                        url: url,
                                        method: 'GET',
                                        responseType: 'blob',
                                    }).then(blob => {
                                        roomItem.bedRoomPhoto.push(blob.data)
                                        countImageInRoomGeted++
                                        countImageGeted++;
                                        if (countImageInRoomGeted === countAllImageInRoom) {
                                            roomDataUpdate.push(roomItem)
                                        }
                                        if (countImageGeted === countAllImage) {
                                            setAllImageDataForEdit(serviceDataRaw, receptionHallPhoto, outdoorPhoto, otherPhoto, roomDataUpdate)
                                        }
                                    })
                                })
                        })
                    })

                    listAll(wcPhotoRef).then((res) => {
                        countAllImage += res.items.length
                        countAllImageInRoom += res.items.length
                        res.items.forEach((itemRef) => {
                            getDownloadURL(ref(storage, itemRef.fullPath))
                                .then((url) => {
                                    axios({
                                        url: url,
                                        method: 'GET',
                                        responseType: 'blob',
                                    }).then(blob => {
                                        roomItem.wcPhoto.push(blob.data)
                                        countImageGeted++;
                                        countImageInRoomGeted++
                                        if (countImageInRoomGeted === countAllImageInRoom) {
                                            roomDataUpdate.push(roomItem)
                                        }
                                        if (countImageGeted === countAllImage) {
                                            setAllImageDataForEdit(serviceDataRaw, receptionHallPhoto, outdoorPhoto, otherPhoto, roomDataUpdate)
                                        }
                                    })
                                })
                        })
                    })

                    listAll(otherRoomPhotoRef).then((res) => {
                        countAllImage += res.items.length
                        countAllImageInRoom += res.items.length
                        res.items.forEach((itemRef) => {
                            getDownloadURL(ref(storage, itemRef.fullPath))
                                .then((url) => {
                                    axios({
                                        url: url,
                                        method: 'GET',
                                        responseType: 'blob',
                                    }).then(blob => {
                                        roomItem.otherPhoto.push(blob.data)
                                        countImageGeted++;
                                        countImageInRoomGeted++
                                        if (countImageInRoomGeted === countAllImageInRoom) {
                                            roomDataUpdate.push(roomItem)
                                        }
                                        if (countImageGeted === countAllImage) {
                                            setAllImageDataForEdit(serviceDataRaw, receptionHallPhoto, outdoorPhoto, otherPhoto, roomDataUpdate)
                                        }
                                    })
                                })
                        })
                    })
                })
            }


            let receptionHallPhoto = []
            let outdoorPhoto = []
            let otherPhoto = []
            let roomDataUpdate = []

            console.log(receptionHallPhotoRef)

            listAll(receptionHallPhotoRef).then((res) => {
                countAllImage += res.items.length
                console.log('count image: ', countAllImage)
                res.items.forEach((itemRef) => {
                    getDownloadURL(ref(storage, itemRef.fullPath))
                        .then((url) => {
                            console.log(url)
                            axios({
                                url: url,
                                method: 'GET',
                                responseType: 'blob',
                            }).then(blob => {
                                receptionHallPhoto.push(blob.data)
                                countImageGeted++;
                                console.log('check', countImageGeted)
                                if (countImageGeted === countAllImage) {
                                    console.log('xong')
                                    setAllImageDataForEdit(serviceDataRaw, receptionHallPhoto, outdoorPhoto, otherPhoto, roomDataUpdate)
                                }
                            })
                        })
                })
            })

            listAll(outdoorPhotoRef).then((res) => {
                countAllImage += res.items.length
                res.items.forEach((itemRef) => {
                    getDownloadURL(ref(storage, itemRef.fullPath))
                        .then((url) => {
                            axios({
                                url: url,
                                method: 'GET',
                                responseType: 'blob',
                            }).then(blob => {
                                outdoorPhoto.push(blob.data)
                                countImageGeted++;
                                if (countImageGeted === countAllImage) {
                                    setAllImageDataForEdit(serviceDataRaw, receptionHallPhoto, outdoorPhoto, otherPhoto, roomDataUpdate)
                                }
                            })
                        })
                })
            })

            listAll(otherPhotoRef).then((res) => {
                countAllImage += res.items.length
                res.items.forEach((itemRef) => {
                    getDownloadURL(ref(storage, itemRef.fullPath))
                        .then((url) => {
                            axios({
                                url: url,
                                method: 'GET',
                                responseType: 'blob',
                            }).then(blob => {
                                otherPhoto.push(blob.data)
                                countImageGeted++;
                                if (countImageGeted === countAllImage) {
                                    setAllImageDataForEdit(serviceDataRaw, receptionHallPhoto, outdoorPhoto, otherPhoto, roomDataUpdate)
                                }
                            })
                        })
                })
            })
        }).catch(() => { })
    }, [])

    const listScreen = [
        [
            <ViewInformationAccommodation languageSelected={languageSelected} />,
            <ViewInfomationRooms languageSelected={languageSelected} roomsData={roomsData} setRoomsData={setRoomsData} />,
            <ViewUtilitiesAndServices languageSelected={languageSelected} />,
            <ViewPhotos languageSelected={languageSelected} />
        ],
        [
            <ViewInformationEntertainment languageSelected={languageSelected} />,
            <ViewUtilitiesAndServices languageSelected={languageSelected} />,
            <ViewPhotos languageSelected={languageSelected} />
        ],
        [
            <ViewInformationRestaurant languageSelected={languageSelected} />,
            <ViewUtilitiesAndServices languageSelected={languageSelected} />,
            <ViewPhotos languageSelected={languageSelected} />
        ]
    ]

    const [optionSelected, setOptionSelected] = useState(0)

    const handleClickDeleteService = (() => {
        axios.delete(`http://localhost:8081/wetravel/delete/service/${serviceId}`).then((res) => {
            toast.info('Deleted')
            window.history.back()
        })
    })

    const handleClickConfirmService = (() => {
        axios.put(`${API_SERVICE_CONFIRM}/${serviceId}`).then((res) => {
            toast.info('Confirmed')
            window.history.back()
        })
    })

    const handleClickShowConfirm = (title, content, callback, isRed, textOk, textCancel) => {
        setShowConfirm(true)
        setTitleConfirm(title)
        setContentConfirm(content)
        callbackConfirm.current = callback
        setIsRed(isRed)
        setTextOk(textOk)
        setTextCancel(textCancel)
    }


    if (!getDataComplete) {
        return (
            <div>
                <div className="bg-popup" />
                <LoadingDialog className="detail-service" />
            </div>
        )
    }

    return (
        <CommonDataForAllViewService.Provider value={serviceData}>
            <div className='main-content-view-service-admin'>
                {showConfirm &&
                    <ConfirmDialog textOk={textOk} textCancel={textCancel} title={titleConfirm} content={contentConfirm} callback={callbackConfirm.current} isRed={isRed} setShowDialog={setShowConfirm} />
                }
                <nav className='d-flex nav-view-service-admin'>
                    {titleLanguage[categoryService.current].map((item, index) => (
                        <div onClick={() => setOptionSelected(index)}
                            className={`item-nav-view-service-admin 
                        ${optionSelected == index ? 'item-nav-view-service-admin-selected' : 'item-nav-view-service-admin-unselected'}
                        ${index === 0 && 'br-left-top'} ${index === titleLanguage[categoryService.current].length - 1 && 'br-right-top'}`}>
                            {item}
                        </div>
                    ))}
                </nav>

                <div className='d-flex content-title-view-service'>
                    <label className='title-admin-view-service'>{titleLanguage[categoryService.current][optionSelected]}</label>
                    {
                        window.location.pathname.includes('confirm') && !serviceData.isBlock &&
                        <div className='btn-confirm-or-refuse'>
                            <button className='btn btn-success'
                                onClick={() => handleClickShowConfirm(languageList.txtConfirm, languageList.txtWarningConfirm,
                                    handleClickConfirmService, false, languageList.txtConfirm, languageList.txtCancel)}>
                                {languageList.txtConfirm}
                            </button>
                            <button className='btn btn-danger'
                                onClick={() => handleClickShowConfirm(languageList.txtRefuse, languageList.txtWarningRefuse,
                                    handleClickDeleteService, true, languageList.txtRefuse, languageList.txtCancel)}>
                                {languageList.txtRefuse}
                            </button>
                        </div>
                    }
                    {!window.location.pathname.includes('confirm') && !serviceData.isBlock &&
                        <button className='btn btn-danger btn-delete' onClick={() => handleClickShowConfirm(languageList.txtRefuse, languageList.txtWarningRefuse,
                            handleClickDeleteService, true, languageList.txtRefuse, languageList.txtCancel)}>
                            {languageList.txtDelete}
                        </button>
                    }
                </div>

                <div className='main-content-right-view-service-under'>
                    {listScreen[categoryService.current][optionSelected]}
                </div>
            </div>
        </CommonDataForAllViewService.Provider>
    )
}

export default memo(ViewInformationDetailService)