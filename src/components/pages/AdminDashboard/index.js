import { memo, useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { english, vietnamese } from '../../Languages/AdminDashboard'
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area, PieChart, Pie, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import './AdminDashboard.scss'
import axios from 'axios';
import { API_GET_ALL_TOUR, API_GET_CUSTOMER, API_GET_SERVICE_BY_CONDITION } from '../../API';
import { english as englishTableCustomer, vietnamese as vietnameseTableCustomer } from '../../Languages/TableListCustomer'
import { BiLineChart, BiPieChartAlt2, BiBarChartAlt2 } from 'react-icons/bi'

function AdminDashboard({ languageSelected }) {
    const languageList = languageSelected === 'EN' ? english : vietnamese
    const table = languageSelected === 'EN' ? englishTableCustomer : vietnameseTableCustomer

    const navigate = useNavigate()

    const [countBookingThisMonth, setCountBookingThisMonth] = useState(2)
    const [countTour, setCountTour] = useState(20)
    const [countBookingLastMonth, setCountBookingLastMonth] = useState(15)
    const [countBookingTwoMonthAgo, setCountBookingTwoMonthAgo] = useState(60)
    const rate = useRef((countBookingLastMonth - countBookingTwoMonthAgo) / (countBookingLastMonth + countBookingTwoMonthAgo) * 100)

    const [typeChart, setTypeChart] = useState(0)

    const dataBookingDate = [
        {
            time: '06/2022',
            booking: 1
        },
        {
            time: '07/2022',
            booking: 70
        },
        {
            time: '09/2022',
            booking: 56
        },
        {
            time: '10/2022',
            booking: 60
        },
        {
            time: '11/2022',
            booking: 15
        },
        {
            time: '12/2022',
            booking: 2
        }
    ];

    const dataStartDate = [
        {
            time: '06/2022',
            booking: 11
        },
        {
            time: '07/2022',
            booking: 52
        },
        {
            time: '09/2022',
            booking: 15
        },
        {
            time: '10/2022',
            booking: 60
        },
        {
            time: '11/2022',
            booking: 15
        },
        {
            time: '12/2022',
            booking: 2
        }
    ];

    const [optionChart, setOptionChart] = useState(true)
    const [showNoteRate, setShowNoteRate] = useState(false)
    const [services, setServices] = useState([])
    const [customers, setCustomers] = useState([])

    const [countAccommodation, setCountAccommodation] = useState(0)
    const [countEntertainment, setCountEntertainment] = useState(0)
    const [countRestaurant, setCountRestaurant] = useState(0)

    const getDataCustomer = () => {
        axios.get(API_GET_CUSTOMER, {
            params: {
                page: 1,
                size: 4,
                email: ''
            }
        }).then((res) => {
            let listCustomerData = []
            for (let i = 0; i < res.data.data.content.length; i++) {
                const listCus = {
                    id: res.data.data.content[i].accountId,
                    email: res.data.data.content[i].email,
                    firstName: res.data.data.content[i].firstName,
                    lastName: res.data.data.content[i].lastName,
                    gender: res.data.data.content[i].gender,
                    status: res.data.data.content[i].isBlock,
                    birthDate: res.data.data.content[i].birthDate,
                    phone: res.data.data.content[i].phone,
                    city: res.data.data.content[i].city,
                    address: res.data.data.content[i].address
                }
                listCustomerData.push(listCus)
            }
            setCustomers(listCustomerData)
            getDataSuppliers(1)
        }).catch((e) => {
            getDataSuppliers(1)
        })

        axios.get(API_GET_ALL_TOUR, {
            params: {
                page: 1,
                size: 99999
            }
        }).then((res) => {
            setCountTour(res.data.data.countTour)
        }).catch(() => setCountTour(0))
    }

    const getDataSuppliers = (id) => {
        axios.get(API_GET_SERVICE_BY_CONDITION, {
            params: {
                serviceCategoryId: id,
                page: 1,
                size: 99999,
                isActive: 1,
                isBlocked: 0,
                serviceIdList: ''
            }
        }).then((count) => {
            if (id === 1) {
                setCountAccommodation(count.data.data.content.length)
                getDataSuppliers(2)
            } else if (id === 2) {
                setCountEntertainment(count.data.data.content.length)
                getDataSuppliers(3)
            } else {
                setCountRestaurant(count.data.data.content.length)
            }
        }).catch(() => {
            if (id === 1) {
                setCountAccommodation(0)
                getDataSuppliers(2)
            } else if (id === 2) {
                setCountEntertainment(0)
                getDataSuppliers(3)
            } else {
                setCountRestaurant(0)
            }
        })
    }

    useEffect(() => {
        axios.get(API_GET_SERVICE_BY_CONDITION, {
            params: {
                isActive: 0,
                isBlock: 0,
                page: 1,
                size: 5,
                serviceIdList: ''
            }
        }).then((response) => {
            const data = response.data.data.content
            let servicesRaw = []
            data.map((service) => {
                const serviceItem = {
                    serviceId: service.serviceId,
                    serviceName: service.serviceName,
                    serviceCategory: service.serviceCategory,
                    serviceAddress: service.address,
                    serviceCity: service.city,
                    partnerEmail: service.partnerEmail,
                    isActive: service.isActive,
                    isBlock: service.isBlock
                }
                servicesRaw.push(serviceItem)
            })
            setServices(servicesRaw)
            getDataCustomer()
        }).catch(() => { getDataCustomer() })
    }, [])

    let servicesPendingShow = [...services]

    if ([...services].length > 5) {
        for (let i = 0; i < [...services].length; i++) {
            servicesPendingShow.push([...services][i])
        }
    }

    return (
        <div>
            <div className='d-flex space-between'>
                <div className='tag-dashboard bd-blue-2'>
                    <div className='text-center text-title-dashboard'>{languageList.txtBooking}</div>
                    <div className='text-center data-number-dashboard'>{countBookingThisMonth}</div>
                </div>
                <div className='tag-dashboard bd-red-2'>
                    <div className='text-center text-title-dashboard'>{languageList.txtTour}</div>
                    <div className='text-center data-number-dashboard'>{countTour}</div>
                </div>
                <div className='tag-dashboard bd-yellow-2'>
                    <div className='text-center text-title-dashboard'>{languageList.txtBookingLastMonth}</div>
                    <div className='text-center data-number-dashboard'>{countBookingLastMonth}</div>
                </div>
                <div className='tag-dashboard bd-green-2' onMouseEnter={() => setShowNoteRate(true)}
                    onMouseLeave={() => setShowNoteRate(false)}>
                    <div className='text-center text-title-dashboard'>{languageList.txtRate}%</div>
                    <div className='text-center data-number-dashboard'>
                        {rate.current.toFixed() > 0 ? <label className='color-green-rate-up'>+</label>
                            : <label className='color-red-rate-down'>-</label>}
                        {rate.current.toFixed() > 0 ? rate.current.toFixed() : rate.current.toFixed() * -1}
                    </div>
                </div>
            </div>
            {showNoteRate && <label className='note-rate bg-white p-20 br-10'>{languageList.txtNoteRate}</label>}
            <div className='d-flex space-between btn-option-chart'>
                <div className='w-75 d-flex space-between'>
                    <div className='d-flex center-vertical'>
                        <div className={`br-10 btn-change-type-chart ${typeChart === 0 && 'btn-change-type-chart-selected'}`}
                            onClick={() => setTypeChart(0)}>
                            <BiLineChart />
                        </div>
                        <div className={`br-10 btn-change-type-chart ${typeChart === 1 && 'btn-change-type-chart-selected'}`}
                            onClick={() => setTypeChart(1)}>
                            <BiBarChartAlt2 />
                        </div>
                        {/* <input type='month' className='w-50 font-14 ml-20 br-10 pt-10 pb-10 pl-20 select-range-month' />
                        <label className='ml-20'>-</label>
                        <input type='month' className='w-50 font-14 ml-20 br-10 pt-10 pb-10 pl-20 select-range-month' /> */}
                    </div>
                    <div className='d-flex'>
                        <div className={`br-10 btn-change-data-chart ${optionChart && 'btn-change-data-chart-selected'}`}
                            onClick={() => setOptionChart(true)}>
                            {languageList.txtBookingDate}
                        </div>
                        <div className={`br-10 btn-change-data-chart ${!optionChart && 'btn-change-data-chart-selected'}`}
                            onClick={() => setOptionChart(false)}>
                            {languageList.txtStartDate}
                        </div>
                    </div>
                </div>
                <div className='w-25'></div>
            </div>
            <div className='d-flex mt-100'>
                <div id='parent-chart' className='w-75 bg-white p-20 br-10 box-shadow-common mr-20 chart-dashboard'>
                    {typeChart === 0 &&
                        <ResponsiveContainer width="100%" height={400}>
                            <AreaChart id='chart' data={optionChart ? dataBookingDate : dataStartDate}
                                width='100%'
                                height={400}
                                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#e9967a" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#e9967a" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="time" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip />
                                <Area type="monotone" dataKey="booking" stroke="#e9967a" fillOpacity={1} fill="url(#colorUv)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    }
                    {typeChart === 1 &&
                        <ResponsiveContainer width="100%" height={400}>
                            <BarChart
                                width='100%'
                                height={300}
                                data={optionChart ? dataBookingDate : dataStartDate}
                            >
                                <defs>
                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="30%" stopColor="#e9967a" stopOpacity={1} />
                                        <stop offset="100%" stopColor="#e9967a" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="time" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="booking" fill="url(#colorUv)" fillOpacity={1} />
                            </BarChart>
                        </ResponsiveContainer>
                    }
                </div>
                <div className='w-25 bg-white p-20 br-10 box-shadow-common service-list-pending-short'>
                    <div>
                        <div className='text-center text-bold font-18'>{languageList.txtServiceToBeApproved}</div>
                        <div className='text-center font-14 color-gray'>{languageList.txtNumberOfServicesToBeApproved(services.length)}</div>
                        <div className='mt-10'>
                            {services.map((sv) => (
                                <div className='bd-bottom p-5-import'>
                                    <div className='font-16'>{sv.serviceName}</div>
                                    <div className='color-gray font-14'>
                                        {sv.serviceCategory === 1 && languageList.txtAccommodations}
                                        {sv.serviceCategory === 2 && languageList.txtEntertainments}
                                        {sv.serviceCategory === 3 && languageList.txtRestaurants}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div onClick={() => navigate('/admin/service-confirm')} className='text-center btn-view-all-service-pending'>{languageList.txtViewAll}</div>
                </div>
            </div>
            <div className='d-flex mt-20'>
                <div className='w-75 mr-20-import'>
                    <div className='d-flex space-between bg-white p-20'>
                        <label className='text-bold font-18'>{languageList.txtCustomers}</label>
                        <label onClick={() => navigate('/admin/customers')} className='text-bold link-view-all-customer'>{`${languageList.txtViewAll} >`}</label>
                    </div>
                    <table className='table table-hover table-list-service table-striped'>
                        <thead>
                            <tr>
                                <td>#</td>
                                <td>{table.txtLoginEmail}</td>
                                <td>{table.txtFirstName}</td>
                                <td>{table.txtLastName}</td>
                                <td>{table.txtGender}</td>
                                <td>{table.txtStatus}</td>
                            </tr>
                        </thead>
                        <tbody>
                            {[...customers].map((item, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>
                                        {item.gender == 0 && table.txtMale ||
                                            item.gender == 1 && table.txtFemale ||
                                            item.gender == 2 && table.txtOther}
                                    </td>
                                    <td>{item.status ? <label className='status status-close'>{table.txtBlocked}</label> :
                                        <label className='status status-active'>{table.txtActive}</label>}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='w-25'>
                    <div className='bg-white br-10 box-shadow-common'>
                        <div className='text-center text-bold font-18'>{languageList.txtSuppliers}</div>
                        <div className='d-flex space-between bg-gray p-20'>
                            <div>{languageList.txtSuppliers}</div>
                            <div>{languageList.txtQTY}</div>
                        </div>
                        <div className='d-flex space-between p-20'>
                            <div>{languageList.txtAccommodations}</div>
                            <div>{countAccommodation}</div>
                        </div>
                        <div className='d-flex space-between p-20'>
                            <div>{languageList.txtEntertainments}</div>
                            <div>{countEntertainment}</div>
                        </div>
                        <div className='d-flex space-between p-20'>
                            <div>{languageList.txtRestaurants}</div>
                            <div>{countRestaurant}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(AdminDashboard)