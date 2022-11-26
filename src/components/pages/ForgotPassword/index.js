import './ForgotPassword.scss'
import { HiOutlineMail } from 'react-icons/hi'
import { useState, memo } from 'react'
import { vietnamese, english } from '../../Languages/ForgotPassword'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function ForgotPassword({ languageSelected, setShowLoading, toast, setProgress }) {
    let languageList = (languageSelected === 'EN' ? english : vietnamese)

    const [emailForgot, setEmailForgot] = useState('');
    const navigate = useNavigate()

    const handleClickNextForgotPassword = async () => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailForgot)) {
            setShowLoading(true)
            setProgress(70)
            let email = emailForgot
            await axios.post('http://localhost:8081/wetravel/reset/password', null, {
                params: {
                    email
                }
            }).then(() => {
                navigate(`/checkmail?email=${email}&role=3`)
            }).catch(() => {
                toast.error(languageList.warningEmailNotRegistered)
                setShowLoading(false)
            })
            setProgress(100)
        }
        else {
            toast.warning(languageList.warningFormatEmail)
        }
    }

    return (
        <div className='location'>
            <div id='forgot-password-form' className="forgot-container">
                <h2 className="title-forgot text-forgot">{languageList.txtForgotPassword}</h2>
                <div className='message-forgot text-forgot'>{languageList.txtTutorial}</div>
                <div>
                    <HiOutlineMail className='icon-email' />
                    <div className='input-tag'>
                        <div className="field-forgot-password">
                            <input value={emailForgot} onChange={(e) => setEmailForgot(e.target.value)} type="text" required autocomplete="off" id="text" />
                            <label for="text" title="Email" data-title="Email"></label>
                        </div>
                    </div>
                </div>
                <label onClick={handleClickNextForgotPassword} className='btn btn-primary btn-submit-forgot'>{languageList.btnSubmit}</label>
            </div>
        </div>
    )
}

export default memo(ForgotPassword)