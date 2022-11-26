import { memo, useState } from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'
import Facebook from '../../images/facebook.png'
import Gmail from '../../images/gmail.png'
import { vietnamese, english } from '../../Languages/Footer'
import { toast } from 'react-toastify';
import Login from '../../pages/Login'
import ForgotPassword from '../../pages/ForgotPassword';
import LoadingDialog from '../LoadingDialog';

function Footer({ languageSelected, setProgress }) {
    let languageList = (languageSelected === 'EN' ? english : vietnamese)
    const [showLogin, setShowLogin] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showLoading, setShowLoading] = useState(false);

    return (<div className='footer'>
        <div className='container content-footer'>
            <div className='item-footer w-25'>
                <h1>WeTravel</h1>
            </div>
            <div className='d-flex main-content-footer'>
                <div className='item-footer'>
                    <div className='title-footer'>{languageList.txtAboutWeTravel}</div>
                    <div className='mb-20 title-footer'>{languageList.txtAboutUs}</div>
                    <div className='title-footer'>{languageList.txtFollowAt}</div>
                    <div className='d-flex center-link-contact'>
                        <img src={Facebook} className='contact-logo' />
                        <a href='https://www.facebook.com/WeTravel-106482858895630/' className='contact-link'>Facebook</a>
                    </div>
                    <div className='d-flex center-link-contact'>
                        <img src={Gmail} className='contact-logo' />
                        <a href='mailto:nguyenc501@gmail.com' className='contact-link'>Gmail</a>
                    </div>
                </div>
                <div className='item-footer'>
                    <div className='title-footer'>{languageList.txtPartner}</div>
                    <Link to='/register-partner' className='d-block contact-link'>{languageList.txtRegisterPartner}</Link>
                    <div className='contact-link' onClick={() => setShowLogin(true)}>{languageList.txtPartnerLogin}</div>
                </div>
                <div className='item-footer'>
                    <div className='title-footer'>{languageList.txtTermsOfUse}</div>
                    <Link to='/' className='d-block contact-link'>{languageList.txtTermsAndConditions}</Link>
                    <Link to='/' className='d-block contact-link'>{languageList.txtPrivacyPolicy}</Link>
                    <Link to='/' className='d-block contact-link'>{languageList.txtCookiePolicy}</Link>
                    <Link to='/' className='d-block contact-link'>{languageList.txtPoliciesAndProcedures}</Link>
                </div>
            </div>
        </div>
        <div className='copyright'>{languageList.txtCopyRight}</div>
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

export default memo(Footer)