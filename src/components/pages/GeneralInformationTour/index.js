import { memo, useEffect } from 'react'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import { CgDanger } from 'react-icons/cg'
import { english, vietnamese } from '../../Languages/GeneralInformationTour'
import { english as englishCategory, vietnamese as vietnameseCategory } from '../../Languages/TourCategory'
import City from '../../Data/city.json'
import './GeneralInformationTour.scss'

function GeneralInformationTour({ languageSelected, tour, setTour, tourSchedule, setTourSchedule, isDisabled }) {
    const languageList = (languageSelected === 'EN' ? english : vietnamese)
    const categorys = (languageSelected === 'EN' ? englishCategory : vietnameseCategory)

    const today = new Date();
    const tomorow = new Date(today.setDate(today.getDate() + 1)).toISOString().split('T')[0];

    useEffect(() => {
        if (!tour.minAdult) {
            setTour({ ...tour, minAdult: 1 })
        }
    }, [tour.minAdult])

    const handleBlur = (input) => {
        input.style.border = 'solid 1px #D9D9D9'
    }

    const handleFocus = (input) => {
        input.style.border = 'solid 1px #4874E8'
    }

    const handleInputNumberOfDay = (value) => {
        if (value <= 0) {
            setTour(pre => pre)
        }
        else {
            let tourRaw = { ...tour }
            tourRaw.numberOfDay = parseInt(value)
            if (value < tour.numberOfNight) {
                tourRaw.numberOfNight = parseInt(value)
            }
            if (value < tour.numberOfDay) {
                let tourScheduleRaw = [...tourSchedule]
                tourScheduleRaw.splice(parseInt(value))
                setTourSchedule(tourScheduleRaw)
            }
            setTour(tourRaw)
        }
    }

    const handleInputNumberOfNight = (value) => {
        if (value <= 0) {
            setTour(pre => pre)
        }
        else {
            let valueRaw = value
            if (value > tour.numberOfDay) {
                valueRaw = tour.numberOfDay
            }
            setTour({ ...tour, numberOfNight: valueRaw })
        }
    }

    const handleInputMinAdult = (value) => {
        if (value <= 0) {
            setTour(pre => pre)
        }
        else {
            let valueRaw = value
            if (value > tour.maxAdult) {
                valueRaw = tour.maxAdult
            }
            setTour({ ...tour, minAdult: valueRaw })
        }
    }

    const handleInputMaxAdult = (value) => {
        if (value <= 0) {
            setTour(pre => pre)
        }
        else {
            if (value < tour.minAdult) {
                setTour({ ...tour, minAdult: value, maxAdult: value })
            }
            else {

                setTour({ ...tour, maxAdult: value })
            }
        }
    }

    const handleInputMinChildren = (value) => {
        if (value < 0 || value === '') {
            setTour(pre => pre)
        }
        else {
            let valueRaw = value
            if (value > parseInt(tour.maxChildren)) {
                valueRaw = tour.maxChildren
            }
            setTour({ ...tour, minChildren: valueRaw })
        }
    }

    const handleInputMaxChildren = (value) => {
        if (value < 0 || value === '') {
            setTour(pre => pre)
        }
        else {
            if (value < parseInt(tour.minChildren)) {
                setTour({ ...tour, minChildren: value, maxChildren: value })
            }
            else {
                setTour({ ...tour, maxChildren: value })
            }
        }
    }

    useEffect(() => {
        if (!tour.minToActive || tour.minToActive == 0) {
            setTour({ ...tour, minToActive: 1 })
        }
    }, [tour.minToActive])

    const handleHoverQuestionIcon = () => {
        document.getElementById('note-waiting').style.display = 'block'
    }

    const handleBlurQuestionIcon = () => {
        document.getElementById('note-waiting').style.display = 'none'
    }

    const pathname = window.location.pathname

    return (
        <div className='d-flex form-general-tour'>
            <div className='w-50'>
                <div className="d-flex line-input">
                    <div className="mlr-50 input-alone">
                        <label className="d-block title-create-tour">{languageList.txtCode}<span className="requird-star">*</span></label>
                        <input onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                            value={tour.code}
                            disabled={isDisabled}
                            onChange={(e) => setTour({ ...tour, code: e.target.value })}
                            className="input-inline" type='text' />
                    </div>
                </div>
                <div className="d-flex line-input">
                    <div className="mlr-50 input-alone">
                        <label className="d-block title-create-tour">{languageList.txtName}<span className="requird-star">*</span></label>
                        <input onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                            value={tour.name}
                            disabled={isDisabled}
                            onChange={(e) => setTour({ ...tour, name: e.target.value })}
                            className="input-inline" type='text' />
                    </div>
                </div>
                <div className="d-flex line-input">
                    <div className="mlr-50 input-alone">
                        <label className="d-block title-create-tour">{languageList.txtCategory}<span className="requird-star">*</span></label>
                        <select onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                            className="input-inline" type='text'
                            disabled={isDisabled}
                            onChange={(e) => setTour({ ...tour, category: e.target.value })}>
                            {categorys.map((item, index) => (
                                index !== 0 && <option selected={(tour.category == item.value)} value={item.value}>{item.label}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="d-flex line-input">
                    <div className="mlr-50 ">
                        <label className="d-block title-create-tour" title-create-tour>{languageList.txtStartPlace}<span className="requird-star">*</span></label>
                        <select onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                            className="input-inline" type='text'
                            disabled={isDisabled}
                            onChange={(e) => setTour({ ...tour, startPlace: e.target.value })}>
                            {City.map((item) => (
                                <option value={item.name} selected={(tour.startPlace == item.name)}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mlr-50">
                        <label className="d-block title-create-tour">{languageList.txtEndPlace}<span className="requird-star">*</span></label>
                        <select onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                            className="input-inline" type='text'
                            disabled={isDisabled}
                            onChange={(e) => setTour({ ...tour, endPlace: e.target.value })}>
                            {City.map((item) => (
                                <option value={item.name} selected={(tour.endPlace == item.name)}>{item.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                {tour.type != 0 &&
                    <>
                        <div className="d-flex line-input">
                            <div className="mlr-50 ">
                                <label className="d-block title-create-tour">{languageList.txtMinAdult}<span className="requird-star">*</span></label>
                                <input onFocus={(e) => handleFocus(e.target)}
                                    onBlur={(e) => handleBlur(e.target)}
                                    value={tour.minAdult}
                                    disabled={isDisabled}
                                    onChange={(e) => handleInputMinAdult(parseInt(e.target.value))}
                                    className="input-inline" type='number' min={1} max={tour.maxAdult} />
                            </div>
                            <div className="mlr-50">
                                <label className="d-block title-create-tour">{languageList.txtMaxAdult}<span className="requird-star">*</span></label>
                                <input onFocus={(e) => handleFocus(e.target)}
                                    onBlur={(e) => handleBlur(e.target)}
                                    value={tour.maxAdult} disabled={isDisabled}
                                    onChange={(e) => handleInputMaxAdult(e.target.value)}
                                    className="input-inline" type='number' min={1} />
                            </div>
                        </div>
                        <div className="d-flex line-input">
                            <div className="mlr-50 ">
                                <label className="d-block title-create-tour">{languageList.txtMinChildren}<span className="requird-star">*</span></label>
                                <input onFocus={(e) => handleFocus(e.target)}
                                    onBlur={(e) => handleBlur(e.target)}
                                    value={tour.minChildren} disabled={isDisabled}
                                    onChange={(e) => handleInputMinChildren(e.target.value)}
                                    className="input-inline" type='number' min={1} max={tour.maxChildren} />
                            </div>
                            <div className="mlr-50">
                                <label className="d-block title-create-tour">{languageList.txtMaxChildren}<span className="requird-star">*</span></label>
                                <input onFocus={(e) => handleFocus(e.target)}
                                    onBlur={(e) => handleBlur(e.target)}
                                    value={tour.maxChildren} disabled={isDisabled}
                                    onChange={(e) => handleInputMaxChildren(e.target.value)}
                                    className="input-inline" type='number' min={1} />
                            </div>
                        </div>
                    </>
                }
            </div>
            <div className='w-50'>
                <div className="d-flex line-input">
                    <div className="mlr-50 input-alone">
                        <label className="d-block title-create-tour">{languageList.txtStatus}</label>
                        {tour.status === 2 &&
                            <>
                                <div div className="d-flex line-input mt-10 w-70 mb-40 status-waiting">
                                    <label className='mr-10'>{languageList.txtWaiting}</label>
                                    <AiOutlineQuestionCircle onMouseLeave={handleBlurQuestionIcon} onMouseEnter={handleHoverQuestionIcon} id='icon-question-waiting' className='icon-question-waiting' />
                                </div>
                                <div className='note-waiting font-14' id='note-waiting'>{languageList.txtNoteWaiting}</div>
                            </>
                        }
                        {tour.status === 1 &&
                            <div div className="d-flex line-input mt-10 w-70 mb-40 status-waiting">
                                <label className='mr-10'>{languageList.txtActive}</label>
                            </div>
                        }
                        {tour.status === 3 &&
                            <div div className="d-flex line-input mt-10 w-70 mb-40 status-waiting">
                                <label className='mr-10'>{languageList.txtClose}</label>
                            </div>
                        }
                    </div>
                </div>
                <div className="d-flex line-input">
                    <div className="mlr-50 input-alone">
                        <label className="d-block title-create-tour">{languageList.txtType}<span className="requird-star">*</span></label>
                        <label className='font-14 requird-star'><CgDanger />{languageSelected === 'EN' ? ' Tour type cannot be changed once created' : ' Loại tour không thể thay đổi sau khi tạo'}</label>
                        <div className="d-flex line-input w-100">
                            <label htmlFor='type-private' className='d-flex radio-custom input-inline'>
                                <input name='status' type='radio' id='type-private' value='0' hidden
                                    onChange={(e) => pathname !== '/admin/edit-tour' && !isDisabled && setTour({ ...tour, type: parseInt(e.target.value) })} />
                                <div htmlFor='type-private' className={`radio-spuare mr-20 ${tour.type === 0 && 'radio-custom-checked'}`} />
                                <label htmlFor='type-private'>{languageList.txtPrivate}</label>
                            </label>
                            <label htmlFor='type-sic' className='d-flex radio-custom input-inline'>
                                <input name='status' type='radio' id='type-sic' value='1' hidden
                                    onChange={(e) => pathname !== '/admin/edit-tour' && !isDisabled && setTour({ ...tour, type: parseInt(e.target.value) })} />
                                <div htmlFor='type-sic' className={`radio-spuare mr-20 ${tour.type === 1 && 'radio-custom-checked'}`} />
                                <label htmlFor='type-sic'>{languageList.txtSIC}</label>
                            </label>
                            <label htmlFor='type-custom' className='d-flex radio-custom input-inline'>
                                <input name='status' type='radio' id='type-custom' value='2' hidden
                                    onChange={(e) => pathname !== '/admin/edit-tour' && !isDisabled && setTour({ ...tour, type: parseInt(e.target.value) })} />
                                <div htmlFor='type-custom' className={`radio-spuare mr-20 ${tour.type === 2 && 'radio-custom-checked'}`} />
                                <label htmlFor='type-custom'>{languageList.txtCustomTour}</label>
                            </label>
                        </div>
                    </div>
                </div>
                {tour.type != 1 &&
                    <div className="d-flex line-input">
                        <div className="mlr-50 ">
                            <label className="d-block title-create-tour">{languageList.txtStartDay}<span className="requird-star">*</span></label>
                            <input onFocus={(e) => handleFocus(e.target)}
                                onBlur={(e) => handleBlur(e.target)}
                                onChange={(e) => setTour({ ...tour, startDate: e.target.value })}
                                value={tour.startDate}
                                disabled={isDisabled}
                                className="input-inline" type='date' min={tomorow} />
                        </div>
                    </div>}
                <div className="d-flex line-input">
                    <div className="mlr-50 input-alone">
                        <label className="d-block title-create-tour">{languageList.txtMode}<span className="requird-star">*</span></label>
                        <div className="d-flex line-input w-70">
                            <label htmlFor='mode-day' className='d-flex radio-custom input-inline'>
                                <input name='status' type='radio' id='mode-day' value='0' hidden
                                    onChange={(e) => !isDisabled && setTour({ ...tour, mode: parseInt(e.target.value) })} />
                                <div htmlFor='mode-day' className={`radio-spuare mr-20 ${tour.mode === 0 && 'radio-custom-checked'}`} />
                                <label htmlFor='mode-day'>{languageList.txtDayTour}</label>
                            </label>
                            <label htmlFor='mode-multi-day' className='d-flex radio-custom input-inline'>
                                <input name='status' type='radio' id='mode-multi-day' value='1' hidden
                                    onChange={(e) => !isDisabled && setTour({ ...tour, mode: parseInt(e.target.value) })} />
                                <div htmlFor='mode-multi-day' className={`radio-spuare mr-20 ${tour.mode === 1 && 'radio-custom-checked'}`} />
                                <label htmlFor='mode-multi-day'>{languageList.txtMultiDayTour}</label>
                            </label>
                        </div>
                    </div>
                </div>
                {tour.mode === 1 ?
                    <div className="d-flex line-input">
                        <div className="mlr-50 ">
                            <label className="d-block title-create-tour">{languageList.txtNumberOfDay}<span className="requird-star">*</span></label>
                            <input onFocus={(e) => handleFocus(e.target)}
                                onBlur={(e) => handleBlur(e.target)}
                                value={tour.numberOfDay} disabled={isDisabled}
                                onChange={(e) => handleInputNumberOfDay(e.target.value)}
                                className="input-inline" type='number' min={1} />
                        </div>
                        <div className="mlr-50">
                            <label className="d-block title-create-tour">{languageList.txtNumberOfNight}<span className="requird-star">*</span></label>
                            <input onFocus={(e) => handleFocus(e.target)}
                                onBlur={(e) => handleBlur(e.target)}
                                value={tour.numberOfNight} disabled={isDisabled}
                                onChange={(e) => handleInputNumberOfNight(e.target.value)}
                                className="input-inline" type='number' min={1} max={tour.numberOfDay} />
                        </div>
                    </div>
                    :
                    <div className="d-flex line-input">
                        <div className="mlr-50 ">
                            <label className="d-block title-create-tour">{languageList.txtStartTime}<span className="requird-star">*</span></label>
                            <input onFocus={(e) => handleFocus(e.target)}
                                onBlur={(e) => handleBlur(e.target)}
                                value={tour.startTime} disabled={isDisabled}
                                onChange={(e) => setTour({ ...tour, startTime: e.target.value })}
                                className="input-inline" type='time' min={1} />
                        </div>
                        <div className="mlr-50">
                            <label className="d-block title-create-tour">{languageList.txtEndTime}<span className="requird-star">*</span></label>
                            <input onFocus={(e) => handleFocus(e.target)}
                                onBlur={(e) => handleBlur(e.target)}
                                value={tour.endTime} disabled={isDisabled}
                                onChange={(e) => setTour({ ...tour, endTime: e.target.value })}
                                className="input-inline" type='time' min={1} />
                        </div>
                    </div>
                }
            </div>
        </div >
    )
}

export default memo(GeneralInformationTour)