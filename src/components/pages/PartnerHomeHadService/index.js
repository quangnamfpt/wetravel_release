import { memo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './PartnerHomeHadService.scss'
import { AiOutlineSearch, AiOutlinePlus, AiFillCaretLeft, AiFillCaretRight, AiOutlineLeft, AiOutlineRight, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { BsThreeDotsVertical, BsFileEarmarkRuled } from 'react-icons/bs'
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'
import { GoDashboard } from 'react-icons/go'
import { GrServices } from 'react-icons/gr'
import { HiOutlineEye } from 'react-icons/hi'
import Select from 'react-select';
import { useNavigate } from 'react-router-dom'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { Sidebar, Menu as MenuSide, MenuItem as MenuItemSide, useProSidebar } from 'react-pro-sidebar';
import axios from 'axios'
import { toast } from 'react-toastify'
import { english, vietnamese, englishStatus, vietnameseStatus, englishTypeAccomadation, vietnameseTypeAccomadation, englishTypeEntertainment, vietnameseTypeEntertainment, englishTypeRestaurant, vietnameseTypeRestaurant } from '../../Languages/PartnerHome'

function PartnerHomeHadService({ services, languageSelected }) {
    const navigate = useNavigate()

    useEffect(() => {
        window.scrollTo(0, 0)
    })

    const [searchName, setSearchName] = useState('')
    const [searchStatus, setSearchStatus] = useState(0)
    const [searchAccomodation, setSearchAccomodation] = useState(0)
    const [numberPage, setNumberPage] = useState(1)

    const [sortByName, setSortByName] = useState(0)
    const [sortByType, setSortByType] = useState(0)
    const [sortByStatus, setSortByStatus] = useState(0)

    const { collapseSidebar } = useProSidebar();
    const [isOpenSidebar, setOpenSidebar] = useState(true)

    const handleClickOpenCloseSidebar = () => {
        setOpenSidebar(!isOpenSidebar);
        collapseSidebar();
    }

    const languageList = languageSelected === 'EN' ? english : vietnamese

    const options = languageSelected === 'EN' ? englishStatus : vietnameseStatus

    const optionsAccomodation = languageSelected === 'EN' ? englishTypeAccomadation : vietnameseTypeAccomadation
    const optionsEntertainment = languageSelected === 'EN' ? englishTypeEntertainment : vietnameseTypeEntertainment
    const optionsRestaurant = languageSelected === 'EN' ? englishTypeRestaurant : vietnameseTypeRestaurant

    const category = sessionStorage.getItem('index-service-selected')
    const optionType = (category == 1 && optionsAccomodation) || (category == 2 && optionsEntertainment) || (category == 3 && optionsRestaurant)

    const listServiceShow = []

    for (let i = 0; i < services.length; i++) {
        if ((searchName === '' ||
            (services[i].serviceName.toLowerCase().includes(searchName.toLowerCase()) &&
                services[i].serviceName.toUpperCase().includes(searchName.toUpperCase()))) &&
            (searchStatus === 0 || (searchStatus === 4 && services[i].isBlock) || ((searchStatus === 5 && !services[i].isActive)
                || (services[i].status === searchStatus && services[i].isActive)) && !services[i].isBlock)
        ) {
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
        setSortByType(0)
        setSortByStatus(0)
    }

    const handleClickTypeLabel = () => {
        if (sortByType === 0 || sortByType === 1) {
            setSortByType(pre => pre + 1)
        }
        else {
            setSortByType(0)
        }
        setSortByName(0)
        setSortByStatus(0)
    }

    const handleClickStatusLabel = () => {
        if (sortByStatus === 0 || sortByStatus === 1) {
            setSortByStatus(pre => pre + 1)
        }
        else {
            setSortByStatus(0)
        }
        setSortByName(0)
        setSortByType(0)
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
        else if (sortByType !== 0) {
            const typeA = a.serviceCategory;
            const typeB = b.serviceCategory;
            if (sortByType === 1) {
                return typeA - typeB;
            }
            else if (sortByType === 2) {
                return typeB - typeA;
            }
        }
        else if (sortByStatus !== 0) {
            const statusA = a.status;
            const statusB = b.status;
            if (sortByStatus === 1) {
                return statusA - statusB;
            }
            else if (sortByStatus === 2) {
                return statusB - statusA;
            }
        }
        return 0;
    });

    let numberOfPage = []

    for (let i = 0; i < listServiceShow.length / 10; i++) {
        numberOfPage.push(i + 1)
    }

    const handleClickDelete = (serviceId) => {
        axios.delete(`http://localhost:8081/wetravel/delete/service/${serviceId}`).then((res) => {
            toast.info('Deleted')
            window.location.reload(false)
        })
    }

    return (
        <div className='home-partner-main d-flex'>
            <Sidebar className='menu-sidebar'>
                <MenuSide>
                    <MenuItemSide onClick={handleClickOpenCloseSidebar} icon={isOpenSidebar ? <AiFillCaretLeft /> : <AiFillCaretRight />} />
                    <MenuItemSide icon={<GrServices />}> {languageList.txtService} </MenuItemSide>
                    <MenuItemSide icon={<BsFileEarmarkRuled />}> {languageList.txtTermsOfUse} </MenuItemSide>
                </MenuSide>
            </Sidebar>

            <div className='container list-service-main' id='list-service-main'>
                <div className='d-flex tool-list-service-main'>
                    <div className='d-flex list-service-tool'>
                        <label htmlFor='search-name' className='search-input-text'>
                            <AiOutlineSearch className='icon-inner icon-search-list-service' />
                            <input placeholder={languageList.txtName} onChange={(e) => setSearchName(e.target.value)} id='search-name' type='text' className='input-inline input-list-service search-name-service input-inline-list-service' />
                        </label>
                        <Select onChange={(e) => setSearchStatus(e.value)}
                            placeholder={languageList.txtStatus}
                            isSearchable={false}
                            className='select-search-service select-status'
                            options={options} />
                        <Select onChange={(e) => setSearchAccomodation(e.value)}
                            placeholder={languageList.txtType}
                            isSearchable={false}
                            className='select-search-service select-type'
                            options={optionType} />
                    </div>
                    <Link to='/partner/select-detail-service' className='btn btn-primary btn-add-new-service'><AiOutlinePlus /> {languageList.txtAddNew}</Link>
                </div>
                <div className='space-table'>
                    <table className='table table-hover table-list-service mt-30 table-striped'>
                        <thead>
                            <tr>
                                <td className='stt-column'>#</td>
                                <td className='name-column' onClick={handleClickNameLabel}>{languageList.txtName}
                                    {(sortByName === 0 && <FaSort className='icon-sort' />) ||
                                        (sortByName === 1 && <FaSortDown className='icon-sort' />) ||
                                        (sortByName === 2 && <FaSortUp className='icon-sort' />)}
                                </td>
                                <td className='type-column' onClick={handleClickTypeLabel}>{languageList.txtType}
                                    {(sortByType === 0 && <FaSort className='icon-sort' />) ||
                                        (sortByType === 1 && <FaSortDown className='icon-sort' />) ||
                                        (sortByType === 2 && <FaSortUp className='icon-sort' />)}
                                </td>
                                <td className='address-column'>{languageList.txtAddress}</td>
                                <td className='status-column' onClick={handleClickStatusLabel}>{languageList.txtStatus}
                                    {(sortByStatus === 0 && <FaSort className='icon-sort' />) ||
                                        (sortByStatus === 1 && <FaSortDown className='icon-sort' />) ||
                                        (sortByStatus === 2 && <FaSortUp className='icon-sort' />)}
                                </td>
                                <td className='action-column'>{languageList.txtAction}</td>
                            </tr>
                        </thead>
                        <tbody>
                            {listServiceShow.map((service, index) => (index + 1 <= numberPage * 10 && index + 1 >= (numberPage * 10 - 9) &&
                                (searchAccomodation === 0 || service.serviceCategory === searchAccomodation) &&
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>{service.serviceName}</td>
                                    <td>
                                        {optionType[service.serviceCategory].label}
                                    </td>
                                    <td>{service.address}</td>
                                    <td>
                                        {(service.isBlock && <label className='status status-close'>{options[4].label}</label>) ||
                                            (!service.isActive && <label className='status status-pause'>{options[5].label}</label>) ||
                                            (service.status === 1 && <label className='status status-active'>{options[1].label}</label>) ||
                                            (service.status === 2 && <label className='status status-close'>{options[2].label}</label>) ||
                                            (service.status === 3 && <label className='status status-pause'>{options[3].label}</label>)}
                                    </td>
                                    <td>
                                        <Menu menuButton={<MenuButton className='btn-action'><BsThreeDotsVertical /></MenuButton>} transition>
                                            <MenuItem onClick={() => navigate(`/partner/edit-service?serviceId=${service.serviceId}`)}>
                                                <AiOutlineEdit /> {languageList.txtEdit}
                                            </MenuItem>
                                            {service.isActive &&
                                                <MenuItem onClick={() => handleClickDelete(service.serviceId)}>
                                                    <AiOutlineDelete /> {languageList.txtDelete}
                                                </MenuItem>
                                            }
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
                    {numberOfPage.map((item) => (
                        <label className={`btn-paging ${numberPage === item ? 'selected-paging' : 'unseleted'}`} onClick={() => setNumberPage(item)}>{item}</label>
                    ))}
                    {numberPage === 1 && numberOfPage.length > 1 && <label onClick={() => setNumberPage(pre => pre + 1)} className='btn-paging unseleted'>
                        <AiOutlineRight />
                    </label>}
                </div>
            </div>
        </div>
    )
}

export default memo(PartnerHomeHadService)