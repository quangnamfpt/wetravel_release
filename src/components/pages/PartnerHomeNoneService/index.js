import { memo } from 'react'
import { Link } from 'react-router-dom'
import Background from '../../images/bgPartnerHome.jpg'
import { GoPlus } from 'react-icons/go'

function PartnerHomeNoneService() {
    return (
        <>
            <img src={Background} className='bg-image-partner-home' />
            <div className="container p-100 space-around-select-add-service">
                <div className="select-add-service">
                    <label className="d-block text-center title">More information for new service</label>
                    <Link to='/partner/select-detail-service' className="btn btn-primary btn-add-service"><GoPlus className="icon-add-service" /><label>New service</label></Link>
                </div>
            </div>
        </>
    )
}

export default memo(PartnerHomeNoneService)