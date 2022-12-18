import { memo, useState, useRef } from 'react'
import { english, vietnamese } from '../../Languages/EditProfile'
import { english as englishConfirm, vietnamese as vietnameseConfirm } from '../../Languages/TableListCustomer'
import axios from 'axios'
import City from '../../Data/city.json'
import { API_BLOCK_ACCOUNT, API_ACTIVE_ACCOUNT, API_EDIT_PROFILE_CUSTOMER } from '../../API'
import './EditProfile.scss'
import { toast } from 'react-toastify'
import ConfirmDialog from '../../Layout/ConfirmDialog'
import LoadingDialog from '../../Layout/LoadingDialog'

function EditProfile({ languageSelected, isDisabled, customer, setCustomer }) {
    const [getDateCompleted, setGetDataCompleted] = useState(true)
    const languageList = languageSelected === 'EN' ? english : vietnamese
    const languageConfirm = languageSelected === 'EN' ? englishConfirm : vietnameseConfirm

    const [showConfirm, setShowConfirm] = useState(false)
    const [titleConfirm, setTitleConfirm] = useState('asd')
    const [contentConfirm, setContentConfirm] = useState('asd')
    const callbackConfirm = useRef(() => { })
    const [isRed, setIsRed] = useState(true)
    const [textOk, setTextOk] = useState('Ok')
    const [textCancel, setTextCancel] = useState('Cancel')

    const handleClickBlock = () => {
        setGetDataCompleted(false)
        axios.put(API_BLOCK_ACCOUNT + customer.id).then(() => {
            setCustomer({ ...customer, status: true })
            toast.success(languageList.txtBlocked)
            setGetDataCompleted(true)
        }).catch(() => {
            setGetDataCompleted(true)
            toast.error('error')
        })
        setShowConfirm(false)
    }

    const handleClickUnblock = () => {
        setGetDataCompleted(false)
        axios.put(API_ACTIVE_ACCOUNT + customer.id).then(() => {
            setCustomer({ ...customer, status: false })
            toast.success(languageList.txtUnblocked)
            setGetDataCompleted(true)
        }).catch(() => {
            setGetDataCompleted(true)
            toast.error('error')
        })
        setShowConfirm(false)
    }

    const handleClickSave = () => {
        if (customer.firstName === '' || customer.lastName === '') {
            toast.error(languageList.txtWarningFullInformation)
        }
        else if (!/^[A-Za-z ]/.test(customer.firstName) || !/^[A-Za-z ]/.test(customer.lastName)
            || (customer.phone !== '' && !/^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/.test(customer.phone))) {
            toast.error(languageList.txtInvalid)
        }
        else {
            setGetDataCompleted(false)
            const customerRaw = {
                isPrivate: 1,
                firstName: customer.firstName,
                lastName: customer.lastName,
                gender: customer.gender,
                city: customer.city,
                birthDate: customer.birthDate,
                address: customer.address,
                phone: customer.phone
            }
            axios.post(API_EDIT_PROFILE_CUSTOMER + sessionStorage.getItem('id'), customerRaw)
                .then(() => {
                    toast.success(languageSelected === 'EN' ? 'Profile update successful' : 'Cập nhật hồ sơ thành công')
                    setGetDataCompleted(true)
                })
                .catch(err => {
                    setGetDataCompleted(true)
                    toast.error('error')
                })
            setShowConfirm(false)
        }
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

    if (!getDateCompleted) {
        return (<LoadingDialog />)
    }

    return (
        <div className='container pd-edit-profile fade-in'>
            {showConfirm &&
                <ConfirmDialog textOk={textOk} textCancel={textCancel} title={titleConfirm} content={contentConfirm} callback={callbackConfirm.current} isRed={isRed} setShowDialog={setShowConfirm} />
            }
            <div className="d-flex line-input">
                <div className="mlr-50 ">
                    <label htmlFor="firstName" className="d-block title-bold">{languageList.txtFirstName}<span className="requird-star">*</span></label>
                    <input value={customer.firstName} onChange={(e) => setCustomer({ ...customer, firstName: e.target.value })} disabled={isDisabled} id='firstName' className="input-inline" type='text' />
                </div>
                <div className="mlr-50">
                    <label htmlFor="lastName" className="d-block title-bold">{languageList.txtLastName}<span className="requird-star">*</span></label>
                    <input value={customer.lastName} onChange={(e) => setCustomer({ ...customer, lastName: e.target.value })} disabled={isDisabled} id='lastName' className="input-inline" type='text' />
                </div>
            </div>
            <div className="d-flex line-input">
                <div className="mlr-50 ">
                    <label htmlFor="firstName" className="d-block title-bold">{languageList.txtBirthdate}</label>
                    <input type='date' value={customer.birthDate} onChange={(e) => setCustomer({ ...customer, birthDate: e.target.value })} disabled={isDisabled} id='firstName' className="input-inline" />
                </div>
                <div className="mlr-50">
                    <label htmlFor="lastName" className="d-block title-bold">{languageList.txtGender}</label>
                    <select onChange={(e) => setCustomer({ ...customer, gender: e.target.value })} disabled={isDisabled}
                        id='lastName' className="input-inline" type='text' >
                        <option value='' selected={customer.gender === ''}>{languageSelected === 'EN' ? 'Gender' : 'Giới tính'}</option>
                        <option selected={customer.gender == 0} value={0}>{languageSelected === 'EN' ? 'Male' : 'Nam'}</option>
                        <option selected={customer.gender == 1} value={1}>{languageSelected === 'EN' ? 'Female' : 'Nữ'}</option>
                        <option selected={customer.gender == 2} value={2}>{languageSelected === 'EN' ? 'Other' : 'Khác'}</option>
                    </select>
                </div>
            </div>
            <div className="d-flex line-input">
                <div className="mlr-50 ">
                    <label htmlFor="firstName" className="d-block title-bold">{languageList.txtAddress}</label>
                    <input onChange={(e) => setCustomer({ ...customer, address: e.target.value })} value={customer.address} disabled={isDisabled} id='firstName' className="input-inline" type='text' />
                </div>
                <div className="mlr-50">
                    <label htmlFor="lastName" className="d-block title-bold">{languageList.txtCity}</label>
                    <select onChange={(e) => setCustomer({ ...customer, city: e.target.value })} disabled={isDisabled} id='lastName' className="input-inline">
                        {City.map((city) => (<option selected={customer.city === city.name} value={city.name}>{city.name}</option>))}
                    </select>
                </div>
            </div>
            <div className="d-flex line-input">
                <div className="mlr-50 ">
                    <label htmlFor="firstName" className="d-block title-bold">{languageList.txtPhone}</label>
                    <input onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} value={customer.phone} disabled={isDisabled} id='firstName' className="input-inline" type='text' />
                </div>
                <div className="mlr-50">
                    <label htmlFor="lastName" className="d-block title-bold">{languageList.txtEmail}</label>
                    <input disabled onChange={(e) => setCustomer({ ...customer, email: e.target.value })} value={customer.email} id='lastName' className="input-inline" type='text' />
                </div>
            </div>
            <div className="d-flex line-input line-btn-right">
                {window.location.pathname === '/profile' ?
                    <button className='btn btn-primary mr-50 btn-save-profile'
                        onClick={() => handleClickShowConfig(languageConfirm.txtUpdate, languageConfirm.txtWarningUpdateProfile,
                            handleClickSave, false, languageConfirm.txtUpdate, languageConfirm.txtCancel)}>
                        {languageSelected === 'EN' ? 'Save' : 'Lưu'}
                    </button>
                    :
                    <>
                        {!customer.status ?
                            <button className='btn btn-danger mr-50 btn-save-profile'
                                onClick={() => handleClickShowConfig(languageConfirm.txtBlock, languageConfirm.txtWarningBlock,
                                    handleClickBlock, true, languageConfirm.txtBlock, languageConfirm.txtCancel)}
                            >
                                {languageSelected === 'EN' ? 'Block' : 'Khoá'}
                            </button>
                            :
                            <button className='btn btn-success mr-50 btn-save-profile'
                                onClick={() => handleClickShowConfig(languageConfirm.txtUnblock, languageConfirm.txtWarningUnblock,
                                    handleClickUnblock, false, languageConfirm.txtUnblock, languageConfirm.txtCancel)}
                            >
                                {languageSelected === 'EN' ? 'Unblock' : 'Mở Khoá'}
                            </button>
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default memo(EditProfile)