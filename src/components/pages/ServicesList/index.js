import { memo, useState, useEffect, useLayoutEffect } from 'react'
import { english, vietnamese } from '../../Languages/ServicesList'
import BackgroundHome from '../../images/bgHome.jpg'
import { FaRegPaperPlane } from 'react-icons/fa'
import './ServicesList.scss'
import axios from 'axios'
import { API_GET_SERVICE_BY_CONDITION } from '../../API'
import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from "../../../firebase/Config";
import { useNavigate } from 'react-router-dom'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

function ServicesList({ languageSelected }) {
    const languageDisplay = languageSelected === 'EN' ? english : vietnamese

    const navigate = useNavigate()

    const [optionType, setOptionType] = useState(1)
    const [listService, setListService] = useState([])
    const [searchName, setSearchName] = useState('')
    const [changeName, setChangeName] = useState(false)

    const [numberPage, setNumberPage] = useState(1)
    const [numberOfPages, setNumberOfPages] = useState([])

    useLayoutEffect(() => {
        setNumberPage(1)
        setNumberOfPages([])
    }, [optionType])

    useEffect(() => {
        axios.get(`${API_GET_SERVICE_BY_CONDITION}?serviceCategoryId=${optionType}&isActive=1&isBlock=0`)
            .then((res) => {
                let listServiceRaw = res.data.data.content
                let leng = 0
                const count = listServiceRaw.length
                listServiceRaw.forEach((service, index) => {
                    const refAccommodation = ref(storage, `/service/accomodation/${service.serviceId}/information/receptionHallPhoto/image-0`)
                    const refEntertainment = ref(storage, `/service/entertainment/${service.serviceId}/information/receptionHallPhoto/image-0`)
                    const refRestaurant = ref(storage, `/service/restaurant/${service.serviceId}/information/receptionHallPhoto/image-0`)
                    let refData
                    if (optionType === 1) {
                        refData = refAccommodation
                    } else if (optionType === 2) {
                        refData = refEntertainment
                    } else {
                        refData = refRestaurant
                    }
                    getDownloadURL(refData)
                        .then((url) => {
                            axios({
                                url: url,
                                method: 'GET',
                                responseType: 'blob',
                            }).then(blob => {
                                listServiceRaw[index].image = URL.createObjectURL(blob.data)
                                leng++
                                if (leng == count) {
                                    const totalPages = res.data.data.totalPages
                                    let numberOfPagesRaw = []
                                    for (let i = 0; i < totalPages; i++) {
                                        numberOfPagesRaw.push(i + 1)
                                    }
                                    setNumberOfPages(numberOfPagesRaw)
                                    setListService(listServiceRaw)
                                }
                            })
                        })
                })
            }).catch(() => {
                setListService([])
            })
    }, [optionType, numberPage, changeName])

    return (
        <div className='container home-main tour-list-main'>
            <img src={BackgroundHome} className='bg-image' />
            <div className='border-search container search'>
                <FaRegPaperPlane className='icon-search' />
                <input placeholder={`${languageSelected === 'EN' ? 'Name' : 'Tên'}`} className='input-search' value={searchName} onChange={(e) => setSearchName(e.target.value)} />
                <button className='btn-search' onClick={() => setChangeName(pre => !pre)}>{languageSelected === 'EN' ? 'Search' : 'Tìm'}</button>
            </div>
            <div className='container'>
                <div className='d-flex mt-50-import'>
                    <div className='option-tour-list w-35 mt-10'>
                        <div className='bg-white br-10 p-20 box-shadow-common w-100'>
                            <div className='text-bold font-18 p-20'>{languageDisplay.txtCategory}</div>
                            <div className='type-service-option'
                                onClick={() => setOptionType(1)}>
                                <div className={`radio-fake ${optionType === 1 && 'radio-fake-selected'}`}></div>{languageDisplay.txtAccommodations}
                            </div>
                            <div className='type-service-option'
                                onClick={() => setOptionType(2)}>
                                <div className={`radio-fake ${optionType === 2 && 'radio-fake-selected'}`}></div>{languageDisplay.txtEntertainment}
                            </div>
                            <div className='type-service-option'
                                onClick={() => setOptionType(3)}>
                                <div className={`radio-fake ${optionType === 3 && 'radio-fake-selected'}`}></div>{languageDisplay.txtRestaurants}
                            </div>
                        </div>
                    </div>
                    <div className='container'>
                        <div className='grid-tour'>
                            {listService.map((service, index) => (
                                <label key={index} className='tour-item pb-0'
                                    onClick={() => navigate('/service-detail', { state: { service: service } })}>
                                    <img src={service.image} className='image-main-tour' />
                                    <div className='p-10'>
                                        <div className='font-18 text-bold'>{service.serviceName}</div>
                                        <div className='color-gray font-14'>{`${service.address}, ${service.city}`}</div>
                                    </div>
                                </label>
                            ))}
                        </div>
                        <div className='d-flex paging float-end mb-20'>
                            {numberPage > 1 && <label onClick={() => setNumberPage(pre => pre - 1)} className='btn-paging unseleted'>
                                <AiOutlineLeft />
                            </label>}
                            {numberOfPages.map((item) => (
                                <label className={`btn-paging ${numberPage === item ? 'selected-paging' : 'unseleted'}`} onClick={() => setNumberPage(item)}>{item}</label>
                            ))}
                            {numberPage < numberOfPages.length && numberOfPages.length > 1 && <label onClick={() => setNumberPage(pre => pre + 1)} className='btn-paging unseleted'>
                                <AiOutlineRight />
                            </label>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ServicesList)