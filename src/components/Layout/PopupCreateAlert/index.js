import { memo, useState } from 'react'
import './PopupCreateAlert.scss'

function PopupCreateAlert({ title, shortReason, fullReason, callback, setShowDialog, isRed, textOk, textCancel }) {
    return (
        <div className='fade-in confirm-dialog'>
            <div className='d-flex center-screen'>
                <div className='bg-white w-25 box-confirm box-shadow-common'>
                    <div className={`title mb-10 font-20 title-confirm-dialog ${isRed ? 'bg-red' : 'bg-blue'}`}>{title}</div>
                    <div className='p-20'>
                        <div className='text-bold text-left'>{shortReason}<span className='requird-star'>*</span></div>
                        <input type='text' className='d-flex w-100 p-10 br-10 bd-none outline-none bd-solid-1-gray input-animation' />
                    </div>
                    <div>
                        <div className='p-20'>
                            <div className='text-bold text-left'>{fullReason}<span className='requird-star'>*</span></div>
                            <textarea className='w-100 p-10 br-10 bd-none bd-solid-1-gray outline-none input-animation' rows={3} />
                        </div>

                        <div className='d-flex float-end mb-20'>
                            <button className={`btn ${isRed ? 'btn-danger' : 'btn-success'} btn-confirm`}
                                onClick={callback}>
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