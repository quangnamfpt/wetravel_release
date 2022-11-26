import { useState, memo, useEffect } from "react"
import PartnerHomeNoneService from "../PartnerHomeNoneService"
import PartnerHomeHadService from "../PartnerHomeHadService"
import axios from "axios"
import { API_GET_SERVICE_BY_CONDITION } from "../../API"
import LoadingDialog from "../../Layout/LoadingDialog"
import './PartnerHome.scss'

function PartnerHome({ languageSelected }) {
    const [getDataComplete, setGetDataComplete] = useState(false)
    const [services, setServices] = useState([])
    const email = sessionStorage.getItem('email')

    useEffect(() => {
        axios.get(API_GET_SERVICE_BY_CONDITION, {
            params: { emailPartner: email }
        }).then((response) => {
            setServices(response.data.data)
            setGetDataComplete(true)
        }).catch(() => {
            setGetDataComplete(true)
        })
    }, [])

    if (!getDataComplete) {
        return (<LoadingDialog />)
    }

    return (<div className='container home-main'>
        {services.length > 0 ? <PartnerHomeHadService languageSelected={languageSelected} services={services} /> : <PartnerHomeNoneService languageSelected={languageSelected} />}
    </div>)
}

export default memo(PartnerHome)