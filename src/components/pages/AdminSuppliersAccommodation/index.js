import { memo, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineLeft, AiOutlineRight, AiOutlineSearch, AiOutlineDelete, AiOutlineCheckCircle } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { HiOutlineEye } from 'react-icons/hi'
import LoadingDialog from '../../Layout/LoadingDialog'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { API_GET_SERVICE_BY_CONDITION, API_DELETE_SERVICE, API_UNBLOCK_SERVICE } from '../../API'
import axios from 'axios'
import { english, vietnamese } from '../../Languages/AdminSuppliers'
import './AdminSuppliers.scss'
import { toast } from 'react-toastify'
import { englishTypeService, vietnameseTypeService } from '../../Languages/ServiceType'
import ConfirmDialog from '../../Layout/ConfirmDialog'

function AdminSuppliersAccommodation({ languageSelected }) {
    const pathName = window.location.pathname

    const [showConfirm, setShowConfirm] = useState(false)
    const [titleConfirm, setTitleConfirm] = useState('asd')
    const [contentConfirm, setContentConfirm] = useState('asd')
    const callbackConfirm = useRef(() => { })
    const [isRed, setIsRed] = useState(true)
    const [textOk, setTextOk] = useState('Ok')
    const [textCancel, setTextCancel] = useState('Cancel')

    const [services, setServices] = useState([])
    const [getDataComplete, setGetDataComplete] = useState(false)
    const navigate = useNavigate()

    const languagesList = languageSelected === 'EN' ? english : vietnamese
    const typeService = languageSelected === 'EN' ? englishTypeService : vietnameseTypeService

    const maxItemInPage = 10
    const [searchName, setSearchName] = useState('')
    const [numberPage, setNumberPage] = useState(1)
    const [numberOfPages, setNumberOfPages] = useState([])

    useEffect(() => {
        console.log('choc api')
        axios.get(API_GET_SERVICE_BY_CONDITION, {
            params: {
                serviceCategoryId: 1,
                page: numberPage,
                size: 10,
                serviceName: searchName,
                isActive: 1,
                serviceIdList: ''
            }
        }).then((response) => {
            const data = response.data.data.content
            let servicesRaw = []
            data.map((service) => {
                const serviceItem = {
                    serviceId: service.serviceId,
                    serviceName: service.serviceName,
                    serviceCategory: parseInt(service.serviceCategory),
                    phone: service.phone,
                    address: service.address,
                    city: service.city,
                    partnerEmail: service.partnerEmail,
                    status: service.status,
                    typeOfServiceCategory: service.typeOfServiceCategory,
                    isActive: service.isActive,
                    isBlock: service.isBlock
                }
                servicesRaw.push(serviceItem)
            })
            const totalPages = response.data.data.totalPages
            let arrayPage = []
            for (let i = 0; i < totalPages; i++) {
                arrayPage.push(i + 1)
            }
            setNumberOfPages(arrayPage)
            setServices([...servicesRaw])
            setGetDataComplete(true)
        }).catch(() => {
            setServices([])
            setGetDataComplete(true)
        })
    }, [searchName, numberPage])

    if (!getDataComplete) {
        return (
            <LoadingDialog />
        )
    }

    const handleClickShowConfig = (title, content, callback, isRed, textOk, textCancel) => {
        setShowConfirm(true)
        setTitleConfirm(title)
        setContentConfirm(content)
        callbackConfirm.current = callback
        setIsRed(isRed)
        setTextOk(textOk)
        setTextCancel(textCancel)
    }

    const handleClickDelete = (id, index) => {
        setGetDataComplete(false)
        axios.delete(API_DELETE_SERVICE + id).then(() => {
            setGetDataComplete(true)
            toast.success(languageSelected === 'EN' ? 'Blocked' : 'Đã khoá')

            let servicesRaw = [...services]
            servicesRaw[index].isBlock = true
            setServices(servicesRaw)
            setShowConfirm(false)
        })
    }

    const handleClickActive = (id, index) => {
        setGetDataComplete(false)
        axios.put(API_UNBLOCK_SERVICE + id).then(() => {
            setGetDataComplete(true)
            toast.success(languageSelected === 'EN' ? 'Actived' : 'Đã kích hoạt')

            let servicesRaw = [...services]
            servicesRaw[index].isBlock = false
            setServices(servicesRaw)
            setShowConfirm(false)
        })
    }

    return (
        <>
            {showConfirm &&
                <ConfirmDialog textOk={textOk} textCancel={textCancel} title={titleConfirm} content={contentConfirm} callback={callbackConfirm.current} isRed={isRed} setShowDialog={setShowConfirm} />
            }
            <div className='d-flex tool-list-service-main'>
                <div className='d-flex list-service-tool'>
                    <label htmlFor='search-name' className='search-input-text'>
                        <AiOutlineSearch className='icon-inner icon-search-list-service' />
                        <input onChange={(e) => setSearchName(e.target.value)}
                            placeholder='Name' id='search-name' type='text' className='input-inline input-list-service search-name-service input-inline-list-service' />
                    </label>
                </div>
            </div>
            <div className='space-table'>
                <table className='table table-hover table-list-service mt-30 table-striped'>
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>{languagesList.txtName}</td>
                            <td>{languagesList.txtType}</td>
                            <td>{languagesList.txtAddress}</td>
                            <td>{languagesList.txtStatus}</td>
                            <td>{languagesList.txtAction}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {[...services].map((service, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{service.serviceName}</td>
                                <td>{typeService[0][parseInt(service.typeOfServiceCategory)].title}</td>
                                <td>{`${service.address}, ${service.city}`}</td>
                                <td>{(!service.isActive && <label className='status status-pause'>{languageSelected === 'EN' ? 'Waiting' : 'Chờ duyệt'}</label>) ||
                                    (service.isBlock && <label className='status status-close'>{languagesList.txtDeleted}</label>) ||
                                    (service.status === 1 && <label className='status status-active'>{languagesList.txtActive}</label>) ||
                                    (service.status === 2 && <label className='status status-close'>{languagesList.txtClose}</label>) ||
                                    (service.status === 3 && <label className='status status-pause'>{languagesList.txtPause}</label>)}
                                </td>
                                <td>
                                    <Menu menuButton={<MenuButton className='btn-action'><BsThreeDotsVertical /></MenuButton>} transition>
                                        <MenuItem onClick={() => navigate('/admin/detail-service', { state: { service: service } })}>
                                            <HiOutlineEye /> {languagesList.txtPreview}
                                        </MenuItem>
                                        {service.isBlock ?
                                            <MenuItem onClick={() => handleClickShowConfig(languagesList.txtActive,
                                                languagesList.txtWarningActiveService,
                                                () => handleClickActive(service.serviceId, index), false, languagesList.txtActive,
                                                languagesList.txtCancel)}>
                                                <AiOutlineCheckCircle /> {languagesList.txtActive}
                                            </MenuItem> :
                                            <MenuItem
                                                onClick={() => handleClickShowConfig(languagesList.txtDelete,
                                                    languagesList.txtWarningDeleteService,
                                                    () => handleClickDelete(service.serviceId, index), true, languagesList.txtDelete,
                                                    languagesList.txtCancel)}>
                                                <AiOutlineDelete /> {languagesList.txtDelete}
                                            </MenuItem>
                                        }
                                    </Menu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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
        </>
    )
}

export default memo(AdminSuppliersAccommodation)