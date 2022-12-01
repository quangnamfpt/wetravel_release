import { memo, useState, useEffect } from 'react'
import { AiOutlineSearch, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { english, vietnamese } from '../../Languages/RequestCancelList'
import { cancelReasonEnglish, cancelReasonVietnamese } from '../../Languages/CancelReason'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { HiOutlineEye } from 'react-icons/hi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';

function RequestCancelList({ languageSelected }) {
    const languageList = languageSelected === 'EN' ? english : vietnamese
    const cancelReason = languageSelected === 'EN' ? cancelReasonEnglish : cancelReasonVietnamese

    const navigate = useNavigate()

    const [searchEmail, setSearchEmail] = useState('')
    const [listRequestCancel, setListRequestCancel] = useState([
        {
            emailAccount: 'a@gmail.com',
            "request": {
                requestId: 1,
                description: 'Chán',
                requestDate: '2022-12-01',
                status: 0,
                reasonId: 1,
                bookingId: 123
            },
            "booking": {
                // bookingId: bookingItem.userBookingId,
                // tourId: bookingItem.tourId,
                // tourName: bookingItem.tourName,
                // startDate: bookingItem.startDate,
                // numberOfAdult: bookingItem.numberOfAdult,
                // numberOfChildren: bookingItem.numberOfChildren,
                // tourType: bookingItem.tourType,
                // status: bookingItem.status,
                // deposit: bookingItem.deposit,
                // price: bookingItem.totalPrice,
                // statusDeposit: bookingItem.statusDeposit,
                // invoidceCode: bookingItem.orderId,
                // bookingDate: bookingItem.bookingDate,
                // fullName: bookingItem.fullName,
                // phone: bookingItem.phone,
                // email: bookingItem.email,
                // idCard: bookingItem.idCard,
                // dateOfIssue: bookingItem.dateOfIssue,
                // placeOfIssue: bookingItem.placeOfIssue,
                // request: bookingItem.request
                bookingId: 123,
                tourId: 1,
                tourName: 'Tour Sầm Sơn 3 ngày 2 đêm',
                startDate: '2022-01-03',
                numberOfAdult: 2,
                numberOfChildren: 1,
                tourType: 3,
                status: 3,
                deposit: 2000,
                price: 5000,
                statusDeposit: true,
                invoidceCode: 123,
                bookingDate: '2022-11-11',
                fullName: 'Nguyen Van A',
                phone: '0987654321',
                email: 'a@gmail.com',
                idCard: '123456789',
                dateOfIssue: '2021-11-12',
                placeOfIssue: 'Tru so cong an',
                request: 'oi doi oi'
            }
        },
        {
            emailAccount: 'b@gmail.com',
            "request": {
                requestId: 2,
                description: 'Chán',
                requestDate: '2022-12-01',
                status: 0,
                reasonId: 2,
                bookingId: 123
            },
            "booking": {
                bookingId: 123,
                tourId: 1,
                tourName: 'Vip pro',
                startDate: '2022-01-03',
                numberOfAdult: 2,
                numberOfChildren: 1,
                tourType: 3,
                status: 3,
                deposit: 2000,
                price: 5000,
                statusDeposit: true,
                invoidceCode: 123,
                bookingDate: '2022-11-11',
                fullName: 'Nguyen Van A',
                phone: '0987344321',
                email: 'a@gmail.com',
                idCard: '123456789',
                dateOfIssue: '2021-11-12',
                placeOfIssue: 'Tru so cong an',
                request: 'oi doi oi'
            }
        }
    ])
    const [numberPage, setNumberPage] = useState(1)
    const [numberOfPages, setNumberOfPages] = useState([1, 2])

    useEffect(() => {

    }, [])

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
                                <td>{request.emailAccount}</td>
                                <td>{request.booking.phone}</td>
                                <td>{cancelReason[parseInt(request.request.reasonId) - 1].label}</td>
                                <td>{`${request.booking.numberOfAdult} ${languageList.txtAdult}, ${request.booking.numberOfChildren} ${languageList.txtChildren}`}</td>
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