import { memo, useState, useEffect, useRef } from "react"
import { useNavigate, Link } from "react-router-dom";
import City from '../../Data/city.json'
import axios from "axios";
import LoadingDialog from "../../Layout/LoadingDialog";
import Bg from '../../images/bgHome.jpg'
import { english, vietnamese } from "../../Languages/RegisterProfilePartner";
import { english as englishConfirm, vietnamese as vietnameseConfirm } from '../../Languages/TableListCustomer'
import { english as englishDetailPartner, vietnamese as vietnameseDetailPartner, englishService, vietnameseService } from "../../Languages/ViewInformationDetailPartner"
import { API_LIST_BOOKING_BY_ACCOUNTID, API_GET_SERVICE_BY_CONDITION, API_GET_DETAIL_PARTNER, API_EDIT_PROFILE_PARTNER } from '../../API';
import HistoryBookingCustomer from "../HistoryBookingCustomer";
import './EditProfilePartner.scss'
import Question from '../../images/question.png'
import { toast } from 'react-toastify'
import ConfirmDialog from "../../Layout/ConfirmDialog";

function EditProfilePartner({ languageSelected }) {
    const navigate = useNavigate()

    const languageList = languageSelected === 'EN' ? english : vietnamese
    const languageMore = languageSelected === 'EN' ? englishDetailPartner : vietnameseDetailPartner
    const languageService = languageSelected === 'EN' ? englishService : vietnameseService
    const languageConfirm = languageSelected === 'EN' ? englishConfirm : vietnameseConfirm

    const [showConfirm, setShowConfirm] = useState(false)
    const [titleConfirm, setTitleConfirm] = useState('asd')
    const [contentConfirm, setContentConfirm] = useState('asd')
    const callbackConfirm = useRef(() => { })
    const [isRed, setIsRed] = useState(true)
    const [textOk, setTextOk] = useState('Ok')
    const [textCancel, setTextCancel] = useState('Cancel')

    const [optionSelected, setOptionSelected] = useState(0)
    const [showLoading, setShowLoading] = useState(false)
    const [getDataComplete, setGetDataComplete] = useState(false)
    const [partner, setPartner] = useState()

    //nếu có 2 api riêng thì tách 2 biến như này
    const [listService, setListService] = useState([])
    const [listBooking, setListBooking] = useState([])
    const [numberPage, setNumberPage] = useState(1)
    const [numberOfPages, setNumberOfPages] = useState([])

    const getListBookingByAccountId = () => {
        axios.get(API_LIST_BOOKING_BY_ACCOUNTID, {
            params: {
                accountId: sessionStorage.getItem('id'),
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
                    statusDeposit: bookingItem.statusDeposit
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
        axios.get(API_GET_DETAIL_PARTNER + sessionStorage.getItem('id')).then((res) => {
            const partnerRaw = {
                "email": res.data.data.email,
                "numberIdCard": res.data.data.numberIdCard,
                "dateIssue": res.data.data.dateIssue,
                "gender": res.data.data.gender,
                "phone": res.data.data.phone,
                "fax": res.data.data.fax,
                "department": res.data.data.department,
                "firstName": res.data.data.firstName,
                "placeIssue": res.data.data.placeIssue,
                "taxCode": res.data.data.taxCode,
                "birthDate": res.data.data.birthDate,
                "companyName": res.data.data.companyName,
                "roleId": res.data.data.roleId,
                "website": res.data.data.website,
                "lastName": res.data.data.lastName,
                "accountId": res.data.data.accountId,
                "registrationDate": res.data.data.registrationDate,
                "incorporationDate": res.data.data.incorporationDate,
                "isBlock": res.data.data.idBlock,
                "serviceCategory": res.data.data.serviceCategory,
                "cityContact": res.data.data.cityContact,
                "emailContact": res.data.data.emailContact,
                "cityCompany": res.data.data.cityCompany,
                "addressCompany": res.data.data.addressCompany,
                "phoneCompany": res.data.data.phoneCompany,
                "addressContact": res.data.data.addressContact,
                "businessLicenseCode": res.data.data.businessLicenseCode,
                "emailContactCompany": res.data.data.emailContactCompany,
                "position": res.data.data.position,
                "shortName": res.data.data.shortName
            }
            axios.get(API_GET_SERVICE_BY_CONDITION, {
                params: {
                    emailPartner: partnerRaw.email
                }
            }).then((res) => {
                const data = res.data.data
                let servicesRaw = []
                data.map((service) => {
                    const serviceItem = {
                        id: service.serviceId,
                        name: service.serviceName,
                        category: parseInt(service.serviceCategory),
                        type: service.typeOfServiceCategory
                    }
                    servicesRaw.push(serviceItem)
                })
                setListService([...servicesRaw])
                setPartner({ ...partnerRaw })
                getListBookingByAccountId()
            }).catch((e) => {
                setPartner({ ...partnerRaw })
                getListBookingByAccountId()
            })
        }
        )
    }, [])

    const handleClickSave = () => {
        setShowLoading(true)
        axios.post(API_EDIT_PROFILE_PARTNER + sessionStorage.getItem('id'), partner)
            .then(() => {
                toast.success(languageSelected === 'EN' ? 'Profile has been updated' : 'Hồ sơ đã được cập nhật')
                setShowLoading(false)
            }).catch((e) => {
                console.log(e)
                toast.error('error')
                setShowLoading(false)
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
        <div className="container space-profile-partner">
            {showConfirm &&
                <ConfirmDialog textOk={textOk} textCancel={textCancel} title={titleConfirm} content={contentConfirm} callback={callbackConfirm.current} isRed={isRed} setShowDialog={setShowConfirm} />
            }
            {showLoading && <LoadingDialog />}
            <div className='main-content-profile-partner right-content-create-tour'>
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
                                    <button className="btn btn-primary btn-block"
                                        onClick={() => handleClickShowConfig(languageConfirm.txtUpdate, languageConfirm.txtWarningUpdateProfile,
                                            handleClickSave, false, languageConfirm.txtUpdate, languageConfirm.txtCancel)}>
                                        {languageSelected === 'EN' ? 'Save' : 'Lưu'}
                                    </button>
                                </div>
                                <div className="d-flex line-input">
                                    <div className="mlr-50 ">
                                        <label htmlFor="companyName" className="d-block">{languageList.txtName}<span className="requird-star">*</span></label>
                                        <input value={partner.companyName}
                                            onChange={(e) => setPartner({ ...partner, companyName: e.target.value })}
                                            id='companyName' className="input-inline" type='text' />
                                    </div>
                                    <div className="mlr-50">
                                        <label className="d-block">{languageList.txtAbbreviation}</label>
                                        <input value={partner.shortName}
                                            onChange={(e) => setPartner({ ...partner, shortName: e.target.value })}
                                            className="input-inline" type='text' />
                                    </div>
                                </div>
                                <div className="d-flex line-input">
                                    <div className="mlr-50 ">
                                        <label htmlFor="companyEmail" className="d-block">{languageList.txtEmail}<span className="requird-star">*</span></label>
                                        <input value={partner.emailContactCompany}
                                            onChange={(e) => setPartner({ ...partner, emailContactCompany: e.target.value })}
                                            id='companyEmail'
                                            className="input-inline" type='text' />
                                    </div>
                                    <div className="mlr-50">
                                        <label htmlFor="companyPhone" className="d-block">{languageList.txtPhone}<span className="requird-star">*</span></label>
                                        <input value={partner.phoneCompany}
                                            onChange={(e) => setPartner({ ...partner, phoneCompany: e.target.value })}
                                            id='companyPhone'
                                            className="input-inline" type='text' />
                                    </div>
                                </div>
                                <div className="d-flex line-input">
                                    <div className="mlr-50 ">
                                        <label htmlFor="companyCity" className="d-block">{languageList.txtCity}<span className="requird-star">*</span></label>
                                        <select
                                            onChange={(e) => setPartner({ ...partner, cityCompany: e.target.value })}
                                            id='companyCity'
                                            className="input-inline">
                                            {City.map((city) => (
                                                <option selected={city.name === partner.cityCompany} value={city.name}>{city.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mlr-50">
                                        <label htmlFor="companyAddress" className="d-block">{languageList.txtAddress}<span className="requird-star">*</span></label>
                                        <input value={partner.addressCompany}
                                            onChange={(e) => setPartner({ ...partner, addressCompany: e.target.value })}
                                            id='companyAddress'
                                            className="input-inline" type='text' />
                                    </div>
                                </div>
                                <div className="d-flex line-input">
                                    <div className="mlr-50 input-alone">
                                        <label htmlFor="companyWebsite" className="d-block">{languageList.txtWebsite}</label>
                                        <input value={partner.website}
                                            onChange={(e) => setPartner({ ...partner, website: e.target.value })}
                                            id='companyWebsite'
                                            className="input-inline" type='text' />
                                    </div>
                                </div>
                                <div className="d-flex line-input">
                                    <div className="mlr-50 ">
                                        <label htmlFor="companyFax" className="d-block">{languageList.txtFax}</label>
                                        <input value={partner.fax}
                                            onChange={(e) => setPartner({ ...partner, fax: e.target.value })}
                                            id='companyFax'
                                            className="input-inline" type='text' />
                                    </div>
                                    <div className="mlr-50">
                                        <label htmlFor="companyTaxCode" className="d-block">{languageList.txtTaxCode}<span className="requird-star">*</span></label>
                                        <input value={partner.taxCode}
                                            onChange={(e) => setPartner({ ...partner, taxCode: e.target.value })}
                                            id='companyTaxCode'
                                            className="input-inline" type='text' />
                                    </div>
                                </div>
                                <div className="d-flex line-input">
                                    <div className="mlr-50 input-alone">
                                        <label htmlFor="companyBusinessRegistration" className="d-block">{languageList.txtBusinessRegistration}<span className="requird-star">*</span></label>
                                        <input value={partner.businessLicenseCode}
                                            onChange={(e) => setPartner({ ...partner, businessLicenseCode: e.target.value })}
                                            id='companyBusinessRegistration'
                                            className="input-inline" type='text' />
                                    </div>
                                </div>
                                <div className="d-flex line-input">
                                    <div className="mlr-50 ">
                                        <label htmlFor="companyRegistrationDate" className="d-block">{languageList.txtRegistrationDate}<span className="requird-star">*</span></label>
                                        <input type='date' value={partner.registrationDate}
                                            onChange={(e) => setPartner({ ...partner, registrationDate: e.target.value })}
                                            id='companyRegistrationDate'
                                            className="input-inline" />
                                    </div>
                                    <div className="mlr-50">
                                        <label htmlFor="companyFoundingDate" className="d-block">{languageList.txtFoundingDate}<span className="requird-star">*</span></label>
                                        <input type='date' value={partner.incorporationDate}
                                            onChange={(e) => setPartner({ ...partner, incorporationDate: e.target.value })}
                                            id='companyFoundingDate' className="input-inline" />
                                    </div>
                                </div>
                            </div>

                            <div className="input-profile-company-form mt-20 w-100">
                                <label className="ml-20 title-form-input">{languageList.txtContact}</label>
                                <div className="d-flex line-input">
                                    <div className="mlr-50 ">
                                        <label htmlFor="contactFirstName" className="d-block">{languageList.txtFirstName}<span className="requird-star">*</span></label>
                                        <input value={partner.firstName}
                                            onChange={(e) => setPartner({ ...partner, firstName: e.target.value })}
                                            id='contactFirstName' className="input-inline" type='text' />
                                    </div>
                                    <div className="mlr-50">
                                        <label htmlFor="contactLastName" className="d-block">{languageList.txtLastName}<span className="requird-star">*</span></label>
                                        <input value={partner.lastName}
                                            onChange={(e) => setPartner({ ...partner, lastName: e.target.value })}
                                            id='contactLastName' className="input-inline" type='text' />
                                    </div>
                                </div>
                                <div className="d-flex line-input">
                                    <div className="mlr-50 ">
                                        <label htmlFor="contactGender" className="d-block">{languageList.txtGender}</label>
                                        <select
                                            onChange={(e) => setPartner({ ...partner, gender: e.target.value })}
                                            id='contactGender' className="input-inline input-4-item">
                                            <option selected={partner.gender == '0'} value='0'>Male</option>
                                            <option selected={partner.gender == '1'} value='1'>Female</option>
                                            <option selected={partner.gender == '2'} value='2'>Other</option>
                                        </select>
                                    </div>
                                    <div className="mlr-50 ">
                                        <label htmlFor="contactBirthdate" className="d-block">{languageList.txtBirthdate}</label>
                                        <input type='date' value={partner.birthDate}
                                            onChange={(e) => setPartner({ ...partner, birthDate: e.target.value })}
                                            id='contactBirthdate' className="input-inline input-4-item" />
                                    </div>
                                </div>
                                <div className="d-flex line-input">
                                    <div className="mlr-50">
                                        <label htmlFor="contactEmail" className="d-block">{languageList.txtEmail}<span className="requird-star">*</span></label>
                                        <input value={partner.emailContact}
                                            onChange={(e) => setPartner({ ...partner, emailContact: e.target.value })}
                                            id='contactEmail' className="input-inline" type='text' />
                                    </div>
                                    <div className="mlr-50">
                                        <label htmlFor="contactPhone" className="d-block">{languageList.txtPhone}<span className="requird-star">*</span></label>
                                        <input value={partner.phone}
                                            onChange={(e) => setPartner({ ...partner, phone: e.target.value })}
                                            id='contactPhone'
                                            className="input-inline" type='text' />
                                    </div>
                                </div>
                                <div className="d-flex line-input">
                                    <div className="mlr-50 ">
                                        <label htmlFor="contactCity" className="d-block">{languageList.txtCity}</label>
                                        <select
                                            onChange={(e) => setPartner({ ...partner, cityContact: e.target.value })}
                                            id='contactCity'
                                            className="input-inline">
                                            {City.map((city) => (
                                                <option selected={city.name === partner.cityContact} value={city.name}>{city.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mlr-50">
                                        <label htmlFor="contactAddress" className="d-block">{languageList.txtAddress}</label>
                                        <input value={partner.addressContact}
                                            onChange={(e) => setPartner({ ...partner, addressContact: e.target.value })}
                                            id='contactAddress'
                                            className="input-inline" type='text' />
                                    </div>
                                </div>
                                <div className="d-flex line-input">
                                    <div className="mlr-50 ">
                                        <label htmlFor="contactPosition" className="d-block">{languageList.txtPositions}</label>
                                        <input value={partner.position}
                                            onChange={(e) => setPartner({ ...partner, position: e.target.value })}
                                            id='contactPosition'
                                            className="input-inline" type='text' />
                                    </div>
                                    <div className="mlr-50">
                                        <label htmlFor="contactDepartment" className="d-block">{languageList.txtDepartment}</label>
                                        <input value={partner.department}
                                            onChange={(e) => setPartner({ ...partner, department: e.target.value })}
                                            id='contactEmail' className="input-inline" type='text' />
                                    </div>
                                </div>
                                <div className="d-flex line-input line-4-item">
                                    <div className="mlr-50 form-2-on-4-left">
                                        <label htmlFor="contactIDCardNumber" className="d-block">{languageList.txtIdCardNumber}</label>
                                        <input value={partner.numberIdCard}
                                            onChange={(e) => setPartner({ ...partner, numberIdCard: e.target.value })}
                                            className="input-inline" type='number' />
                                    </div>
                                    <div className="mlr-50 d-flex form-2-on-4-right">
                                        <div className="w-45">
                                            <label htmlFor="contactDateOfIssue" className="d-block">{languageList.txtDateOfIssue}</label>
                                            <input type='date' value={partner.dateIssue}
                                                onChange={(e) => setPartner({ ...partner, dateIssue: e.target.value })}
                                                id='contactDateOfIssue' className="input-inline input-4-item" />
                                        </div>
                                        <div className="w-45">
                                            <label htmlFor="contactPlaceOfIssue" className="d-block">{languageList.txtPlaceOfIssue}</label>
                                            <input value={partner.placeIssue}
                                                onChange={(e) => setPartner({ ...partner, placeIssue: e.target.value })}
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
                                                    <div>{service.name}</div>
                                                    <div>{languageService[service.category - 1].txtCategory}</div>
                                                    <div>{languageService[service.category - 1].txtType[service.type - 1]}</div>
                                                </label>
                                                <div className='w-75 image-hide-animation'>
                                                    <img src={Bg} className='image-side-hide' />
                                                    <div className='liner-white' />
                                                </div>
                                            </div>
                                            <div className=" item-service font-14 br-bottom-5 text-center text-link"
                                                onClick={() => navigate(`/admin/view-service?serviceId=${service.id}`)}>{languageMore.txtSeeDetail}</div>
                                        </div>
                                    )) :
                                        <div className='image-no-booking br-top-left-none'>
                                            <img src={Question} className='image-question' />
                                            <div className='text-no-booking'>{languageList.txtNoneService} <Link to='/partner/select-detail-service' className='link-no-booking'>{languageList.txtAddNow}</Link></div>
                                        </div>
                                    }
                                </div>
                            </div>
                            :
                            <HistoryBookingCustomer classTab1='br-top-left-none' className='p-0' numberOfPages={numberOfPages} numberPage={numberPage} setNumberPage={setNumberPage} listBooking={listBooking} languageSelected={languageSelected} />
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default memo(EditProfilePartner)