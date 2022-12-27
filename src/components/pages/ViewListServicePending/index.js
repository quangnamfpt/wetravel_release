import { memo, useState, useEffect } from 'react'
import axios from 'axios'
import { API_GET_SERVICE_BY_CONDITION } from "../../API"
import { FaSort, FaSortDown, FaSortUp } from 'react-icons/fa'
import { AiOutlineSearch, AiOutlineLeft, AiOutlineRight, AiOutlineEye } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { english, englishCategoryEnglish, vietnamese, vietnameseCategoryEnglish } from '../../Languages/ViewListServicePending'
import './ViewListServicePending.scss'

function ViewListServicePending({ languageSelected }) {
    const languageList = languageSelected === 'EN' ? english : vietnamese
    const categoryList = languageSelected === 'EN' ? englishCategoryEnglish : vietnameseCategoryEnglish

    const [services, setServices] = useState([])
    const navigate = useNavigate()

    const [searchName, setSearchName] = useState('')
    const [numberPage, setNumberPage] = useState(1)
    const [numberOfPages, setNumberOfPages] = useState([])
    const [sortByName, setSortByName] = useState(0)

    useEffect(() => {
        axios.get(API_GET_SERVICE_BY_CONDITION, {
            params: {
                isActive: 0,
                page: numberPage,
                size: 10,
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
                if (servicesRaw.length === data.length) {
                    let listPages = []
                    for (let i = 0; i < response.data.data.totalPages; i++) {
                        listPages.push(i + 1)
                    }
                    setNumberOfPages(listPages)
                    setServices(servicesRaw)
                }
            })
        })
    }, [numberPage])

    const listServiceShow = []

    for (let i = 0; i < services.length; i++) {
        if ((searchName === '' ||
            (services[i].serviceName.toLowerCase().includes(searchName.toLowerCase()) &&
                services[i].serviceName.toUpperCase().includes(searchName.toUpperCase()))) &&
            i + 1 <= numberPage * 10 && i + 1 >= (numberPage * 10 - 9)) {
            listServiceShow.push(services[i])
        }
    }

    const handleClickNameLabel = () => {
        if (sortByName === 0 || sortByName === 1) {
            setSortByName(pre => pre + 1)
        }
        else {
            setSortByName(0)
        }
    }

    listServiceShow.sort((a, b) => {
        if (sortByName !== 0) {
            const nameA = a.serviceName.toUpperCase();
            const nameB = b.serviceName.toUpperCase();
            if (sortByName === 1 && nameA < nameB) {
                return -1;
            }
            else if (sortByName === 2 && nameA > nameB) {
                return -1;
            }

            if (sortByName === 1 && nameA > nameB) {
                return 1;
            }
            else if (sortByName === 2 && nameA < nameB) {
                return 1;
            }
        }
        return 0;
    });

    return (
        <>
            <div className='d-flex tool-list-service-main'>
                <div className='d-flex list-service-tool'>
                    <label htmlFor='search-name' className='search-input-text'>
                        <AiOutlineSearch className='icon-inner icon-search-list-service' />
                        <input placeholder='Name' onChange={(e) => setSearchName(e.target.value)} id='search-name' type='text' className='input-inline input-list-service search-name-service input-inline-list-service' />
                    </label>
                </div>
            </div>
            <div className='space-table'>
                <table className='table table-hover table-list-service mt-30 table-striped'>
                    <thead>
                        <tr>
                            <td>#</td>
                            <td onClick={handleClickNameLabel}>{languageList.txtName}
                                {(sortByName === 0 && <FaSort className='icon-sort' />) ||
                                    (sortByName === 1 && <FaSortDown className='icon-sort' />) ||
                                    (sortByName === 2 && <FaSortUp className='icon-sort' />)}
                            </td>
                            <td>{languageList.txtService}</td>
                            <td>{languageList.txtAddress}</td>
                            <td>{languageList.txtEmailPartner}</td>
                            <td>{languageSelected === 'EN' ? 'Status' : 'Trạng thái'}</td>
                            <td>{languageList.txtAction}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {listServiceShow.map((service, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{service.serviceName}</td>
                                <td>
                                    {categoryList[service.serviceCategory - 1]}
                                </td>
                                <td>{`${service.serviceAddress}, ${service.serviceCity}`}</td>
                                <td>{`${service.partnerEmail}`}</td>
                                {service.isBlock ?
                                    <td><label className='status status-close'>{languageList.txtRefused}</label></td> :
                                    <td><label className='status status-pause'>{languageList.txtWaiting}</label></td>
                                }
                                <td>
                                    <Menu menuButton={<MenuButton className='btn-action'><BsThreeDotsVertical /></MenuButton>} transition>
                                        <MenuItem onClick={() => navigate('/admin/view-service-confirm', { state: { serviceId: service.serviceId } })}>
                                            <AiOutlineEye />{languageList.txtView}
                                        </MenuItem>
                                    </Menu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className='d-flex float-end paging'>
                {numberPage > 1 && <label onClick={() => setNumberPage(pre => pre - 1)} className='btn-paging unseleted'>
                    <AiOutlineLeft />
                </label>}
                {numberOfPages.map((item) => (
                    <label className={`btn-paging ${numberPage === item ? 'selected-paging' : 'unseleted'}`} onClick={() => setNumberPage(item)}>{item}</label>
                ))}
                {numberPage < numberOfPages.length && <label onClick={() => setNumberPage(pre => pre + 1)} className='btn-paging unseleted'>
                    <AiOutlineRight />
                </label>}
            </div>
        </>
    )
}

export default memo(ViewListServicePending)