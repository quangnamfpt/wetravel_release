import { memo, useContext } from 'react'
import { Rating } from 'react-simple-star-rating'
import { CommonDataForAllViewService } from '../ViewInformationDetailService'
import Select from 'react-select';
import City from '../../Data/city.json'
import { englishTypeOfCusine, vietnameseTypeOfCusine } from '../../Languages/TypeOfCusine';
import Switch from '@mui/material/Switch'

function ViewInformationRestaurant({ languageSelected }) {
    const service = useContext(CommonDataForAllViewService)
    const typeOfCuisineList = (languageSelected === 'EN' ? englishTypeOfCusine : vietnameseTypeOfCusine)

    return (
        <div>
            <div className='space-30 background-w'>
                <div className="d-flex line-input line-input-3-line">
                    <div className="w-45">
                        <label htmlFor='roomName' className='d-block'>Property Name<span className="requird-star">*</span></label>
                        <input id='roomName'
                            className='input-inline' disabled
                            value={service.propertyName} />
                    </div>
                    <div className='w-45'>
                        <label htmlFor="status" className="d-block">Status<span className="requird-star">*</span></label>
                        <select id='status' className='input-inline had-input'
                            disabled>
                            <option selected={service.status == 1} value={1}>Active</option>
                            <option selected={service.status == 2} value={2}>Close</option>
                            <option selected={service.status == 3} value={3}>Pause</option>
                        </select>
                    </div>
                </div>
                <div className="d-flex line-input line-input-3-line">
                    <div className="w-45">
                        <label htmlFor='typeOfCuisine' className='d-block'>Type of cuisine<span className="requird-star">*</span></label>
                        <Select className='input-inline had-input select-none-border'
                            placeholder=''
                            isMulti
                            hideSelectedOptions={false}
                            closeMenuOnSelect={false}
                            classNamePrefix="select"
                            options={typeOfCuisineList}
                            isDisabled
                            defaultValue={
                                service.typeOfCuisine.map((value) => typeOfCuisineList[parseInt(value.typeCuisineId) - 1])
                            }
                        />
                    </div>
                    <div className='w-45'>
                        <label htmlFor='typeOfCuisine' className='d-block'>Star rating<span className="requird-star">*</span></label>
                        <Rating className="input-inline star-rating" allowHover={false} readonly initialValue={service.starRating} />
                    </div>
                </div>
                <div className="d-flex line-input line-input-3-line">
                    <div className='w-45'>
                        <label htmlFor="city" className="d-block">City<span className="requird-star">*</span></label>
                        <select id='city' className='input-inline had-input'
                            disabled>
                            {City.map((cityData) => (
                                <option selected={service.city == cityData.name} value={cityData.name}>{cityData.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='w-45'>
                        <label htmlFor="address" className="d-block">Address<span className="requird-star">*</span></label>
                        <input value={service.address} disabled
                            id='address' className="input-inline" type='text' />
                    </div>
                </div>
                <div className="d-flex line-input line-input-3-line">
                    <div className="w-45">
                        <label htmlFor="contactDateOfIssue" className="d-block">Time open<span className="requird-star">*</span></label>
                        <input disabled id='contactDateOfIssue' className="input-inline had-input" type='time'
                            value={service.timeOpen} />
                    </div>
                    <div className="w-45">
                        <label htmlFor="contactPlaceOfIssue" className="d-block">Time close<span className="requird-star">*</span></label>
                        <input disabled id='contactPlaceOfIssue' className="input-inline had-input" type='time'
                            value={service.timeClose} />
                    </div>
                </div>
                <div className="d-flex line-input line-input-3-line">
                    <div className="w-45">
                        <label htmlFor='email' className='d-block'>Website</label>
                        <input value={service.website}
                            disabled id='email' className="input-inline had-input" type='text' />
                    </div>
                    <div className="w-45">
                        <label htmlFor='taxCode' className='d-block'>Tax code<span className="requird-star">*</span></label>
                        <input value={service.taxCode}
                            disabled
                            id='taxCode' className="input-inline had-input" type='text' />
                    </div>
                </div>
                <div className="line-input">
                    <div className="input-alone">
                        <label htmlFor='description' className='d-block'>Description</label>
                        <textarea rows="4" id='description' className='input-inline'
                            value={service.description}
                            disabled />
                    </div>
                </div>
            </div>
            <div className='mt-30 space-30 background-w'>
                <label className='title'>Contact</label>
                <div className="line-input">
                    <div className="input-alone">
                        <label htmlFor='phone' className='d-block'>Phone number<span className="requird-star">*</span></label>
                        <input value={service.phoneNumberContact}
                            disabled
                            id='phone' className="input-inline" type='text' />
                    </div>
                </div>
                <div className="line-input">
                    <div className="input-alone">
                        <label htmlFor='phone' className='d-block'>Fax</label>
                        <input value={service.fax} disabled
                            id='phone' className="input-inline" type='text' />
                    </div>
                </div>
                <div className="line-input">
                    <div className="input-alone">
                        <label htmlFor='email' className='d-block'>Email<span className="requird-star">*</span></label>
                        <input value={service.emailContact}
                            disabled
                            id='email' className="input-inline" type='text' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ViewInformationRestaurant)