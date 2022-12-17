import { memo, useState } from 'react'
import City from '../../Data/city.json'
import './RegisterProfile.scss'
import axios from 'axios'
import LoadingDialog from '../../Layout/LoadingDialog'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import BackgroundAnimater from '../../Layout/BackgroundAnimater';
import { english, vietnamese } from '../../Languages/RegisterProfile'
import { API_REGISTER_CUSTOMER } from '../../API'

function RegisterProfile({ languageSelected, role, passwordMain, setProgress, token }) {
    let languageList = (languageSelected === 'EN' ? english : vietnamese)

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [isPrivate, setIsPrivate] = useState(0);
    const [showLoading, setShowLoading] = useState(false);

    const navigate = useNavigate()

    const handleRegisterClicked = async () => {
        if (firstName === '' || lastName === '') {
            toast.error(languageList.txtWarningFullInformation)
        }
        else if (!/^[A-Za-z ]/.test(firstName) || !/^[A-Za-z ]/.test(lastName)) {
            toast.error(languageList.txtInvalid)
        }
        else {
            setShowLoading(true)
            setProgress(70)
            let registerInfor = {
                token: token,
                password: passwordMain,
                firstName: firstName,
                lastName: lastName,
                gender: gender,
                birthDate: birthDate,
                address: address,
                city: city,
                isPrivate: isPrivate,
                phone: phone
            }

            //call api from server
            await axios.post(API_REGISTER_CUSTOMER, registerInfor).then(() => {
                toast.success(languageList.txtSuccess)
                localStorage.removeItem('tokenRegister')
                setTimeout(navigate("/"), 4000)
            }).catch(() => {
                setShowLoading(false)
                toast.error(languageList.txtError)
            })
            setProgress(100)
        }
    }

    return (<div className='content-register-profile'>
        <h1 className='title-register mb-30'>{languageList.txtSignUp}</h1>
        <form className='container'>
            <div className='background-animater-register-profile'><BackgroundAnimater /></div>
            <div className='d-flex group-input'>
                <div>
                    <input value={firstName} name='firstName' type='text' className='input-text' id='first-name' onChange={(e) => setFirstName(e.target.value)} />
                    <label className='label-text' htmlFor='first-name' id='first-name-label'>{languageList.txtFirstName}<span className="requird-star">*</span></label>
                </div>
                <div>
                    <input value={lastName} name='lastName' type='text' className='input-text' id='last-name' onChange={(e) => setLastName(e.target.value)} />
                    <label className='label-text' htmlFor='last-name' id='last-name-label'>{languageList.txtLastName}<span className="requird-star">*</span></label>
                </div>
            </div>
            <div className='d-flex group-input'>
                <div>
                    <label className='label-date' htmlFor='birthdate' id='birthdate-label'>{languageList.txtBirthdate}</label>
                    <input value={birthDate} name='birthdate' className='input-date' type='date' id='birthdate'
                        max={new Date().toJSON().split('T')[0]}
                        onChange={(e) => setBirthDate(e.target.value)} />
                </div>
                <div>
                    <select name='gender' className='input-gender' onChange={(e) => setGender(e.target.value)}>
                        <option value=''>{languageList.txtGender}</option>
                        <option value='0' selected={gender == '0'}>{languageSelected === 'EN' ? 'Male' : 'Nam'}</option>
                        <option value='1' selected={gender == '1'}>{languageSelected === 'EN' ? 'Female' : 'Nữ'}</option>
                        <option value='2' selected={gender == '2'}>{languageSelected === 'EN' ? 'Other' : 'Khác'}</option>
                    </select>
                </div>
            </div>
            <div className='d-flex group-input'>
                <div>
                    <input value={phone} name='phone' type='text' className='input-text input-phone' id='phone-number' onChange={(e) => setPhone(e.target.value)} />
                    <label className='label-phone' htmlFor='phone-number' id='phone-number-label'>{languageList.txtPhone}</label>
                </div>
                <div>
                    <select name='city' className='input-city' onChange={(e) => setCity(e.target.value)}>
                        <option value=''>{languageList.txtCity}</option>
                        {City.map((c) => (<option selected={city == c.name} value={c.name}>{c.name}</option>))}
                    </select>
                </div>
            </div>
            <div className='mt-30'>
                <label className='label-address' htmlFor='address' id='address-label'>{languageList.txtAddress}</label>
                <input value={address} name='address' type='text' className='input-text input-address' id='address' onChange={(e) => setAddress(e.target.value)} />
            </div>
            <label className='button-register' onClick={handleRegisterClicked}>{languageList.btnRegister}</label>
            {showLoading && <div className='popup'>
                <div className='bg-popup' />
                <LoadingDialog />
            </div>}
        </form>
    </div>
    )
}

export default memo(RegisterProfile)