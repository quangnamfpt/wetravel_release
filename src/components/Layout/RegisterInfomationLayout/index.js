import { memo } from 'react'
import Camping2 from '../../images/camping2.png';
import Hiring1 from '../../images/hiring1.png';
import './RegisterInfomationLayout.scss'

function RegisterInfomationLayout({ children, image, changePassword }) {
    const role = (sessionStorage.getItem('role') == 3 ? 3 : 2)

    return (
        <div className='container content-register-information'>
            <img className='image-side'
                src={changePassword ? (role == 3 ? Camping2 : Hiring1) : image}
                alt="" />
            <div className='content-register-information-input'>
                {children}
            </div>
        </div>
    )
}

export default memo(RegisterInfomationLayout)