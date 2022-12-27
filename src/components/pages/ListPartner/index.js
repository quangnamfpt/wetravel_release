import { memo, useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { english as englishServiceCategory, vietnamese as vietnameseServiceCategory } from '../../Languages/ServiceCategory'
import { english as englishTablePartner, vietnamese as vietnameseTablePartner } from '../../Languages/TableListPartner'
import { AiOutlineLeft, AiOutlineRight, AiOutlineSearch, AiOutlineDelete, AiOutlineCheckCircle } from 'react-icons/ai'
import { HiOutlineEye } from 'react-icons/hi'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { API_GET_PARTNER, API_BLOCK_ACCOUNT, API_ACTIVE_ACCOUNT } from '../../API';
import axios from 'axios'
import ConfirmDialog from '../../Layout/ConfirmDialog'
import LoadingDialog from '../../Layout/LoadingDialog'
import { toast } from 'react-toastify'

function ListParner({ languageSelected }) {
    const optionsCategory = languageSelected === 'EN' ? englishServiceCategory : vietnameseServiceCategory
    const table = languageSelected === 'EN' ? englishTablePartner : vietnameseTablePartner

    const navigate = useNavigate()

    const [searchName, setSearchName] = useState('')
    const [numberOfPages, setNumberOfPages] = useState([])
    const [numberPage, setNumberPage] = useState(1)
    const [partners, setPartners] = useState([])

    const [showConfirm, setShowConfirm] = useState(false)
    const [titleConfirm, setTitleConfirm] = useState('asd')
    const [contentConfirm, setContentConfirm] = useState('asd')
    const callbackConfirm = useRef(() => { })
    const [isRed, setIsRed] = useState(true)
    const [textOk, setTextOk] = useState('Ok')
    const [textCancel, setTextCancel] = useState('Cancel')

    useLayoutEffect(() => {
        setNumberPage(1)
    }, [searchName])

    useEffect(() => {
        axios.get(API_GET_PARTNER, {
            params: {
                page: numberPage,
                size: 10,
                companyName: searchName
            }
        }).then((res) => {
            let listPartnerData = []
            for (let i = 0; i < res.data.data.content.length; i++) {
                const listPartner = {
                    "email": res.data.data.content[i].email,
                    "numberIdCard": res.data.data.content[i].numberIdCard,
                    "dateIssue": res.data.data.content[i].dateIssue,
                    "gender": res.data.data.content[i].gender,
                    "phone": res.data.data.content[i].phone,
                    "fax": res.data.data.content[i].fax,
                    "department": res.data.data.content[i].department,
                    "firstName": res.data.data.content[i].firstName,
                    "placeIssue": res.data.data.content[i].placeIssue,
                    "taxCode": res.data.data.content[i].taxCode,
                    "birthDate": res.data.data.content[i].birthDate,
                    "companyName": res.data.data.content[i].companyName,
                    "roleId": res.data.data.content[i].roleId,
                    "website": res.data.data.content[i].website,
                    "lastName": res.data.data.content[i].lastName,
                    "accountId": res.data.data.content[i].accountId,
                    "registrationDate": res.data.data.content[i].registrationDate,
                    "incorporationDate": res.data.data.content[i].incorporationDate,
                    "isBlock": res.data.data.content[i].isBlock,
                    "serviceCategory": res.data.data.content[i].serviceCategory,
                    "cityContact": res.data.data.content[i].cityContact,
                    "emailContact": res.data.data.content[i].emailContact,
                    "cityCompany": res.data.data.content[i].cityCompany,
                    "addressCompany": res.data.data.content[i].addressCompany,
                    "phoneCompany": res.data.data.content[i].phoneCompany,
                    "addressContact": res.data.data.content[i].addressContact,
                    "businessLicenseCode": res.data.data.content[i].businessLicenseCode,
                    "emailContactCompany": res.data.data.content[i].emailContactCompany,
                    "position": res.data.data.content[i].position,
                    "shortName": res.data.data.content[i].shortName
                }
                listPartnerData.push(listPartner)
            }
            const totalPages = res.data.data.totalPages
            let numberOfPagesRaw = []
            for (let i = 0; i < totalPages; i++) {
                numberOfPagesRaw.push(i + 1)
            }
            setNumberOfPages(numberOfPagesRaw)
            setPartners(listPartnerData)
        }).catch((e) => {
            setNumberOfPages([])
            setPartners([])
        })
    }, [numberPage, searchName])



    const handleClickBlock = (partner, index) => {
        axios.put(API_BLOCK_ACCOUNT + partner.accountId).then(() => {
            let partnersRaw = [...partners]
            let partnerRaw = { ...partnersRaw[index], isBlock: true }
            partnersRaw[index] = partnerRaw
            setPartners([...partnersRaw])
            toast.success(table.txtBlocked)
            setShowConfirm(false)
        }).catch(() => {
        })
    }

    const handleClickUnblock = (partner, index) => {
        axios.put(API_ACTIVE_ACCOUNT + partner.accountId).then(() => {
            let partnersRaw = [...partners]
            let partnerRaw = { ...partnersRaw[index], isBlock: false }
            partnersRaw[index] = partnerRaw
            setPartners([...partnersRaw])
            toast.success(table.txtUnblocked)
            setShowConfirm(false)
        }).catch(() => {
        })
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
                            <td>{table.txtAccountEmail}</td>
                            <td>{table.txtCompanyName}</td>
                            <td>{table.txtCompanyAddress}</td>
                            <td>{table.txtStatus}</td>
                            <td>{table.txtAction}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {[...partners].map((item, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{item.email}</td>
                                <td>{item.companyName}</td>
                                <td>{item.addressCompany}, {item.cityCompany}</td>
                                <td>{item.isBlock ? <label className='status status-close'>{table.txtBlocked}</label> :
                                    <label className='status status-active'>{table.txtActive}</label>}</td>
                                <td>
                                    <Menu menuButton={<MenuButton className='btn-action'><BsThreeDotsVertical /></MenuButton>} transition>
                                        <MenuItem onClick={() => navigate('/admin/view-detail-partner', { state: { id: item } })}>
                                            <HiOutlineEye /> {table.txtView}
                                        </MenuItem>
                                        {item.isBlock ?
                                            <MenuItem
                                                onClick={() => handleClickShowConfig(table.txtUnblock, table.txtWarningUnblock,
                                                    () => handleClickUnblock(item, index), false, table.txtUnblock, table.txtCancel)}>
                                                <AiOutlineCheckCircle /> {table.txtUnblock}
                                            </MenuItem>
                                            :
                                            <MenuItem
                                                onClick={() => handleClickShowConfig(table.txtBlock, table.txtWarningBlock,
                                                    () => handleClickBlock(item, index), true, table.txtBlock, table.txtCancel)}>
                                                <AiOutlineDelete /> {table.txtBlock}
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

export default memo(ListParner)