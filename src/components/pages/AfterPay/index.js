import { memo, useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios'
import { API_ADD_BOOKING, API_PAY_TOUR, API_PAY_DEPOSIT_TOUR } from '../../API'
import LoadingDialog from '../../Layout/LoadingDialog'
import { toast } from 'react-toastify'

function AfterPay() {
    //Mastercard
    //partnerCode=MOMO&orderId=1667983950744&requestId=1667983950744&amount=6800000&orderInfo=Tour+Bái+Đính+-+10+Adult%2C+4+Children&orderType=momo_wallet&transId=2787130271&resultCode=0&message=Giao+dịch+thành+công.&payType=credit&responseTime=1667984079748&extraData=&signature=2e5204a9a17619a1ec242264e1320048210ef35fa38959b20bed1bec38ca6838

    //Momo
    //partnerCode=MOMO&orderId=1667984196662&requestId=1667984196662&amount=500000&orderInfo=Tour+Bái+Đính+-+1+Adult%2C+0+Children&orderType=momo_wallet&transId=2787130349&resultCode=0&message=Giao+dịch+thành+công.&payType=qr&responseTime=1667984243232&extraData=&signature=100e926d02fd3affbd8f488f5c610c02771f8cd9c7fae4ef47cb8b6db4293a9e

    //tourId=1&isDeposit=true&bookingId=-1&isUpdate=false&partnerCode=MOMO&orderId=1668445407338&requestId=1668445407338&amount=500000&orderInfo=Test+tour+custom+-+1+Người+lớn%2C+0+Trẻ+em&orderType=momo_wallet&transId=1668445414067&resultCode=1006&message=Giao+dịch+bị+từ+chối+bởi+người+dùng.&payType=&responseTime=1668445414091&extraData=&signature=049586ed30f6807ed6aa3fb728f174e336be546aca2312089c5ce584e375d72f

    const [addBookingComplete, setAddBookingComplete] = useState(false)
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    let cookie = {};
    document.cookie.split(';').forEach(function (el) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
    })

    const language = !cookie['languageSelected'] ? 'EN' : cookie['languageSelected']

    const booking = {
        tourId: urlParams.get('tourId'),
        isDeposit: urlParams.get('isDeposit'),
        orderId: urlParams.get('orderId'),
        totalPrice: urlParams.get('amount'),
        orderTitle: urlParams.get('orderInfo'),
        result: urlParams.get('resultCode') == 0,
        payType: urlParams.get('payType'),
        bookingId: urlParams.get('bookingId'),
        isUpdate: urlParams.get('isUpdate'),
        fullName: urlParams.get('fullName'),
        phone: urlParams.get('phone'),
        email: urlParams.get('email'),
        promoCode: urlParams.get('promoCode'),
        request: urlParams.get('request'),
        idCard: urlParams.get('idCard'),
        dateOfIssue: urlParams.get('dateOfIssue'),
        placeOfIssue: urlParams.get('placeOfIssue'),
        startDate: urlParams.get('startDate'),
        numberOfAdult: urlParams.get('numberOfAdult'),
        numberOfChildren: urlParams.get('numberOfChildren'),
        bookingDate: new Date().toISOString().split("T")[0],
        accountId: sessionStorage.getItem('id'),
        status: urlParams.get('type') == 1 ? 1 : 0,
        statusDeposit: urlParams.get('type') == 1 ? 0 : 1,
        adultPrice: urlParams.get('adultPrice'),
        childrenPrice: urlParams.get('childrenPrice')
    }

    useEffect(() => {
        if (booking.result) {
            if (booking.isUpdate == 'false') {
                axios.post(API_ADD_BOOKING, booking).then(() => {
                    setAddBookingComplete(true)
                    toast.success(language === 'EN' ? 'Booking success' : 'Đặt thành công')
                })
            }
            else if (booking.isUpdate == 'true') {
                if (booking.isDeposit == 'true') {
                    axios.post(`${API_PAY_DEPOSIT_TOUR}?userBookingId=${booking.bookingId}&statusDeposit=1`).then(() => {
                        setAddBookingComplete(true)
                        toast.success(language === 'EN' ? 'Successful deposit' : 'Đặt cọc thành công')
                    }).catch(() => toast.error('error'))
                }
                else {
                    axios.post(`${API_PAY_TOUR}?userBookingId=${booking.bookingId}&status=1`).then(() => {
                        setAddBookingComplete(true)
                        toast.success(language === 'EN' ? 'Successful booking' : 'Đặt thành công')
                    }).catch(() => toast.error('error'))
                }
            }
        }
        else {
            setAddBookingComplete(true)
        }
    }, [])

    if (!addBookingComplete) {
        return (<LoadingDialog />)
    }

    return (<Navigate to={`${booking.result ? '/profile' : '/tours'}`} />)
}

export default memo(AfterPay)