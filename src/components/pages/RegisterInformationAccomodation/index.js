import { memo, useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import { BsArrowRight } from 'react-icons/bs'
import Switch from '@mui/material/Switch';
import City from '../../Data/city.json'
import { english, vietnamese } from '../../Languages/InformationAccomodation';
import './RegisterInformationAccomodation.scss'

function RegisterInformationAccomodation({ languageSelected, handleClickSaveAndNext, serviceData, setServiceData, onStarRating, setOnStarRating }) {
    const languageList = languageSelected === 'EN' ? english : vietnamese

    const handleBlur = (input) => {
        input.style.border = 'solid 1px #D9D9D9'
    }

    const handleFocus = (input) => {
        input.style.border = 'solid 1px #4874E8'
    }

    const handleRating = (rate) => {
        setServiceData({ ...serviceData, starRating: rate })
    }

    const handleOnOffStarRating = () => {
        onStarRating ? handleRating(0) : handleRating(1)
        setOnStarRating(!onStarRating)
    }

    const handleInputPropertyName = (value) => {
        setServiceData({ ...serviceData, propertyName: value })
    }

    const handleInputStatus = (value) => {
        console.log(value)
        setServiceData({ ...serviceData, status: value })
    }

    const handleInputCity = (value) => {
        setServiceData({ ...serviceData, city: value })
    }

    const handleInputAddress = (value) => {
        setServiceData({ ...serviceData, address: value })
    }

    const handleInputWebsite = (value) => {
        setServiceData({ ...serviceData, website: value })
    }

    const handleInputTaxCode = (value) => {
        setServiceData({ ...serviceData, taxCode: value })
    }

    const handleInputDescription = (value) => {
        setServiceData({ ...serviceData, description: value })
    }

    const handleInputPhoneNumberContact = (value) => {
        setServiceData({ ...serviceData, phoneNumberContact: value })
    }

    const handleInputFax = (value) => {
        setServiceData({ ...serviceData, fax: value })
    }

    const handleInputEmailContact = (value) => {
        setServiceData({ ...serviceData, emailContact: value })
    }

    const handleInputNumberOfFloor = (value) => {
        setServiceData({ ...serviceData, numberOfFloors: value })
    }


    return (
        <div className='container'>
            <div className='space-30 background-w'>
                <div className="d-flex line-input">
                    <div className="w-45">
                        <label htmlFor='roomName' className='d-block'>{languageList.txtPropertyName}<span className="requird-star">*</span></label>
                        <input id='roomName'
                            className='input-inline'
                            onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                            onChange={(e) => handleInputPropertyName(e.target.value)}
                            value={serviceData.propertyName} />
                    </div>
                    <div className='w-45'>
                        <label htmlFor="status" className="d-block">{languageList.txtStatus}<span className="requird-star">*</span></label>
                        <select id='status' className='input-inline had-input'
                            onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                            onChange={(e) => handleInputStatus(e.target.value)}>
                            <option selected={serviceData.status == 1} value={1}>{languageList.txtActive}</option>
                            <option selected={serviceData.status == 2} value={2}>{languageList.txtClose}</option>
                            <option selected={serviceData.status == 3} value={3}>{languageList.txtPause}</option>
                        </select>
                    </div>
                </div>
                <div className="d-flex line-input">
                    <div className="w-45">
                        <label htmlFor='numberOfFloors' className='d-block'>{languageList.txtNumberOfFloors}</label>
                        <input id='numberOfFloors' className='input-inline'
                            value={serviceData.numberOfFloors}
                            onChange={(e) => handleInputNumberOfFloor(e.target.value)}
                            onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)} type='number' min={0} />
                    </div>
                    <div className='w-45'>
                        <div>
                            <label>{languageList.txtStarRating}</label>
                            <Switch onChange={handleOnOffStarRating} className='float-end' defaultChecked />
                        </div>
                        {onStarRating && <Rating className="input-inline star-rating" allowHover={false} onClick={handleRating} initialValue={serviceData.starRating} />}
                    </div>
                </div>
                <div className="d-flex line-input line-input-3-line">
                    <div className='w-45'>
                        <label htmlFor="city" className="d-block">{languageList.txtCity}<span className="requird-star">*</span></label>

                        <select id='city' className='input-inline had-input'
                            onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                            onChange={(e) => handleInputCity(e.target.value)}>
                            {City.map((cityData) => (
                                <option selected={serviceData.city == cityData.name} value={cityData.name}>{cityData.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='w-45'>
                        <label htmlFor="address" className="d-block">{languageList.txtAddress}<span className="requird-star">*</span></label>
                        <input value={serviceData.address} onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                            onChange={(e) => handleInputAddress(e.target.value)}
                            id='address' className="input-inline" type='text' />
                    </div>
                </div>
                <div className="line-input">
                    <div className="input-alone">
                        <label htmlFor='email' className='d-block'>{languageList.txtWebsite}</label>
                        <input value={serviceData.website} onChange={(e) => handleInputWebsite(e.target.value)}
                            onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                            id='email' className="input-inline" type='text' />
                    </div>
                </div>
                <div className="line-input">
                    <div className="input-alone">
                        <label htmlFor='taxCode' className='d-block'>{languageList.txtTaxCode}<span className="requird-star">*</span></label>
                        <input value={serviceData.taxCode} onChange={(e) => handleInputTaxCode(e.target.value)}
                            onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                            id='taxCode' className="input-inline" type='text' />
                    </div>
                </div>
                <div className="line-input">
                    <div className="input-alone">
                        <label htmlFor='description' className='d-block'>{languageList.txtDescription}<span className="requird-star">*</span></label>
                        <textarea rows="4" id='description' className='input-inline'
                            value={serviceData.description} onChange={(e) => handleInputDescription(e.target.value)}
                            onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)} />
                    </div>
                </div>
            </div>
            <div className='mt-30 space-30 background-w'>
                <label className='title'>{languageList.txtContact}</label>
                <div className="line-input">
                    <div className="input-alone">
                        <label htmlFor='phone' className='d-block'>{languageList.txtPhoneNumber}<span className="requird-star">*</span></label>
                        <input value={serviceData.phoneNumberContact} onChange={(e) => handleInputPhoneNumberContact(e.target.value)}
                            onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                            id='phone' className="input-inline" type='text' />
                    </div>
                </div>
                <div className="line-input">
                    <div className="input-alone">
                        <label htmlFor='phone' className='d-block'>{languageList.txtFax}</label>
                        <input value={serviceData.fax} onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                            id='phone' className="input-inline" type='text'
                            onChange={(e) => handleInputFax(e.target.value)} />
                    </div>
                </div>
                <div className="line-input">
                    <div className="input-alone">
                        <label htmlFor='email' className='d-block'>{languageList.txtEmail}<span className="requird-star">*</span></label>
                        <input value={serviceData.emailContact} onChange={(e) => handleInputEmailContact(e.target.value)}
                            onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                            id='email' className="input-inline" type='text' />
                    </div>
                </div>
            </div>
            <button onClick={handleClickSaveAndNext} className='btn btn-primary btn-submit'>{`${languageList.txtSaveAndNext} `} <BsArrowRight /></button>
        </div>
    )

}

export default RegisterInformationAccomodation