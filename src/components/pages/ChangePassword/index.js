import { useState, memo } from 'react'
import { HiOutlineMail } from 'react-icons/hi'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { FiLock } from 'react-icons/fi'
import './ChangePassword.scss'
import LoadingDialog from '../../Layout/LoadingDialog'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import BackgroundAnimater from '../../Layout/BackgroundAnimater'
import { vietnamese, english } from '../../Languages/ChangePassword'

function ChangePassword({ languageSelected, setProgress }) {
    let languagesList = (languageSelected === 'EN' ? english : vietnamese)

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    let email = urlParams.get('email')

    const navigate = useNavigate()

    if (sessionStorage.getItem('email') != null) {
        email = sessionStorage.getItem('email')
    }

    const [password, setPassword] = useState('')
    const [passwordRepeat, setPasswordRepeat] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showPasswordRepeat, setShowPasswordRepeat] = useState(false)
    const [showLoading, setShowLoading] = useState(false)

    const handleClickResetPassword = async () => {
        if (password.length < 6) {
            toast.warning(languagesList.warningLength)
        }
        else if (password != passwordRepeat) {
            toast.warning(languagesList.warningNotSame)
        }
        else {
            setShowLoading(true)
            setProgress(70)
            let changePasswordInfor = {
                email: email,
                password: password,
            }

            //call api from server
            await axios.post('http://localhost:8081/wetravel/change/password', changePasswordInfor).then((result) => {
                toast.success(languagesList.successChangePassword)
                setTimeout(navigate(`/`), 2000)
            }).catch(() => {
                setShowLoading(false)
                toast.error(languagesList.errorByServer);
            })
            setProgress(100)
        }
    }

    const handleChangeInput = (input) => {
        { input.id.includes('repeat') ? setPasswordRepeat(input.value) : setPassword(input.value) }
        const label = document.getElementById(`${input.id}-label`);
        if (input.value !== '') {
            label.style.bottom = '-8px'
            label.style.color = '#4874E8'
            input.style.borderBottom = 'solid 1px #4874E8'
        }
        else {
            label.style.bottom = '-30px'
            label.style.color = 'gray'
            input.style.borderBottom = 'solid 1px #ccc'
        }
    }

    return (<div className='container change-password-container'>
        <div className='background-animater-change-password'><BackgroundAnimater /></div>
        <h1 className='title-change-password'>{languagesList.title}</h1>
        <div className='component-change-password'>
            <HiOutlineMail className='icon-mail-change-password' />
            <label className='email-change-password'>{email}</label>
        </div>
        <div className='component-change-password'>
            <FiLock className='icon-lock-change-password' />
            <label htmlFor='newpassword' className='label-change-password' id='newpassword-label'>{languagesList.labelPassword}</label>
            <input value={password}
                onChange={(e) => handleChangeInput(e.target)}
                type={showPassword ? 'text' : 'password'}
                id='newpassword'
                name='newpassword'
                className='input-change-password' />
            {showPassword ? <AiOutlineEyeInvisible className='icon-show-change-password' onClick={() => setShowPassword(false)} /> : <AiOutlineEye className='icon-show-change-password' onClick={() => setShowPassword(true)} />}
        </div>
        <div className='component-change-password'>
            <FiLock className='icon-lock-change-password' />
            <label htmlFor='repeat-newpassword' className='label-change-password' id='repeat-newpassword-label'>{languagesList.labelPasswordConfirm}</label>
            <input
                type={showPasswordRepeat ? 'text' : 'password'}
                value={passwordRepeat}
                onChange={(e) => handleChangeInput(e.target)}
                id='repeat-newpassword'
                className='input-change-password' />
            {showPasswordRepeat ? <AiOutlineEyeInvisible className='icon-show-change-password' onClick={() => setShowPasswordRepeat(false)} /> : <AiOutlineEye className='icon-show-change-password' onClick={() => setShowPasswordRepeat(true)} />}
        </div>
        <label onClick={handleClickResetPassword} className='btn-reset-password'>{languagesList.btnResetPassword}</label>
        {showLoading && <div className='popup'>
            <div className='bg-popup' />
            <LoadingDialog />
        </div>}
    </div>)
}

export default memo(ChangePassword)