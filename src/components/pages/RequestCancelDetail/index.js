import { memo, useState, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { english as englishRequestCancelDetail, vietnamese as vietnameseRequestCancelDetail } from '../../Languages/RequestCancelDetail'
import { english, vietnamese } from '../../Languages/DetailBookingCustomer'
import './RequestCancelDetail.scss'
import ConfirmDialog from '../../Layout/ConfirmDialog'
import { cancelReasonEnglish, cancelReasonVietnamese } from '../../Languages/CancelReason'
import { AiFillCaretLeft } from 'react-icons/ai'
import axios from 'axios'
import { toast } from 'react-toastify'
import { API_ADD_ALERT, API_DELETE_REQUEST_CANCEL, API_UPDATE_STATUS_BOOKING } from '../../API'
import PopupCreateAlert from '../../Layout/PopupCreateAlert'

function RequestCancelDetail({ languageSelected }) {
    const request = useLocation().state.request
    const bookingRaw = request.userBookingDTO
    const navigate = useNavigate()

    const languageRequestCancelDetail = languageSelected === 'EN' ? englishRequestCancelDetail : vietnameseRequestCancelDetail
    const languageList = languageSelected == 'EN' ? english : vietnamese
    const cancelReason = languageSelected === 'EN' ? cancelReasonEnglish : cancelReasonVietnamese

    const [showConfirm, setShowConfirm] = useState(false)
    const [titleConfirm, setTitleConfirm] = useState('asd')
    const [contentConfirm, setContentConfirm] = useState('asd')
    const callbackConfirm = useRef(() => { })
    const [isRed, setIsRed] = useState(true)
    const [textOk, setTextOk] = useState('Ok')
    const [textCancel, setTextCancel] = useState('Cancel')

    const [showAddAlert, setShowAddAlert] = useState(false)

    const [tabOption, setTabOption] = useState(0)

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND'
    });

    const handleClickShowConfig = (title, content, callback, isRed, textOk, textCancel) => {
        setShowConfirm(true)
        setTitleConfirm(title)
        setContentConfirm(content)
        callbackConfirm.current = callback
        setIsRed(isRed)
        setTextOk(textOk)
        setTextCancel(textCancel)
    }

    const handleDeleteRequest = (message) => {
        axios.delete(`${API_DELETE_REQUEST_CANCEL}${request.userBookingId}`)
            .then(() => {
                toast.success(message)
                navigate(-1)
            }).catch((e) => {
                console.log('xoa request failed', e)
            })
    }

    const handleCancelBooking = () => {
        axios.post(`${API_UPDATE_STATUS_BOOKING}?userBookingId=${request.userBookingId}&status=2`).then(() => {
            handleDeleteRequest(languageRequestCancelDetail.txtAccessRequest)
        }).catch((e) => {
            console.log(e)
        })
    }

    const handleRefuseCancelBooking = () => {
        axios.post(`${API_UPDATE_STATUS_BOOKING}?userBookingId=${request.userBookingId}&status=1`).then(() => {
            handleDeleteRequest(languageRequestCancelDetail.txtRefuseCancel)
        }).catch((e) => {
            console.log(e)
        })
    }

    const handleClickShowAddAlert = () => {
        setShowAddAlert(true)
        callbackConfirm.current = () => handleRefuseCancelBooking()
    }

    return (
        <div>
            {showConfirm &&
                <ConfirmDialog textOk={textOk} textCancel={textCancel} title={titleConfirm} content={contentConfirm} callback={callbackConfirm.current} isRed={isRed} setShowDialog={setShowConfirm} />
            }
            {showAddAlert &&
                <PopupCreateAlert callback={callbackConfirm.current} textOk={languageRequestCancelDetail.txtRefuse}
                    textCancel={languageRequestCancelDetail.txtCancel} title={languageRequestCancelDetail.txtRefuse}
                    shortReason={languageRequestCancelDetail.txtShortReason}
                    fullReason={languageRequestCancelDetail.txtFullReason} accountId={bookingRaw.accountId}
                    isRed={false} setShowDialog={setShowAddAlert} />
            }
            <div className='bg-white br-10 box-shadow-common p-20 d-flex space-between center-vertical'>
                <div onClick={() => navigate(-1)} className='back-link back-link-request-cancel-detail'><AiFillCaretLeft /></div>
                <div className='d-flex w-25'>
                    <button className='btn btn-success btn-access'
                        onClick={() => handleClickShowConfig(languageRequestCancelDetail.txtAccept, languageRequestCancelDetail.txtWarningAccept,
                            handleCancelBooking, true, languageRequestCancelDetail.txtAccept, languageRequestCancelDetail.txtCancel)}>
                        {languageRequestCancelDetail.txtAccept}
                    </button>
                    <button className='btn btn-danger btn-block btn-refuse'
                        onClick={handleClickShowAddAlert}>
                        {languageRequestCancelDetail.txtRefuse}
                    </button>
                </div>
            </div>
            <div className='mt-20 bg-white br-10 box-shadow-common'>
                <div className='d-flex tab-flex'>
                    <label onClick={() => setTabOption(0)} className={`item-tab ${tabOption === 0 && 'item-tab-selected'}`}>{languageRequestCancelDetail.txtCancellationTnformation}</label>
                    <label onClick={() => setTabOption(1)} className={`item-tab ${tabOption === 1 && 'item-tab-selected'}`}>{languageList.txtInvoiceInformation}</label>
                    <label onClick={() => setTabOption(2)} className={`item-tab ${tabOption === 2 && 'item-tab-selected'}`}>{languageList.txtInformationContact}</label>
                </div>
                <div className='p-20 mt-20'>
                    <div className='d-flex space-between header-center-all-item'>
                        <header className='title m-0 font-20'>{request.userBookingDTO.tourName}</header>
                        <label onClick={() => navigate('/admin/preview', { state: { id: request.userBookingDTO.tourId } })} className='link-detail-tour'>{languageList.txtViewTour}</label>
                    </div>
                </div>
                <div className='main-information-detail-booking-customer p-20'>
                    {tabOption === 0 &&
                        <div className='fade-in'>
                            <div className='item-main-information-detail-booking-customer'>
                                <label className='title-item-main-information-detail-booking-customer'>{languageRequestCancelDetail.txtReason}</label>
                                <label>{cancelReason[parseInt(request.reasonCancelId) - 1].label}</label>
                            </div>
                            <div className='item-main-information-detail-booking-customer'>
                                <label className='title-item-main-information-detail-booking-customer'>{languageRequestCancelDetail.txtRequestDate}</label>
                                <input type='date' value={request.requestDate} className='fake-label' disabled />
                            </div>
                            <div className='item-main-information-detail-booking-customer  bd-none'>
                                <label className='title-item-main-information-detail-booking-customer'>{languageRequestCancelDetail.txtDescription}</label>
                                <label>{request.description}</label>
                            </div>
                        </div>
                    }
                    {tabOption === 1 &&
                        <div className='fade-in'>
                            <div className='item-main-information-detail-booking-customer'>
                                <label className='title-item-main-information-detail-booking-customer'>{languageList.txtInvoiceCode}</label>
                                <label>{bookingRaw.invoidceCode}</label>
                            </div>
                            <div className='item-main-information-detail-booking-customer'>
                                <label className='title-item-main-information-detail-booking-customer'>{languageList.txtBookingDate}</label>
                                <input type='date' value={bookingRaw.bookingDate} className='fake-label' disabled />
                            </div>
                            <div className='item-main-information-detail-booking-customer'>
                                <label className='title-item-main-information-detail-booking-customer'>{languageList.txtSightseeingDay}</label>
                                <input type='date' value={bookingRaw.startDate} className='fake-label' disabled />
                            </div>
                            <div className='item-main-information-detail-booking-customer'>
                                <label className='title-item-main-information-detail-booking-customer'>{languageList.txtNumberOfPeople}</label>
                                <label>{`${bookingRaw.numberOfAdult} ${languageList.txtAdult}, ${bookingRaw.numberOfChildren} ${languageList.txtChildren}`}</label>
                            </div>
                            {bookingRaw.tourType == 2 &&
                                <div className='item-main-information-detail-booking-customer'>
                                    <label className='title-item-main-information-detail-booking-customer'>{languageList.txtDepositPrice}</label>
                                    <label className='text-red'>{formatter.format(bookingRaw.deposit)}</label>
                                </div>
                            }
                            <div className='item-main-information-detail-booking-customer bd-none'>
                                <label className='title-item-main-information-detail-booking-customer'>{languageList.txtTotalPrice}</label>
                                <label className='text-red'>{formatter.format(bookingRaw.totalPrice)}</label>
                            </div>
                        </div>
                    }
                    {tabOption === 2 &&
                        <div className='fade-in'>
                            <div className='item-main-information-detail-booking-customer'>
                                <label className='title-item-main-information-detail-booking-customer'>{languageList.txtFullName}</label>
                                <label>{bookingRaw.fullName}</label>
                            </div>
                            <div className='item-main-information-detail-booking-customer'>
                                <label className='title-item-main-information-detail-booking-customer'>{languageList.txtPhone}</label>
                                <label>{bookingRaw.phone}</label>
                            </div>
                            <div className='item-main-information-detail-booking-customer'>
                                <label className='title-item-main-information-detail-booking-customer'>{languageList.txtEmail}</label>
                                <label>{bookingRaw.email}</label>
                            </div>
                            <div className='item-main-information-detail-booking-customer'>
                                <label className='title-item-main-information-detail-booking-customer'>{languageList.txtIdCard}</label>
                                <label>{bookingRaw.idCard}</label>
                            </div>
                            <div className='item-main-information-detail-booking-customer'>
                                <label className='title-item-main-information-detail-booking-customer'>{languageList.txtDateOfIssue}</label>
                                <input type='date' value={bookingRaw.dateOfIssue} className='fake-label' disabled />
                            </div>
                            <div className='item-main-information-detail-booking-customer'>
                                <label className='title-item-main-information-detail-booking-customer'>{languageList.txtPlaceOfIssue}</label>
                                <label>{bookingRaw.placeOfIssue}</label>
                            </div>
                            <div className='item-main-information-detail-booking-customer bd-none'>
                                <label className='title-item-main-information-detail-booking-customer'>{languageList.txtRequest}</label>
                                <label>{bookingRaw.request}</label>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default memo(RequestCancelDetail)