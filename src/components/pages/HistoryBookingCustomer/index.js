import { memo, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './HistoryBookingCustomer.scss'
import { english, vietnamese } from '../../Languages/HistoryBookingCustomer'
import Question from '../../images/question.png'
import Momo from '../Momo'
import Select from 'react-select';
import DetailBookingCustomer from '../DetailBookingCustomer'
import { english as englishLabelCancel, vietnamese as vietnameseLabelCancel, cancelReasonEnglish, cancelReasonVietnamese } from '../../Languages/CancelReason'
import axios from 'axios'
import { API_CREATE_FEEDBACK, API_CREATE_REQUEST_CANCEL, API_UPDATE_STATUS_BOOKING, API_GET_LIST_FEEDBACK } from '../../API'
import { toast } from 'react-toastify'
import LoadingDialog from '../../Layout/LoadingDialog'

function HistoryBookingCustomer({ languageSelected, listBooking, setListBooking, isDisabled, numberOfPages, numberPage, setNumberPage, className, classTab1 }) {
    const [statusBooking, setStatusBooking] = useState(-1)
    const [listBookingShow, setListBookingShow] = useState([])
    const [showPopupCancelTour, setShowPopupCancelTour] = useState(false)
    const [showPopupFeedback, setShowPopupFeedback] = useState(false)
    const [showDetail, setShowDetail] = useState(false)
    const [bookingDetail, setBookingDetail] = useState()
    const [showLoading, setShowLoading] = useState(false)

    const handleClickLinkTour = (booking) => {
        setBookingDetail(booking)
        setShowDetail(true)
    }

    const handleClickPay = (rawOrderInfo, rawAmount, tourId, bookingId) => {
        const request = Date.now()
        Momo(request, rawOrderInfo, rawAmount, tourId, false, bookingId, true)
    }

    const handleClickDeposit = (rawOrderInfo, rawAmount, tourId, bookingId) => {
        const request = Date.now()
        Momo(request, rawOrderInfo, rawAmount, tourId, true, bookingId, true)
    }

    useEffect(() => {
        let listBookingShowRaw = []
        if (statusBooking == -1) {
            setListBookingShow([...listBooking])
        }
        else {
            if (statusBooking == 0) {
                listBooking.forEach((item) => {
                    if ((item.tourType == 0 && item.status == 0 && item.status == 0 && today < item.startDate) ||
                        (item.tourType == 2 && item.status == 0 && !item.statusDeposit && today < item.startDate) ||
                        (item.tourType == 2 && item.status == 0 && item.statusDeposit && today >= item.startDate)) {
                        listBookingShowRaw.push(item)
                    }
                })
            }
            else if (statusBooking == 1) {
                listBooking.forEach((item) => {
                    if ((item.tourType == 0 && item.status == 1 && today >= item.startDate) ||
                        (item.tourType == 2 && item.status == 1 && item.statusDeposit && today >= item.startDate) ||
                        (item.tourType == 1 && item.status == 1 && today >= item.startDate) ||
                        (item.tourType == 0 && item.status == 1 && today < item.startDate) ||
                        (item.tourType == 1 && item.status == 1 && today < item.startDate)) {
                        listBookingShowRaw.push(item)
                    }
                })
            }
            else if (statusBooking == 2) {
                listBooking.forEach((item) => {
                    if ((item.tourType == 0 && item.status == 2) ||
                        (item.tourType == 1 && item.status == 2) ||
                        (item.tourType == 2 && item.status == 0 && !item.statusDeposit && today >= item.startDate) ||
                        (item.tourType == 2 && item.status == 2)) {
                        listBookingShowRaw.push(item)
                    }
                })
            }
            setListBookingShow(listBookingShowRaw)
        }
    }, [statusBooking])

    const today = new Date().toISOString().split("T")[0]
    const languageList = languageSelected === 'EN' ? english : vietnamese
    const cancelReasonList = languageSelected === 'EN' ? cancelReasonEnglish : cancelReasonVietnamese

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND'
    });

    const [idBookingCancel, setIdBookingReason] = useState('')


    const [reasonCancel, setReasonCancel] = useState(1)
    const [descriptionCancel, setDescriptionCancel] = useState('')

    const [bookingId, setBookingId] = useState('')
    const [feedback, setFeedback] = useState('')
    const [tourId, setTourId] = useState('')

    const [indexBooking, setIndexBooking] = useState(0)

    const handleCancelBooking = (bookingId) => {
        setIdBookingReason(bookingId)
        setShowPopupCancelTour(true)
    }

    const handleFeedbackTour = (bookingData, index) => {
        setBookingId(bookingData.bookingId)
        setTourId(bookingData.tourId)
        setIndexBooking(index)
        setShowPopupFeedback(true)
    }

    const handleClickSubmitCancelBooking = () => {
        setShowLoading(true)
        const request = {
            "userBookingId": idBookingCancel,
            "reasonCancelId": reasonCancel,
            "description": descriptionCancel
        }
        axios.post(API_CREATE_REQUEST_CANCEL, request)
            .then(() => {
                axios.post(`${API_UPDATE_STATUS_BOOKING}?userBookingId=${idBookingCancel}&status=${3}`).then(() => {
                    let listBookingRaw = [...listBooking]
                    for (let i = 0; i < listBookingRaw.length; i++) {
                        if (listBookingRaw[i].bookingId == idBookingCancel) {
                            listBookingRaw[i].status = 3
                            setListBooking(listBookingRaw)
                            break;
                        }
                    }
                    toast.success(languageList.txtRequestCancelSuccess)
                    setShowLoading(false)
                }).catch((e) => {
                    console.log(e)
                    setShowLoading(false)
                })
            }).catch((e) => {
                console.log(e)
                setShowLoading(false)
            })
        setShowPopupCancelTour(false)
    }

    const handleClickSubmitFeedbackTour = () => {
        if (feedback === '') {
            toast.error(languageSelected === 'EN' ? 'Please enter feedback' : 'Vui lòng nhập đánh giá')
        }
        else {
            setShowLoading(true)
            const feedbackDTO = {
                "accountId": parseInt(sessionStorage.getItem('id')),
                "tourId": tourId,
                "userbookingId": bookingId,
                "content": feedback,
                "isBlock": false
            }

            axios.post(API_CREATE_FEEDBACK, feedbackDTO)
                .then(() => {
                    let bookingRaw = [...listBooking]
                    bookingRaw[indexBooking].isFeedback = true
                    setListBooking(bookingRaw)
                    toast.success(languageList.txtAddFeedbackSuccess)
                    setShowPopupFeedback(false)
                    setShowLoading(false)
                })
                .catch((e) => {
                    console.log(e)
                    setShowPopupFeedback(false)
                    setShowLoading(false)
                })
        }
    }

    const [showPopupViewFeedback, setShowPopupViewFeedback] = useState(false)
    const [contentViewFeedback, setContentViewFeedback] = useState('')

    const handleClickFeedbacked = (idBooking) => {
        setShowPopupViewFeedback(true)

        axios.get(API_GET_LIST_FEEDBACK, {
            params: {
                page: 1,
                size: 1,
                bookingId: idBooking
            }
        }).then((res) => {
            const content = res.data.data.content[0].content
            setContentViewFeedback(content)
        })
    }

    return (
        <>
            {showPopupViewFeedback &&
                <div className='fade-in pop-up-view-feedback'>
                    <div className='popup-cancel-tour'>
                        <div className="d-flex line-input">
                            <div className="input-alone">
                                <label htmlFor="companyBusinessRegistration" className="d-block title mb-0 font-18">
                                    {languageList.txtFeedbackContent}
                                </label>
                                <textarea value={contentViewFeedback} disabled rows={4} className='input-inline mb-20' />
                            </div>
                        </div>
                        <div className='float-end'>
                            <button className='btn btn-primary btn-cancel-tour' onClick={() => setShowPopupViewFeedback(false)}>
                                {languageSelected === 'EN' ? 'Cancel' : 'Huỷ'}
                            </button>
                        </div>
                    </div>
                </div>
            }
            {showDetail ? <DetailBookingCustomer languageSelected={languageSelected} booking={bookingDetail} isDisabled={isDisabled} setShowDetail={setShowDetail} /> :
                <>
                    {showLoading && <LoadingDialog />}
                    {showPopupFeedback &&
                        <div className='fade-in cancel-tour'>
                            <div className='popup-cancel-tour'>
                                <div className="d-flex line-input">
                                    <div className="mlr-50 input-alone">
                                        <label htmlFor="companyBusinessRegistration" className="d-block title mb-0 font-14">{languageList.txtFeebackAboutTour}<span className="requird-star">*</span></label>
                                        <textarea value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                            rows={4} className='input-inline mb-20' />
                                    </div>
                                </div>
                                <div className='float-end'>
                                    <button className='btn btn-primary btn-cancel-tour'
                                        onClick={handleClickSubmitFeedbackTour}>
                                        {languageSelected === 'EN' ? 'Submit' : 'Gửi'}
                                    </button>
                                    <button className='btn btn-cancel-tour' onClick={() => setShowPopupFeedback(false)}>
                                        {languageSelected === 'EN' ? 'Cancel' : 'Huỷ'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                    {showPopupCancelTour &&
                        <div className='fade-in cancel-tour'>
                            <div className='popup-cancel-tour'>
                                <div className="d-flex line-input">
                                    <div className="mlr-50 input-alone">
                                        <label htmlFor="companyBusinessRegistration" className="d-block title mb-0 font-14">{languageList.txtReason}<span className="requird-star">*</span></label>
                                        <Select className='input-inline basic-multi-select'
                                            isSearchable={false}
                                            hideSelectedOptions={false}
                                            classNamePrefix="select"
                                            options={cancelReasonList}
                                            onChange={(e) => setReasonCancel(e.value)}
                                            defaultValue={cancelReasonList[0]}
                                        />
                                    </div>
                                </div>
                                <div className="d-flex line-input">
                                    <div className="mlr-50 input-alone">
                                        <label htmlFor="companyBusinessRegistration" className="d-block title mb-0 font-14">{languageList.txtDescription}</label>
                                        <textarea value={descriptionCancel}
                                            onChange={(e) => setDescriptionCancel(e.target.value)}
                                            rows={4} className='input-inline mb-20' />
                                    </div>
                                </div>
                                <div className='float-end'>
                                    <button className='btn btn-primary btn-cancel-tour'
                                        onClick={handleClickSubmitCancelBooking}>
                                        {languageSelected === 'EN' ? 'Submit' : 'Gửi'}
                                    </button>
                                    <button className='btn btn-cancel-tour' onClick={() => setShowPopupCancelTour(false)}>
                                        {languageSelected === 'EN' ? 'Cancel' : 'Huỷ'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    }
                    <div className={`fade-in ${className}`}>
                        {[...listBooking].length > 0 ?
                            <>
                                <nav className={`d-flex br-all ${classTab1}`}>
                                    <div onClick={() => setStatusBooking(-1)} className={`w-25 text-center tab-history-booking bold ${statusBooking === -1 && 'tab-history-booking-selected'}`}>{languageList.txtAllBooking}</div>
                                    <div onClick={() => setStatusBooking(0)} className={`w-25 text-center tab-history-booking bold ${statusBooking === 0 && 'tab-history-booking-selected'}`}>{languageList.txtWaitPay}</div>
                                    <div onClick={() => setStatusBooking(1)} className={`w-25 text-center tab-history-booking bold ${statusBooking === 1 && 'tab-history-booking-selected'}`}>{languageList.txtPaid}</div>
                                    <div onClick={() => setStatusBooking(2)} className={`w-25 text-center tab-history-booking bold ${statusBooking === 2 && 'tab-history-booking-selected'}`}>{languageList.txtCanceled}</div>
                                </nav>
                                <div className='mt-20'>
                                    {listBookingShow.map((item, index) => (
                                        <div key={index} className='mb-20 item-list-history-booking d-flex'>
                                            <div>
                                                <div className='tour-name-history-booking mt-10'>{item.tourName}</div>
                                                <div className='start-date-history-booking mt-10'>{item.startDate}</div>
                                                <div className='start-date-history-booking mt-10'>{`${languageList.txtAdult} ${item.numberOfAdult}, ${languageList.txtChildren} ${item.numberOfChildren}`}</div>
                                                <div className='mt-10'>
                                                    {(item.isFeedback && <div className='price-payed-history-booking'>{languageList.txtPaid} {formatter.format(item.price)} <button className='btn-feedback-history-booking color-have-feedback' onClick={() => handleClickFeedbacked(item.bookingId)}>{languageList.txtFeedbacked}</button></div>) ||
                                                        (item.status == 3 && <label className='canceled-history-booking'>{languageList.txtWaitingCancel}</label>) ||
                                                        (item.tourType == 0 && item.status == 0 && today < item.startDate && (isDisabled ? <label className='waiting-pay-history-booking'>{languageList.txtWaitPay}</label> : <button onClick={() => handleClickPay(`${item.tourName} ${item.numberOfAdult} Adult, ${item.numberOfChildren} Children`, item.price, item.tourId, item.bookingId)} className='btn-pay-history-booking'>{languageList.txtPayNow}</button>)) ||
                                                        (item.tourType == 0 && item.status == 1 && today < item.startDate && (isDisabled ? <label className='waiting-history-booking'>{languageList.txtWaiting}</label> : <button className='btn-cancel-history-booking' onClick={() => handleCancelBooking(item.bookingId)}>{languageList.txtCancel}</button>)) ||
                                                        (item.tourType == 0 && item.status == 1 && today >= item.startDate && <div className='price-payed-history-booking'>{languageList.txtPaid} {formatter.format(item.price)}{!isDisabled && <button className='btn-feedback-history-booking' onClick={() => handleFeedbackTour(item, index)}>{languageList.txtFeedback}</button>}</div>) ||
                                                        (item.tourType == 0 && item.status == 2 && <label className='canceled-history-booking'>{languageList.txtCanceled}</label>) ||
                                                        (item.tourType == 1 && item.status == 1 && today < item.startDate && (isDisabled ? <label className='waiting-history-booking'>{languageList.txtWaiting}</label> : <button className='btn-cancel-history-booking' onClick={() => handleCancelBooking(item.bookingId)}>{languageList.txtCancel}</button>)) ||
                                                        (item.tourType == 1 && item.status == 1 && today >= item.startDate && <div className='price-payed-history-booking'>{languageList.txtPaid} {formatter.format(item.price)}{!isDisabled && <button className='btn-feedback-history-booking' onClick={() => handleFeedbackTour(item, index)}>{languageList.txtFeedback}</button>}</div>) ||
                                                        (item.tourType == 1 && item.status == 2 && <label className='canceled-history-booking'>{languageList.txtCanceled}</label>) ||
                                                        (item.tourType == 2 && item.status == 0 && item.statusDeposit && today < item.startDate && item.tourStatus === 3 && <label className='waiting-history-booking'>{languageList.txtWaitPayDeposit}</label>) ||
                                                        (item.tourType == 2 && item.status == 0 && !item.statusDeposit && today < item.startDate && item.tourStatus === 1 && (isDisabled ? <label className='waiting-pay-history-booking'>{languageList.txtWaitPayDeposit}</label> : <button onClick={() => handleClickDeposit(`${item.tourName} ${item.numberOfAdult} Adult, ${item.numberOfChildren} Children`, item.deposit, item.tourId, item.bookingId)} className='btn-pay-history-booking'>{languageList.txtPayDeposit}</button>)) ||
                                                        (item.tourType == 2 && item.status == 0 && !item.statusDeposit && today < item.startDate && item.tourStatus === 2 && <label className='canceled-history-booking'>{languageList.txtCanceled}</label>) ||
                                                        (item.tourType == 2 && item.status == 0 && !item.statusDeposit && today >= item.startDate && <label className='canceled-history-booking'>{languageList.txtCanceled}</label>) ||
                                                        (item.tourType == 2 && item.status == 0 && item.statusDeposit && today >= item.startDate && item.tourStatus !== 2 && <label className='waiting-pay-history-booking'>{languageList.txtWaitPay}</label>) ||
                                                        (item.tourType == 2 && item.status == 0 && item.statusDeposit && today >= item.startDate && item.tourStatus === 2 && (isDisabled ? <label className='waiting-pay-history-booking'>{languageList.txtWaitPay}</label> : <button onClick={() => handleClickPay(`${item.tourName} ${item.numberOfAdult} Adult, ${item.numberOfChildren} Children`, item.price, item.tourId, item.bookingId)} className='btn-pay-history-booking'>{languageList.txtPayNow}</button>)) ||
                                                        (item.tourType == 2 && item.status == 0 && item.statusDeposit && today < item.startDate && item.tourStatus === 2 && <label className='canceled-history-booking'>{languageList.txtCanceled}</label>) ||
                                                        (item.tourType == 2 && item.status == 0 && item.statusDeposit && today < item.startDate && item.tourStatus === 1 && <label className='waiting-history-booking'>{languageList.txtWaiting}</label>) ||
                                                        (item.tourType == 2 && item.status == 1 && item.statusDeposit && today >= item.startDate && <div className='price-payed-history-booking'>{languageList.txtPaid} {formatter.format(item.price)}{!isDisabled && <button className='btn-feedback-history-booking' onClick={() => handleFeedbackTour(item, index)}>{languageList.txtFeedback}</button>}</div>) ||
                                                        (item.tourType == 2 && item.status == 2 && <label className='canceled-history-booking'>{languageList.txtCanceled}</label>)}
                                                </div>
                                            </div>
                                            <div onClick={() => handleClickLinkTour(item)} className='link-detail-tour'>{languageList.txtDetailTour}</div>
                                        </div>
                                    ))}
                                </div>
                            </>
                            :
                            <div className='image-no-booking br-top-left-none'>
                                <img src={Question} className='image-question' />
                                <div className='text-no-booking'>
                                    {languageList.txtNoBooking} {!isDisabled && <Link to='/tours' className='link-no-booking'>
                                        {languageList.txtBookNow}</Link>}
                                </div>
                            </div>
                        }
                    </div>
                </>
            }
        </>
    )
}

export default memo(HistoryBookingCustomer)