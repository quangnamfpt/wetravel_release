import { memo, useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { english as englishTableCustomer, vietnamese as vietnameseTableCustomer } from '../../Languages/TableListCustomer'
import { AiOutlineLeft, AiOutlineRight, AiOutlineSearch, AiOutlineDelete, AiOutlineCheckCircle } from 'react-icons/ai'
import { HiOutlineEye } from 'react-icons/hi'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { BsThreeDotsVertical } from 'react-icons/bs'
import axios from 'axios'
import { API_GET_CUSTOMER, API_BLOCK_ACCOUNT, API_ACTIVE_ACCOUNT } from '../../API';
import { toast } from 'react-toastify'
import ConfirmDialog from '../../Layout/ConfirmDialog'

function ListCustomer({ languageSelected }) {
    const navigate = useNavigate()

    const [showConfirm, setShowConfirm] = useState(false)
    const [titleConfirm, setTitleConfirm] = useState('asd')
    const [contentConfirm, setContentConfirm] = useState('asd')
    const callbackConfirm = useRef(() => { })
    const [isRed, setIsRed] = useState(true)
    const [textOk, setTextOk] = useState('Ok')
    const [textCancel, setTextCancel] = useState('Cancel')

    const [searchName, setSearchName] = useState('')
    const [numberOfPages, setNumberOfPages] = useState([])
    const [numberPage, setNumberPage] = useState(1)

    const [customers, setCustomers] = useState([])

    const table = languageSelected === 'EN' ? englishTableCustomer : vietnameseTableCustomer

    const handleClickBlock = (customer, index) => {
        axios.put(API_BLOCK_ACCOUNT + customer.id).then(() => {
            let customersRaw = [...customers]
            let customerRaw = { ...customersRaw[index], status: true }
            customersRaw[index] = customerRaw
            setCustomers([...customersRaw])
            toast.success(table.txtBlocked)
            setShowConfirm(false)
        }).catch(() => {
        })
    }

    const handleClickUnblock = (customer, index) => {
        axios.put(API_ACTIVE_ACCOUNT + customer.id).then(() => {
            let customersRaw = [...customers]
            let customerRaw = { ...customersRaw[index], status: false }
            customersRaw[index] = customerRaw
            setCustomers([...customersRaw])
            toast.success(table.txtUnblocked)
            setShowConfirm(false)
        }).catch(() => {
        })
    }

    useLayoutEffect(() => {
        setNumberPage(1)
    }, [searchName])

    useEffect(() => {
        axios.get(API_GET_CUSTOMER, {
            params: {
                page: numberPage,
                size: 10,
                email: searchName
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
            const totalPages = res.data.data.totalPages
            let numberOfPagesRaw = []
            for (let i = 0; i < totalPages; i++) {
                numberOfPagesRaw.push(i + 1)
            }
            setNumberOfPages(numberOfPagesRaw)
            setCustomers(listCustomerData)
        }).catch((e) => {
            setNumberOfPages([])
            setCustomers([])
        })
    }, [numberPage, searchName])


    const handleClickShowConfig = (title, content, callback, isRed, textOk, textCancel) => {
        setShowConfirm(true)
        setTitleConfirm(title)
        setContentConfirm(content)
        callbackConfirm.current = callback
        setIsRed(isRed)
        setTextOk(textOk)
        setTextCancel(textCancel)
    }

    return (
        <div>
            {showConfirm &&
                <ConfirmDialog textOk={textOk} textCancel={textCancel} title={titleConfirm} content={contentConfirm} callback={callbackConfirm.current} isRed={isRed} setShowDialog={setShowConfirm} />
            }
            <div className='d-flex tool-list-service-main'>
                <div className='d-flex list-service-tool'>
                    <label htmlFor='search-name' className='search-input-text'>
                        <AiOutlineSearch className='icon-inner icon-search-list-service' />
                        <input value={searchName} placeholder={table.txtEnterName} onChange={(e) => setSearchName(e.target.value)} id='search-name' type='text' className='input-inline input-list-service search-name-service input-inline-list-service' />
                    </label>
                </div>
            </div>
            <div className='space-table'>
                <table className='table table-hover table-list-service mt-30 table-striped'>
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>{table.txtLoginEmail}</td>
                            <td>{table.txtFirstName}</td>
                            <td>{table.txtLastName}</td>
                            <td>{table.txtGender}</td>
                            <td>{table.txtStatus}</td>
                            <td>{table.txtAction}</td>
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
                                <td>
                                    <Menu menuButton={<MenuButton className='btn-action'><BsThreeDotsVertical /></MenuButton>} transition>
                                        <MenuItem onClick={() => navigate('/admin/view-detail-customer', { state: { id: item } })}>
                                            <HiOutlineEye /> {table.txtView}
                                        </MenuItem>
                                        {!item.status ?
                                            <MenuItem
                                                onClick={() => handleClickShowConfig(table.txtBlock,
                                                    table.txtWarningBlock,
                                                    () => handleClickBlock(item, index), true, table.txtBlock, table.txtCancel)} >
                                                <AiOutlineDelete /> {table.txtBlock}
                                            </MenuItem> :
                                            <MenuItem
                                                onClick={() => handleClickShowConfig(table.txtUnblock,
                                                    table.txtWarningUnblock,
                                                    () => handleClickUnblock(item, index), false, table.txtUnblock, table.txtCancel)}>
                                                <AiOutlineCheckCircle /> {table.txtUnblock}
                                            </MenuItem>}
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
        </div>
    )
}

export default memo(ListCustomer)