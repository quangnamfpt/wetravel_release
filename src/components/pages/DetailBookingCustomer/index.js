import { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { english, vietnamese } from '../../Languages/DetailBookingCustomer'
import './DetailBookingCustomer.scss'

function DetailBookingCustomer({ languageSelected, booking, isDisabled, setShowDetail }) {
    const languageList = languageSelected == 'EN' ? english : vietnamese
    const [tabOption, setTabOption] = useState(0)

    const navigate = useNavigate()

    const bookingRaw = {
        ...booking
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND'
    });

    const handleClickViewTour = () => {
        if (isDisabled) {
            navigate('/admin/preview', { state: { id: bookingRaw.tourId } })
        }
        else {
            navigate('/tour-detail', { state: { id: bookingRaw.tourId } })
        }
    }

    return (
        <div className='detail-booking-customer'>
            <div className='title header-title d-flex space-between'>
                <header>{languageList.txtOrderDetail}</header>
                <label onClick={() => setShowDetail(false)} className='back-link'>X</label>
            </div>
            <div className='d-flex tab-flex'>
                <label onClick={() => setTabOption(0)} className={`item-tab ${tabOption === 0 && 'item-tab-selected'}`}>{languageList.txtInvoiceInformation}</label>
                <label onClick={() => setTabOption(1)} className={`item-tab ${tabOption === 1 && 'item-tab-selected'}`}>{languageList.txtInformationContact}</label>
            </div>
            <div className='main-content-detail-booking-customer'>
                <div className='d-flex space-between header-center-all-item mb-20'>
                    <header className='title m-0 font-20'>{booking.tourName}</header>
                    <label onClick={handleClickViewTour} className='link-detail-tour'>{languageList.txtViewTour}</label>
                </div>
                <div className='main-information-detail-booking-customer'>
                    {tabOption === 0 ?
                        <>
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
                                <label className='text-red'>{formatter.format(bookingRaw.price)}</label>
                            </div>
                        </>
                        :
                        <>
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
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default memo(DetailBookingCustomer)