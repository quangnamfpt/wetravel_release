import { memo, useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { english, vietnamese } from '../../Languages/MenuCreateTour'
import GeneralInformationTour from '../GeneralInformationTour'
import TourSchedule from '../TourSchedule'
import MoreInformationTour from '../MoreInformationTour'
import axios from 'axios';
import { API_GET_SERVICE_BY_CONDITION, API_GET_DETAIL_TOUR, API_GET_CUSTOMER, API_GET_PARTNER, API_DELETE_TOUR, API_ACTIVE_TOUR, API_UPDATE_TOUR } from "../../API"
import LoadingDialog from '../../Layout/LoadingDialog'
import { ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage'
import { storage } from "../../../firebase/Config";
import InformationCustomerRegisterTourPrivate from '../InformationCustomerRegisterTourPrivate'
import './ViewTour.scss'
import ConfirmDialog from '../../Layout/ConfirmDialog'
import { toast } from 'react-toastify'
import { english as englishTable, vietnamese as vietnameseTable } from '../../Languages/TableTour';
import { english as englishConfirm, vietnamese as vietnameseConfirm } from '../../Languages/MoreInformationTour'
import { UploadImage } from '../../../firebase/UploadImage'

function ViewTour({ languageSelected }) {
    const navigate = useNavigate()

    const [getDataComplete, setGetDataComplete] = useState(false)
    const [optionSelected, setOptionSelected] = useState(0)
    const [showLoading, setShowLoading] = useState(false)

    const [showConfirm, setShowConfirm] = useState(false)
    const [titleConfirm, setTitleConfirm] = useState('asd')
    const [contentConfirm, setContentConfirm] = useState('asd')
    const callbackConfirm = useRef(() => { })
    const [isRed, setIsRed] = useState(true)
    const [textOk, setTextOk] = useState('Ok')
    const [textCancel, setTextCancel] = useState('Cancel')

    const languageList = languageSelected === 'EN' ? englishConfirm : vietnameseConfirm
    const table = languageSelected === 'EN' ? englishTable : vietnameseTable
    const menuCreateTour = (languageSelected === 'EN' ? english : vietnamese)
    const titleLanguage = (languageSelected === 'EN' ? 'Tour information' : 'Thông tin tour')

    const pathname = window.location.pathname

    const id = useLocation().state.id

    const [serviceList, setServiceList] = useState([])
    const [userList, setUserList] = useState([])

    useEffect(() => {
        let services = []

        axios.get(API_GET_SERVICE_BY_CONDITION, {
            params: {
                isActive: 1,
                isBlock: window.location.pathname === '/admin/view-detail-tour' ? -1 : 0,
                status: 1,
                serviceIdList: ''
            }
        }).then((response) => {
            response.data.data.map((item) => {
                let service = {
                    value: item.serviceId,
                    label: item.serviceName
                }
                services.push(service)
            })

            let customers = []
            axios.get(API_GET_CUSTOMER, {
                params: {
                    page: 1,
                    size: 99999
                }
            }).then((res) => {
                res.data.data.content.map((itemCus) => {
                    let cus = {
                        value: itemCus.accountId,
                        label: itemCus.email
                    }
                    customers.push(cus)
                })
                axios.get(API_GET_PARTNER, {
                    params: {
                        page: 1,
                        size: 99999
                    }
                }).then((resPart) => {
                    resPart.data.data.content.map((itemCus) => {
                        let cus = {
                            value: itemCus.accountId,
                            label: itemCus.email
                        }
                        customers.push(cus)
                    })
                    setUserList([...customers])
                }).catch(() => {
                    setUserList([...customers])
                })
            }).catch((e) => {
                axios.get(API_GET_PARTNER, {
                    params: {
                        page: 1,
                        size: 99999
                    }
                }).then((resPart) => {
                    resPart.data.data.content.map((itemCus) => {
                        let cus = {
                            value: itemCus.accountId,
                            label: itemCus.email
                        }
                        customers.push(cus)
                    })
                    setUserList([...customers])
                }).catch(() => {
                    setUserList([...customers])
                })
            })
            setServiceList([...services])
        }).catch(() => {
            let customers = []
            axios.get(API_GET_CUSTOMER, {
                params: {
                    page: 1,
                    size: 99999
                }
            }).then((res) => {
                res.data.data.content.map((itemCus) => {
                    let cus = {
                        value: itemCus.accountId,
                        label: itemCus.email
                    }
                    customers.push(cus)
                })
                axios.get(API_GET_PARTNER, {
                    params: {
                        page: 1,
                        size: 99999
                    }
                }).then((resPart) => {
                    resPart.data.data.content.map((itemCus) => {
                        let cus = {
                            value: itemCus.accountId,
                            label: itemCus.email
                        }
                        customers.push(cus)
                    })
                    setUserList([...customers])
                }).catch(() => {
                    setUserList([...customers])
                })
            }).catch((e) => {
                axios.get(API_GET_PARTNER, {
                    params: {
                        page: 1,
                        size: 99999
                    }
                }).then((resPart) => {
                    resPart.data.data.content.map((itemCus) => {
                        let cus = {
                            value: itemCus.accountId,
                            label: itemCus.email
                        }
                        customers.push(cus)
                    })
                    setUserList([...customers])
                }).catch(() => {
                    setUserList([...customers])
                })
            })
            setServiceList([...services])
        })
    }, [])

    const [tour, setTour] = useState()
    const [tourSchedule, setTourSchedule] = useState([])
    const [customerRegisted, setCustomerRegisted] = useState({
        numberOfAdult: 1,
        numberOfChildren: 0,
        fullName: '',
        phone: '',
        emailContact: '',
        idCard: '',
        dateOfIssue: '',
        placeOfIssue: ''
    })

    useEffect(() => {
        axios.get(`${API_GET_DETAIL_TOUR}/${id}`).then((res) => {
            const data = res.data.data
            let tagRaw = []
            data.tourDetailDTO.tagOfTourDTOList.forEach(element => {
                tagRaw.push(parseInt(element.tagId))
            })

            let scheduleRaw = []
            data.tourScheduleDTOList.forEach(element => {
                const schedule = {
                    name: element.tourScheduleName,
                    content: element.content,
                    toPlace: element.toPlace,
                    recommendAccommodation: element.accommodationService.split(' '),
                    recommendEntertainment: element.entertainmentService.split(' '),
                    recommendRestaurants: element.restaurantService.split(' '),
                    indexAccommodation: [],
                    indexEntertainment: [],
                    indexRestaurants: [],
                    getAccommodation: [],
                    getEntertainment: [],
                    getRestaurants: [],
                    openServices: false,
                    show: true
                }
                scheduleRaw.push(schedule)
            })

            let tourRaw = {
                code: data.tourCode,
                startPlace: data.startPlace,
                startTime: data.startTime,
                endTime: data.endTime,
                endPlace: data.endPlace,
                status: data.status,
                type: data.tourType,
                category: data.tourCategoryId,
                mode: data.tourMode ? 1 : 0,
                startDate: data.startDate,
                numberOfDay: data.numberOfDay,
                numberOfNight: data.numberOfNight,
                minAdult: data.minAdult,
                maxAdult: data.maxAdult,
                minChildren: data.minChildren,
                maxChildren: data.maxChildren,
                minToActive: data.minToStart,
                id: data.tourId,
                name: data.tourName,
                price: data.priceAdult,
                adultPrice: data.priceAdult,
                childrenPrice: data.priceChildren,
                introduce: data.tourDetailDTO.tourIntroduce,
                tag: tagRaw,
                schedule: scheduleRaw,
                city: data.startPlace,
                addressStart: data.tourDetailDTO.addressStart,
                include: data.tourDetailDTO.tourInclude,
                nonInclude: data.tourDetailDTO.tourNonInclude,
                generalTerms: data.tourDetailDTO.generalTerms,
                moreDescription: data.tourDetailDTO.moreDescription,
                latitude: data.tourDetailDTO.latitude,
                longitude: data.tourDetailDTO.longitude,
                accountId: data.accountId,
                totalPrice: data.totalPrice,
                deposit: data.deposit
            }

            let customerRegistedRaw;

            if (tourRaw.accountId !== null) {
                customerRegistedRaw = {
                    numberOfAdult: data.userBookingDTO.numberOfAdult,
                    numberOfChildren: data.userBookingDTO.numberOfChildren,
                    fullName: data.userBookingDTO.fullName,
                    phone: data.userBookingDTO.phone,
                    emailContact: data.userBookingDTO.email,
                    idCard: data.userBookingDTO.idCard,
                    dateOfIssue: data.userBookingDTO.dateOfIssue,
                    placeOfIssue: data.userBookingDTO.placeOfIssue
                }
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
                                tourImages.push(blob.data)
                                leng++
                                console.log('tourRaw: ', tourRaw)
                                console.log('images: ', tourImages)
                                if (leng === count) {
                                    console.log('xong')
                                    setTour({
                                        ...tourRaw, images: tourImages
                                    })
                                    setTourSchedule(scheduleRaw)
                                    setCustomerRegisted({ ...customerRegistedRaw })
                                    setGetDataComplete(true)
                                }
                            })
                        })
                })
            })

        })
    }, [])

    const count = useRef(-1)
    const [leng, setLeng] = useState(0)
    useEffect(() => {
        if (leng === count.current) {
            count.current = -1;
            setLeng(0)
            setShowLoading(false)
            toast.success(window.location.pathname === '/admin/edit-tour' ? languageList.txtEditSuccess : languageList.txtAddSuccess)
            navigate(-1)
        }
    }, [leng])

    const checkTourSchedule = () => {
        if (tour.mode == 1 && tourSchedule.length != tour.numberOfDay) {
            return false
        } else {
            tourSchedule.forEach(element => {
                if (element.name === '' || element.content === '' || element.content === '<p><br></p>' || element.toPlace === '') {
                    return false
                }
            });
        }
        return true
    }

    const listScreen = [<GeneralInformationTour languageSelected={languageSelected} tour={tour} setTour={setTour} tourSchedule={tourSchedule} setTourSchedule={setTourSchedule} isDisabled={pathname !== '/admin/edit-tour'} />,
    <TourSchedule languageSelected={languageSelected} tour={tour} tourSchedule={tourSchedule} setTourSchedule={setTourSchedule} serviceList={serviceList} isDisabled={pathname !== '/admin/edit-tour'} />,
    <MoreInformationTour languageSelected={languageSelected} tour={tour} setTour={setTour} tourSchedule={tourSchedule} isDisabled={pathname !== '/admin/edit-tour'} />,
    <InformationCustomerRegisterTourPrivate userList={userList} customerRegisted={customerRegisted} setCustomerRegisted={setCustomerRegisted} languageSelected={languageSelected} tour={tour} setTour={setTour} isDisabled />]

    const handleClickCloseOrActive = (title, content, callback, isRed, textOk, textCancel) => {
        setShowConfirm(true)
        setTitleConfirm(title)
        setContentConfirm(content)
        callbackConfirm.current = callback
        setIsRed(isRed)
        setTextOk(textOk)
        setTextCancel(textCancel)
    }

    const closeTour = () => {
        setGetDataComplete(false)
        axios.delete(`${API_DELETE_TOUR}/${tour.id}`).then(() => {
            let tourRaw = { ...tour }
            tourRaw.status = 3
            setTour({ ...tourRaw })
            setGetDataComplete(true)
            toast.success(languageSelected === 'EN' ? 'Closed' : 'Đã đóng')
        }).catch((e) => console.log(e))
        setShowConfirm(false)
    }

    const updateTour = () => {
        if (tour.code === '' || tour.name === '' || (tour.mode == 0 && (tour.startTime === '' || tour.endTime === ''))
            || tour.introduce === '' || tour.introduce === '<p><br></p>' || tour.addressStart === '' || !checkTourSchedule
            || tour.images.length === 0) {
            setShowLoading(false)
            toast.warning(languageList.txtNotFullInformation)
        }
        else if (parseInt(tour.priceAdult) < 1000 || parseInt(tour.priceChildren) < 1000) {
            setShowLoading(false)
            toast.warning(languageList.txtInvalid)
        }
        else {
            const tourData = {
                "tourName": tour.name,
                "tourCode": tour.code,
                "startPlace": tour.startPlace,
                "endPlace": tour.endPlace,
                "status": tour.status,
                "tourType": tour.type,
                "startDate": tour.type != 1 ? tour.startDate : '',
                "tourMode": tour.mode,
                "numberOfDay": tour.numberOfDay,
                "numberOfNight": tour.numberOfNight,
                "minAdult": tour.minAdult,
                "maxAdult": tour.maxAdult,
                "minChildren": tour.minChildren,
                "maxChildren": tour.maxChildren,
                "minToStart": tour.minToActive,
                "maxToStart": tour.maxToActive,
                "startTime": tour.startTime,
                "endTime": tour.endTime,
                "priceAdult": tour.adultPrice,
                "priceChildren": tour.childrenPrice,
                "totalPrice": tour.totalPrice,
                "deposit": tour.deposit,
                "note": "note",
                "tourCategoryId": tour.category,
                "tourDetailDTO":
                {
                    "tourIntroduce": tour.introduce,
                    "tourInclude": tour.include,
                    "tourNonInclude": tour.nonInclude,
                    "generalTerms": tour.generalTerms,
                    "addressStart": tour.addressStart,
                    "description": tour.description,
                    "moreDescription": tour.moreDescription,
                    "priceAdult": tour.adultPrice,
                    "priceChildren": tour.childrenPrice,
                    "longitude": tour.longitude,
                    "latitude": tour.latitude,
                    "tagOfTourDTOList":
                        [...tour.tag].map((tagItem) => (
                            {
                                "tagId": tagItem
                            }
                        )
                        )
                },
                "tourScheduleDTOList": tour.mode == 1 ?
                    [...tourSchedule].map((tourScheduleItem) => (
                        {
                            "tourScheduleName": tourScheduleItem.name,
                            "content": tourScheduleItem.content,
                            "toPlace": tourScheduleItem.toPlace
                        }
                    )
                    ) : [{
                        "tourScheduleName": [...tourSchedule][0].name,
                        "content": [...tourSchedule][0].content,
                        "toPlace": [...tourSchedule][0].toPlace
                    }]
            }
            setShowLoading(true)
            count.current = tour.images.length
            axios.post(`${API_UPDATE_TOUR}${tour.id}`, tourData).then((res) => {
                console.log(res)
                let countDelete = 0;
                let lengthDelete = 0;
                let allRefDelete = []

                const refTour = ref(storage, `/tour/${tour.id}/information/images`)
                listAll(refTour).then((res) => {
                    countDelete = res.items.length
                    console.log(countDelete)
                    res.items.forEach((itemRef) => {
                        allRefDelete.push(itemRef)
                    })
                    allRefDelete.forEach((itemRef) => {
                        deleteObject(ref(storage, itemRef.fullPath)).then(() => {
                            ++lengthDelete
                            console.log(lengthDelete)
                            if (lengthDelete == countDelete) {
                                UploadImage(tour.images, 'tour', count, setLeng, tour.id, 'information', 0, 'images')
                            }
                        })
                    })
                })
            }).catch((e) => console.log(e))
        }
        setShowConfirm(false)
    }

    const activeTour = () => {
        setGetDataComplete(false)
        axios.put(`${API_ACTIVE_TOUR}/${id}`).then(() => {
            let tourRaw = { ...tour }
            tourRaw.status = 1
            setTour({ ...tourRaw })
            setGetDataComplete(true)
            toast.success(languageSelected === 'EN' ? 'Actived' : 'Đã kích hoạt')
        }).catch((e) => console.log(e))
        setShowConfirm(false)
    }


    if (!getDataComplete) {
        return (<LoadingDialog />)
    }

    return (
        <div className='fade-in main-content-view-service-admin right-content-create-tour'>
            {showLoading &&
                <LoadingDialog />}
            {showConfirm &&
                <ConfirmDialog title={titleConfirm} content={contentConfirm} callback={callbackConfirm.current} isRed={isRed} setShowDialog={setShowConfirm} textOk={textOk} textCancel={textCancel} />
            }
            <nav className='d-flex nav-view-service-admin'>
                {menuCreateTour.map((item, index) => (
                    index < 3 ?
                        <div onClick={() => setOptionSelected(index)}
                            className={`item-nav-view-service-admin 
                        ${optionSelected == index ? 'item-nav-view-service-admin-selected' : 'item-nav-view-service-admin-unselected'}
                        ${index === 0 && 'br-left-top'} ${index === menuCreateTour.length - 1 && 'br-right-top'}`}>
                            {item}
                        </div>
                        :
                        tour.type != 1 && <div onClick={() => setOptionSelected(index)}
                            className={`item-nav-view-service-admin 
                    ${optionSelected == index ? 'item-nav-view-service-admin-selected' : 'item-nav-view-service-admin-unselected'}
                    ${index === 0 && 'br-left-top'} ${index === menuCreateTour.length - 1 && 'br-right-top'}`}>
                            {item}
                        </div>
                ))}
            </nav>

            <div className='d-flex content-title-view-service bg-white content-title-view-admin space-between'>
                <label className='title-admin-view-service'>{titleLanguage}</label>
                {pathname !== '/admin/edit-tour' ?
                    <>
                        {tour.status == 1 &&
                            <button className='btn btn-active-close-tour btn-danger'
                                onClick={() => handleClickCloseOrActive(table.txtTitleClose, table.txtContentClose, closeTour, true, table.txtClose, table.txtCancel)}>
                                {languageSelected == 'EN' ? 'Close' : 'Đóng'}
                            </button>
                        }
                        {tour.status == 2 &&
                            <div className='d-flex w-25'>
                                <button className='btn btn-active-close-tour btn-success w-50'
                                    onClick={() => handleClickCloseOrActive(table.txtTitleActive, table.txtContentActive, activeTour, false, table.txtActive, table.txtCancel)}>
                                    {languageSelected == 'EN' ? 'Active' : 'Kích hoạt'}
                                </button>
                                <button className='btn btn-active-close-tour btn-primary ml-20-px w-50'
                                    onClick={() => navigate('/admin/edit-tour', { state: { id: id } })}>
                                    {languageSelected == 'EN' ? 'Edit' : 'Sửa'}
                                </button>
                            </div>
                        }
                        {tour.status == 3 &&
                            <button className='btn btn-active-close-tour btn-success'
                                onClick={() => handleClickCloseOrActive(table.txtTitleActive, table.txtContentActive, activeTour, false, table.txtActive, table.txtCancel)}>
                                {languageSelected == 'EN' ? 'Active' : 'Kích hoạt'}
                            </button>
                        }
                    </>
                    :
                    <button className='btn btn-active-close-tour btn-primary'
                        onClick={() => handleClickCloseOrActive(table.txtEdit, table.txtContentEdit, updateTour, false, table.txtSave, table.txtCancel)}>
                        {languageSelected == 'EN' ? 'Save' : 'Lưu'}
                    </button>
                }
            </div>

            <div className='main-content-right-view-tour-under'>
                {listScreen[optionSelected]}
            </div>
        </div>
    )
}

export default memo(ViewTour)