import { memo } from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import VerifyImage from '../../images/verifyEmail.png'
import Hiring from '../../images/hiring2.png'
import './VerifyEmail.scss'
import { HiOutlineMail } from 'react-icons/hi'
import { vietnamese, english } from '../../Languages/VerifyEmail'
import BackgroundAnimater from '../../Layout/BackgroundAnimater'
import { toast } from 'react-toastify'

function VerifyEmail({ languageSelected }) {
    let languageList = (languageSelected === 'EN' ? english : vietnamese)

    const data = useLocation().state
    const roleSession = sessionStorage.getItem('role')
    let email
    let role

    if (data === null) {
        toast.error(languageSelected === 'EN' ? 'Request is invalid' : 'Yêu cầu không hợp lệ')
    }
    else {
        email = data.email
        role = data.role
    }

    return (
        <>
            {data === null ?
                <Navigate to={roleSession != 1 ? '/' : '/admin/dashboard'} />
                :
                <div className='container d-flex container-verify'>
                    <div className='content-description'>
                        <div className='background-animater-checkmail'><BackgroundAnimater /></div>
                        <div className='title-verify'>{languageList[0]}</div>
                        <div className='description-verify'>{languageList[1]}</div>
                        <HiOutlineMail className='icon-email-verify' />
                        <div className='email-preview'>
                            <label>{email}</label>
                        </div>
                    </div>
                    <img src={role != 3 ? Hiring : VerifyImage} className='image-verify' />
                </div>
            }
        </>
    )
}

export default memo(VerifyEmail)