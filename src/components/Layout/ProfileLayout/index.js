import { memo, useState, useEffect } from 'react'
import './ProfileLayout.scss'
import EditProfileIcon from '../../images/editUser.png'
import HistoryBookingIcon from '../../images/bookingHistory.png'
import { english, vietnamese } from '../../Languages/ProfileLayout'
import EditProfile from '../../pages/EditProfile'
import HistoryBookingCustomer from '../../pages/HistoryBookingCustomer'
import { StickyContainer, Sticky } from 'react-sticky';
import axios from 'axios'
import LoadingDialog from '../LoadingDialog'
import { API_LIST_BOOKING_BY_ACCOUNTID, API_GET_DETAIL_CUSTOMER } from '../../API'
import EditProfilePartner from '../../pages/EditProfilePartner'

function ProfileLayout({ languageSelected }) {
    const menu = languageSelected === 'EN' ? english : vietnamese
    const [customer, setCustomer] = useState({})

    const [listBooking, setListBooking] = useState([])
    const [numberPage, setNumberPage] = useState(1)
    const [numberOfPages, setNumberOfPages] = useState([])

    const [option, setOption] = useState(0)

    const id = sessionStorage.getItem('id')

    useEffect(() => {
        if (sessionStorage.getItem('role') == 3) {
            axios.get(API_GET_DETAIL_CUSTOMER + id, {
            }).then((response) => {
                let customerDetailData = {
                    firstName: response.data.data.firstName,
                    lastName: response.data.data.lastName,
                    birthDate: response.data.data.birthDate,
                    gender: response.data.data.gender,
                    address: response.data.data.address,
                    city: response.data.data.city,
                    phone: response.data.data.phone,
                    email: response.data.data.email
                }
                setCustomer(customerDetailData)
                axios.get(API_LIST_BOOKING_BY_ACCOUNTID, {
                    params: {
                        accountId: id,
                        page: 1,
                        size: 99999
                    }
                }).then((response) => {
                    let totalPage = response.data.data.totalPages
                    let numberOfPagesRaw = []
                    for (let i = 0; i < totalPage; i++) {
                        numberOfPagesRaw.push(i + 1)
                    }
                    let listBookingRaw = []
                    response.data.data.content.map((bookingItem) => {
                        const bookingItemRaw = {
                            bookingId: bookingItem.userBookingId,
                            tourId: bookingItem.tourId,
                            tourName: bookingItem.tourName,
                            startDate: bookingItem.startDate,
                            numberOfAdult: bookingItem.numberOfAdult,
                            numberOfChildren: bookingItem.numberOfChildren,
                            tourType: bookingItem.tourType,
                            status: bookingItem.status,
                            deposit: bookingItem.deposit,
                            price: bookingItem.totalPrice,
                            statusDeposit: bookingItem.statusDeposit,
                            invoidceCode: bookingItem.orderId,
                            bookingDate: bookingItem.bookingDate,
                            fullName: bookingItem.fullName,
                            phone: bookingItem.phone,
                            email: bookingItem.email,
                            idCard: bookingItem.idCard,
                            dateOfIssue: bookingItem.dateOfIssue,
                            placeOfIssue: bookingItem.placeOfIssue,
                            request: bookingItem.request,
                            isFeedback: bookingItem.isFeedback,
                            tourStatus: bookingItem.tourStatus,
                        }
                        listBookingRaw.push(bookingItemRaw)
                    })
                    setNumberOfPages([...numberOfPagesRaw])
                    setListBooking(listBookingRaw)
                })
            })
        }
    }, [numberPage])

    return (
        <>
            {
                sessionStorage.getItem('role') == 3 ?
                    <div className='container pd-profile' >
                        <StickyContainer>
                            <div className='d-flex mt-20 mb-20'>
                                <div className='w-20'>
                                    <Sticky>
                                        {({ style }) => (
                                            <div style={style} className='menu-profile'>
                                                <div onClick={() => setOption(0)} className={`w-100 option-menu-profile mb-20 ${option === 0 && 'option-menu-profile-selected'}`}>
                                                    <img src={EditProfileIcon} className='icon-image-profile' />
                                                    <label>{menu.txtEditProfile}</label>
                                                </div>
                                                <div onClick={() => setOption(1)} className={`w-100 option-menu-profile mb-20 ${option === 1 && 'option-menu-profile-selected'}`}>
                                                    <img src={HistoryBookingIcon} className='icon-image-profile' />
                                                    <label>{menu.txtHistoryBooking}</label>
                                                </div>
                                            </div>
                                        )}
                                    </Sticky>
                                </div>
                                <div className='w-80 main-content-profile'>
                                    {option === 0 ?
                                        <EditProfile languageSelected={languageSelected} customer={customer} setCustomer={setCustomer} />
                                        :
                                        <HistoryBookingCustomer numberOfPages={numberOfPages} numberPage={numberPage} setNumberPage={setNumberPage} listBooking={listBooking} setListBooking={setListBooking} languageSelected={languageSelected} />}
                                </div>
                            </div>
                        </StickyContainer>
                    </div>
                    :
                    <EditProfilePartner languageSelected={languageSelected} />
            }
        </>
    )
}

export default memo(ProfileLayout)