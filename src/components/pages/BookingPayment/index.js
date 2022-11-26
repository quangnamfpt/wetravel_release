import { memo } from 'react'
import './BookingPayment.scss'
import Momo from '../Momo'
import MomoLogo from '../../images/momo.png'

function BookingPayment({ languageList, countAdult, countChildren, priceOrigin, tour, fullName, phone, email,
    promoCode, request, idCard, dateOfIssue, placeOfIssue, startDate }) {
    const handleClickPayNow = (orderInfo, price) => {
        const requestId = Date.now()
        const isDeposit = tour.type == 2
        let priceRaw = isDeposit ? tour.deposit : price
        let startDateRaw = tour.type != 1 ? tour.startDate : startDate

        Momo(requestId, orderInfo, priceRaw, tour.id, isDeposit, -1, false, fullName, phone, email, promoCode, request,
            idCard, dateOfIssue, placeOfIssue, startDateRaw, countAdult, countChildren, tour.type, tour.adultPrice, tour.childrenPrice)
    }

    return (
        <div className='section-tour-detail p-method-payment'>
            <div className='d-flex method-payment'>
                <div className='d-flex select-payment'>
                    <input className='mr-10' type='radio' checked />
                    <label className='title-create-tour font-20'>{languageList.txtMomo}</label>
                </div>
                <img src={MomoLogo} className='payment-logo' />
            </div>
            <button onClick={() => handleClickPayNow(`${tour.name} - ${countAdult} ${languageList.txtAdult}, ${countChildren} ${languageList.txtChildren}`, priceOrigin)}
                className='btn btn-warning btn-pay-now'>{tour.type != 2 ? languageList.txtPay : languageList.txtPayDeposit}</button>
        </div>
    )
}

export default memo(BookingPayment)