import { memo, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { AiOutlineSearch } from 'react-icons/ai'
import './ListBookingTable.scss'
import { english, vietnamese } from '../../Languages/ListBookingTable'
import { StickyContainer, Sticky } from 'react-sticky'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { API_GET_LIST_BOOKING } from "../../API"
import axios from 'axios'
import LoadingDialog from '../../Layout/LoadingDialog'

function ListBookingTable({ languageSelected }) {
    //id tour
    const id = useLocation().state.id
    //ngay bat dau muon kiem tra
    const startDate = useLocation().state.startDate

    const [getDataComplete, setGetDataComplete] = useState(false)
    const [searchName, setSearchName] = useState('')

    const languageList = languageSelected === 'EN' ? english : vietnamese

    //truyen du lieu vao day
    const [booking, setBooking] = useState([
        // {
        //     emailAccount: 'abc@gmail.com',
        //     orderId: '123123123',
        //     fullName: 'Nguyen Van A',
        //     numberOfAdult: 5,
        //     numberOfChildren: 10,
        //     emailContact: 'xyz@gmail.com',
        //     phoneContact: '0987654321',
        //     idCard: '34234234234',
        //     dateOfIssue: '2022-01-01',
        //     placeOfIssue: 'abcyxz',
        //     request: 'ahfasdkjf'
        // }
    ])

    let numberOfPages = []
    const [numberPage, setNumberPage] = useState(1)
    const [count, setCount] = useState(0)
    const totlePage = Math.ceil(count / 10)

    useEffect(() => {
        axios.get(API_GET_LIST_BOOKING, {
            params: {
                tourId: id,
                page: numberPage,
                size: 10,
                startDate: startDate
            }
        }).then((res) => {
            setCount(res.data.data.totalElements)
            let listBookingData = []
            for (let i = 0; i < res.data.data.content.length; i++) {
                const data = {
                    emailAccount: res.data.data.content[i].email,
                    orderId: res.data.data.content[i].orderId,
                    fullName: res.data.data.content[i].fullName,
                    numberOfAdult: res.data.data.content[i].numberOfAdult,
                    numberOfChildren: res.data.data.content[i].numberOfChildren,
                    emailContact: res.data.data.content[i].email,
                    phoneContact: res.data.data.content[i].phone,
                    idCard: res.data.data.content[i].idCard,
                    dateOfIssue: res.data.data.content[i].dateOfIssue,
                    placeOfIssue: res.data.data.content[i].placeOfIssue,
                    request: res.data.data.content[i].request,
                    startDate: res.data.data.content[i].startDate
                }
                listBookingData.push(data)
            }
            setBooking(listBookingData)
            setGetDataComplete(true)
        }).catch((e) => {
            setGetDataComplete(true)
        })
    }, [numberPage])

    for (let i = 0; i < totlePage; i++) {
        numberOfPages.push(i + 1)
    }

    //cái này để hiện detail, ko đc set vì code set sẵn r
    const [bookingDetail, setBookingDetail] = useState({
        fullName: '',
        applyFor: '',
        email: '',
        phone: '',
        idCard: '',
        dateOfIssue: '',
        placeOfIssue: '',
        request: ''
    })

    const handleClickViewDetail = (item) => {
        const bookingDetailRaw = {
            orderId: item.orderId,
            fullName: item.fullName,
            applyFor: `${item.numberOfAdult} ${languageList.txtAdult}, ${item.numberOfChildren} ${languageList.txtChildren}`,
            email: item.emailContact,
            phone: item.phoneContact,
            idCard: item.idCard,
            dateOfIssue: item.dateOfIssue,
            placeOfIssue: item.placeOfIssue,
            request: item.request,
            startDate: item.startDate
        }
        setBookingDetail({ ...bookingDetailRaw })
        document.getElementById('detail-booking').style.cssText = `
        width: 50%;
        opacity: 1;
        margin-left: 20px;
        `
    }

    const handleClickCloseDetail = () => {
        document.getElementById('detail-booking').style.cssText = `
        width: 0%;
        opacity: 0;
        margin-left: 0px;
        `
    }

    if (!getDataComplete) {
        return (
            <LoadingDialog />
        )
    }

    console.log(booking)

    return (
        <div>
            <div className='d-flex tool-list-service-main m-0'>
                <div className='d-flex list-service-tool'>
                    <label htmlFor='search-name' className='search-input-text'>
                        <AiOutlineSearch className='icon-inner icon-search-list-service' />
                        <input value={searchName} onChange={(e) => setSearchName(e.target.value)} id='search-name' type='text' className='input-inline input-list-service search-name-service input-inline-list-service' />
                    </label>
                </div>
            </div>
            <StickyContainer>
                <div className='d-flex'>
                    <div className='w-100 '>
                        <table className='table table-hover table-list-service mt-30 table-striped'>
                            <thead>
                                <tr>
                                    <td>#</td>
                                    <td>{languageList.txtEmailAccount}</td>
                                    <td>{languageList.txtFullName}</td>
                                    <td>{languageList.txtNumberOfPeople}</td>
                                    <td className='text-center'>{languageList.txtAction}</td>
                                </tr>
                            </thead>
                            <tbody>
                                {booking.map((item, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.emailAccount}</td>
                                        <td>{item.fullName}</td>
                                        <td>{`${item.numberOfAdult} ${languageList.txtAdult}, ${item.numberOfChildren} ${languageList.txtChildren}`}</td>
                                        <td onClick={() => handleClickViewDetail(item)} className='text-center click-view-detail'>{languageList.txtViewDetail}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
                    <div className='w-0 mt-30 detail-booking' id='detail-booking'>
                        <Sticky>
                            {({ style }) => (
                                <div style={style} className='detail-booking-main'>
                                    <header className='d-flex space-between'>
                                        <label>{languageList.txtDetailBooking}</label>
                                        <label className='cancel-btn' onClick={handleClickCloseDetail}>X</label>
                                    </header>
                                    <div className='main-content-booking-detail'>
                                        <div className="d-flex line-input">
                                            <div className="mlr-50 input-alone">
                                                <label htmlFor="companyWebsite" className="d-block title m-0 font-14">{languageList.txtOrderId}</label>
                                                <input value={bookingDetail.orderId}
                                                    className="input-inline mb-10" disabled />
                                            </div>
                                        </div>
                                        <div className="d-flex line-input">
                                            <div className="mlr-50 input-alone">
                                                <label htmlFor="companyWebsite" className="d-block title m-0 font-14">{languageList.txtSightseeDay}</label>
                                                <input value={bookingDetail.startDate}
                                                    className="input-inline mb-10" type='date' disabled />
                                            </div>
                                        </div>
                                        <div className="d-flex line-input">
                                            <div className="mlr-50 input-alone">
                                                <label htmlFor="companyWebsite" className="d-block title m-0 font-14">{languageList.txtApplyFor}</label>
                                                <input value={bookingDetail.applyFor}
                                                    className="input-inline mb-10" disabled />
                                            </div>
                                        </div>
                                        <div className="d-flex line-input">
                                            <div className="mlr-50 input-alone">
                                                <label htmlFor="companyWebsite" className="d-block title m-0 font-14">{languageList.txtFullName}</label>
                                                <input value={bookingDetail.fullName}
                                                    className="input-inline mb-10" disabled />
                                            </div>
                                        </div>
                                        <div className="d-flex line-input">
                                            <div className='mlr-50'>
                                                <label className="d-block title m-0 font-14">{languageList.txtEmail}</label>
                                                <input value={bookingDetail.email} disabled
                                                    className="input-inline mb-10" type='text' />
                                            </div>
                                            <div className='mlr-50'>
                                                <label className="d-block title m-0 font-14">{languageList.txtPhone}</label>
                                                <input value={bookingDetail.phone} disabled
                                                    className="input-inline mb-10" type='text' />
                                            </div>
                                        </div>
                                        <div className="d-flex line-input">
                                            <div className="mlr-50 input-alone">
                                                <label htmlFor="companyWebsite" className="d-block title m-0 font-14">{languageList.txtIdCard}</label>
                                                <input id='companyWebsite' value={bookingDetail.idCard}
                                                    className="input-inline mb-10" disabled />
                                            </div>
                                        </div>
                                        <div className="d-flex line-input">
                                            <div className='mlr-50'>
                                                <label className="d-block title m-0 font-14">{languageList.txtDateOfIssue}</label>
                                                <input value={bookingDetail.dateOfIssue} disabled
                                                    className="input-inline mb-10" type='date' />
                                            </div>
                                            <div className='mlr-50'>
                                                <label className="d-block title m-0 font-14">{languageList.txtPlaceOfIssue}</label>
                                                <input value={bookingDetail.placeOfIssue} disabled
                                                    className="input-inline mb-10" type='text' />
                                            </div>
                                        </div>
                                        <div className="d-flex line-input">
                                            <div className="input-alone mlr-50">
                                                <label htmlFor='description' className='d-block title m-0 font-14'>{languageList.txtRequest}</label>
                                                <textarea rows="4" id='description' className='input-inline mb-10'
                                                    disabled value={bookingDetail.request} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </Sticky>
                    </div>
                </div>
            </StickyContainer>
        </div>
    )
}

export default memo(ListBookingTable)