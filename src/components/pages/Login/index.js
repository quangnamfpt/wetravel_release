import React, { memo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.scss'
import { HiOutlineMail } from 'react-icons/hi'
import { FiLock } from 'react-icons/fi'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import Checkbox from '@mui/material/Checkbox';
import { vietnamese, english } from '../../Languages/Login'
import axios from 'axios'
import { API_LOGIN } from '../../API';

function Login({ languageSelected, handleForgotPassword, setShowLoading, toast, setShowLogin, setProgress }) {
    const navigate = useNavigate()
    let languageList = (languageSelected === 'EN' ? english : vietnamese)

    const [showPassword, setShowPassword] = useState(false);
    const [emailLogin, setEmailLogin] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleClickLogin = () => {
        if (emailLogin !== '' && password !== '') {
            if (rememberMe) {
                document.cookie = `email="${emailLogin}"`;
                document.cookie = `password="${password}"`;
            }

            //create data to request server
            let account = {
                email: emailLogin,
                password: password
            }

            setShowLoading(true)

            setProgress(70)

            //call api from server
            axios.post(API_LOGIN, account)
                .then((res) => {
                    sessionStorage.setItem('email', emailLogin);
                    const account = res.data.data
                    sessionStorage.setItem('id', account.information.accountId)

                    if (account.information.roleId) {
                        if (account.information.isBlock) {
                            toast.error(languageList[12])
                            setShowLoading(false)
                            setShowLogin(false)
                        }
                        else {

                            if (account.information.roleId > 1) {
                                sessionStorage.setItem('role', account.information.roleId)
                                sessionStorage.setItem('firstName', account.information.firstName)
                                sessionStorage.setItem('lastName', account.information.lastName)

                                sessionStorage.setItem('gender', account.information.gender)
                                sessionStorage.setItem('birthdate', account.information.birthDate)
                                sessionStorage.setItem('phone', account.information.phone)
                            }
                            if (account.information.roleId === 3) {
                                sessionStorage.setItem('rankPoint', account.information.rankPoint)

                            } else if (account.information.roleId === 2) {
                                sessionStorage.setItem('index-service-selected', account.information.serviceCategory)
                                sessionStorage.setItem('partnerEmail', account.information.emailContactCompany)

                            }
                            toast.success(languageList[11])
                            setShowLoading(false)
                            setShowLogin(false)
                        }
                    }
                    else {
                        sessionStorage.setItem('role', 1)
                        toast.success(languageList[11])
                        setShowLoading(false)
                        setShowLogin(false)
                        navigate('/admin/dashboard')
                    }

                    setProgress(100)
                })
                .catch(() => {
                    toast.error(languageList[5])
                    setShowLoading(false)
                    setProgress(100)
                })

        }
        else if (emailLogin === '' || password === '') {
            toast.error(languageList[10])
        }
    }

    return (
        <div className='location'>
            <h2 className='title-login'>{languageList[0]}</h2>
            <div className='warning-input'></div>
            <div>
                <div>
                    <HiOutlineMail className='icon-inner' />
                    <div className='input-tag'>
                        <div className="field-login">
                            <input value={emailLogin} name='email' onChange={(e) => setEmailLogin(e.target.value)} type="text" required id="text" />
                            <label htmlFor="text" title={languageList[1]} data-title={languageList[1]}></label>
                        </div>
                    </div>
                </div>

                <div>
                    <FiLock className='icon-inner' />
                    {showPassword ? <AiOutlineEyeInvisible className='icon-inner icon-show-password' onClick={() => setShowPassword(false)} />
                        : <AiOutlineEye className='icon-inner icon-show-password' onClick={() => setShowPassword(true)} />}
                    <div className='input-tag'>
                        <div className="field-login">
                            <input value={password} name='password' onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} required id="password" />
                            <label htmlFor="password" title={languageList[2]} data-title={languageList[2]}></label>
                        </div>
                    </div>
                </div>
                <div className='remember-forgot'>
                    <div className='checkbox-remember'>
                        <Checkbox
                            onChange={() => setRememberMe(!rememberMe)}
                            id='remember'
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 20 } }} />
                        <label style={{ color: 'black' }}>{languageList[3]}</label>
                    </div>

                    <div onClick={handleForgotPassword} className='forgot-link'>{languageList[4]}</div>
                </div>



                <div className='login-register'>
                    <label onClick={handleClickLogin} className='btn-login'>{languageList[7]}</label>
                    <div className='ask-to-register'>
                        <div className='question-no-account'>{languageList[8]}</div>
                        <Link to='/register?role=1' className='register-link'>{languageList[9]}</Link>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default memo(Login)