import { memo, useState, useEffect, useLayoutEffect } from 'react'
import { AiOutlineSearch, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { english, vietnamese } from '../../Languages/RequestCancelList'
import { cancelReasonEnglish, cancelReasonVietnamese } from '../../Languages/CancelReason'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { HiOutlineEye } from 'react-icons/hi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_GET_LIST_CANCEL_REQUEST } from '../../API';

function RequestCancelList({ languageSelected }) {
    const languageList = languageSelected === 'EN' ? english : vietnamese
    const cancelReason = languageSelected === 'EN' ? cancelReasonEnglish : cancelReasonVietnamese

    const navigate = useNavigate()

    const [searchEmail, setSearchEmail] = useState('')
    const [listRequestCancel, setListRequestCancel] = useState([])
    const [numberPage, setNumberPage] = useState(1)
    const [numberOfPages, setNumberOfPages] = useState([])

    useLayoutEffect(() => {
        setNumberPage(1)
    }, [searchEmail])

    useEffect(() => {
        axios.get(API_GET_LIST_CANCEL_REQUEST, {
            params: {
                page: numberPage,
                size: 10,
                email: searchEmail
            }
        }).then((res) => {
            const totalPages = res.data.data.totalPages
            let numberOfPagesRaw = []
            for (let i = 0; i < totalPages; i++) {
                numberOfPagesRaw.push(i + 1)
            }
            setNumberOfPages(numberOfPagesRaw)
            setListRequestCancel(res.data.data.content)
        }).catch((e) => {
            console.log(e)
            setListRequestCancel([])
        })
    }, [numberPage, searchEmail])

    return (
        <div>
            <div className='d-flex tool-list-service-main'>
                <div className='d-flex list-service-tool'>
                    <label htmlFor='search-name' className='search-input-text'>
                        <AiOutlineSearch className='icon-inner icon-search-list-service' />
                        <input value={searchEmail} onChange={(e) => setSearchEmail(e.target.value)} placeholder={languageList.txtEmailAccount} type='text' className='input-inline input-list-service search-name-service input-inline-list-service' />
                    </label>
                </div>
            </div>
            <div className='space-table'>
                <table className='table table-hover table-list-service mt-30 table-striped'>
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>{languageList.txtEmailAccount}</td>
                            <td>{languageList.txtPhoneNumberContact}</td>
                            <td>{languageList.txtCancellationReason}</td>
                            <td>{languageList.txtNumberOfPeople}</td>
                            <td>{languageList.txtAction}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {[...listRequestCancel].map((request, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{request.accountEmail}</td>
                                <td>{request.userBookingDTO.phone}</td>
                                <td>{cancelReason[request.reasonCancelId - 1].label}</td>
                                <td>{`${request.userBookingDTO.numberOfAdult} ${languageList.txtAdult}, ${request.userBookingDTO.numberOfChildren} ${languageList.txtChildren}`}</td>
                                <td>
                                    <Menu menuButton={<MenuButton className='btn-action'><BsThreeDotsVertical /></MenuButton>} transition>
                                        <MenuItem onClick={() => navigate('/admin/view-detail-request-cancel', { state: { request: request } })}>
                                            <HiOutlineEye /> {languageList.txtViewDetail}
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
        </div>
    )
}

export default memo(RequestCancelList)