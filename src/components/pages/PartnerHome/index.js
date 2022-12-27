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
    const id = sessionStorage.getItem('id')

    const [numberPage, setNumberPage] = useState(1)
    const [numberOfPages, setNumberOfPages] = useState([])

    useEffect(() => {
        axios.get(API_GET_SERVICE_BY_CONDITION, {
            params: {
                accountId: id,
                page: numberPage,
                size: 10,
                serviceIdList: ''
            }
        }).then((response) => {
            setServices(response.data.data.content)
            const totalPages = response.data.data.totalPages
            let listPages = []
            for (let i = 0; i < totalPages; i++) {
                listPages.push(i + 1)
            }
            setNumberOfPages(listPages)
            setGetDataComplete(true)
        }).catch(() => {
            setGetDataComplete(true)
        })
    }, [numberPage])

    if (!getDataComplete) {
        return (<LoadingDialog />)
    }

    return (<div className='container home-main'>
        {services.length > 0 ?
            <PartnerHomeHadService languageSelected={languageSelected} services={services} numberPage={numberPage}
                setNumberPage={setNumberPage} numberOfPages={numberOfPages} />
            :
            <PartnerHomeNoneService languageSelected={languageSelected} />
        }
    </div>)
}

export default memo(PartnerHome)