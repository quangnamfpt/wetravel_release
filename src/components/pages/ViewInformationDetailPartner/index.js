import { memo, useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import City from '../../Data/city.json'
import axios from "axios";
import LoadingDialog from "../../Layout/LoadingDialog";
import Bg from '../../images/bgHome.jpg'
import Question from '../../images/question.png'
import { useLocation } from "react-router-dom";
import { english, vietnamese } from "../../Languages/RegisterProfilePartner";
import { english as englishDetailPartner, vietnamese as vietnameseDetailPartner, englishService, vietnameseService } from "../../Languages/ViewInformationDetailPartner"
import { english as englishTablePartner, vietnamese as vietnameseTablePartner } from '../../Languages/TableListPartner'
import './ViewInformationDetailPartner.scss'
import { API_LIST_BOOKING_BY_ACCOUNTID, API_GET_SERVICE_BY_CONDITION, API_ACTIVE_ACCOUNT, API_BLOCK_ACCOUNT } from '../../API';
import HistoryBookingCustomer from "../HistoryBookingCustomer";
import ConfirmDialog from '../../Layout/ConfirmDialog'
import { toast } from 'react-toastify'
import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from "../../../firebase/Config";

function ViewInformationDetailPartner({ languageSelected }) {
    const navigate = useNavigate()

    const languageList = languageSelected === 'EN' ? english : vietnamese
    const languageMore = languageSelected === 'EN' ? englishDetailPartner : vietnameseDetailPartner
    const languageService = languageSelected === 'EN' ? englishService : vietnameseService
    const table = languageSelected === 'EN' ? englishTablePartner : vietnameseTablePartner

    const [optionSelected, setOptionSelected] = useState(0)

    const [getDataComplete, setGetDataComplete] = useState(false)
    const [partner, setPartner] = useState(useLocation().state.id)

    const [showConfirm, setShowConfirm] = useState(false)
    const [titleConfirm, setTitleConfirm] = useState('asd')
    const [contentConfirm, setContentConfirm] = useState('asd')
    const callbackConfirm = useRef(() => { })
    const [isRed, setIsRed] = useState(true)
    const [textOk, setTextOk] = useState('Ok')
    const [textCancel, setTextCancel] = useState('Cancel')

    //nếu có 2 api riêng thì tách 2 biến như này
    const [listService, setListService] = useState([])
    const [listBooking, setListBooking] = useState([])
    const [numberPage, setNumberPage] = useState(1)
    const [numberOfPages, setNumberOfPages] = useState([])

    const getListBookingByAccountId = () => {
        axios.get(API_LIST_BOOKING_BY_ACCOUNTID, {
            params: {
                accountId: partner.accountId,
                page: numberPage,
                size: 10
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
                    request: bookingItem.request
                }
                listBookingRaw.push(bookingItemRaw)
            })
            setNumberOfPages([...numberOfPagesRaw])
            setListBooking(listBookingRaw)
            setGetDataComplete(true)
        }).catch((e) => {
            setGetDataComplete(true)
        })
    }

    useEffect(() => {
        axios.get(API_GET_SERVICE_BY_CONDITION, {
            params: {
                emailPartner: partner.email,
                page: 1,
                size: 99999
            }
        }).then((res) => {
            const data = res.data.data.content
            let servicesRaw = []
            let leng = 0
            data.map((service) => {
                let serviceRaw = service
                const refAccommodation = ref(storage, `/service/accomodation/${service.serviceId}/information/receptionHallPhoto/image-0`)
                const refEntertainment = ref(storage, `/service/entertainment/${service.serviceId}/information/receptionHallPhoto/image-0`)
                const refRestaurant = ref(storage, `/service/restaurant/${service.serviceId}/information/receptionHallPhoto/image-0`)
                let refData
                if (service.serviceCategory === 1) {
                    refData = refAccommodation
                } else if (service.serviceCategory === 2) {
                    refData = refEntertainment
                } else {
                    refData = refRestaurant
                }
                getDownloadURL(refData)
                    .then((url) => {
                        serviceRaw.image = url
                        servicesRaw.push(service)
                        leng++
                        if (leng == data.length) {
                            setListService(servicesRaw)
                            getListBookingByAccountId()
                        }
                    })
            })
        }).catch((e) => {
            getListBookingByAccountId()
        })
    }, [])

    const handleClickBlock = () => {
        axios.put(API_BLOCK_ACCOUNT + partner.accountId).then(() => {
            setPartner({ ...partner, isBlock: true })
            toast.success(table.txtBlocked)
            setShowConfirm(false)
        }).catch(() => {
        })
    }

    const handleClickUnblock = () => {
        axios.put(API_ACTIVE_ACCOUNT + partner.accountId).then(() => {
            setPartner({ ...partner, isBlock: false })
            toast.success(table.txtUnblocked)
            setShowConfirm(false)
        }).catch(() => {
        })
    }

    const handleClickShowConfig = (title, content, callback, isRed, textOk, textCancel) => {
        setShowConfirm(true)
        setTitleConfirm(title)
        setContentConfirm(content)
        callbackConfirm.current = callback
        setIsRed(isRed)
        setTextOk(textOk)
        setTextCancel(textCancel)
    }

    if (!getDataComplete) {
        return (
            <LoadingDialog />
        )
    }

    return (
        <div className='main-content-view-service-admin right-content-create-tour'>
            {showConfirm &&
                <ConfirmDialog textOk={textOk} textCancel={textCancel} title={titleConfirm} content={contentConfirm} callback={callbackConfirm.current} isRed={isRed} setShowDialog={setShowConfirm} />
            }
            <nav className='d-flex nav-view-service-admin'>
                <div onClick={() => setOptionSelected(0)}
                    className={`item-nav-view-service-admin 
                ${optionSelected == 0 ? 'item-nav-view-service-admin-selected' : 'item-nav-view-service-admin-unselected'}
                br-left-top`}>
                    {languageMore.txtDetails}
                </div>

                <div onClick={() => setOptionSelected(1)}
                    className={`item-nav-view-service-admin 
                ${optionSelected == 1 ? 'item-nav-view-service-admin-selected' : 'item-nav-view-service-admin-unselected'}
                br-right-top`}>
                    {languageMore.txtListService}
                </div>

                <div onClick={() => setOptionSelected(2)}
                    className={`item-nav-view-service-admin 
                ${optionSelected == 2 ? 'item-nav-view-service-admin-selected' : 'item-nav-view-service-admin-unselected'}
                br-right-top`}>
                    {languageMore.txtHistoryBooking}
                </div>
            </nav>

            {optionSelected === 0 ?
                <div className="fade-in form-input-all-profile-partner p-0">
                    <div>
                        <div className="input-profile-company-form m-0 w-100 bd-top-none">
                            <div className="d-flex space-between flex-item-center mlr-20 mb-20">
                                <label className="title-form-input m-0">{languageList.txtCompany}</label>
                                {partner.isBlock ?
                                    <button className="btn btn-success btn-block"
                                        onClick={() => handleClickShowConfig(table.txtUnblock, table.txtWarningUnblock,
                                            handleClickUnblock, false, table.txtUnblock, table.txtCancel)}>
                                        {languageSelected === 'EN' ? 'Unblock' : 'Mở khoá'}
                                    </button>
                                    :
                                    <button className="btn btn-danger btn-block"
                                        onClick={() => handleClickShowConfig(table.txtBlock, table.txtWarningBlock,
                                            handleClickBlock, true, table.txtBlock, table.txtCancel)}>
                                        {languageSelected === 'EN' ? 'Block' : 'Khoá'}
                                    </button>
                                }
                            </div>
                            <div className="d-flex line-input">
                                <div className="mlr-50 ">
                                    <label htmlFor="companyName" className="d-block">{languageList.txtName}<span className="requird-star">*</span></label>
                                    <input disabled value={partner.companyName}
                                        id='companyName' className="input-inline" type='text' />
                                </div>
                                <div className="mlr-50">
                                    <label className="d-block">{languageList.txtAbbreviation}</label>
                                    <input disabled value={partner.shortName}
                                        className="input-inline" type='text' />
                                </div>
                            </div>
                            <div className="d-flex line-input">
                                <div className="mlr-50 ">
                                    <label htmlFor="companyEmail" className="d-block">{languageList.txtEmail}<span className="requird-star">*</span></label>
                                    <input disabled value={partner.emailContactCompany}
                                        id='companyEmail'
                                        className="input-inline" type='text' />
                                </div>
                                <div className="mlr-50">
                                    <label htmlFor="companyPhone" className="d-block">{languageList.txtPhone}<span className="requird-star">*</span></label>
                                    <input disabled value={partner.phoneCompany}
                                        id='companyPhone'
                                        className="input-inline" type='text' />
                                </div>
                            </div>
                            <div className="d-flex line-input">
                                <div className="mlr-50 ">
                                    <label htmlFor="companyCity" className="d-block">{languageList.txtCity}<span className="requird-star">*</span></label>
                                    <select disabled
                                        id='companyCity'
                                        className="input-inline">
                                        <option value={partner.cityCompany}>{partner.cityCompany}</option>
                                    </select>
                                </div>
                                <div className="mlr-50">
                                    <label htmlFor="companyAddress" className="d-block">{languageList.txtAddress}<span className="requird-star">*</span></label>
                                    <input disabled value={partner.addressCompany}
                                        id='companyAddress'
                                        className="input-inline" type='text' />
                                </div>
                            </div>
                            <div className="d-flex line-input">
                                <div className="mlr-50 input-alone">
                                    <label htmlFor="companyWebsite" className="d-block">{languageList.txtWebsite}</label>
                                    <input disabled value={partner.website}
                                        id='companyWebsite'
                                        className="input-inline" type='text' />
                                </div>
                            </div>
                            <div className="d-flex line-input">
                                <div className="mlr-50 ">
                                    <label htmlFor="companyFax" className="d-block">{languageList.txtFax}</label>
                                    <input disabled value={partner.fax}
                                        id='companyFax'
                                        className="input-inline" type='text' />
                                </div>
                                <div className="mlr-50">
                                    <label htmlFor="companyTaxCode" className="d-block">{languageList.txtTaxCode}<span className="requird-star">*</span></label>
                                    <input disabled value={partner.taxCode}
                                        id='companyTaxCode'
                                        className="input-inline" type='text' />
                                </div>
                            </div>
                            <div className="d-flex line-input">
                                <div className="mlr-50 input-alone">
                                    <label htmlFor="companyBusinessRegistration" className="d-block">{languageList.txtBusinessRegistration}<span className="requird-star">*</span></label>
                                    <input disabled value={partner.businessLicenseCode}
                                        id='companyBusinessRegistration'
                                        className="input-inline" type='text' />
                                </div>
                            </div>
                            <div className="d-flex line-input">
                                <div className="mlr-50 ">
                                    <label htmlFor="companyRegistrationDate" className="d-block">{languageList.txtRegistrationDate}<span className="requird-star">*</span></label>
                                    <input type='date' disabled value={partner.registrationDate}
                                        id='companyRegistrationDate'
                                        className="input-inline" />
                                </div>
                                <div className="mlr-50">
                                    <label htmlFor="companyFoundingDate" className="d-block">{languageList.txtFoundingDate}<span className="requird-star">*</span></label>
                                    <input type='date' disabled value={partner.incorporationDate}
                                        id='companyFoundingDate' className="input-inline" />
                                </div>
                            </div>
                        </div>

                        <div className="input-profile-company-form mt-20 w-100">
                            <label className="ml-20 title-form-input">{languageList.txtContact}</label>
                            <div className="d-flex line-input">
                                <div className="mlr-50 ">
                                    <label htmlFor="contactFirstName" className="d-block">{languageList.txtFirstName}<span className="requird-star">*</span></label>
                                    <input disabled value={partner.firstName}
                                        id='contactFirstName' className="input-inline" type='text' />
                                </div>
                                <div className="mlr-50">
                                    <label htmlFor="contactLastName" className="d-block">{languageList.txtLastName}<span className="requird-star">*</span></label>
                                    <input disabled value={partner.lastName}
                                        id='contactLastName' className="input-inline" type='text' />
                                </div>
                            </div>
                            <div className="d-flex line-input">
                                <div className="mlr-50 ">
                                    <label htmlFor="contactGender" className="d-block">{languageList.txtGender}</label>
                                    <select disabled id='contactGender' className="input-inline input-4-item">
                                        <option selected={partner.gender == '1'} value='1'>{languageSelected === 'EN' ? 'Male' : 'Nam'}</option>
                                        <option selected={partner.gender == '2'} value='2'>{languageSelected === 'EN' ? 'Female' : 'Nữ'}</option>
                                        <option selected={partner.gender == '3'} value='3'>{languageSelected === 'EN' ? 'Other' : 'Khác'}</option>
                                    </select>
                                </div>
                                <div className="mlr-50 ">
                                    <label htmlFor="contactBirthdate" className="d-block">{languageList.txtBirthdate}</label>
                                    <input type='date' disabled value={partner.birthDate}
                                        id='contactBirthdate' className="input-inline input-4-item" />
                                </div>
                            </div>
                            <div className="d-flex line-input">
                                <div className="mlr-50">
                                    <label htmlFor="contactEmail" className="d-block">{languageList.txtEmail}<span className="requird-star">*</span></label>
                                    <input disabled value={partner.emailContact}
                                        id='contactEmail' className="input-inline" type='text' />
                                </div>
                                <div className="mlr-50">
                                    <label htmlFor="contactPhone" className="d-block">{languageList.txtPhone}<span className="requird-star">*</span></label>
                                    <input disabled value={partner.phone}
                                        id='contactPhone'
                                        className="input-inline" type='text' />
                                </div>
                            </div>
                            <div className="d-flex line-input">
                                <div className="mlr-50 ">
                                    <label htmlFor="contactCity" className="d-block">{languageList.txtCity}</label>
                                    <select disabled
                                        id='contactCity'
                                        className="input-inline">
                                        <option value={partner.cityContact}>{partner.cityContact}</option>
                                    </select>
                                </div>
                                <div className="mlr-50">
                                    <label htmlFor="contactAddress" className="d-block">{languageList.txtAddress}</label>
                                    <input disabled value={partner.addressContact}
                                        id='contactAddress'
                                        className="input-inline" type='text' />
                                </div>
                            </div>
                            <div className="d-flex line-input">
                                <div className="mlr-50 ">
                                    <label htmlFor="contactPosition" className="d-block">{languageList.txtPositions}</label>
                                    <input disabled value={partner.position}
                                        id='contactPosition'
                                        className="input-inline" type='text' />
                                </div>
                                <div className="mlr-50">
                                    <label htmlFor="contactDepartment" className="d-block">{languageList.txtDepartment}</label>
                                    <input disabled value={partner.department}
                                        id='contactEmail' className="input-inline" type='text' />
                                </div>
                            </div>
                            <div className="d-flex line-input line-4-item">
                                <div className="mlr-50 form-2-on-4-left">
                                    <label htmlFor="contactIDCardNumber" className="d-block">{languageList.txtIdCardNumber}</label>
                                    <input disabled value={partner.numberIdCard}
                                        className="input-inline" type='text' />
                                </div>
                                <div className="mlr-50 d-flex form-2-on-4-right">
                                    <div className="w-45">
                                        <label htmlFor="contactDateOfIssue" className="d-block">{languageList.txtDateOfIssue}</label>
                                        <input type='date' disabled value={partner.dateIssue}
                                            id='contactDateOfIssue' className="input-inline input-4-item" />
                                    </div>
                                    <div className="w-45">
                                        <label htmlFor="contactPlaceOfIssue" className="d-block">{languageList.txtPlaceOfIssue}</label>
                                        <input disabled value={partner.placeIssue}
                                            id='contactPlaceOfIssue' className="input-inline input-4-item" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                :
                <>
                    {optionSelected === 1 ?
                        <div className="fade-in form-input-all-profile-partner p-0">
                            <div className="m-0 w-100 bd-top-none p-0">
                                {listService.length > 0 ? listService.map((service) => (
                                    <div className="mb-20 item-service br-bottom-5">
                                        <div className="item-service-partner d-flex space-between">
                                            <label className='short-information-detail txt-14 m-top-auto short-information-service-partner'>
                                                <div>{service.serviceName}</div>
                                                <div>{languageService[service.serviceCategory - 1].txtCategory}</div>
                                                <div>{languageService[service.serviceCategory - 1].txtType[parseInt(service.typeOfServiceCategory)]}</div>
                                            </label>
                                            <div className='w-75 image-hide-animation'>
                                                <img src={service.image} className='image-side-hide' />
                                                <div className='liner-white' />
                                            </div>
                                        </div>
                                        <div className=" item-service font-14 br-bottom-5 text-center text-link"
                                            onClick={() => navigate('/admin/view-service', { state: { serviceId: service.serviceId } })}>{languageMore.txtSeeDetail}</div>
                                    </div>
                                )) :
                                    <div className='image-no-booking br-top-left-none'>
                                        <img src={Question} className='image-question' />
                                        <div className='text-no-booking'>{languageList.txtNoneService}</div>
                                    </div>
                                }
                            </div>
                        </div>
                        :
                        <HistoryBookingCustomer classTab1='br-top-left-none' className='p-0' numberOfPages={numberOfPages} numberPage={numberPage} setNumberPage={setNumberPage} isDisabled listBooking={listBooking} languageSelected={languageSelected} />
                    }
                </>
            }
        </div>)
}

export default memo(ViewInformationDetailPartner)