import { memo, useState, useRef } from 'react'
import { english, vietnamese } from '../../Languages/Photo'
import { TbCameraPlus } from 'react-icons/tb'
import { BsTrash } from 'react-icons/bs'
import './RegisterPhotos.scss'
import ConfirmDialog from '../../Layout/ConfirmDialog'

function RegisterPhotos({ serviceData, setServiceData, languageSelected, handleClickSubmit }) {
    const languageList = languageSelected === 'EN' ? english : vietnamese

    const [showConfirm, setShowConfirm] = useState(false)
    const [titleConfirm, setTitleConfirm] = useState('asd')
    const [contentConfirm, setContentConfirm] = useState('asd')
    const callbackConfirm = useRef(() => { })
    const [isRed, setIsRed] = useState(true)
    const [textOk, setTextOk] = useState('Ok')
    const [textCancel, setTextCancel] = useState('Cancel')

    const handleReceptionPhoto = (data) => {
        let listImage = [...serviceData.receptionHallPhoto]
        for (let i = 0; i < data.length; i++) {
            listImage.push(data[i])
        }
        setServiceData({ ...serviceData, receptionHallPhoto: listImage })
    }

    const handleOutdoorPhoto = (data) => {
        let listImage = [...serviceData.outdoorPhoto]
        for (let i = 0; i < data.length; i++) {
            listImage.push(data[i])
        }
        setServiceData({ ...serviceData, outdoorPhoto: listImage })
    }

    const handleOtherPhoto = (data) => {
        let listImage = [...serviceData.otherPhoto]
        for (let i = 0; i < data.length; i++) {
            listImage.push(data[i])
        }
        setServiceData({ ...serviceData, otherPhoto: listImage })
    }

    const handleDeleteReceptionHallPhoto = (index) => {
        let afterRemove = []
        for (let i = 0; i < serviceData.receptionHallPhoto.length; i++) {
            if (i != index) {
                afterRemove.push(serviceData.receptionHallPhoto[i])
            }
        }
        setServiceData({ ...serviceData, receptionHallPhoto: afterRemove })
    }

    const handleDeleteOutdoorPhoto = (index) => {
        let afterRemove = []
        for (let i = 0; i < serviceData.outdoorPhoto.length; i++) {
            if (i != index) {
                afterRemove.push(serviceData.outdoorPhoto[i])
            }
        }
        setServiceData({ ...serviceData, outdoorPhoto: afterRemove })
    }

    const handleDeleteOtherImage = (index) => {
        let afterRemove = []
        for (let i = 0; i < serviceData.otherPhoto.length; i++) {
            if (i != index) {
                afterRemove.push(serviceData.otherPhoto[i])
            }
        }
        setServiceData({ ...serviceData, otherPhoto: afterRemove })
    }

    const handleClickSubmitButton = (title, content, callback, isRed, textOk, textCancel) => {
        setShowConfirm(true)
        setTitleConfirm(title)
        setContentConfirm(content)
        callbackConfirm.current = callback
        setIsRed(isRed)
        setTextOk(textOk)
        setTextCancel(textCancel)
    }

    return (
        <div className='container'>
            {showConfirm &&
                <ConfirmDialog title={titleConfirm} content={contentConfirm} callback={callbackConfirm.current} isRed={isRed} setShowDialog={setShowConfirm} textOk={textOk} textCancel={textCancel} />
            }
            <div className='space-30 background-w'>
                <label className='title'>{languageList.txtImage}</label>
                <div className='container'>
                    <div>
                        <label className='d-block mb-20'>{languageList.txtReception}<span className='requird-star'>*</span></label>
                        <div className='grid-image'>
                            {[...serviceData.receptionHallPhoto].map((img, index) => (
                                <div className="image-selected" id={`${index}`}>
                                    <div className='layer-delete' onClick={() => handleDeleteReceptionHallPhoto(index)}>
                                        <div className='check-delete-image' />
                                        <BsTrash className='image-trash' />
                                    </div>
                                    <img className="image-selected" src={URL.createObjectURL(img)} />
                                </div>
                            ))}
                            <label htmlFor='bedRoomImage' className='add-image-button'>
                                <div className="select-image-service" >
                                    <TbCameraPlus className='icon-camera-plus' />
                                    <div className='text-camera-plus d-block'>{languageList.txtAddImage}</div>
                                </div>
                                <input onChange={(e) => handleReceptionPhoto(e.target.files)} type="file" id="bedRoomImage" accept="image/*" className='select-image-hide' multiple />
                            </label>
                        </div>
                    </div>
                    <div className='mt-30'>
                        <label className='d-block mb-20'>{languageList.txtOutdoor}<span className='requird-star'>*</span></label>
                        <div className='grid-image'>
                            {[...serviceData.outdoorPhoto].map((img, index) => (
                                <div className="image-selected">
                                    <div className='layer-delete' onClick={() => handleDeleteOutdoorPhoto(index)}>
                                        <div className='check-delete-image' />
                                        <BsTrash className='image-trash' />
                                    </div>
                                    <img className="image-selected" src={URL.createObjectURL(img)} />
                                </div>
                            ))}
                            <label htmlFor='wcImage' className='add-image-button'>
                                <div className="select-image-service" >
                                    <TbCameraPlus className='icon-camera-plus' />
                                    <div className='text-camera-plus d-block'>{languageList.txtAddImage}</div>
                                </div>
                                <input onChange={(e) => handleOutdoorPhoto(e.target.files)} type="file" id="wcImage" accept="image/*" className='select-image-hide' multiple />
                            </label>
                        </div>
                    </div>
                    <div className='mt-30'>
                        <label className='d-block mb-20'>{languageList.txtOther}</label>
                        <div className='grid-image'>
                            {[...serviceData.otherPhoto].map((img, index) => (
                                <div className="image-selected">
                                    <div className='layer-delete' onClick={() => handleDeleteOtherImage(index)}>
                                        <div className='check-delete-image' />
                                        <BsTrash className='image-trash' />
                                    </div>
                                    <img className="image-selected" src={URL.createObjectURL(img)} />
                                </div>
                            ))}
                            <label htmlFor='otherImage' className='add-image-button'>
                                <div className="select-image-service" >
                                    <TbCameraPlus className='icon-camera-plus' />
                                    <div className='text-camera-plus d-block'>{languageList.txtAddImage}</div>
                                </div>
                                <input onChange={(e) => handleOtherPhoto(e.target.files)} type="file" id="otherImage" accept="image/*" className='select-image-hide' multiple />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <button className='btn btn-primary btn-submit btn-submit-photos'
                onClick={() => handleClickSubmitButton(languageList.btnSubmit, languageList.txtWarningSubmit, handleClickSubmit, false, languageList.btnSubmit, languageList.btnCancel)}>
                {languageList.btnSubmit}
            </button>
        </div>
    )
}

export default memo(RegisterPhotos)