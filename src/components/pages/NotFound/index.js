import { memo } from 'react'
import { Link } from 'react-router-dom'
import NotFoundImage from '../../images/404.png'
import { english, vietnamese } from '../../Languages/NotFound'
import './NotFound.scss'

function NotFound({ languageSelected }) {
    const role = sessionStorage.getItem('role')
    const languageList = languageSelected === 'EN' ? english : vietnamese

    return (
        <div className='container not-found'>
            <img src={NotFoundImage} className='w-35' />
            <label className='not-found-text mt-20'>{languageList.txtPageNotFound}</label>
            <label className='mb-50'>{languageList.txtClick}<Link className='link-back-home' to={role != 1 ? '/' : '/admin/dashboard'}>{languageList.txtHere}</Link>{languageList.txtLastText}</label>
        </div>
    )
}

export default memo(NotFound)