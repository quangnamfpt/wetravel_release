import { memo, useState, useEffect } from 'react'
import DatePicker, { registerLocale } from "react-datepicker";
import vi from 'date-fns/locale/vi';
import en from 'date-fns/locale/en-US';
import { BsCalendar4Week, BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { HiOutlineUserGroup } from 'react-icons/hi'
import { GrFormSubtract, GrFormAdd } from 'react-icons/gr'
import "react-datepicker/dist/react-datepicker.css";
import './PlaceAnOrder.scss'

function PlaceAnOrder({ languageList, languageSelected, tour, countAdult, setCountAdult, countChildren,
    setCountChildren, priceOrigin, setPriceOrigin, startDate, setStartDate, setOptionSelected }) {
    const today = new Date()
    const tomorowRaw = new Date(today.setDate(today.getDate() + 1)).toISOString().split('T')[0];
    const [open, setOpen] = useState(false)

    languageSelected === 'EN' ? registerLocale('format', en) : registerLocale('format', vi)

    const handleBlur = (input) => {
        input.style.border = 'solid 1px #D9D9D9'
    }

    const handleFocus = (input) => {
        input.style.border = 'solid 1px #4874E8'
    }

    const formatter = new Intl.NumberFormat('vi-VI', {
        style: 'currency',
        currency: 'VND'
    });

    useEffect(() => {
        const price = tour.adultPrice * countAdult + tour.childrenPrice * countChildren
        setPriceOrigin(price)
    }, [countAdult, countChildren])

    return (
        <div className='section-tour-detail space-place-an-order'>
            <div className='d-flex flex-order'>
                <div className='w-50 flex-item-order-left'>
                    <div className='title mb-10'>{languageList.txtSightseeingDay}</div>
                    <div className='d-flex input-place-order'>
                        <BsCalendar4Week className='icon-place-order' />
                        <input type='date' locale="format"
                            value={tour.type === 1 ? startDate : tour.startDate}
                            disabled={tour.type !== 1}
                            onFocus={(e) => handleFocus(e.target)} onBlur={(e) => handleBlur(e.target)}
                            className='date-picker-booking-tour'
                            min={tomorowRaw}
                            onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                </div>
                <div className='w-50 flex-item-order-right' onClick={() => setOpen(!open)}>
                    <div className='title mb-10'>{languageList.txtApplyFor}</div>
                    <div className='d-flex input-place-order'>
                        <HiOutlineUserGroup className='icon-place-order' />
                        <input type='text' value={`${countAdult} ${languageList.txtAdult}, ${countChildren} ${languageList.txtChildren}`}
                            onFocus={(e) => handleFocus(e.target)} onBlur={(e) => handleBlur(e.target)}
                            className='date-picker-booking-tour people-picker-place-order' disabled />
                        {open ? <BsChevronUp className='arrow-place-order' /> : <BsChevronDown className='arrow-place-order' />}
                    </div>
                </div>
            </div>
            {!open &&
                <button onClick={() => setOptionSelected(80)} className='d-block btn btn-warning btn-next-place-order'>{languageList.txtNext}</button>
            }
            {open &&
                <div className={`box-select-people mb-20 box-select-people-open`}>
                    <div className='d-flex box-select-people-right'>
                        <div className='mr-50 information-people'>
                            <div className='txt-ac'>{languageList.txtAdult}</div>
                            <div className='note-about-age'>{languageList.txtAdultAge}</div>
                        </div>
                        {tour.type === 1 ? <div className='price-select-people'>{formatter.format(tour.adultPrice)}</div>
                            :
                            <div className='price-select-people' />}
                        <GrFormSubtract onClick={() => setCountAdult(countAdult - 1)} className='icon-add-people' />
                        <input onChange={(e) => setCountAdult(e.target.value)} type='number' className='count-adult' value={countAdult} />
                        <GrFormAdd onClick={() => setCountAdult(parseInt(countAdult) + 1)} className='icon-add-people' />
                    </div>
                    <div className='d-flex box-select-people-right'>
                        <div className='mr-50 information-people'>
                            <div className='txt-ac'>{languageList.txtChildren}</div>
                            <div className='note-about-age'>{languageList.txtChildrenAge}</div>
                        </div>
                        {tour.type === 1 ? <div className='price-select-people'>{formatter.format(tour.childrenPrice)}</div>
                            :
                            <div className='price-select-people' />}
                        <GrFormSubtract onClick={() => setCountChildren(countChildren - 1)} className='icon-add-people' />
                        <input onChange={(e) => setCountChildren(e.target.value)} type='number' className='count-adult' value={countChildren} />
                        <GrFormAdd onClick={() => setCountChildren(parseInt(countChildren) + 1)} className='icon-add-people' />
                    </div>
                    {tour.type === 1 ?
                        <div className='count-total-price'>
                            <div>{languageList.txtTotalPrice}</div>
                            <div className='price-origin'>{formatter.format(priceOrigin)}</div>
                        </div>
                        :
                        <div className='count-total-price'>
                            <div>{languageList.txtDeposit}</div>
                            <div className='price-origin'>{formatter.format(tour.deposit)}</div>
                        </div>
                    }
                </div>
            }

        </div>
    )
}

export default memo(PlaceAnOrder)