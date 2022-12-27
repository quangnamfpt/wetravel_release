import { useState, memo, useEffect, useLayoutEffect, useRef } from 'react'
import Login from '../../pages/Login'
import ForgotPassword from '../../pages/ForgotPassword';
import { Link } from 'react-router-dom'
import { FaRegHandshake } from "react-icons/fa";
import { BiTrip } from 'react-icons/bi'
import { RiEditBoxLine } from 'react-icons/ri'
import { AiFillCustomerService, AiOutlineNotification } from 'react-icons/ai'
import VietNamFlag from '../../images/vietnam.png'
import EnglishFlag from '../../images/english.png'
import { AiOutlineCaretDown, AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { MdOutlineForum, MdPassword } from "react-icons/md";
import 'react-dropdown/style.css';
import './Header.css';
import { vietnamese, english } from '../../Languages/Header'
import LoadingDialog from '../LoadingDialog';
import { toast } from 'react-toastify';
import Logo from '../../images/logo.png'
import axios from 'axios';
import Scrollbars from 'react-custom-scrollbars-2';
import { API_GET_LIST_ALERT, API_UPDATE_SEEN_ALERT } from '../../API';
import PopupDetailAlert from '../PopupDetailAlert';

function Header({ languageSelected, setLanguageSelected, setProgress }) {
    const [showLogin, setShowLogin] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showPopupDetailAlert, setShowPopupDetailAlert] = useState(false);

    const [titleDetailAlert, setTitleDetailAlert] = useState('')
    const [contentDetailAlert, setContentDetailAlert] = useState('')
    const [timeDetailAlert, setTimeDetailAlert] = useState('')

    const [language, setLanguage] = useState(languageSelected);

    const [firstName, setFirstName] = useState(sessionStorage.getItem('firstName'))
    const [lastName, setLastName] = useState(sessionStorage.getItem('lastName'))
    const [role, setRole] = useState(sessionStorage.getItem('role'))
    const [email, setEmail] = useState(sessionStorage.getItem('email'))
    const [alerts, setAlerts] = useState([])
    const [unSeen, setUnSeen] = useState(false)
    const alertRealTime = useRef()

    useEffect(() => {
        setFirstName(sessionStorage.getItem('firstName'))
        setLastName(sessionStorage.getItem('lastName'))
        setRole(sessionStorage.getItem('role'))
        setEmail(sessionStorage.getItem('email'))
    }, [sessionStorage.getItem('role')])


    const getAlert = () => {
        axios.get(`${API_GET_LIST_ALERT}?accountId=${sessionStorage.getItem('id')}`)
            .then((res) => {
                console.log(res)
                for (let i = 0; i < res.data.data.length; i++) {
                    if (!res.data.data[i].status) {
                        setUnSeen(true)
                        break;
                    }
                    else if (i === res.data.data.length - 1) {
                        setUnSeen(false)
                    }
                }
                setAlerts(res.data.data)
            })
    }

    useEffect(() => {
        if (role != 0 && role != 1 && role !== null) {
            getAlert()
            alertRealTime.current = setInterval(() => { getAlert() }, 5000)
        }
        else {
            clearInterval(alertRealTime.current)
        }

        return () => clearInterval(alertRealTime.current)
    }, [role])

    let languageList = (languageSelected === 'EN' ? english : vietnamese)

    const handleSelectLanguage = () => {
        const text = document.getElementById('select-language-option').textContent;
        document.cookie = `languageSelected=${text}`;
        setLanguageSelected(text)
        setLanguage(text);
        const detail = document.getElementById('select-language');
        detail.removeAttribute("open");
        setProgress(100)
    };

    const handleCLickLogout = () => {
        sessionStorage.removeItem("email");
        sessionStorage.removeItem('firstName')
        sessionStorage.removeItem('lastName')
        sessionStorage.removeItem('address')
        sessionStorage.removeItem('city')
        sessionStorage.removeItem('gender')
        sessionStorage.removeItem('birthdate')
        sessionStorage.removeItem('phone')
        sessionStorage.removeItem('rankPoint')
        sessionStorage.removeItem('partnerEmail')
        sessionStorage.removeItem('detail-service')
        sessionStorage.removeItem('role')
        sessionStorage.removeItem('index-service-selected')
        sessionStorage.removeItem('id')
        document.cookie = `email=`;
        document.cookie = `password=`;
        setFirstName('')
        setEmail('')
        setRole(0)
        setProgress(100)
    }

    const handleClickAlert = (title, content, time, id, index) => {
        axios.put(`${API_UPDATE_SEEN_ALERT}${id}`).then((res) => {
            let listAlertRaw = [...alerts]
            listAlertRaw[index].status = true
            for (let i = 0; i < listAlertRaw.length; i++) {
                if (!listAlertRaw[i].status) {
                    setUnSeen(true)
                    break;
                }
                else if (i === listAlertRaw.length - 1) {
                    setUnSeen(false)
                }
            }
            setAlerts(listAlertRaw)
        }).catch((err) => console.error(err))
        setTitleDetailAlert(title)
        setContentDetailAlert(content)
        setTimeDetailAlert(time)
        setShowPopupDetailAlert(true)
    }

    const formatDateTime = (text) => {
        var tzoffset = (new Date()).getTimezoneOffset() * 60000;
        var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);

        const date = text.split('T')[0]
        const dateNow = localISOTime.split('T')[0]
        const time = text.split('T')[1].split('.')[0]
        const timeNow = localISOTime.split('T')[1].split('.')[0]

        if (date === dateNow) {
            const hours = time.split(':')[0]
            const minute = time.split(':')[1]
            const second = time.split(':')[2]

            const hoursNow = timeNow.split(':')[0]
            const minuteNow = timeNow.split(':')[1]
            const secondNow = timeNow.split(':')[2]

            if (hours === hoursNow && minute === minuteNow) {
                return `${parseInt(secondNow) - parseInt(second)} ${languageList.txtSecondAgo}`
            }
            else if (hours === hoursNow && minuteNow > minute) {
                return `${parseInt(minuteNow) - parseInt(minute)} ${languageList.txtMinuteAgo}`
            }
            else if (hoursNow - hours === 1 && minuteNow < minute) {
                return `${parseInt(minuteNow) + 60 - parseInt(minute)} ${languageList.txtMinuteAgo}`
            }
            else {
                return `${parseInt(hoursNow) - parseInt(hours)} ${languageList.txtHoursAgo}`
            }
        }
        else {
            const day = date.split('-')[2]
            const month = date.split('-')[1]
            const year = date.split('-')[0]
            return `${day}/${month}/${year}`
        }
    }



    return (<div className='container header-container box-shadow-common'>
        {showPopupDetailAlert &&
            <PopupDetailAlert languageSelected={languageSelected} title={titleDetailAlert} content={contentDetailAlert}
                time={timeDetailAlert} setShowPopupDetailAlert={setShowPopupDetailAlert} />}
        <header className='header-main'>
            <Link className='inner' to={sessionStorage.getItem('role') == 1 ? '/admin/dashboard' : '/'}>
                <img src={Logo} className='logo' />
                <div className='text-logo'>WeTravel</div>
            </Link>
            <nav className='nav-link d-flex'>
                {(role != 1) ?
                    <>
                        <Link to='/tours' className='link' ><BiTrip className='icon-image' />Tours</Link>
                        <Link to='/services' className='link' ><AiFillCustomerService className='icon-image' />{languageList.txtServices}</Link>
                        <Link to='/forum' className='link' ><MdOutlineForum className='icon-image' />{languageList.txtForum}</Link>
                        <Link to={role == 2 ? '/partner' : '/select-service'} className='link'><FaRegHandshake className='icon-image' /> {languageList.txtPartner}</Link>
                        {role !== null &&
                            <span onMouseEnter={() => document.getElementById('alert-list').style.display = 'inline'}
                                onMouseLeave={() => document.getElementById('alert-list').style.display = 'none'}
                                className='click-alert'>
                                <label>
                                    {unSeen &&
                                        <div className='unseen-notify'></div>
                                    }
                                    <a className='link'><AiOutlineNotification className='icon-image' />{languageList.txtAlert}</a>
                                </label>
                                <div className='fade-in dropdown-alert' id='alert-list'>
                                    <div className='font-20 text-bold plr-20'>{languageList.txtAlert}</div>
                                    <Scrollbars>
                                        <div className='pt-10'></div>
                                        {[...alerts].map((item, index) => (
                                            <div className='each-alert' onClick={() => handleClickAlert(item.title, item.content, formatDateTime(item.timeCreate), item.alertId, index)}>
                                                <div className='d-flex space-between center-vertical'>
                                                    <div className='w-100 d-flex font-16 space-between'>
                                                        <label>
                                                            {item.title.substring(0, 15)}
                                                            {item.title.length > 15 && '...'}
                                                        </label>
                                                        <div className='font-14 text-normal color-gray mr-10'>{formatDateTime(item.timeCreate)}</div>
                                                    </div>
                                                    {!item.status && <div className='unseen-each-alert'></div>}
                                                </div>
                                                <div className='text-normal font-14'>
                                                    {item.content.substring(0, 70)}
                                                    {item.content.length > 70 && '...'}
                                                </div>
                                            </div>
                                        ))}
                                    </Scrollbars>
                                </div>
                            </span>

                        }
                    </>
                    :
                    <>
                        <Link to={role != 1 ? '/forum' : '/admin/forum'} className='link' ><MdOutlineForum className='icon-image' />{languageList.txtForum}</Link>
                    </>
                }
                <span onMouseEnter={() => document.getElementById('select-language-box').style.display = 'inline'}
                    onMouseLeave={() => document.getElementById('select-language-box').style.display = 'none'}>
                    <label
                        className='select-language'><img src={language === 'EN' ? EnglishFlag : VietNamFlag} className='icon-image' />{language} <AiOutlineCaretDown className='icon-image' /></label>
                    <label
                        id='select-language-box' className='fade-in label-select-language' onClick={handleSelectLanguage}>
                        <img src={language === 'EN' ? VietNamFlag : EnglishFlag} className='icon-image' />
                        <label id='select-language-option'>{language !== 'EN' ? 'EN' : 'VI'}</label>
                    </label>
                </span>
                {role === null ? <>
                    <label className='link login' onClick={() => setShowLogin(true)}>{languageList.txtLogin}</label>
                    <Link to='/register' className='link register' >{languageList.txtRegister}</Link>
                </> :
                    <span onMouseEnter={() => document.getElementById('my-account').style.display = 'inline'}
                        onMouseLeave={() => document.getElementById('my-account').style.display = 'none'}
                        className='link ml-50 my-account-dropdown'>
                        <label className='d-flex'>{role > 1 ? `${firstName} ${lastName}` : `${email}`} <AiOutlineCaretDown className='icon-image icon-lower' /></label>
                        <label id='my-account' className='fade-in dropdown-profile-item'>
                            <div>{languageList.txtMyAccount}</div>
                            <Link to={role == 1 ? '/admin/change-password-account' : '/change-password-account'} className='item-dropdown-profile'><MdPassword className='icon-image icon-dropdown-profile' /> {languageList.txtChangePassword}</Link>
                            {role > 1 &&
                                <>
                                    <Link to='/profile' className='item-dropdown-profile'><AiOutlineUser className='icon-image icon-dropdown-profile' /> {languageList.txtEditProfile}</Link>
                                </>
                            }
                            <Link to={role != 1 ? '/my-post' : '/admin/my-post'} className='item-dropdown-profile'><RiEditBoxLine className='icon-image icon-dropdown-profile' /> {languageList.txtMyPost}</Link>
                            <Link onClick={handleCLickLogout} to='/' className='item-dropdown-profile'><AiOutlineLogout className='icon-image icon-dropdown-profile' /> {languageList.txtLogout}</Link>
                        </label>
                    </span>
                }
            </nav>
        </header>
        {(showLogin || showForgotPassword || showLoading) && <div className='popup'>
            <div className='bg-popup' onClick={() => {
                setShowForgotPassword(false)
                setShowLogin(false)
            }} />
            {showLoading ? <LoadingDialog /> :
                showForgotPassword ? <ForgotPassword setProgress={setProgress} toast={toast} setShowLoading={setShowLoading} languageSelected={languageSelected} /> :
                    <Login setProgress={setProgress} toast={toast} setShowLogin={setShowLogin} setShowLoading={setShowLoading} languageSelected={languageSelected} handleForgotPassword={setShowForgotPassword} />
            }
        </div>}
    </div>)
}

export default Header