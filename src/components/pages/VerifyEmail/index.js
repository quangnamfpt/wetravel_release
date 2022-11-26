import { memo } from 'react'
import { useLocation } from 'react-router-dom'
import VerifyImage from '../../images/verifyEmail.png'
import Hiring from '../../images/hiring2.png'
import './VerifyEmail.scss'
import { HiOutlineMail } from 'react-icons/hi'
import { vietnamese, english } from '../../Languages/VerifyEmail'
import BackgroundAnimater from '../../Layout/BackgroundAnimater'

function VerifyEmail({ languageSelected }) {
    let languageList = (languageSelected === 'EN' ? english : vietnamese)

    const email = useLocation().state.email
    const role = useLocation().state.role
    console.log(useLocation().state.token)

    return (<div className='container d-flex container-verify'>
        <div className='content-description'>
            <div className='background-animater-checkmail'><BackgroundAnimater /></div>
            <div className='title-verify'>{languageList[0]}</div>
            <div className='description-verify'>{languageList[1]}</div>
            <HiOutlineMail className='icon-email-verify' />
            <div className='email-preview'>
                <label>{email}</label>
            </div>
        </div>
        <img src={role == 3 ? VerifyImage : Hiring} className='image-verify' />
    </div>)
}

export default memo(VerifyEmail)