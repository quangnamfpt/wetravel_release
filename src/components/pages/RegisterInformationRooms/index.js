import { memo, useState } from 'react'
import './RegisterInformationRooms.scss'
import { vietnamese, english } from '../../Languages/InputNameInformationService'
import { vietnameseRoomType, englishRoomType } from '../../Languages/RoomType'
import { vietnameseBedType, englishBedType } from '../../Languages/BedType'
import { TbCameraPlus } from 'react-icons/tb'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import { BsTrash, BsArrowRight, BsChevronDown, BsChevronUp } from 'react-icons/bs'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import { toast } from 'react-toastify'

function RegisterInformationRooms({ languageSelected, handleClickSaveAndNext, formFields, setFormFields }) {
    let languageList = (languageSelected === 'EN' ? english : vietnamese)
    let roomTypeList = (languageSelected === 'EN' ? englishRoomType : vietnameseRoomType)
    let bedTypeList = (languageSelected === 'EN' ? englishBedType : vietnameseBedType)

    console.log([...formFields].length, typeof ([...formFields]))



    const handleBlur = (input) => {
        input.style.border = 'solid 1px #D9D9D9'
    }

    const handleFocus = (input) => {
        input.style.border = 'solid 1px #4874E8'
    }

    //add photo bed room
    const handleBedRoomPhoto = (data, index) => {
        let listImage = [...formFields[index].bedRoomPhoto]
        for (let i = 0; i < data.length; i++) {
            listImage.push(data[i])
        }
        let newDataForm = [...formFields]
        newDataForm[index].bedRoomPhoto = listImage
        setFormFields(newDataForm)

    }
    //add photo WC
    const handleWCPhoto = (data, index) => {
        let listImage = [...formFields[index].wcPhoto]
        for (let i = 0; i < data.length; i++) {
            listImage.push(data[i])
        }
        let newDataForm = [...formFields]
        newDataForm[index].wcPhoto = listImage
        setFormFields(newDataForm)
    }
    //add photo other room
    const handleOtherPhoto = (data, index) => {
        let listImage = [...formFields[index].otherPhoto]
        for (let i = 0; i < data.length; i++) {
            listImage.push(data[i])
        }
        let newDataForm = [...formFields]
        newDataForm[index].otherPhoto = listImage
        setFormFields(newDataForm)
    }

    const handleDeleteBedRoomImage = (index, indexImg) => {
        let newDataForm = [...formFields]
        let newDataImage = []
        for (let i = 0; i < newDataForm[index].bedRoomPhoto.length; i++) {
            if (i !== indexImg) {
                newDataImage.push(newDataForm[index].bedRoomPhoto[i])
            }
        }
        newDataForm[index].bedRoomPhoto = newDataImage
        setFormFields(newDataForm)
    }

    const handleDeleteWCImage = (index, indexImg) => {
        let newDataForm = [...formFields]
        let newDataImage = []
        for (let i = 0; i < newDataForm[index].wcPhoto.length; i++) {
            if (i !== indexImg) {
                newDataImage.push(newDataForm[index].wcPhoto[i])
            }
        }
        newDataForm[index].wcPhoto = newDataImage
        setFormFields(newDataForm)
    }

    const handleDeleteOtherImage = (index, indexImg) => {
        let newDataForm = [...formFields]
        let newDataImage = []
        for (let i = 0; i < newDataForm[index].otherPhoto.length; i++) {
            if (i !== indexImg) {
                newDataImage.push(newDataForm[index].otherPhoto[i])
            }
        }
        newDataForm[index].otherPhoto = newDataImage
        setFormFields(newDataForm)
    }

    const handleAddForm = () => {
        let newDataForm = [...formFields]
        let object = {
            showHide: true,
            roomName: '',
            roomType: 0,
            numberOfRoom: 0,
            bedType: 0,
            numberOfPeopleRoom: 0,
            roomSize: 0,
            dailyPrice: 0,
            holidayPrice: 0,
            description: '',
            bedRoomPhoto: [],
            bedRoomPhotoFile: [],
            wcPhoto: [],
            wcPhotoFile: [],
            otherPhoto: [],
            otherPhotoFile: []
        }
        newDataForm.push(object)
        setFormFields(newDataForm)
    }

    const handleDeleteForm = (index) => {
        let outDateForm = [...formFields]
        let newDataForm = []
        for (let i = 0; i < outDateForm.length; i++) {
            if (i !== index) {
                newDataForm.push(outDateForm[i])
            }
        }
        setFormFields(newDataForm)
    }

    const handleClickShowHide = (index) => {
        let newDataForm = [...formFields]
        newDataForm[index].showHide = !newDataForm[index].showHide
        setFormFields(newDataForm)
    }

    const handleInputRoomName = (text, index) => {
        let newDataForm = [...formFields]
        newDataForm[index].roomName = text
        setFormFields(newDataForm)
    }

    const handleInputRoomType = (value, index) => {
        let newDataForm = [...formFields]
        newDataForm[index].roomType = value
        setFormFields(newDataForm)
    }

    const handleInputNumberOfRooms = (value, index) => {
        let newDataForm = [...formFields]
        newDataForm[index].numberOfRoom = value
        setFormFields(newDataForm)
    }

    const handleInputBedType = (value, index) => {
        let newDataForm = [...formFields]
        newDataForm[index].bedType = value
        setFormFields(newDataForm)
    }

    const handleInputNumberOfPeople = (value, index) => {
        let newDataForm = [...formFields]
        newDataForm[index].numberOfPeopleRoom = value
        setFormFields(newDataForm)
    }

    const handleInputRoomSize = (value, index) => {
        let newDataForm = [...formFields]
        newDataForm[index].roomSize = value
        setFormFields(newDataForm)
    }

    const handleInputDailyPrice = (value, index) => {
        let newDataForm = [...formFields]
        newDataForm[index].dailyPrice = value
        setFormFields(newDataForm)
    }

    const handleInputHolidayPrice = (value, index) => {
        let newDataForm = [...formFields]
        newDataForm[index].holidayPrice = value
        setFormFields(newDataForm)
    }

    const handleInputDescription = (text, index) => {
        let newDataForm = [...formFields]
        newDataForm[index].description = text
        setFormFields(newDataForm)
    }

    return (
        <div>
            {[...formFields].map((form, index) => (
                <div className='container form-container' >
                    {form.showHide ?
                        <>
                            <div className='title-room-container'>
                                <div className='title-roomNumber'>
                                    <label onClick={() => handleClickShowHide(index)} className='title space-click-hide'> Room {index + 1} </label>
                                    {formFields.length > 1 &&
                                        <Menu menuButton={<MenuButton className='btn-action dot-option'>
                                            <BiDotsVerticalRounded className='dot-option-image' />
                                        </MenuButton>} transition>
                                            <MenuItem onClick={() => handleDeleteForm(index)}>Delete</MenuItem>
                                        </Menu>
                                    }
                                </div>
                            </div>
                            <div onClick={() => handleClickShowHide(index)} className='space-icon-show-container bd-t'><BsChevronUp className='icon-show-container' /></div>
                        </> :
                        <div className='user-select'>
                            <div className='d-flex mini-infor-room'>
                                <div className='d-flex w-40 short-information-room'>
                                    <div className='title-information-room'>Room {index + 1}</div>
                                    <label className='short-information-detail txt-14'>
                                        <div>Room: {form.roomName}</div>
                                        <div>Room Size: {form.roomSize} m2</div>
                                    </label>
                                </div>

                                <div className='w-60 image-hide-animation'>

                                    {formFields.length > 1 &&
                                        <Menu menuButton={<MenuButton className='btn-action dot-option'>
                                            <BiDotsVerticalRounded className='dot-option-image' />
                                        </MenuButton>} transition>
                                            <MenuItem onClick={() => handleDeleteForm(index)}>Delete</MenuItem>
                                        </Menu>
                                    }
                                    {form.bedRoomPhoto.length > 0 &&
                                        <>
                                            <img className='image-side-hide' src={URL.createObjectURL(form.bedRoomPhoto[0])} />
                                            <div className='liner-white' />
                                        </>
                                    }
                                </div>
                            </div>
                            <div onClick={() => handleClickShowHide(index)} className='space-icon-show-container bd-t'>
                                <BsChevronDown className='icon-show-container' /></div>
                        </div>
                    }
                    {form.showHide &&
                        <div className='main-form-rooms'>
                            <div className='space-30 background-w animation-show'>
                                <div className="line-input">
                                    <div className="input-alone">
                                        <label htmlFor='roomName' className='d-block'>{languageList.txtRoomName}</label>
                                        <input value={form.roomName} id='roomName' className='input-inline'
                                            onFocus={(e) => handleFocus(e.target)}
                                            onBlur={(e) => handleBlur(e.target)}
                                            onChange={(e) => handleInputRoomName(e.target.value, index)}
                                        />
                                    </div>
                                </div>
                                <div className="line-input">
                                    <div className=" input-alone">
                                        <label htmlFor='roomType' className='d-block'>{languageList.txtRoomType}<span className="requird-star">*</span></label>
                                        <select id='roomType' className='input-inline had-input'
                                            onChange={(e) => handleInputRoomType(e.target.value, index)}
                                            onFocus={(e) => handleFocus(e.target)}
                                            onBlur={(e) => handleBlur(e.target)}>
                                            {roomTypeList.map((item) => (
                                                <option selected={item.id == form.roomType} value={item.id}>{item.text}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="d-flex line-input line-input-3-line">
                                    <div className='w-45'>
                                        <label htmlFor="numberOfRoom" className="d-block">{languageList.txtNumberOfRooms}<span className="requird-star">*</span></label>
                                        <label htmlFor="numberOfRoom" className="d-block size-12"><span className="requird-star">*</span>{languageList.warningAboutNumberOfRooms}</label>
                                        <input value={form.numberOfRoom} onFocus={(e) => handleFocus(e.target)}
                                            onBlur={(e) => handleBlur(e.target)}
                                            id='numberOfRoom' className="input-inline" type='number'
                                            onChange={(e) => handleInputNumberOfRooms(e.target.value, index)}
                                            min={0}
                                        />
                                    </div>
                                    <div className='w-45'>
                                        <label htmlFor="bedType" className="d-block">{languageList.txtBedType}<span className="requird-star">*</span></label>
                                        <select id='bedType' className='input-inline had-input'
                                            onChange={(e) => handleInputBedType(e.target.value, index)}
                                            onFocus={(e) => handleFocus(e.target)}
                                            onBlur={(e) => handleBlur(e.target)}>
                                            {bedTypeList.map((item, indexBedType) => (
                                                <option selected={indexBedType + 1 == form.bedType} value={indexBedType + 1}>{item}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="d-flex line-input line-input-3-line">
                                    <div className='w-45'>
                                        <label htmlFor="numberOfPeopleOnRoom" className="d-block">{languageList.txtNumberOfPeopleOnRoom}<span className="requird-star">*</span></label>
                                        <input value={form.numberOfPeopleRoom} onFocus={(e) => handleFocus(e.target)}
                                            onBlur={(e) => handleBlur(e.target)}
                                            id='numberOfPeopleOnRoom' className="input-inline" type='number'
                                            min={0}
                                            onChange={(e) => handleInputNumberOfPeople(e.target.value, index)}
                                        />
                                    </div>
                                    <div className='w-45'>
                                        <label htmlFor="roomSize" className="d-block">{languageList.txtRoomSize}<span className="requird-star">*</span></label>
                                        <input value={form.roomSize} onFocus={(e) => handleFocus(e.target)}
                                            onBlur={(e) => handleBlur(e.target)}
                                            id='roomSize' className="input-inline" type='number'
                                            min={0}
                                            onChange={(e) => handleInputRoomSize(e.target.value, index)}
                                        />
                                    </div>
                                </div>
                                <div className="d-flex line-input line-input-3-line">
                                    <div className='w-45'>
                                        <label htmlFor="dailyPrice" className="d-block">{languageList.txtDailyPrice}<span className="requird-star">*</span></label>
                                        <input value={form.dailyPrice} onFocus={(e) => handleFocus(e.target)}
                                            onBlur={(e) => handleBlur(e.target)}
                                            id='dailyPrice' className="input-inline" type='number'
                                            min={0}
                                            onChange={(e) => handleInputDailyPrice(e.target.value, index)}
                                        />
                                    </div>
                                    <div className='w-45'>
                                        <label htmlFor="holidayPrice" className="d-block">{languageList.txtHolidayPrice}<span className="requird-star">*</span></label>
                                        <input value={form.holidayPrice} onFocus={(e) => handleFocus(e.target)}
                                            onBlur={(e) => handleBlur(e.target)}
                                            id='holidayPrice' className="input-inline" type='number'
                                            min={0}
                                            onChange={(e) => handleInputHolidayPrice(e.target.value, index)}
                                        />
                                    </div>
                                </div>
                                <div className="line-input">
                                    <div className="input-alone">
                                        <label htmlFor='description' className='d-block'>{languageList.txtDescription}</label>
                                        <textarea value={form.description} rows="4" id='description' className='input-inline'
                                            onFocus={(e) => handleFocus(e.target)}
                                            onBlur={(e) => handleBlur(e.target)}
                                            onChange={(e) => handleInputDescription(e.target.value, index)}
                                        />
                                    </div>
                                </div>


                                <label className='title'>{languageList.txtImage}</label>
                                <div className='container'>
                                    <div>
                                        <label className='d-block mb-20'>{languageList.txtBedRoomPhoto}<span className='requird-star'>*</span></label>
                                        <div className='grid-image'>

                                            {[...form.bedRoomPhoto].map((image, indexImg) => {
                                                return (
                                                    <div className="image-selected">
                                                        <div className='layer-delete' onClick={() => handleDeleteBedRoomImage(index, indexImg)}>
                                                            <div className='check-delete-image' />
                                                            <BsTrash className='image-trash' />
                                                        </div>
                                                        <img className="image-selected" src={URL.createObjectURL(image)} />
                                                    </div>
                                                )
                                            })}

                                            <label htmlFor={`bedRoom-${index}`} className='add-image-button'>
                                                <div className="select-image-service" >
                                                    <TbCameraPlus className='icon-camera-plus' />
                                                    <div className='text-camera-plus d-block'>{languageList.txtAddImage}</div>
                                                </div>
                                                <input onChange={(e) => handleBedRoomPhoto(e.target.files, index)} id={`bedRoom-${index}`} type="file" accept="image/*" className='select-image-hide' multiple />
                                            </label>
                                        </div>
                                    </div>
                                    <div className='mt-30'>
                                        <label className='d-block mb-20'>{languageList.txtWCPhoto}<span className='requird-star'>*</span></label>
                                        <div className='grid-image'>

                                            {[...form.wcPhoto].map((image, indexImg) => {
                                                return (
                                                    <div className="image-selected" >
                                                        <div className='layer-delete' onClick={() => handleDeleteWCImage(index, indexImg)}>
                                                            <div className='check-delete-image' />
                                                            <BsTrash className='image-trash' />
                                                        </div>
                                                        <img className="image-selected" src={URL.createObjectURL(image)} />
                                                    </div>
                                                )
                                            })}

                                            <label htmlFor={`wcRoom-${index}`} className='add-image-button'>
                                                <div className="select-image-service" >
                                                    <TbCameraPlus className='icon-camera-plus' />
                                                    <div className='text-camera-plus d-block'>{languageList.txtAddImage}</div>
                                                </div>
                                                <input onChange={(e) => handleWCPhoto(e.target.files, index)} type="file" id={`wcRoom-${index}`} accept="image/*" className='select-image-hide' multiple />
                                            </label>
                                        </div>
                                    </div>
                                    <div className='mt-30'>
                                        <label className='d-block mb-20'>{languageList.txtOtherPhoto}</label>
                                        <div className='grid-image'>
                                            {[...form.otherPhoto].map((image, indexImg) => {
                                                return (
                                                    <div className="image-selected" >
                                                        <div className='layer-delete' onClick={() => handleDeleteOtherImage(index, indexImg)}>
                                                            <div className='check-delete-image' />
                                                            <BsTrash className='image-trash' />
                                                        </div>
                                                        <img className="image-selected" src={URL.createObjectURL(image)} />
                                                    </div>
                                                )
                                            })}
                                            <label htmlFor={`otherRoom-${index}`} className='add-image-button'>
                                                <div className="select-image-service" >
                                                    <TbCameraPlus className='icon-camera-plus' />
                                                    <div className='text-camera-plus d-block'>{languageList.txtAddImage}</div>
                                                </div>
                                                <input onChange={(e) => handleOtherPhoto(e.target.files, index)} type="file" id={`otherRoom-${index}`} accept="image/*" className='select-image-hide' multiple />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div onClick={() => handleClickShowHide(index)} className='space-icon-show-container'>
                                <BsChevronUp className='icon-show-container' /></div>
                        </div>
                    }

                </div>
            ))}
            <div className='container form-container'><div className='btn-add btn btn-light' onClick={handleAddForm}>+</div></div>
            <button onClick={handleClickSaveAndNext} className='btn btn-primary btn-submit'>{`${languageList.btnSave} `} <BsArrowRight /></button>
        </div>
    )
}

export default memo(RegisterInformationRooms)