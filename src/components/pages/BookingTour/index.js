import { memo, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Order from '../../images/order.png'
import Detail from '../../images/detail.png'
import { english, vietnamese } from '../../Languages/BookingTour'
import PlaceAnOrder from '../PlaceAnOrder'
import BookingDetail from '../BookingDetail'
import './BookingTour.scss'

function BookingTour({ languageSelected }) {
    const [optionSelected, setOptionSelected] = useState(0)
    const languageList = (languageSelected === 'EN' ? english : vietnamese)
    const data = useLocation()
    const tour = data.state.data

    useEffect(() => {
        window.scroll(0, 0)
    }, [optionSelected])

    const [startDate, setStartDate] = useState('')

    const [countAdult, setCountAdult] = useState(1)
    const [countChildren, setCountChildren] = useState(0)
    const [priceOrigin, setPriceOrigin] = useState(tour.adultPrice)

    const [fullName, setFullName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [idCard, setIdCard] = useState('')
    const [dateOfIssue, setDateOfIssue] = useState('')
    const [placeOfIssue, setPlaceOfIssue] = useState('')
    const [promoCode, setPromoCode] = useState('')
    const [request, setRequest] = useState('')

    return (
        <div className='home-main'>
            <div className='background-tour-detail' />
            <div className='p-booking-tour'>
                <div className='line-booking-tour' style={{ width: `${optionSelected}%` }} />
                <div className='d-flex tag-booking-tour'>
                    <div onClick={() => setOptionSelected(0)} className='item-tag-booking-tour'>
                        <img src={Order} className='image-booking-tour step-booking' />
                        <div>{languageList.txtTag1}</div>
                    </div>
                    <div onClick={() => setOptionSelected(80)} className='item-tag-booking-tour'>
                        <img src={Detail} className={`image-booking-tour ${optionSelected >= 40 && 'step-booking'}`} />
                        <div>{languageList.txtTag2}</div>
                    </div>
                </div>
            </div>
            <div className='container p-content-booking'>
                {
                    (optionSelected === 0 && <PlaceAnOrder countAdult={countAdult} setCountAdult={setCountAdult}
                        countChildren={countChildren} setCountChildren={setCountChildren}
                        priceOrigin={priceOrigin} setPriceOrigin={setPriceOrigin} startDate={startDate} setStartDate={setStartDate}
                        languageList={languageList} languageSelected={languageSelected} tour={tour} setOptionSelected={setOptionSelected} />) ||
                    (optionSelected === 80 && <BookingDetail languageList={languageList} languageSelected={languageSelected}
                        tour={tour} setOptionSelected={setOptionSelected} startDate={startDate} countAdult={countAdult}
                        countChildren={countChildren} priceOrigin={priceOrigin}
                        fullName={fullName} setFullName={setFullName} phone={phone} setPhone={setPhone} email={email} setEmail={setEmail}
                        promoCode={promoCode} setPromoCode={setPromoCode} request={request} setRequest={setRequest}
                        idCard={idCard} setIdCard={setIdCard} dateOfIssue={dateOfIssue} setDateOfIssue={setDateOfIssue}
                        placeOfIssue={placeOfIssue} setPlaceOfIssue={setPlaceOfIssue}
                    />)
                }
            </div>
        </div>
    )
}

export default memo(BookingTour)