import { vietnamese, english } from "../../Languages/OptionInputInformationService";
import { useState, memo, useEffect, useRef, useLayoutEffect } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import './RegisterInformationServiceLayout.scss'
import RegisterInformationRooms from '../../pages/RegisterInformationRooms'
import RegisterInformationAccomodation from '../../pages/RegisterInformationAccomodation'
import RegisterUtilitiesAndServices from "../../pages/RegisterUtilitiesAndServices";
import RegisterPhotos from "../../pages/RegisterPhotos";
import RegisterInformationEntertainment from "../../pages/RegisterInformationEntertainment";
import RegisterInformationRestaurant from "../../pages/RegisterInformationRestaurant";
import axios from "axios";
import LoadingDialog from "../LoadingDialog";
import { toast } from 'react-toastify'
import { UploadImage } from "../../../firebase/UploadImage";
import { API_PUT_UPDATE_SERVICEACCOMMODATION, API_SERVICE_DETAIL_INFORMATION, API_PUT_UPDATE_SERVICEENTERTAIMENT, API_PUT_UPDATE_SERVICERESTAURANT } from "../../API"
import { ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from "../../../firebase/Config";
import { StickyContainer, Sticky } from 'react-sticky'

function RegisterInformationServiceLayout({ setProgress, languageSelected }) {
    const navigate = useNavigate()

    const [showLoading, setShowLoading] = useState(false);
    const [moveToTop, setMoveToTop] = useState(true)
    const state = useLocation().state

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [moveToTop])

    let languageList = (languageSelected === 'EN' ? english : vietnamese)
    const categoryService = sessionStorage.getItem('index-service-selected')
    const categoryDetailService = sessionStorage.getItem('detail-service')
    const [selectedOption, setSelectedOption] = useState(0)

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
        otherPhoto: []
    })


    //form input rooms
    const [roomsData, setRoomsData] = useState([
        {
            showHide: true,
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

    //on off star rating
    const [onStarRating, setOnStarRating] = useState(true)

    const [getDataComplete, setGetDataComplete] = useState(false)

    let serviceId;

    if (state !== null) {
        serviceId = state.serviceId
    }

    function setAllImageDataForEdit(serviceDataRaw, receptionHallPhoto, outdoorPhoto, otherPhoto, roomsData) {
        serviceDataRaw.receptionHallPhoto = receptionHallPhoto
        serviceDataRaw.outdoorPhoto = outdoorPhoto
        serviceDataRaw.otherPhoto = otherPhoto
        setServiceData({ ...serviceDataRaw, receptionHallPhoto: receptionHallPhoto, outdoorPhoto: outdoorPhoto, otherPhoto: otherPhoto })
        setRoomsData(roomsData)
        setGetDataComplete(true)
    }

    useEffect(() => {
        //Lấy dữ liệu service theo serviceId ở trên để edit
        if (window.location.pathname.includes('/partner/edit-service')) {
            axios.get(API_SERVICE_DETAIL_INFORMATION, {
                params: {
                    serviceId: serviceId
                },
            }).then((res) => {
                console.log(res)
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
                    otherPhoto: []
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

                if (sessionStorage.getItem('index-service-selected') == 1) {
                    serviceDataRaw.starRating = res.data.data.rate
                    serviceDataRaw.numberOfFloors = res.data.data.numberFloors
                }
                else if (sessionStorage.getItem('index-service-selected') == 2) {
                    serviceDataRaw.timeOpen = res.data.data.timeOpen
                    serviceDataRaw.timeClose = res.data.data.timeClose
                    serviceDataRaw.dateOpen = res.data.data.dowOpen.split(' ')
                    serviceDataRaw.childTiketPrice = res.data.data.priceTicketChildren
                    serviceDataRaw.adultTicketPrice = res.data.data.priceTicketAdult
                } else {
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

                if (sessionStorage.getItem('index-service-selected') == 2) {
                    receptionHallPhotoRef = ref(storage, `service/entertainment/${serviceId}/information/receptionHallPhoto`)
                    outdoorPhotoRef = ref(storage, `service/entertainment/${serviceId}/information/outdoorPhoto`)
                    otherPhotoRef = ref(storage, `service/entertainment/${serviceId}/information/otherPhoto`)
                } else if (sessionStorage.getItem('index-service-selected') == 3) {
                    receptionHallPhotoRef = ref(storage, `service/restaurant/${serviceId}/information/receptionHallPhoto`)
                    outdoorPhotoRef = ref(storage, `service/restaurant/${serviceId}/information/outdoorPhoto`)
                    otherPhotoRef = ref(storage, `service/restaurant/${serviceId}/information/otherPhoto`)
                }

                //console.log('chuan bi lay phong')
                if (sessionStorage.getItem('index-service-selected') == 1) {
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

                //console.log(receptionHallPhotoRef)

                listAll(receptionHallPhotoRef).then((res) => {
                    countAllImage += res.items.length
                    //console.log('count image: ', countAllImage)
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
        }
    }, [])

    //
    const count = useRef(-1)
    const [leng, setLeng] = useState(0)
    useEffect(() => {
        //edit va create
        const pathname = window.location.pathname
        if (leng === count.current) {
            setProgress(100)
            count.current = -1;
            setLeng(0)
            setShowLoading(false)
            if (pathname.includes('edit')) {
                toast.success(languageSelected === 'EN' ? 'Edit service success' : 'Đã cập nhật dịch vụ')
            }
            else {
                toast.success(languageSelected === 'EN' ? 'Add service success' : 'Đã thêm dịch vụ')
            }
            sessionStorage.removeItem('detail-service')
            navigate('/partner')
        }
    }, [leng])

    const handleClickSaveAndNext = () => {
        setMoveToTop(pre => !pre)
        setSelectedOption(pre => pre + 1)
    }

    //Submit accomodation
    const checkInformationRooms = () => {
        for (let i = 0; i < roomsData.length; i++) {
            if (roomsData[i].numberOfRoom == 0 || roomsData[i].numberOfPeopleRoom == 0 || roomsData[i].roomSize == 0 || roomsData[i].dailyPrice == 0 ||
                roomsData[i].holidayPrice == 0 || roomsData[i].bedRoomPhoto.length == 0 || roomsData[i].bedRoomPhoto.length == 0 || roomsData[i].wcPhoto.length == 0) {
                return false;
            }
        }
        return true
    }

    const UploadAccommodation = () => {
        count.current = serviceData.receptionHallPhoto.length + serviceData.outdoorPhoto.length + serviceData.otherPhoto.length
        for (let j = 0; j < roomsData.length; j++) {
            count.current += (roomsData[j].bedRoomPhoto.length
                + roomsData[j].wcPhoto.length
                + roomsData[j].otherPhoto.length)
        }
        UploadImage(serviceData.receptionHallPhoto, 'service/accomodation', count, setLeng, serviceId, 'information', 0, 'receptionHallPhoto')
        UploadImage(serviceData.outdoorPhoto, 'service/accomodation', count, setLeng, serviceId, 'information', 0, 'outdoorPhoto')
        UploadImage(serviceData.otherPhoto, 'service/accomodation', count, setLeng, serviceId, 'information', 0, 'otherPhoto')
        for (let i = 0; i < roomsData.length; i++) {
            UploadImage(roomsData[i].bedRoomPhoto, 'service/accomodation', count, setLeng, serviceId, 'room', i + 1, 'bedRoomPhoto')
            UploadImage(roomsData[i].wcPhoto, 'service/accomodation', count, setLeng, serviceId, 'room', i + 1, 'wcPhoto')
            UploadImage(roomsData[i].otherPhoto, 'service/accomodation', count, setLeng, serviceId, 'room', i + 1, 'otherPhoto')
        }
    }

    //Submit Accomodation Service
    const handleClickSubmitAccomodation = async () => {
        var regexWeb = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        var regexWebsite = new RegExp(regexWeb);

        if (serviceData.propertyName === '' || serviceData.address === '' || serviceData.taxCode === '' || serviceData.phoneNumberContact === '' ||
            serviceData.emailContact === '' || serviceData.receptionHallPhoto.length == 0 || serviceData.description === '' || !checkInformationRooms) {
            toast.warning(languageList[3])
        }
        else if (serviceData.propertyName !== '' && serviceData.address !== '' &&
            (serviceData.website === '' || serviceData.website.match(regexWebsite))
            && (/^[0-9]{10}$/.test(serviceData.taxCode) || /^[0-9]{13}$/.test(serviceData.taxCode))
            && serviceData.phoneNumberContact.match(/\d/g).length === 10 && serviceData.emailContact !== ''
            && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(serviceData.emailContact) && checkInformationRooms) {
            setShowLoading(true)
            //Submit

            const utilitiesServiceDTOList = [].concat(serviceData.utilitiesAccomodationService,
                serviceData.utilitiesBeautyRelaxation,
                serviceData.utilitiesBusinessService, serviceData.utilitiesChildrenService, serviceData.utilitiesEntertainment,
                serviceData.utilitiesFacilities, serviceData.utilitiesFoodService, serviceData.utilitiesInternet,
                serviceData.utilitiesShopping, serviceData.utilitiesVehicle)

            //console.log(utilitiesServiceDTOList)

            const accommodation = {
                "serviceDTO":
                {
                    "serviceName": serviceData.propertyName,
                    "fax": serviceData.fax,
                    "phone": serviceData.phoneNumberContact,
                    "email": serviceData.emailContact,
                    "address": serviceData.address,
                    "city": serviceData.city,
                    "link": serviceData.website,
                    "status": serviceData.status,
                    "taxCode": serviceData.taxCode,
                    "serviceCategory": sessionStorage.getItem('index-service-selected'),
                    "partnerEmail": sessionStorage.getItem('email')
                },
                "accommodationType": sessionStorage.getItem('detail-service'),
                "rate": (onStarRating ? serviceData.starRating : 0),
                "numberFloors": serviceData.numberOfFloors,
                "description": serviceData.description,
                "roomDTOList": [...roomsData],
                "utilitiesServiceDTOList": utilitiesServiceDTOList
            }

            if (window.location.pathname.includes('/partner/edit-service')) {
                axios.put(API_PUT_UPDATE_SERVICEACCOMMODATION + serviceId, accommodation)
                    .then((res) => {
                        let countDelete = 0;
                        let lengthDelete = 0;

                        const receptionHallPhotoRef = ref(storage, `service/accomodation/${serviceId}/information/receptionHallPhoto`)
                        const outdoorPhotoRef = ref(storage, `service/accomodation/${serviceId}/information/outdoorPhoto`)
                        const otherPhotoRef = ref(storage, `service/accomodation/${serviceId}/information/otherPhoto`)

                        let allRefDelete = []

                        listAll(receptionHallPhotoRef).then((res) => {
                            countDelete += res.items.length
                            res.items.forEach((itemRef) => {
                                allRefDelete.push(itemRef)

                            })
                            listAll(outdoorPhotoRef).then((res) => {
                                countDelete += res.items.length
                                res.items.forEach((itemRef) => {
                                    allRefDelete.push(itemRef)
                                })
                                listAll(otherPhotoRef).then((res) => {
                                    countDelete += res.items.length
                                    res.items.forEach((itemRef) => {
                                        allRefDelete.push(itemRef)
                                    })

                                    roomsData.map((room, index) => {
                                        const bedRoomPhotoRef = ref(storage, `service/accomodation/${serviceId}/room/${index + 1}/bedRoomPhoto`)
                                        const wcPhotoRef = ref(storage, `service/accomodation/${serviceId}/room/${index + 1}/wcPhoto`)
                                        const otherRoomPhotoRef = ref(storage, `service/accomodation/${serviceId}/room/${index + 1}/otherPhoto`)

                                        listAll(bedRoomPhotoRef).then((res) => {
                                            countDelete += res.items.length
                                            res.items.forEach((itemRef) => {
                                                allRefDelete.push(itemRef)
                                            })

                                            listAll(wcPhotoRef).then((res) => {
                                                countDelete += res.items.length
                                                res.items.forEach((itemRef) => {
                                                    allRefDelete.push(itemRef)
                                                })

                                                listAll(otherRoomPhotoRef).then((res) => {
                                                    countDelete += res.items.length
                                                    res.items.forEach((itemRef) => {
                                                        allRefDelete.push(itemRef)
                                                    })
                                                    allRefDelete.forEach((itemRef) => {
                                                        deleteObject(ref(storage, itemRef.fullPath)).then(() => {
                                                            ++lengthDelete
                                                            if (lengthDelete == countDelete) {
                                                                UploadAccommodation()
                                                            }
                                                        })
                                                    })
                                                })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
            } else {
                await axios.post('http://localhost:8081/wetravel/create/accommodation', accommodation)
                    .then((res) => {
                        const serviceId = res.data.data.serviceDTO.serviceId
                        //Anh
                        count.current = serviceData.receptionHallPhoto.length + serviceData.outdoorPhoto.length + serviceData.otherPhoto.length
                        for (let j = 0; j < roomsData.length; j++) {
                            count.current += (roomsData[j].bedRoomPhoto.length
                                + roomsData[j].wcPhoto.length
                                + roomsData[j].otherPhoto.length)
                        }
                        UploadImage(serviceData.receptionHallPhoto, 'service/accomodation', count, setLeng, serviceId, 'information', 0, 'receptionHallPhoto')
                        UploadImage(serviceData.outdoorPhoto, 'service/accomodation', count, setLeng, serviceId, 'information', 0, 'outdoorPhoto')
                        UploadImage(serviceData.otherPhoto, 'service/accomodation', count, setLeng, serviceId, 'information', 0, 'otherPhoto')
                        for (let i = 0; i < roomsData.length; i++) {
                            UploadImage(roomsData[i].bedRoomPhoto, 'service/accomodation', count, setLeng, serviceId, 'room', i + 1, 'bedRoomPhoto')
                            UploadImage(roomsData[i].wcPhoto, 'service/accomodation', count, setLeng, serviceId, 'room', i + 1, 'wcPhoto')
                            UploadImage(roomsData[i].otherPhoto, 'service/accomodation', count, setLeng, serviceId, 'room', i + 1, 'otherPhoto')
                        }
                    })
                    .catch((e) => {
                    })
            }
        }
        else {
            toast.warning(languageList[4])
        }
    }

    //Submit Entertainment Service
    const handleClickSubmitEntertainment = async () => {
        var regexWeb = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        var regexWebsite = new RegExp(regexWeb);

        if (serviceData.propertyName === '' || serviceData.address === '' || serviceData.taxCode === '' || serviceData.phoneNumberContact === '' ||
            serviceData.emailContact === '' || serviceData.timeOpen === '' || serviceData.timeClose === '' || serviceData.dateOpen.length == 0 ||
            serviceData.receptionHallPhoto.length == 0 || serviceData.outdoorPhoto.length == 0 || serviceData.description === '') {
            toast.warning(languageList[3])
        }
        else if (serviceData.propertyName !== '' && serviceData.address !== ''
            && (serviceData.website === '' || serviceData.website.match(regexWebsite))
            && (/^[0-9]{10}$/.test(serviceData.taxCode) || /^[0-9]{13}$/.test(serviceData.taxCode))
            && serviceData.phoneNumberContact.match(/\d/g).length === 10 && serviceData.emailContact !== ''
            && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(serviceData.emailContact)) {
            setShowLoading(true)
            setProgress(70)

            //Submit
            const utilitiesServiceDTOList = [].concat(serviceData.utilitiesAccomodationService,
                serviceData.utilitiesBeautyRelaxation,
                serviceData.utilitiesBusinessService, serviceData.utilitiesChildrenService, serviceData.utilitiesEntertainment,
                serviceData.utilitiesFacilities, serviceData.utilitiesFoodService, serviceData.utilitiesInternet,
                serviceData.utilitiesShopping, serviceData.utilitiesVehicle)

            //Submit
            const entertainment = {
                "serviceDTO":
                {
                    "serviceName": serviceData.propertyName,
                    "fax": serviceData.fax,
                    "phone": serviceData.phoneNumberContact,
                    "email": serviceData.emailContact,
                    "address": serviceData.address,
                    "city": serviceData.city,
                    "link": serviceData.website,
                    "status": serviceData.status,
                    "taxCode": serviceData.taxCode,
                    "serviceCategory": sessionStorage.getItem('index-service-selected'),
                    "partnerEmail": sessionStorage.getItem('email')
                },
                entertainmentType: sessionStorage.getItem('detail-service'),
                dowOpen: serviceData.dateOpen.join(" "),
                timeOpen: serviceData.timeOpen,
                timeClose: serviceData.timeClose,
                priceTicketAdult: serviceData.adultTicketPrice,
                priceTicketChildren: serviceData.childTiketPrice,
                utilitiesServiceDTOList: utilitiesServiceDTOList,
                description: serviceData.description
            }

            if (window.location.pathname.includes('/partner/edit-service')) {
                axios.put(API_PUT_UPDATE_SERVICEENTERTAIMENT + serviceId, entertainment)
                    .then((res) => {
                        const receptionHallPhotoRef = ref(storage, `service/entertainment/${serviceId}/information/receptionHallPhoto`)
                        const outdoorPhotoRef = ref(storage, `service/entertainment/${serviceId}/information/outdoorPhoto`)
                        const otherPhotoRef = ref(storage, `service/entertainment/${serviceId}/information/otherPhoto`)

                        let countDelete = 0;
                        let lengthDelete = 0;
                        let allRefDelete = []

                        listAll(receptionHallPhotoRef).then((res) => {
                            countDelete += res.items.length
                            res.items.forEach((itemRef) => {
                                allRefDelete.push(itemRef)

                            })
                            listAll(outdoorPhotoRef).then((res) => {
                                countDelete += res.items.length
                                res.items.forEach((itemRef) => {
                                    allRefDelete.push(itemRef)
                                })
                                listAll(otherPhotoRef).then((res) => {
                                    countDelete += res.items.length
                                    res.items.forEach((itemRef) => {
                                        allRefDelete.push(itemRef)
                                    })
                                    allRefDelete.forEach((itemRef) => {
                                        deleteObject(ref(storage, itemRef.fullPath)).then(() => {
                                            ++lengthDelete
                                            if (lengthDelete == countDelete) {
                                                //Anh
                                                count.current = serviceData.receptionHallPhoto.length + serviceData.outdoorPhoto.length + serviceData.otherPhoto.length
                                                UploadImage(serviceData.receptionHallPhoto, 'service/entertainment', count, setLeng, serviceId, 'information', 0, 'receptionHallPhoto')
                                                UploadImage(serviceData.outdoorPhoto, 'service/entertainment', count, setLeng, serviceId, 'information', 0, 'outdoorPhoto')
                                                UploadImage(serviceData.otherPhoto, 'service/entertainment', count, setLeng, serviceId, 'information', 0, 'otherPhoto')
                                            }
                                        })
                                    })
                                })
                            })
                        })


                    })
                    .catch((e) => {
                        console.log(e)
                    })
            } else {
                await axios.post('http://localhost:8081/wetravel/create/entertainment', entertainment)
                    .then((res) => {
                        //console.log(res)
                        const serviceId = res.data.data.serviceDTO.serviceId
                        //Anh
                        count.current = serviceData.receptionHallPhoto.length + serviceData.outdoorPhoto.length + serviceData.otherPhoto.length
                        UploadImage(serviceData.receptionHallPhoto, 'service/entertainment', count, setLeng, serviceId, 'information', 0, 'receptionHallPhoto')
                        UploadImage(serviceData.outdoorPhoto, 'service/entertainment', count, setLeng, serviceId, 'information', 0, 'outdoorPhoto')
                        UploadImage(serviceData.otherPhoto, 'service/entertainment', count, setLeng, serviceId, 'information', 0, 'otherPhoto')
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            }
        }
        else {
            toast.warning(languageList[4])
        }
    }

    //Submit Restaurants Services
    const handleClickSubmitRestaurant = async () => {
        var regexWeb = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        var regexWebsite = new RegExp(regexWeb);

        if (serviceData.propertyName === '' || serviceData.address === '' || serviceData.taxCode === '' || serviceData.phoneNumberContact === '' ||
            serviceData.emailContact === '' || serviceData.typeOfCuisine.length == 0 ||
            serviceData.timeOpen === '' || serviceData.timeClose === '' || serviceData.receptionHallPhoto.length == 0
            || serviceData.description === '') {
            toast.warning(languageList[3])
        }
        else if (serviceData.propertyName !== '' && serviceData.address !== ''
            && (serviceData.website === '' || serviceData.website.match(regexWebsite))
            && serviceData.typeOfCuisine.length > 0
            && (/^[0-9]{10}$/.test(serviceData.taxCode) || /^[0-9]{13}$/.test(serviceData.taxCode))
            && /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(serviceData.phoneNumberContact)
            && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(serviceData.emailContact)) {
            setShowLoading(true)
            //Submit
            const utilitiesServiceDTOList = [].concat(serviceData.utilitiesAccomodationService,
                serviceData.utilitiesBeautyRelaxation,
                serviceData.utilitiesBusinessService, serviceData.utilitiesChildrenService, serviceData.utilitiesEntertainment,
                serviceData.utilitiesFacilities, serviceData.utilitiesFoodService, serviceData.utilitiesInternet,
                serviceData.utilitiesShopping, serviceData.utilitiesVehicle)

            const restaurant = {
                "serviceDTO": {
                    "serviceName": serviceData.propertyName,
                    "fax": serviceData.fax,
                    "phone": serviceData.phoneNumberContact,
                    "email": serviceData.emailContact,
                    "address": serviceData.address,
                    "city": serviceData.city,
                    "link": serviceData.website,
                    "status": serviceData.status,
                    "taxCode": serviceData.taxCode,
                    "serviceCategory": sessionStorage.getItem('index-service-selected'),
                    "partnerEmail": sessionStorage.getItem('email')
                },
                restaurantServiceType: sessionStorage.getItem('detail-service'),
                timeOpen: serviceData.timeOpen,
                timeClose: serviceData.timeClose,
                description: serviceData.description,
                rate: (onStarRating ? serviceData.starRating : 0),
                utilitiesServiceDTOList: utilitiesServiceDTOList,
                typeCuisineServiceDTOList: serviceData.typeOfCuisine
            }

            if (window.location.pathname.includes('/partner/edit-service')) {
                axios.put(API_PUT_UPDATE_SERVICERESTAURANT + serviceId, restaurant)
                    .then((res) => {
                        const receptionHallPhotoRef = ref(storage, `service/restaurant/${serviceId}/information/receptionHallPhoto`)
                        const outdoorPhotoRef = ref(storage, `service/restaurant/${serviceId}/information/outdoorPhoto`)
                        const otherPhotoRef = ref(storage, `service/restaurant/${serviceId}/information/otherPhoto`)

                        let countDelete = 0;
                        let lengthDelete = 0;
                        let allRefDelete = []

                        listAll(receptionHallPhotoRef).then((res) => {
                            countDelete += res.items.length
                            res.items.forEach((itemRef) => {
                                allRefDelete.push(itemRef)

                            })
                            listAll(outdoorPhotoRef).then((res) => {
                                countDelete += res.items.length
                                res.items.forEach((itemRef) => {
                                    allRefDelete.push(itemRef)
                                })
                                listAll(otherPhotoRef).then((res) => {
                                    countDelete += res.items.length
                                    res.items.forEach((itemRef) => {
                                        allRefDelete.push(itemRef)
                                    })
                                    allRefDelete.forEach((itemRef) => {
                                        deleteObject(ref(storage, itemRef.fullPath)).then(() => {
                                            ++lengthDelete
                                            if (lengthDelete == countDelete) {
                                                //Anh
                                                count.current = serviceData.receptionHallPhoto.length + serviceData.outdoorPhoto.length + serviceData.otherPhoto.length
                                                UploadImage(serviceData.receptionHallPhoto, 'service/restaurant', count, setLeng, serviceId, 'information', 0, 'receptionHallPhoto')
                                                UploadImage(serviceData.outdoorPhoto, 'service/restaurant', count, setLeng, serviceId, 'information', 0, 'outdoorPhoto')
                                                UploadImage(serviceData.otherPhoto, 'service/restaurant', count, setLeng, serviceId, 'information', 0, 'otherPhoto')
                                            }
                                        })
                                    })
                                })
                            })
                        })
                    })
                    .catch((e) => {
                        console.log(e)
                    })
            } else {
                await axios.post('http://localhost:8081/wetravel/create/restaurant', restaurant)
                    .then((res) => {
                        const serviceId = res.data.data.serviceDTO.serviceId
                        //Anh
                        count.current = serviceData.receptionHallPhoto.length + serviceData.outdoorPhoto.length + serviceData.otherPhoto.length
                        UploadImage(serviceData.receptionHallPhoto, 'service/restaurant', count, setLeng, serviceId, 'information', 0, 'receptionHallPhoto')
                        UploadImage(serviceData.outdoorPhoto, 'service/restaurant', count, setLeng, serviceId, 'information', 0, 'outdoorPhoto')
                        UploadImage(serviceData.otherPhoto, 'service/restaurant', count, setLeng, serviceId, 'information', 0, 'otherPhoto')
                    })
                    .catch((e) => {
                    })
            }
        }
        else {
            toast.warning(languageList[4])
        }
    }

    const numberOfOption = [
        [<RegisterInformationAccomodation languageSelected={languageSelected}
            handleClickSaveAndNext={handleClickSaveAndNext}
            serviceData={serviceData} setServiceData={setServiceData} onStarRating={onStarRating} setOnStarRating={setOnStarRating}
        />,
        <RegisterInformationRooms languageSelected={languageSelected} formFields={roomsData} setFormFields={setRoomsData}
            handleClickSaveAndNext={handleClickSaveAndNext} />,
        <RegisterUtilitiesAndServices languageSelected={languageSelected} handleClickSaveAndNext={handleClickSaveAndNext}
            serviceData={serviceData} setServiceData={setServiceData} />,
        <RegisterPhotos languageSelected={languageSelected} serviceData={serviceData} setServiceData={setServiceData}
            handleClickSubmit={handleClickSubmitAccomodation} />],
        [<RegisterInformationEntertainment languageSelected={languageSelected}
            handleClickSaveAndNext={handleClickSaveAndNext} serviceData={serviceData} setServiceData={setServiceData}
            onStarRating={onStarRating} setOnStarRating={setOnStarRating} />,
        <RegisterUtilitiesAndServices languageSelected={languageSelected} handleClickSaveAndNext={handleClickSaveAndNext}
            serviceData={serviceData} setServiceData={setServiceData} />,
        <RegisterPhotos languageSelected={languageSelected} serviceData={serviceData} setServiceData={setServiceData}
            handleClickSubmit={handleClickSubmitEntertainment} />],
        [<RegisterInformationRestaurant languageSelected={languageSelected}
            handleClickSaveAndNext={handleClickSaveAndNext}
            serviceData={serviceData} setServiceData={setServiceData} onStarRating={onStarRating} setOnStarRating={setOnStarRating} />,
        <RegisterUtilitiesAndServices languageSelected={languageSelected} handleClickSaveAndNext={handleClickSaveAndNext}
            serviceData={serviceData} setServiceData={setServiceData} />,
        <RegisterPhotos languageSelected={languageSelected} serviceData={serviceData} setServiceData={setServiceData}
            handleClickSubmit={handleClickSubmitRestaurant} />]]

    const handleSelectAnOpion = (item) => {
        setSelectedOption(item)
    }

    if (!getDataComplete && window.location.pathname.includes('edit')) {
        return (
            <LoadingDialog />
        )
    }

    return (
        <>
            <div className="detail-service">
                <StickyContainer>
                    <div className="container d-flex space-register-information-service">
                        <div className="options">
                            <Sticky>
                                {({ style }) => (
                                    <div style={style}>
                                        {numberOfOption[categoryService - 1].map((item, index) => (
                                            <div key={index} className={`option ${selectedOption === index && 'selected-option'}`}
                                                onClick={() => handleSelectAnOpion(index)}
                                            >{languageList[categoryService - 1][index]}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </Sticky>
                        </div>
                        <div className="content-register-information-service">
                            {numberOfOption[categoryService - 1][selectedOption]}
                        </div>
                    </div>
                </StickyContainer>
            </div>
            {showLoading && <div className='popup'>
                <div className='bg-popup' />
                {showLoading && <LoadingDialog />}
            </div>}
        </>
    )
}

export default memo(RegisterInformationServiceLayout)