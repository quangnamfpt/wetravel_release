import { useState, memo, useContext } from 'react'
import { Link } from 'react-router-dom'
import { LanguageShowing } from '../../../App'
import { englishCampingServiceText, vietnameseCampingServiceText, englishTypeService, vietnameseTypeService } from '../../Languages/ServiceType'

import './SelectDetailService.scss'

function SelectDetailService() {
    const categoryService = sessionStorage.getItem('index-service-selected')
    const [selectIndexDetailService, setSelectIndexDetailService] = useState(0)

    let languageSelected = useContext(LanguageShowing)

    let campingServiceText = (languageSelected === 'EN' ? englishCampingServiceText : vietnameseCampingServiceText)

    let informationDetailService = (languageSelected === 'EN' ? englishTypeService : vietnameseTypeService)

    const handleSelectDetailService = (index) => {
        sessionStorage.setItem('detail-service', index)
        setSelectIndexDetailService(index)
    }

    return (<div className='detail-service'>
        <div className='container'>
            <label
                className='title title-select-detail-service'>
                {campingServiceText[categoryService - 1]}
            </label>
            <div>
                {informationDetailService[categoryService - 1].map((item, index) => (
                    <div key={index}
                        className={`d-flex item-detail-service ${selectIndexDetailService === index ? 'selected' : ''}`}
                        onClick={() => handleSelectDetailService(index)}>
                        <img src={item.logo} className='logo-item-detail-service' />
                        <div className='description-detail-service'>
                            <label className='d-block title-detail-service'>{item.title}</label>
                            <label>{item.description}</label>
                        </div>
                    </div>
                ))}
            </div>
            <div className='location-btn-submit'>
                <Link to='/partner/register-information-service' className='btn btn-primary btn-submit-detail-service'>Submit</Link>
            </div>
        </div>
    </div>)
}

export default memo(SelectDetailService)