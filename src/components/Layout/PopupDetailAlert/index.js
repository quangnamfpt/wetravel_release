import { memo } from 'react'
import { english, vietnamese } from '../../Languages/PopupDetailAlert'
import './PopupDetailAlert.scss'

function PopupDetailAlert({ languageSelected, title, content, setShowPopupDetailAlert, time }) {
    const languageList = languageSelected === 'EN' ? english : vietnamese

    return (
        <div className='detail-alert fade-in'>
            <div className='pop-up-detail-alert'>
                <div className='d-flex space-between center-vertical bd-bottom p-20'>
                    <div>
                        <div className='font-20 text-bold'>{languageList.txtAlert}</div>
                        <div className='color-gray'>{time}</div>
                    </div>
                    <div className='close-pop-up-btn' onClick={() => setShowPopupDetailAlert(false)}>X</div>
                </div>

                <div className='p-20'>
                    <div className='font-16 text-bold'>{languageList.txtSummary}</div>
                    <div>{title}</div>
                </div>

                <div className='p-20'>
                    <div className='font-16 text-bold'>{languageList.txtFull}</div>
                    <div>{content}</div>
                </div>

            </div>
        </div>
    )
}

export default memo(PopupDetailAlert)