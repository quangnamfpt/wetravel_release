import { memo } from 'react'
import { Rating } from 'react-simple-star-rating'
import { BsArrowRight } from 'react-icons/bs'
import Select from 'react-select';
import City from '../../Data/city.json'
import makeAnimated from 'react-select/animated';
import { englishTypeOfCusine, vietnameseTypeOfCusine } from '../../Languages/TypeOfCusine';
import Switch from '@mui/material/Switch'
import { english, vietnamese } from '../../Languages/InformationRestaurant';

function RegisterInformationRestaurant({ languageSelected, handleClickSaveAndNext, serviceData, setServiceData, onStarRating, setOnStarRating }) {

    const animatedComponents = makeAnimated();

    const typeOfCuisineList = languageSelected === 'EN' ? englishTypeOfCusine : vietnameseTypeOfCusine
    const languageList = languageSelected === 'EN' ? english : vietnamese

    const handleBlur = (input) => {
        input.style.border = 'solid 1px #D9D9D9'
    }

    const handleFocus = (input) => {
        input.style.border = 'solid 1px #4874E8'
    }

    const handleOnOffStarRating = () => {
        onStarRating ? handleRating(0) : handleRating(1)
        setOnStarRating(!onStarRating)
    }

    const handleRating = (rate) => {
        setServiceData({ ...serviceData, starRating: rate })
    }

    const handleInputPropertyName = (value) => {
        setServiceData({ ...serviceData, propertyName: value })
    }

    const handleInputStatus = (value) => {
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

    const handleInputTimeOpen = (value) => {
        setServiceData({ ...serviceData, timeOpen: value })
    }

    const handleInputTimeClose = (value) => {
        setServiceData({ ...serviceData, timeClose: value })
    }

    const handleSelectTypeOfCusine = (value) => {
        let newDataForm = []
        for (let i = 0; i < value.length; i++) {
            newDataForm.push({ typeCuisineId: value[i].value })
        }
        setServiceData({ ...serviceData, typeOfCuisine: newDataForm })
    }

    console.log(serviceData.typeOfCuisine)

    return (
        <div className='container'>
            <div className='space-30 background-w'>
                <div className="d-flex line-input line-input-3-line">
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
                        <label htmlFor='typeOfCuisine' className='d-block'>{languageList.txtTypeOfCuisine}<span className="requird-star">*</span></label>
                        <Select className='input-inline had-input select-none-border'
                            placeholder=''
                            isMulti
                            hideSelectedOptions={false}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            classNamePrefix="select"
                            options={typeOfCuisineList}
                            onChange={handleSelectTypeOfCusine}
                            defaultValue={
                                serviceData.typeOfCuisine.map((value) => typeOfCuisineList[parseInt(value.typeCuisineId) - 1])
                            }
                        />
                    </div>
                    <div className='w-45'>
                        <div>
                            <label>{languageList.txtStarRating}</label>
                            <Switch onChange={handleOnOffStarRating} className='float-end' defaultChecked />
                        </div>
                        {onStarRating &&
                            <Rating className="input-inline star-rating" allowHover={false} onClick={handleRating} initialValue={serviceData.starRating} />}
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
                <div className="d-flex line-input line-input-3-line">
                    <div className="w-45">
                        <label htmlFor="contactDateOfIssue" className="d-block">{languageList.txtTimeOpen}<span className="requird-star">*</span></label>
                        <input onFocus={(e) => handleFocus(e.target)} onBlur={(e) => handleBlur(e.target)}
                            id='contactDateOfIssue' className="input-inline had-input" type='time'
                            value={serviceData.timeOpen} onChange={(e) => handleInputTimeOpen(e.target.value)} />
                    </div>
                    <div className="w-45">
                        <label htmlFor="contactPlaceOfIssue" className="d-block">{languageList.txtTimeClose}<span className="requird-star">*</span></label>
                        <input onFocus={(e) => handleFocus(e.target)} onBlur={(e) => handleBlur(e.target)}
                            id='contactPlaceOfIssue' className="input-inline had-input" type='time'
                            value={serviceData.timeClose} onChange={(e) => handleInputTimeClose(e.target.value)} />
                    </div>
                </div>
                <div className="d-flex line-input line-input-3-line">
                    <div className="w-45">
                        <label htmlFor='email' className='d-block'>{languageList.txtWebsite}</label>
                        <input value={serviceData.website} onChange={(e) => handleInputWebsite(e.target.value)}
                            onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                            id='email' className="input-inline had-input" type='text' />
                    </div>
                    <div className="w-45">
                        <label htmlFor='taxCode' className='d-block'>{languageList.txtTaxCode}<span className="requird-star">*</span></label>
                        <input value={serviceData.taxCode} onChange={(e) => handleInputTaxCode(e.target.value)}
                            onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                            id='taxCode' className="input-inline had-input" type='text' />
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

export default memo(RegisterInformationRestaurant)