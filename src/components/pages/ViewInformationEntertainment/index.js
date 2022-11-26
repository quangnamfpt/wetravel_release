import { memo, useContext } from 'react'
import { CommonDataForAllViewService } from '../ViewInformationDetailService'
import { englishWeekDays, vietnameseWeekDays } from '../../Languages/WeekDays'
import { english, vietnamese } from '../../Languages/InformationEntertainment'
import Select from 'react-select'

function ViewInformationEntertainment({ languageSelected }) {
    const service = useContext(CommonDataForAllViewService)
    const weekDaysList = languageSelected === 'EN' ? englishWeekDays : vietnameseWeekDays
    const languageList = languageSelected === 'EN' ? english : vietnamese

    return (
        <div>
            <div className='space-30 background-w'>
                <div className="d-flex line-input line-input-3-line">
                    <div className="w-45">
                        <label htmlFor='roomName' className='d-block'>{languageList.txtPropertyName}<span className="requird-star">*</span></label>
                        <input id='roomName'
                            className='input-inline'
                            disabled
                            value={service.propertyName} />
                    </div>
                    <div className='w-45'>
                        <label htmlFor="status" className="d-block">{languageList.txtStatus}<span className="requird-star">*</span></label>
                        <select id='status' className='input-inline had-input'
                            disabled>
                            <option selected={service.status == 1} value={1}>{languageList.txtActive}</option>
                            <option selected={service.status == 2} value={2}>{languageList.txtClose}</option>
                            <option selected={service.status == 3} value={3}>{languageList.txtPause}</option>
                        </select>
                    </div>
                </div>
                <div className="d-flex line-input line-input-3-line">
                    <div className="w-45">
                        <label htmlFor="status" className="d-block">{languageList.txtChildTicketPrice}<span className="requird-star">*</span></label>
                        <input id='roomName'
                            className='input-inline'
                            value={service.childTiketPrice}
                            type='number' disabled />
                    </div>
                    <div className='w-45'>
                        <label className="d-block">{languageList.txtAdultTicketPrice}<span className="requird-star">*</span></label>
                        <input id='roomName'
                            className='input-inline'
                            value={service.adultTicketPrice} type='number' disabled />
                    </div>
                </div>
                <div className="d-flex line-input line-input-3-line">
                    <div className='w-45'>
                        <label htmlFor="city" className="d-block">{languageList.txtCity}<span className="requird-star">*</span></label>
                        <select id='city' className='input-inline had-input'
                            disabled>
                            <option>{service.city}</option>
                        </select>
                    </div>
                    <div className='w-45'>
                        <label htmlFor="address" className="d-block">{languageList.txtAddress}<span className="requird-star">*</span></label>
                        <input value={service.address} disabled
                            id='address' className="input-inline" type='text' />
                    </div>
                </div>
                <div className="line-input">
                    <div className="input-alone">
                        <label htmlFor='weekday' className='d-block'>{languageList.txtWeekDaysOpen}<span className="requird-star">*</span></label>
                        <Select className='input-inline select-none-border'
                            id='weekday'
                            placeholder=''
                            isMulti
                            isSearchable={false}
                            hideSelectedOptions={false}
                            closeMenuOnSelect={false}
                            classNamePrefix="select"
                            options={weekDaysList}
                            isDisabled
                            defaultValue={service.dateOpen.map((value) => weekDaysList[value - 1])}
                        />
                    </div>
                </div>
                <div className="d-flex line-input line-input-3-line">
                    <div className="w-45">
                        <label htmlFor="contactDateOfIssue" className="d-block">{languageList.txtTimeOpen}<span className="requird-star">*</span></label>
                        <input id='contactDateOfIssue' className="input-inline had-input" type='time'
                            value={service.timeOpen} disabled />
                    </div>
                    <div className="w-45">
                        <label htmlFor="contactPlaceOfIssue" className="d-block">{languageList.txtTimeClose}<span className="requird-star">*</span></label>
                        <input id='contactPlaceOfIssue' className="input-inline had-input" type='time'
                            value={service.timeClose} disabled />
                    </div>
                </div>
                <div className="d-flex line-input line-input-3-line">
                    <div className="w-45">
                        <label htmlFor='email' className='d-block'>{languageList.txtWebsite}</label>
                        <input value={service.website} disabled
                            id='email' className="input-inline had-input" type='text' />
                    </div>
                    <div className="w-45">
                        <label htmlFor='taxCode' className='d-block'>{languageList.txtTaxCode}<span className="requird-star">*</span></label>
                        <input value={service.taxCode} disabled
                            id='taxCode' className="input-inline had-input" type='text' />
                    </div>
                </div>
                <div className="line-input">
                    <div className="input-alone">
                        <label htmlFor='description' className='d-block'>{languageList.txtDescription}</label>
                        <textarea rows="4" id='description' className='input-inline'
                            value={service.description} disabled />
                    </div>
                </div>
            </div>
            <div className='space-30 background-w'>
                <label className='title'>{languageList.txtContact}</label>
                <div className="line-input">
                    <div className="input-alone">
                        <label htmlFor='phone' className='d-block'>{languageList.txtPhoneNumber}<span className="requird-star">*</span></label>
                        <input value={service.phoneNumberContact} disabled
                            id='phone' className="input-inline" type='text' />
                    </div>
                </div>
                <div className="line-input">
                    <div className="input-alone">
                        <label htmlFor='phone' className='d-block'>{languageList.txtFax}</label>
                        <input value={service.fax} disabled
                            id='phone' className="input-inline" type='text' />
                    </div>
                </div>
                <div className="line-input">
                    <div className="input-alone">
                        <label htmlFor='email' className='d-block'>{languageList.txtEmail}<span className="requird-star">*</span></label>
                        <input value={service.emailContact} disabled
                            id='email' className="input-inline" type='text' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ViewInformationEntertainment)