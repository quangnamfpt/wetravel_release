import { memo } from 'react'
import './ConfirmDialog.scss'

function ConfirmDialog({ title, content, callback, setShowDialog, isRed, textOk, textCancel }) {

    return (
        <div className='fade-in confirm-dialog'>
            <div className='d-flex center-screen'>
                <div className='bg-white w-25 box-confirm'>
                    <div className={`title mb-20 font-20 title-confirm-dialog ${isRed ? 'bg-red' : 'bg-blue'}`}>{title}</div>
                    <div className='container mlr-20-import'>
                        <div className='mb-20 font-14'>{content}</div>
                        <div className='d-flex float-end mb-20'>
                            <button className={`btn ${isRed ? 'btn-danger' : 'btn-success'} btn-confirm`}
                                onClick={() => { callback() }}>
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

export default memo(ConfirmDialog)