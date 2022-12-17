import { memo } from 'react'
import { toast } from 'react-toastify';
import Momo from '../Momo'
import './BookingDetail.scss'

function BookingDetail({ languageList, setOptionSelected, tour, startDate, countAdult, countChildren, languageSelected, priceOrigin
    , fullName, setFullName, phone, setPhone, email, setEmail, idCard, setIdCard, dateOfIssue, setDateOfIssue, placeOfIssue, setPlaceOfIssue,
    promoCode, setPromoCode, request, setRequest }) {

    const today = new Date().toISOString().split('T')[0];

    const formatter = new Intl.NumberFormat('vi-VI', {
        style: 'currency',
        currency: 'VND',
        currencyDisplay: 'code'
    });

    const handleClickPayNow = (orderInfo, price) => {
        if ((tour.type === 1 && startDate === '') || fullName === '' || phone === '' || email === '' || idCard === '' || dateOfIssue === '' || placeOfIssue === '') {
            toast.error(languageList.txtWarningFullInformation)
        }
        else if (!/^[A-Za-z ]/.test(fullName) || !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            toast.error(languageList.txtInvalidInformation)
        }
        else {
            const requestId = Date.now()
            const isDeposit = tour.type == 2
            let priceRaw = isDeposit ? tour.deposit : price
            let startDateRaw = tour.type != 1 ? tour.startDate : startDate

            Momo(requestId, orderInfo, priceRaw, tour.id, isDeposit, -1, false, fullName, phone, email, promoCode, request,
                idCard, dateOfIssue, placeOfIssue, startDateRaw, countAdult, countChildren, tour.type, tour.adultPrice, tour.childrenPrice)
        }
    }

    const handleCheckDateOfIssue = () => {
        if (dateOfIssue !== '' && dateOfIssue > today) {
            setDateOfIssue(today)
        }
    }

    return (
        <div>
            <div className='d-flex'>
                <div className='section-tour-detail w-65 mr-10'>
                    <div className="line-input">
                        <div className="input-alone">
                            <label className="d-block title-create-tour font-18">{languageList.txtContact}</label>
                            <div className="d-flex line-input mt-20">
                                <div className="mlr-20 input-alone">
                                    <label className="d-block title-create-tour">{languageList.txtFullName}<span className="requird-star">*</span></label>
                                    <input value={fullName} onChange={(e) => setFullName(e.target.value)} className="input-inline" placeholder={languageList.txtEnterFullName} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex line-input">
                        <div className='w-45 mlr-20'>
                            <label htmlFor="numberOfRoom" className="d-block title-create-tour">{languageList.txtPhone}<span className="requird-star">*</span></label>
                            <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder={languageList.txtEnterPhone} className="input-inline" />
                        </div>
                        <div className='w-45 mlr-20'>
                            <label htmlFor="bedType" className="d-block title-create-tour">{languageList.txtEmail}<span className="requird-star">*</span></label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder={languageList.txtEnterEmail} className='input-inline' />
                        </div>
                    </div>
                    <div className="line-input">
                        <div className="input-alone">
                            <div className="d-flex line-input">
                                <div className="mlr-20 input-alone">
                                    <label className="d-block title-create-tour">{languageList.txtIdCard}<span className="requird-star">*</span></label>
                                    <input type='number' value={idCard} onChange={(e) => setIdCard(e.target.value)} className="input-inline" placeholder={languageList.txtIdCard} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex line-input">
                        <div className='w-45 mlr-20'>
                            <label htmlFor="numberOfRoom" className="d-block title-create-tour">{languageList.txtDateOfIssue}<span className="requird-star">*</span></label>
                            <input type='date' onBlur={handleCheckDateOfIssue} value={dateOfIssue} onChange={(e) => setDateOfIssue(e.target.value)} max={today} className="input-inline" />
                        </div>
                        <div className='w-45 mlr-20'>
                            <label htmlFor="bedType" className="d-block title-create-tour">{languageList.txtPlaceOfIssue}<span className="requird-star">*</span></label>
                            <input value={placeOfIssue} onChange={(e) => setPlaceOfIssue(e.target.value)} placeholder={languageList.txtPlaceOfIssue} className='input-inline' />
                        </div>
                    </div>
                    <div className="line-input">
                        <div className="input-alone">
                            <div className="d-flex line-input">
                                <div className="mlr-20 input-alone">
                                    <label className="d-block title-create-tour">{languageList.txtRequest}</label>
                                    <textarea value={request} onChange={(e) => setRequest(e.target.value)} rows="4" className="input-inline" placeholder={languageList.txtEnterRequest} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => handleClickPayNow(`${tour.name} - ${countAdult} ${languageList.txtAdult}, ${countChildren} ${languageList.txtChildren}`, priceOrigin)}
                        className='btn btn-warning btn-next-place-order float-end'>{tour.type != 2 ? languageList.txtPay : languageList.txtPayDeposit}</button>
                </div>
                <div className='w-35'>
                    <div className='section-tour-detail ml-10 p-10'>
                        <div className="title-create-tour text-center mt-10 font-18">{languageList.txtOrderInformation}</div>
                        <div className='mt-50 d-flex'>
                            <img className='image-information-order' src={tour.images[0]} />
                            <label className='title-create-tour font-14 ml-10'>{tour.name}</label>
                        </div>
                        <div className='mt-20 d-flex'>
                            <label className='title-create-tour font-14 w-50'>{languageList.txtSightseeingDay}</label>
                            <input type='date' disabled className='fake-label font-14' value={tour.type == 1 ? startDate : tour.startDate} />
                        </div>
                        <div className='mt-20 d-flex mb-10'>
                            <label className='title-create-tour font-14 w-50'>{languageList.txtApplyFor}</label>
                            <div className='font-14'>
                                <div>{languageList.txtAdult}: {countAdult}</div>
                                <div className='mt-10'>{languageList.txtChildren}: {countChildren}</div>
                            </div>
                        </div>
                        {tour.type === 1 ?
                            <div className='d-flex totle-money-details'>
                                <div className='w-50 title-create-tour font-14'>{languageList.txtTotalPrice}</div>
                                <div className='w-50'>{formatter.format(priceOrigin)}</div>
                            </div>
                            :
                            <div className='d-flex totle-money-details'>
                                <div className='w-50 title-create-tour font-14'>{languageList.txtDeposit}</div>
                                <div className='w-50'>{formatter.format(tour.deposit)}</div>
                            </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(BookingDetail)