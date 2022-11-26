import { memo, useState } from 'react'
import { vietnamese, english } from '../../Languages/InputNameInformationService'
import { vietnameseRoomType, englishRoomType } from '../../Languages/RoomType'
import { vietnameseBedType, englishBedType } from '../../Languages/BedType'
import { BsChevronDown, BsChevronUp } from 'react-icons/bs'
import './ViewInfomationRooms.scss'

function ViewInformationRooms({ languageSelected, roomsData, setRoomsData }) {
    let languageList = (languageSelected === 'EN' ? english : vietnamese)
    let roomTypeList = (languageSelected === 'EN' ? englishRoomType : vietnameseRoomType)
    let bedTypeList = (languageSelected === 'EN' ? englishBedType : vietnameseBedType)

    const [imageFullView, setImageFullView] = useState()

    const handleBlur = (input) => {
        input.style.border = 'solid 1px #D9D9D9'
    }

    const handleFocus = (input) => {
        input.style.border = 'solid 1px #4874E8'
    }

    const handleClickShowHide = (index) => {
        let newDataForm = [...roomsData]
        newDataForm[index].showHide = !newDataForm[index].showHide
        setRoomsData(newDataForm)
    }

    return (
        <>
            {imageFullView && imageFullView !== null &&
                <div className='image-full-view'>
                    <div onClick={() => setImageFullView(null)} className='bg-popup' />
                    <img src={URL.createObjectURL(imageFullView)} />
                </div>
            }
            {[...roomsData].map((form, index) => (
                <div className='container shadow-rooms-view' >
                    {form.showHide ?
                        <>
                            <div className='title-room-container'>
                                <div className='title-roomNumber'>
                                    <label onClick={() => handleClickShowHide(index)} className='title space-click-hide'> Room {index + 1} </label>
                                </div>
                            </div>
                            <div onClick={() => handleClickShowHide(index)} className='space-icon-show-container bd-t'>
                                <BsChevronUp className='icon-show-container' />
                            </div>
                        </> :
                        <div className='user-select none-shadow mb-10'>
                            <div className='d-flex mini-infor-room'>
                                <div className='d-flex w-40 short-information-room'>
                                    <div className='title-information-room'>Room {index + 1}</div>
                                    <label className='short-information-detail txt-14'>
                                        <div>Room: {form.roomName}</div>
                                        <div>Room Size: {form.roomSize} m2</div>
                                    </label>
                                </div>

                                <div className='w-60 image-hide-animation'>
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
                        <div className='main-form-rooms none-shadow'>
                            <div className='space-30 background-w animation-show'>
                                <div className="line-input">
                                    <div className="input-alone">
                                        <label htmlFor='roomName' className='d-block'>{languageList.txtRoomName}</label>
                                        <input value={form.roomName} id='roomName' className='input-inline'
                                            onFocus={(e) => handleFocus(e.target)}
                                            onBlur={(e) => handleBlur(e.target)}
                                            disabled />
                                    </div>
                                </div>
                                <div className="line-input">
                                    <div className=" input-alone">
                                        <label htmlFor='roomType' className='d-block'>{languageList.txtRoomType}<span className="requird-star">*</span></label>
                                        <select id='roomType' className='input-inline had-input'
                                            disabled
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
                                            disabled
                                            min={0}
                                        />
                                    </div>
                                    <div className='w-45'>
                                        <label htmlFor="bedType" className="d-block">{languageList.txtBedType}<span className="requird-star">*</span></label>
                                        <select id='bedType' className='input-inline had-input'
                                            disabled
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
                                            disabled
                                        />
                                    </div>
                                    <div className='w-45'>
                                        <label htmlFor="roomSize" className="d-block">{languageList.txtRoomSize}<span className="requird-star">*</span></label>
                                        <input value={form.roomSize} onFocus={(e) => handleFocus(e.target)}
                                            onBlur={(e) => handleBlur(e.target)}
                                            id='roomSize' className="input-inline" type='number'
                                            min={0}
                                            disabled
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
                                            disabled
                                        />
                                    </div>
                                    <div className='w-45'>
                                        <label htmlFor="holidayPrice" className="d-block">{languageList.txtHolidayPrice}<span className="requird-star">*</span></label>
                                        <input value={form.holidayPrice} onFocus={(e) => handleFocus(e.target)}
                                            onBlur={(e) => handleBlur(e.target)}
                                            id='holidayPrice' className="input-inline" type='number'
                                            min={0}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="line-input">
                                    <div className="input-alone">
                                        <label htmlFor='description' className='d-block'>{languageList.txtDescription}</label>
                                        <textarea value={form.description} rows="4" id='description' className='input-inline'
                                            onFocus={(e) => handleFocus(e.target)}
                                            onBlur={(e) => handleBlur(e.target)}
                                            disabled
                                        />
                                    </div>
                                </div>

                                <label className='title'>{languageList.txtImage}</label>
                                <div className='container'>
                                    <div>
                                        <label className='d-block mb-20'>{languageList.txtBedRoomPhoto}</label>
                                        <div className='grid-image'>
                                            {[...form.bedRoomPhoto].map((image) => {
                                                return (
                                                    <div className="image-selected">
                                                        <img onClick={() => setImageFullView(image)} className={`image-selected ${(!imageFullView || imageFullView === null) && 'cursor-pointer'}`} src={URL.createObjectURL(image)} />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className='mt-30'>
                                        <label className='d-block mb-20'>{languageList.txtWCPhoto}</label>
                                        <div className='grid-image'>

                                            {[...form.wcPhoto].map((image, indexImg) => {
                                                return (
                                                    <div className="image-selected" >
                                                        <img onClick={() => setImageFullView(image)} className={`image-selected ${(!imageFullView || imageFullView === null) && 'cursor-pointer'}`} src={URL.createObjectURL(image)} />
                                                    </div>
                                                )
                                            })}

                                        </div>
                                    </div>
                                    <div className='mt-30'>
                                        <label className='d-block mb-20'>{languageList.txtOtherPhoto}</label>
                                        <div className='grid-image'>
                                            {[...form.otherPhoto].map((image, indexImg) => {
                                                return (
                                                    <div className="image-selected" >
                                                        <img onClick={() => setImageFullView(image)} className={`image-selected ${(!imageFullView || imageFullView === null) && 'cursor-pointer'}`} src={URL.createObjectURL(image)} />
                                                    </div>
                                                )
                                            })}
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
        </>
    )
}

export default memo(ViewInformationRooms)