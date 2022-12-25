import { memo, useState, useEffect } from 'react'
import { english, vietnamese } from '../../Languages/MenuCreateTour'
import GeneralInformationTour from '../GeneralInformationTour'
import TourSchedule from '../TourSchedule'
import MoreInformationTour from '../MoreInformationTour'
import InformationCustomerRegisterTourPrivate from '../InformationCustomerRegisterTourPrivate'
import './CreateTour.scss'
import axios from 'axios';
import { API_GET_SERVICE_BY_CONDITION, API_GET_CUSTOMER, API_GET_PARTNER } from "../../API"

function CreateTour({ languageSelected }) {
    const menuCreateTour = (languageSelected === 'EN' ? english : vietnamese)
    const [optionSelected, setOptionSelected] = useState(0)
    const titleLanguage = (languageSelected === 'EN' ? 'Create a new Tour' : 'Thêm Tour mới')

    const [serviceList, setServiceList] = useState([])

    const [userList, setUserList] = useState([])

    const today = new Date();
    const tomorow = new Date(today.setDate(today.getDate() + 1)).toISOString().split('T')[0];

    const [tour, setTour] = useState({
        code: '',
        name: '',
        category: 1,
        startPlace: 'Hà Nội',
        endPlace: 'Hà Nội',
        minAdult: 1,
        maxAdult: 20,
        minChildren: 0,
        maxChildren: 0,
        minToActive: 1,
        maxToActive: 20,
        status: 2,
        type: 1,
        mode: 1,
        startDate: tomorow,
        numberOfDay: 1,
        numberOfNight: 1,
        startTime: '',
        endTime: '',
        introduce: '',
        include: '',
        nonInclude: '',
        generalTerms: '',
        moreDescription: '',
        addressStart: '',
        tag: [],
        adultPrice: 1000,
        childrenPrice: 1000,
        totalPrice: 1000,
        deposit: 1000,
        latitude: 21.02776867562664,
        longitude: 105.83413342865965,
        images: [],
        accountId: 0
    })

    const [tourSchedule, setTourSchedule] = useState([
        {
            name: '',
            content: '',
            toPlace: 'Hà Nội',
            openServices: false,
            show: true,
            serviceTour: [],
            recommendAccommodation: [],
            recommendEntertainment: [],
            recommendRestaurants: [],
            getAccommodation: [],
            getEntertainment: [],
            getRestaurants: [],
            indexAccommodation: [],
            indexEntertainment: [],
            indexRestaurants: []
        }
    ])

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

    const handleClickAddForm = (() => {
        setTourSchedule([...tourSchedule, {
            name: '',
            content: '',
            toPlace: 'Hà Nội',
            serviceTour: [],
            openServices: false,
            show: true,
            recommendAccommodation: [],
            recommendEntertainment: [],
            recommendRestaurants: [],
            getAccommodation: [],
            getEntertainment: [],
            getRestaurants: [],
            indexAccommodation: [],
            indexEntertainment: [],
            indexRestaurants: []
        }])
    })

    useEffect(() => {
        let services = []

        axios.get(API_GET_SERVICE_BY_CONDITION, {
            params: {
                isActive: 1,
                isBlock: 0,
                status: 1
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

    const listScreen = [<GeneralInformationTour languageSelected={languageSelected} tour={tour} setTour={setTour} tourSchedule={tourSchedule} setTourSchedule={setTourSchedule} />,
    <TourSchedule languageSelected={languageSelected} tour={tour} tourSchedule={tourSchedule} setTourSchedule={setTourSchedule} serviceList={serviceList} />,
    <MoreInformationTour languageSelected={languageSelected} tour={tour} setTour={setTour} tourSchedule={tourSchedule} />,
    <InformationCustomerRegisterTourPrivate languageSelected={languageSelected} customerRegisted={customerRegisted} setCustomerRegisted={setCustomerRegisted}
        tour={tour} setTour={setTour} tourSchedule={tourSchedule} userList={userList} />]

    return (
        <div className='main-content-view-service-admin right-content-create-tour'>
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

            <div className='d-flex content-title-view-service bg-white content-title-view-admin'>
                <label className='title-admin-view-service'>{titleLanguage}</label>
            </div>

            <div className='main-content-right-view-tour-under'>
                {listScreen[optionSelected]}
            </div>
            {optionSelected === 1 && tour.mode === 1 && tourSchedule.length < tour.numberOfDay &&
                <div className='container form-container p-0' onClick={handleClickAddForm}><div className='btn-add btn btn-light mt-20'>+</div></div>
            }
        </div>
    )
}

export default memo(CreateTour)