import React, { memo, useState, useEffect } from 'react'
import './Register.scss'
import Login from '../../pages/Login'
import ForgotPassword from '../../pages/ForgotPassword';
import Camping from '../../images/camping.png'
import Hiring from '../../images/hiring3.png'
import { HiOutlineMail, HiOutlineArrowNarrowRight } from 'react-icons/hi'
import Checkbox from '@mui/material/Checkbox';
import { Link, useNavigate } from 'react-router-dom'
import { vietnamese, english } from '../../Languages/Register';
import axios from 'axios';
import LoadingDialog from '../../Layout/LoadingDialog'
import BackgroundAnimater from '../../Layout/BackgroundAnimater';
import { toast } from 'react-toastify'
import { API_VERIFY } from '../../API';

function Register({ languageSelected, role, setProgress }) {
    let languageList = (languageSelected === 'EN' ? english : vietnamese)

    const serviceCategoryId = (sessionStorage.getItem('index-service-selected') ? parseInt(sessionStorage.getItem('index-service-selected')) + 1 : '')
    const navigate = useNavigate();
    const [showLoading, setShowLoading] = useState(false)
    const [emailRegister, setEmailRegister] = useState('');
    const [showLogin, setShowLogin] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [agree, setAgree] = useState(false);

    const handleClickNext = async () => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailRegister) && agree) {
            setShowLoading(true);
            setProgress(70)
            let email = emailRegister
            let roleId = role

            // call api from server
            await axios.post(`${API_VERIFY}?email=${email}&roleId=${roleId}&serviceCategoryId=${serviceCategoryId}`)
                .then((res) => {
                    if (res.data.data === 'Email exist!') {
                        setShowLoading(false);
                        toast.error(languageList[6])
                    }
                    else {
                        localStorage.setItem('tokenRegister', res.data.data)
                        navigate(`/checkmail`, { state: { email: email, role: roleId, token: res.data.data } })
                    }
                }).catch(() => {
                    setShowLoading(false);
                    toast.warning(languageList[6])
                })
            setProgress(100)
        }
        else if (!agree) {
            toast.error(languageList[7])
        }
        else {
            toast.error(languageList[5])
        }
    }

    return (
        <div className='signup-container'>
            <div className='input-group container'>
                <div className='cn'>
                    <div className='content-input container'>
                        <div className='background-animater-register'><BackgroundAnimater /></div>
                        <div className='text-box-email container'>
                            <HiOutlineMail className='email-icon' />
                            <div className="field input-mail">
                                <input name='email' value={emailRegister} className='input-mail' onChange={(e) => setEmailRegister(e.target.value)} type="text" required id="text" />
                                <label htmlFor="text" title="Email" data-title="Email"></label>
                            </div>
                        </div>
                        <div className='checkbox-remember'>
                            <Checkbox
                                onChange={() => setAgree(!agree)}
                                id='remember'
                                sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} />
                            <label className='text-term'>{languageList[0]} <Link to='/' className='text-dark'>{languageList[1]}</Link></label>
                        </div>
                        <div className='group-submit'>
                            <label onClick={handleClickNext} className='btn-next-register text-decoration-none'>{languageList[2]} <HiOutlineArrowNarrowRight className='space-left' /></label>
                            <div className='ask-to-login'>
                                <div className='d-block text-center'>{languageList[3]}</div>
                                <div className='d-block text-decoration-none text text-center text-blue' onClick={() => setShowLogin(true)}>{languageList[4]}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <img className='image-register' src={role == 3 ? Camping : Hiring} />
            </div>

            {(showLogin || showForgotPassword || showLoading) && <div className='popup'>
                <div className='bg-popup' onClick={() => {
                    setShowForgotPassword(false)
                    setShowLogin(false)
                }} />
                {showLoading ? <LoadingDialog /> :
                    showForgotPassword ? <ForgotPassword setProgress={setProgress} setShowLoading={setShowLoading} languageSelected={languageSelected} /> :
                        <Login setProgress={setProgress} setShowLoading={setShowLoading} languageSelected={languageSelected} handleForgotPassword={setShowForgotPassword} />
                }
            </div>}
        </div>
    )
}

export default memo(Register)