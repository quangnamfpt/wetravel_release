import { memo, useState } from "react"
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import City from '../../Data/city.json'
import './RegisterProfilePartner.scss'
import axios from "axios";
import LoadingDialog from "../../Layout/LoadingDialog";
import { useNavigate } from "react-router-dom";
import Bg from '../../images/bg.jpg'
import { english, vietnamese } from "../../Languages/RegisterProfilePartner";
import { API_REGISTER_PARTNER } from "../../API";

function RegisterProfilePartner({ languageSelected, role, setProgress }) {
    let languageList = (languageSelected === 'EN' ? english : vietnamese)

    const token = useLocation().state.token
    const passwordMain = useLocation().state.password


    const navigate = useNavigate();
    const [showLoading, setShowLoading] = useState()

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirstDate] = useState('');
    const [gender, setGender] = useState('1');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('Hà Nội');
    const [address, setAddress] = useState('');
    const [emailPartner, setEmail] = useState('')
    const [position, setPosition] = useState('')
    const [department, setDepartment] = useState('')
    const [numberIdCard, setNumberIdCard] = useState('')
    const [placeIssue, setPlaceIssue] = useState('')
    const [dateIssue, setDateIssue] = useState('')

    const [companyName, setCompanyName] = useState('')
    const [shortNameCompany, setShortNameCompany] = useState('')
    const [addressCompany, setAddressCompany] = useState('')
    const [cityCompany, setCityCompany] = useState('Hà Nội')
    const [emailCompany, setEmailCompany] = useState('')
    const [fax, setFax] = useState('')
    const [phoneCompany, setPhoneCompany] = useState('')
    const [website, setWebsite] = useState('')
    const [businessCode, setBusinessCode] = useState('')
    const [taxCode, setTaxCode] = useState('')
    const [registrationDate, setRegistrationDate] = useState('')
    const [incorporationDate, setIncorporationDate] = useState('')


    const handlePartnerRegisterClicked = async () => {
        if (companyName === '' || emailCompany === '' || phoneCompany === '' || addressCompany === '' || taxCode === '' || businessCode === ''
            || registrationDate === '' || incorporationDate === '' || firstName === '' || lastName === '' || phone === '') {
            toast.warning(languageList.txtWarningFullInformation)
        }
        else {
            if (/^[A-Za-z ]/.test(firstName) && /^[A-Za-z ]/.test(lastName) &&
                (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailCompany)) &&
                (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailPartner))
                && (/^[0-9]{10}$/.test(taxCode) || /^[0-9]{13}$/.test(taxCode))
                && (website === '' || /^[a-zA-Z0-9]+([-][a-zA-Z0-9]+)*\.[a-zA-Z0-9]+([-][a-zA-Z0-9]+)*$/.test(website)
                    && (fax === '' || /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(fax)))
                && /^[0-9]{5}$/.test(businessCode)) {
                setShowLoading(true)
                setProgress(70)
                let data = {
                    token: token,
                    accountInfor: {
                        passWord: passwordMain,
                    },
                    partnerInfor: {
                        firstName: firstName,
                        lastName: lastName,
                        gender: gender,
                        address: address,
                        city: city,
                        birthDate: birthDate,
                        phone: phone,
                        email: emailPartner,
                        position: position,
                        department: department,
                        numberIdCard: numberIdCard,
                        placeIssue: placeIssue,
                        dateIssue: dateIssue
                    },
                    companyPartnerInfor:
                    {
                        companyName: companyName,
                        shortName: shortNameCompany,
                        address: addressCompany,
                        city: cityCompany,
                        email: emailCompany,
                        fax: fax,
                        phone: phoneCompany,
                        website: website,
                        businessCode: businessCode,
                        taxCode: taxCode,
                        registrationDate: registrationDate,
                        incorporationDate: incorporationDate
                    }

                }

                //call api from server
                await axios.post(API_REGISTER_PARTNER, data).then(() => {
                    toast.success(languageList.txtSuccess)
                    setTimeout(navigate('/'), 3000)
                    localStorage.removeItem('tokenRegister')
                }).catch(() => {
                    toast.error(languageList.txtError)
                })
                setProgress(100)
                setShowLoading(false)
            }
            else {
                toast.warning(languageList.txtInvalid)
            }
        }
    }

    const passwordPartner = localStorage.getItem('passwordPartner')

    const handleBlur = (input) => {
        input.style.border = 'solid 1px #D9D9D9'
    }

    const handleFocus = (input) => {
        input.style.border = 'solid 1px #4874E8'
    }

    return (<><div className="form-input-all-profile-partner">
        <div className="container">
            <img src={Bg} className='background-image' />
            <input type='hidden' value={passwordPartner} />
            <div className="container input-profile-company-form">
                <label className="ml-20 title-form-input">{languageList.txtCompany}</label>
                <div className="d-flex line-input">
                    <div className="mlr-50 ">
                        <label htmlFor="companyName" className="d-block">{languageList.txtName}<span className="requird-star">*</span></label>
                        <input onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                            onChange={(e) => setCompanyName(e.target.value)}
                            id='companyName' className="input-inline" type='text' />
                    </div>
                    <div className="mlr-50">
                        <label htmlFor="companyAbbreviation" className="d-block">{languageList.txtAbbreviation}</label>
                        <input onFocus={(e) => handleFocus(e.target)}
                            onChange={(e) => setShortNameCompany(e.target.value)}
                            onBlur={(e) => handleBlur(e.target)}
                            id='companyAbbreviation'
                            className="input-inline" type='text' />
                    </div>
                </div>
                <div className="d-flex line-input">
                    <div className="mlr-50 ">
                        <label htmlFor="companyEmail" className="d-block">{languageList.txtEmail}<span className="requird-star">*</span></label>
                        <input onFocus={(e) => handleFocus(e.target)}
                            onChange={(e) => setEmailCompany(e.target.value)}
                            onBlur={(e) => handleBlur(e.target)}
                            id='companyEmail'
                            className="input-inline" type='text' />
                    </div>
                    <div className="mlr-50">
                        <label htmlFor="companyPhone" className="d-block">{languageList.txtPhone}<span className="requird-star">*</span></label>
                        <input onFocus={(e) => handleFocus(e.target)}
                            onChange={(e) => setPhoneCompany(e.target.value)}
                            onBlur={(e) => handleBlur(e.target)}
                            id='companyPhone'
                            className="input-inline" type='text' />
                    </div>
                </div>
                <div className="d-flex line-input">
                    <div className="mlr-50 ">
                        <label htmlFor="companyCity" className="d-block">{languageList.txtCity}<span className="requird-star">*</span></label>
                        <select
                            onChange={(e) => setCityCompany(e.target.value)}
                            onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                            id='companyCity'
                            className="input-inline">
                            {City.map((item) => <option value={item.name}>{item.name}</option>)}
                        </select>
                    </div>
                    <div className="mlr-50">
                        <label htmlFor="companyAddress" className="d-block">{languageList.txtAddress}<span className="requird-star">*</span></label>
                        <input onFocus={(e) => handleFocus(e.target)}
                            onChange={(e) => setAddressCompany(e.target.value)}
                            onBlur={(e) => handleBlur(e.target)}
                            id='companyAddress'
                            className="input-inline" type='text' />
                    </div>
                </div>
                <div className="d-flex line-input">
                    <div className="mlr-50 input-alone">
                        <label htmlFor="companyWebsite" className="d-block">{languageList.txtWebsite}</label>
                        <input onFocus={(e) => handleFocus(e.target)}
                            onChange={(e) => setWebsite(e.target.value)}
                            onBlur={(e) => handleBlur(e.target)}
                            id='companyWebsite'
                            className="input-inline" type='text' />
                    </div>
                </div>
                <div className="d-flex line-input">
                    <div className="mlr-50 ">
                        <label htmlFor="companyFax" className="d-block">{languageList.txtFax}</label>
                        <input onFocus={(e) => handleFocus(e.target)}
                            onChange={(e) => setFax(e.target.value)}
                            onBlur={(e) => handleBlur(e.target)}
                            id='companyFax'
                            className="input-inline" type='text' />
                    </div>
                    <div className="mlr-50">
                        <label htmlFor="companyTaxCode" className="d-block">{languageList.txtTaxCode}<span className="requird-star">*</span></label>
                        <input onFocus={(e) => handleFocus(e.target)}
                            onChange={(e) => setTaxCode(e.target.value)}
                            onBlur={(e) => handleBlur(e.target)}
                            id='companyTaxCode'
                            className="input-inline" type='text' />
                    </div>
                </div>
                <div className="d-flex line-input">
                    <div className="mlr-50 input-alone">
                        <label htmlFor="companyBusinessRegistration" className="d-block">{languageList.txtBusinessRegistration}<span className="requird-star">*</span></label>
                        <input onFocus={(e) => handleFocus(e.target)}
                            onChange={(e) => setBusinessCode(e.target.value)}
                            onBlur={(e) => handleBlur(e.target)}
                            id='companyBusinessRegistration'
                            className="input-inline" type='text' />
                    </div>
                </div>
                <div className="d-flex line-input">
                    <div className="mlr-50 ">
                        <label htmlFor="companyRegistrationDate" className="d-block">{languageList.txtRegistrationDate}<span className="requird-star">*</span></label>
                        <input onFocus={(e) => handleFocus(e.target)}
                            onChange={(e) => setRegistrationDate(e.target.value)}
                            onBlur={(e) => handleBlur(e.target)}
                            id='companyRegistrationDate'
                            className="input-inline" type='date' />
                    </div>
                    <div className="mlr-50">
                        <label htmlFor="companyFoundingDate" className="d-block">{languageList.txtFoundingDate}<span className="requird-star">*</span></label>
                        <input onFocus={(e) => handleFocus(e.target)}
                            onChange={(e) => setIncorporationDate(e.target.value)}
                            onBlur={(e) => handleBlur(e.target)}
                            id='companyFoundingDate' className="input-inline" type='date' />
                    </div>
                </div>
            </div>

            <div className="container input-profile-company-form mt-20">
                <label className="ml-20 title-form-input">{languageList.txtContact}</label>
                <div className="d-flex line-input">
                    <div className="mlr-50 ">
                        <label htmlFor="contactFirstName" className="d-block">{languageList.txtFirstName}<span className="requird-star">*</span></label>
                        <input onChange={(e) => setFirstName(e.target.value)} onFocus={(e) => handleFocus(e.target)} onBlur={(e) => handleBlur(e.target)} id='contactFirstName' className="input-inline" type='text' />
                    </div>
                    <div className="mlr-50">
                        <label htmlFor="contactLastName" className="d-block">{languageList.txtLastName}<span className="requird-star">*</span></label>
                        <input onChange={(e) => setLastName(e.target.value)} onFocus={(e) => handleFocus(e.target)} onBlur={(e) => handleBlur(e.target)} id='contactLastName' className="input-inline" type='text' />
                    </div>
                </div>
                <div className="d-flex line-input">
                    <div className="mlr-50 ">
                        <label htmlFor="contactGender" className="d-block">{languageList.txtGender}</label>
                        <select onChange={(e) => setGender(e.target.value)} onFocus={(e) => handleFocus(e.target)} onBlur={(e) => handleBlur(e.target)} id='contactGender' className="input-inline input-4-item">
                            <option value='1'>{languageSelected === 'EN' ? 'Male' : 'Nam'}</option>
                            <option value='2'>{languageSelected === 'EN' ? 'Female' : 'Nữ'}</option>
                            <option value='3'>{languageSelected === 'EN' ? 'Other' : 'Khác'}</option>
                        </select>
                    </div>
                    <div className="mlr-50 ">
                        <label htmlFor="contactBirthdate" className="d-block">{languageList.txtBirthdate}</label>
                        <input onChange={(e) => setBirstDate(e.target.value)} onFocus={(e) => handleFocus(e.target)} onBlur={(e) => handleBlur(e.target)} id='contactBirthdate' className="input-inline input-4-item" type='date' />
                    </div>
                </div>
                <div className="d-flex line-input">
                    <div className="mlr-50">
                        <label htmlFor="contactEmail" className="d-block">{languageList.txtEmail}<span className="requird-star">*</span></label>
                        <input onChange={(e) => setEmail(e.target.value)} onFocus={(e) => handleFocus(e.target)} onBlur={(e) => handleBlur(e.target)} id='contactEmail' className="input-inline" type='text' />
                    </div>
                    <div className="mlr-50">
                        <label htmlFor="contactPhone" className="d-block">{languageList.txtPhone}<span className="requird-star">*</span></label>
                        <input onFocus={(e) => handleFocus(e.target)}
                            onChange={(e) => setPhone(e.target.value)}
                            onBlur={(e) => handleBlur(e.target)}
                            id='contactPhone'
                            className="input-inline" type='text' />
                    </div>
                </div>
                <div className="d-flex line-input">
                    <div className="mlr-50 ">
                        <label htmlFor="contactCity" className="d-block">{languageList.txtCity}</label>
                        <select
                            onChange={(e) => setCity(e.target.value)}
                            onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                            id='contactCity'
                            className="input-inline">
                            {City.map((item) => <option value={item.name}>{item.name}</option>)}
                        </select>
                    </div>
                    <div className="mlr-50">
                        <label htmlFor="contactAddress" className="d-block">{languageList.txtAddress}</label>
                        <input onFocus={(e) => handleFocus(e.target)}
                            onChange={(e) => setAddress(e.target.value)}
                            onBlur={(e) => handleBlur(e.target)}
                            id='contactAddress'
                            className="input-inline" type='text' />
                    </div>
                </div>
                <div className="d-flex line-input">
                    <div className="mlr-50 ">
                        <label htmlFor="contactPosition" className="d-block">{languageList.txtPositions}</label>
                        <input onFocus={(e) => handleFocus(e.target)}
                            onChange={(e) => setPosition(e.target.value)}
                            onBlur={(e) => handleBlur(e.target)}
                            id='contactPosition'
                            className="input-inline" type='text' />
                    </div>
                    <div className="mlr-50">
                        <label htmlFor="contactDepartment" className="d-block">{languageList.txtDepartment}</label>
                        <input onChange={(e) => setDepartment(e.target.value)} onFocus={(e) => handleFocus(e.target)} onBlur={(e) => handleBlur(e.target)} id='contactEmail' className="input-inline" type='text' />
                    </div>
                </div>
                <div className="d-flex line-input line-4-item">
                    <div className="mlr-50 form-2-on-4-left">
                        <label htmlFor="contactIDCardNumber" className="d-block">{languageList.txtIdCardNumber}</label>
                        <input onFocus={(e) => handleFocus(e.target)}
                            onChange={(e) => setNumberIdCard(e.target.value)}
                            onBlur={(e) => handleBlur(e.target)}
                            id='contactIDCardNumber'
                            className="input-inline" type='text' />
                    </div>
                    <div className="mlr-50 d-flex form-2-on-4-right">
                        <div className="mr-20">
                            <label htmlFor="contactDateOfIssue" className="d-block">{languageList.txtDateOfIssue}</label>
                            <input onChange={(e) => setDateIssue(e.target.value)} onFocus={(e) => handleFocus(e.target)} onBlur={(e) => handleBlur(e.target)} id='contactDateOfIssue' className="input-inline input-4-item" type='date' />
                        </div>
                        <div>
                            <label htmlFor="contactPlaceOfIssue" className="d-block">{languageList.txtPlaceOfIssue}</label>
                            <input onChange={(e) => setPlaceIssue(e.target.value)} onFocus={(e) => handleFocus(e.target)} onBlur={(e) => handleBlur(e.target)} id='contactPlaceOfIssue' className="input-inline input-4-item" />
                        </div>
                    </div>
                </div>
            </div>
            <label onClick={handlePartnerRegisterClicked} className="btn btn-primary btn-submit-profile-partner">{languageList.btnSubmit}</label>
        </div>
    </div>
        {showLoading && <div className='popup'>
            <div className='bg-popup' />
            <LoadingDialog />
        </div>}
    </>)
}

export default memo(RegisterProfilePartner)