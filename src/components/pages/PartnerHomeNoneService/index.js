import { memo } from 'react'
import { Link } from 'react-router-dom'
import Background from '../../images/bgPartnerHome.jpg'
import { GoPlus } from 'react-icons/go'

function PartnerHomeNoneService({ languageSelected }) {
    return (
        <>
            <img src={Background} className='bg-image-partner-home' />
            <div className="container p-100 space-around-select-add-service">
                <div className="select-add-service">
                    <label className="d-block text-center title">{languageSelected === 'EN' ? 'More information for new service' : 'Thêm thông tin cho dịch vụ mới'}</label>
                    <Link to='/partner/select-detail-service' className="btn btn-primary btn-add-service"><GoPlus className="icon-add-service" /><label>{languageSelected === 'EN' ? 'New service' : 'Thêm dịch vụ'}</label></Link>
                </div>
            </div>
        </>
    )
}

export default memo(PartnerHomeNoneService)