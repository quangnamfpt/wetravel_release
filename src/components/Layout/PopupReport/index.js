import { memo, useState } from 'react'
import './PopupReport.scss'
import { english, vietnamese } from '../../Languages/PopupReport'

function PopupReport({ languageSelected, setShowReport, idReason, setIdReason, callback }) {
    const languageList = languageSelected === 'EN' ? english : vietnamese

    const handleClickSubmit = () => {
        callback()
        setShowReport(false)
    }

    return (
        <div className='fade-in bg-popup-report'>
            <div className='bg-white p-20 box-shadow-common br-10'>
                <div className='text-bold font-20 text-center mb-10'>{languageList.txtReport}</div>
                <div className={`reason-report-item ${idReason === 0 && 'reason-report-item-selected'}`}
                    onClick={() => setIdReason(0)}>
                    {languageList.txtContentWrong}
                </div>
                <div className={`reason-report-item ${idReason === 1 && 'reason-report-item-selected'}`}
                    onClick={() => setIdReason(1)}>
                    {languageList.txtViolentLanguage}
                </div>
                <div className={`reason-report-item ${idReason === 2 && 'reason-report-item-selected'}`}
                    onClick={() => setIdReason(2)}>
                    {languageList.txtOffensive}
                </div>
                <div className={`reason-report-item ${idReason === 3 && 'reason-report-item-selected'}`}
                    onClick={() => setIdReason(3)}>
                    {languageList.txtCauseToMisunderstand}
                </div>
                <div className={`reason-report-item ${idReason === 4 && 'reason-report-item-selected'}`}
                    onClick={() => setIdReason(4)}>
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