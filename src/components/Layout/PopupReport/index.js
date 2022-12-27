import { memo, useState } from 'react'
import './PopupReport.scss'
import { english, vietnamese } from '../../Languages/PopupReport'
import axios from 'axios'
import { API_CREATE_REPORT_FEEDBACK, API_CREATE_REPORT_POST } from '../../API'
import { toast } from 'react-toastify'

function PopupReport({ languageSelected, setShowReport, idReason, setIdReason, callback, id, isPost }) {
    const languageList = languageSelected === 'EN' ? english : vietnamese

    const handleClickSubmit = () => {
        isPost ? createReportPost() : createReportFeedback()
        setShowReport(false)
    }

    const createReportPost = () => {
        const postData = {
            "postId": id,
            "accountId": sessionStorage.getItem('id'),
            "reasonReportPostId": idReason
        }

        axios.post(API_CREATE_REPORT_POST, postData)
            .then(() => {
                toast.success(languageSelected === 'EN' ? 'Report post success' : 'Báo cáo thành công')
            })
            .catch((e) => {
                console.log(e)
            })
    }

    const createReportFeedback = () => {
        const feedbackData = {
            "accountId": sessionStorage.getItem('id'),
            "feedbackId": id,
            "reasonReportFeedbackId": idReason
        }

        axios.post(API_CREATE_REPORT_FEEDBACK, feedbackData)
            .then((res) => {
                toast.success(languageSelected === 'EN' ? 'Report feedback success' : 'Báo cáo thành công')
            })
            .catch((e) => {
                console.log(e)
            })
    }

    return (
        <div className='fade-in bg-popup-report'>
            <div className='bg-white p-20 box-shadow-common br-10'>
                <div className='text-bold font-20 text-center mb-10'>{languageList.txtReport}</div>
                <div className={`reason-report-item ${idReason === 1 && 'reason-report-item-selected'}`}
                    onClick={() => setIdReason(1)}>
                    {languageList.txtContentWrong}
                </div>
                <div className={`reason-report-item ${idReason === 2 && 'reason-report-item-selected'}`}
                    onClick={() => setIdReason(2)}>
                    {languageList.txtViolentLanguage}
                </div>
                <div className={`reason-report-item ${idReason === 3 && 'reason-report-item-selected'}`}
                    onClick={() => setIdReason(3)}>
                    {languageList.txtOffensive}
                </div>
                <div className={`reason-report-item ${idReason === 4 && 'reason-report-item-selected'}`}
                    onClick={() => setIdReason(4)}>
                    {languageList.txtCauseToMisunderstand}
                </div>
                <div className={`reason-report-item ${idReason === 5 && 'reason-report-item-selected'}`}
                    onClick={() => setIdReason(5)}>
                    {languageList.txtOther}
                </div>
                <div className='d-flex item-right mt-20'>
                    <button className='btn btn-danger btn-submit-report' onClick={handleClickSubmit}>{languageList.txtSubmit}</button>
                    <button className='btn btn-submit-report' onClick={() => setShowReport(false)}>{languageList.txtCancel}</button>
                </div>
            </div>
        </div>
    )
}

export default memo(PopupReport)