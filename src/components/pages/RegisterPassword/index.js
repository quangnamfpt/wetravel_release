import { useState, memo } from 'react'
import { useNavigate } from 'react-router-dom'
import './RegisterPassword.scss'
import { FiLock } from 'react-icons/fi'
import { HiOutlineArrowNarrowRight } from 'react-icons/hi'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { vietnamese, english } from '../../Languages/RegisterPassword'
import { toast } from 'react-toastify'
import BackgroundAnimater from '../../Layout/BackgroundAnimater'

function RegisterPassword({ languageSelected, handleNextScreen, role, setPasswordMain, token }) {
    let languageList = (languageSelected === 'EN' ? english : vietnamese)

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const navigate = useNavigate()

    const handleCheckPasswordRegister = () => {
        if (password.length < 6) {
            toast.error(languageList[4])
        }
        else if (password !== passwordRepeat) {
            toast.error(languageList[5])
        }
        else {
            setPasswordMain(password)
            if (role === 3) {
                handleNextScreen()
            }
            else {
                navigate('/register-profile-partner', { state: { token: token, password: password } })
            }
        }
    }

    const handleOnInputPassword = (text) => {
        setPassword(text)
    }

    return (<div className='container form-register-info'>
        <div className='background-animater-register-password'><BackgroundAnimater /></div>
        <div className='title-register-info'>{languageList[0]}</div>
        <div>
            <FiLock className='icon-inner-lock' />
            <div class="field-register-info">
                <input onChange={(e) => handleOnInputPassword(e.target.value)} type={showPassword ? 'text' : 'password'} required id="password" />
                <label htmlFor="password" title={languageList[1]} data-title={languageList[1]}></label>
            </div>
            {showPassword ? <AiOutlineEyeInvisible className='icon-inner-show-password ' onClick={() => setShowPassword(false)} />
                : <AiOutlineEye onClick={() => setShowPassword(true)} className='icon-inner-show-password ' />}
        </div>
        <div>
            <FiLock className='icon-inner-lock' />
            <div className="field-register-info">
                <input onChange={(e) => setPasswordRepeat(e.target.value)} type={showPasswordRepeat ? 'text' : 'password'} required id="password-repeat" />
                <label htmlFor="password-repeat" title={languageList[2]} data-title={languageList[2]}></label>
            </div>
            {showPasswordRepeat ? <AiOutlineEyeInvisible className='icon-inner-show-password ' onClick={() => setShowPasswordRepeat(false)} />
                : <AiOutlineEye onClick={() => setShowPasswordRepeat(true)} className='icon-inner-show-password ' />}
        </div>
        <button onClick={handleCheckPasswordRegister} className='text-decoration-none btn-next-register-info'>{languageList[3]} <HiOutlineArrowNarrowRight className='space-left' /></button>
    </div>)
}

export default memo(RegisterPassword)