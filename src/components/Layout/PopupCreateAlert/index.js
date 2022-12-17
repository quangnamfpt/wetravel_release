import axios from 'axios'
import { memo, useState } from 'react'
import { API_ADD_ALERT } from '../../API'
import './PopupCreateAlert.scss'
import { english, vietnamese } from '../../Languages/PopupCreateAlert'
import { toast } from 'react-toastify'

function PopupCreateAlert({ title, shortReason, fullReason, accountId, setShowDialog, isRed, textOk, textCancel, callback }) {
    const [shortContent, setShortContent] = useState('')
    const [fullContent, setFullFContent] = useState('')

    const cokkieArr = document.cookie;
    const languageSelected = cokkieArr.split("languageSelected=")[1] ? cokkieArr.split("languageSelected=")[1].split(';')[0] : 'EN'
    const languageDisplay = languageSelected === 'EN' ? english : vietnamese

    const handleAddAlert = () => {
        if (shortContent === '' || fullContent === '') {
            toast.error(languageDisplay.txtWarningFullInformation)
        }
        else {
            const data = {
                accountId: accountId,
                title: shortContent,
                content: fullContent
            }

            axios.post(API_ADD_ALERT, data)
                .then(() => {
                    callback()
                })
                .catch(err => console.error(err))
        }
    }

    return (
        <div className='fade-in confirm-dialog'>
            <div className='d-flex center-screen'>
                <div className='bg-white w-25 box-confirm box-shadow-common'>
                    <div className={`title mb-10 font-20 title-confirm-dialog ${isRed ? 'bg-red' : 'bg-blue'}`}>{title}</div>
                    <div className='p-20'>
                        <div className='text-bold text-left'>{shortReason}<span className='requird-star'>*</span></div>
                        <input type='text' className='d-flex w-100 p-10 br-10 bd-none outline-none bd-solid-1-gray input-animation'
                            maxLength={50}
                            onChange={(e) => setShortContent(e.target.value)} />
                    </div>
                    <div>
                        <div className='p-20'>
                            <div className='text-bold text-left'>{fullReason}<span className='requird-star'>*</span></div>
                            <textarea className='w-100 p-10 br-10 bd-none bd-solid-1-gray outline-none input-animation' rows={3}
                                maxLength={300} onChange={(e) => setFullFContent(e.target.value)} />
                        </div>

                        <div className='d-flex float-end mb-20'>
                            <button className={`btn ${isRed ? 'btn-danger' : 'btn-success'} btn-confirm`}
                                onClick={handleAddAlert}>
                                {textOk}
                            </button>
                            <button className='btn btn-confirm btn-color' onClick={() => setShowDialog(false)}>{textCancel}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(PopupCreateAlert)