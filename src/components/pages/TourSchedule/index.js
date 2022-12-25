import { memo, useState, useEffect, useRef } from 'react'
import { english, vietnamese } from '../../Languages/TourSchedule'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './TourSchedule.scss'
import Select from 'react-select';
import { BsChevronUp, BsChevronDown } from 'react-icons/bs'
import City from '../../Data/city.json'
import axios from 'axios'
import { API_GET_SERVICE_BY_CONDITION } from '../../API';
import LoadingDialog from '../../Layout/LoadingDialog';

function TourSchedule({ languageSelected, tour, tourSchedule, setTourSchedule, serviceList, isDisabled }) {
    const languageList = (languageSelected === 'EN' ? english : vietnamese)

    const [getDataComplete, setGetDataComplete] = useState(false)

    const handleBlur = (input) => {
        input.style.border = 'solid 1px #D9D9D9'
    }

    const handleFocus = (input) => {
        input.style.border = 'solid 1px #4874E8'
    }

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],
        ]
    }

    const formats = [
        'header', 'font', 'background', 'color', 'code', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', 'script', 'align', 'direction',
        'link', 'image', 'code-block', 'formula', 'video'
    ]

    const handleInputScheduleName = ((value, index) => {
        let newDataForm = [...tourSchedule]
        newDataForm[index].name = value
        setTourSchedule(newDataForm)
    })

    const handleInputContent = ((value, index) => {
        let newDataForm = [...tourSchedule]
        newDataForm[index].content = value
        setTourSchedule(newDataForm)
    })

    const getListServiceRecommend = async (value, index, isChangeCity) => {
        let getService = []
        for (let i = 1; i <= 3; i++) {
            await axios.get(API_GET_SERVICE_BY_CONDITION, {
                params: {
                    page: 1,
                    size: 99999,
                    isActive: 1,
                    isBlock: 0,
                    status: '1',
                    serviceCategoryId: i
                }
            }).then(res => {
                const data = res.data.data.content
                let list = []
                data.forEach(item => {
                    list.push({
                        value: item.serviceId,
                        label: item.serviceName
                    })
                })
                getService.push(list)
                if (i === 3) {
                    handleSetDestination(value, index, getService, isChangeCity)
                }
            }).catch(() => {
                getService.push([])
                if (i === 3) {
                    handleSetDestination(value, index, getService, isChangeCity)
                }
            })
        }
    }

    const handleSetDestination = (value, index, getService, isChangeCity) => {
        let newDataForm = [...tourSchedule]

        newDataForm[index].toPlace = value
        newDataForm[index].getAccommodation = getService[0]
        newDataForm[index].getEntertainment = getService[1]
        newDataForm[index].getRestaurants = getService[2]

        if (isChangeCity) {
            newDataForm[index].recommendAccommodation = []
            newDataForm[index].recommendEntertainment = []
            newDataForm[index].recommendRestaurants = []

            newDataForm[index].indexAccommodation = []
            newDataForm[index].indexEntertainment = []
            newDataForm[index].indexRestaurants = []
        }

        setGetDataComplete(true)
        setTourSchedule(newDataForm)
    }

    const handleInputDestination = ((value, index) => {
        getListServiceRecommend(value, index, true)
    })

    const handleSelectRecommendAccommodation = ((service, index) => {
        let newDataForm = [...tourSchedule]
        let idList = []
        let indexList = []
        service.forEach(item => {
            idList.push(item.value)

            for (let i = 0; i < newDataForm[index].getAccommodation.length; i++) {
                if (item.value === newDataForm[index].getAccommodation[i].value) {
                    indexList.push(i)
                    break
                }
            }
        })
        newDataForm[index].recommendAccommodation = idList
        newDataForm[index].indexAccommodation = indexList
        setTourSchedule(newDataForm)
    })

    const handleSelectRecommendEntertainment = ((service, index) => {
        let newDataForm = [...tourSchedule]
        let idList = []
        let indexList = []
        service.forEach(item => {
            idList.push(item.value)

            for (let i = 0; i < newDataForm[index].getEntertainment.length; i++) {
                if (item.value === newDataForm[index].getEntertainment[i].value) {
                    indexList.push(i)
                    break
                }
            }
        })
        newDataForm[index].recommendEntertainment = idList
        newDataForm[index].indexEntertainment = indexList
        setTourSchedule(newDataForm)
    })

    const handleSelectRecommendRestaurants = ((service, index) => {
        let newDataForm = [...tourSchedule]
        let idList = []
        let indexList = []
        service.forEach(item => {
            idList.push(item.value)

            for (let i = 0; i < newDataForm[index].getRestaurants.length; i++) {
                if (item.value === newDataForm[index].getRestaurants[i].value) {
                    indexList.push(i)
                    break
                }
            }
        })
        newDataForm[index].recommendRestaurants = idList
        newDataForm[index].indexRestaurants = indexList
        setTourSchedule(newDataForm)
    })

    const handleClickShowHide = ((index) => {
        let newDataForm = [...tourSchedule]
        newDataForm[index].show = !newDataForm[index].show
        setTourSchedule(newDataForm)
    })

    useEffect(() => {
        tourSchedule.forEach((item, index) => {
            getListServiceRecommend(item.toPlace, index, false)
        })
    }, [tourSchedule.length])

    return (
        <div>
            {tour.mode == 1 ?
                [...tourSchedule].map((item, index) => (
                    <div className={`form-tour-schedule bg-white ${item.openServices && 'pb-200'}`}>
                        <label className='title pd-30-20'> {languageList.txtDay} {index + 1} </label>
                        {item.show ?
                            <div onClick={() => handleClickShowHide(index)} className='space-icon-show-container bd-t btn-show-hide-overflow'><BsChevronUp className='icon-show-container' /></div>
                            :
                            <div onClick={() => handleClickShowHide(index)} className='space-icon-show-container bd-t btn-show-hide-overflow'><BsChevronDown className='icon-show-container' /></div>
                        }
                        {item.show &&
                            <div className='animation-show'>
                                <div className='pd-30-20'>
                                    <div className="d-flex line-input">
                                        <div className="mlr-50 input-alone">
                                            <label className="d-block title-create-tour">{languageList.txtName}<span className="requird-star">*</span></label>
                                            <input onFocus={(e) => handleFocus(e.target)}
                                                onBlur={(e) => handleBlur(e.target)}
                                                onChange={(e) => handleInputScheduleName(e.target.value, index)}
                                                value={item.name} disabled={isDisabled}
                                                className="input-inline " type='text' />
                                        </div>
                                    </div>
                                    <div className="d-flex line-input mb-20">
                                        <div className="mlr-50 input-alone">
                                            <label className="d-block title-create-tour">{languageList.txtContent}<span className="requird-star">*</span></label>
                                            <ReactQuill defaultValue={item.content} readOnly={isDisabled}
                                                onChange={(value) => handleInputContent(value, index)}
                                                className="input-inline border-none quill-create-tour"
                                                theme="snow" modules={modules} formats={formats} />
                                        </div>
                                    </div>
                                    <div className="d-flex line-input">
                                        <div className="mlr-50 input-alone">
                                            <label className="d-block title-create-tour">{languageList.txtDestination}<span className="requird-star">*</span></label>
                                            <select className="input-inline" disabled={isDisabled}
                                                onFocus={(e) => handleFocus(e.target)}
                                                onBlur={(e) => handleBlur(e.target)}
                                                onChange={(e) => handleInputDestination(e.target.value, index)}>
                                                {City.map(city => (
                                                    <option value={city.name} selected={item.toPlace === city.name}>{city.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="d-flex line-input mb-25">
                                        <div className="mlr-50 input-alone">
                                            <label className="d-block title-create-tour">{languageList.txtRecommendedAccommodation}<span className="requird-star">*</span></label>
                                            <Select onFocus={(e) => handleFocus(e.target)}
                                                onBlur={(e) => handleBlur(e.target)}
                                                isSearchable={true}
                                                placeholder=''
                                                onChange={(value) => handleSelectRecommendAccommodation(value, index)}
                                                isMulti
                                                closeMenuOnSelect={false}
                                                hideSelectedOptions={false}
                                                options={item.getAccommodation}
                                                value={item.indexAccommodation.map(i => item.getAccommodation[parseInt(i)])}
                                                isDisabled={isDisabled} />
                                        </div>
                                    </div>
                                    <div className="d-flex line-input mb-25">
                                        <div className="mlr-50 input-alone">
                                            <label className="d-block title-create-tour">{languageList.txtRecommendedEntertainment}<span className="requird-star">*</span></label>
                                            <Select onFocus={(e) => handleFocus(e.target)}
                                                onBlur={(e) => handleBlur(e.target)}
                                                isSearchable={true}
                                                placeholder=''
                                                onChange={(value) => handleSelectRecommendEntertainment(value, index)}
                                                isMulti
                                                closeMenuOnSelect={false}
                                                hideSelectedOptions={false}
                                                options={item.getEntertainment}
                                                value={item.indexEntertainment.map(i => item.getEntertainment[parseInt(i)])}
                                                isDisabled={isDisabled} />
                                        </div>
                                    </div>
                                    <div className="d-flex line-input mb-25">
                                        <div className="mlr-50 input-alone">
                                            <label className="d-block title-create-tour">{languageList.txtRecommendedRestaurants}<span className="requird-star">*</span></label>
                                            <Select onFocus={(e) => handleFocus(e.target)}
                                                onBlur={(e) => handleBlur(e.target)}
                                                isSearchable={true}
                                                onChange={(value) => handleSelectRecommendRestaurants(value, index)}
                                                isMulti
                                                closeMenuOnSelect={false}
                                                hideSelectedOptions={false}
                                                options={item.getRestaurants}
                                                placeholder=''
                                                value={item.indexRestaurants.map(i => item.getRestaurants[parseInt(i)])}
                                                isDisabled={isDisabled} />
                                        </div>
                                    </div>
                                </div>
                                {item.show &&
                                    <div onClick={() => handleClickShowHide(index)} className='space-icon-show-container btn-show-hide-overflow'><BsChevronUp className='icon-show-container' /></div>
                                }
                            </div>
                        }
                    </div>
                )) :
                <div className={`form-tour-schedule bg-white ${tourSchedule[0].openServices && 'pb-200'}`}>
                    <label className='title pd-30-20'> {languageList.txtDay} {1} </label>
                    {tourSchedule[0].show ?
                        <div onClick={() => handleClickShowHide(0)} className='space-icon-show-container bd-t btn-show-hide-overflow'><BsChevronUp className='icon-show-container' /></div>
                        :
                        <div onClick={() => handleClickShowHide(0)} className='space-icon-show-container bd-t btn-show-hide-overflow'><BsChevronDown className='icon-show-container' /></div>
                    }
                    {tourSchedule[0].show &&
                        <div className='animation-show'>
                            <div className='pd-30-20'>
                                <div className="d-flex line-input">
                                    <div className="mlr-50 input-alone">
                                        <label className="d-block title-create-tour">{languageList.txtName}<span className="requird-star">*</span></label>
                                        <input onFocus={(e) => handleFocus(e.target)}
                                            onBlur={(e) => handleBlur(e.target)}
                                            onChange={(e) => handleInputScheduleName(e.target.value, 0)}
                                            value={tourSchedule[0].name} disabled={isDisabled}
                                            className="input-inline " type='text' />
                                    </div>
                                </div>
                                <div className="d-flex line-input mb-20">
                                    <div className="mlr-50 input-alone">
                                        <label className="d-block title-create-tour">{languageList.txtContent}<span className="requird-star">*</span></label>
                                        <ReactQuill defaultValue={tourSchedule[0].content}
                                            onChange={(value) => handleInputContent(value, 0)}
                                            readOnly={isDisabled}
                                            className="input-inline border-none quill-create-tour"
                                            theme="snow" modules={modules} formats={formats} />
                                    </div>
                                </div>
                                <div className="d-flex line-input">
                                    <div className="mlr-50 input-alone">
                                        <label className="d-block title-create-tour">{languageList.txtDestination}<span className="requird-star">*</span></label>
                                        <select className="input-inline" disabled={isDisabled}
                                            onFocus={(e) => handleFocus(e.target)}
                                            onBlur={(e) => handleBlur(e.target)}
                                            onChange={(e) => handleInputDestination(e.target.value, 0)}>
                                            {City.map(city => (
                                                <option value={city.name} selected={tourSchedule[0].toPlace === city.name}>{city.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="d-flex line-input mb-25">
                                    <div className="mlr-50 input-alone">
                                        <label className="d-block title-create-tour">{languageList.txtRecommendedAccommodation}<span className="requird-star">*</span></label>
                                        <Select onFocus={(e) => handleFocus(e.target)}
                                            onBlur={(e) => handleBlur(e.target)}
                                            isSearchable={true}
                                            placeholder=''
                                            onChange={(value) => handleSelectRecommendAccommodation(value, 0)}
                                            isMulti
                                            options={tourSchedule[0].getAccommodation}
                                            value={tourSchedule[0].indexAccommodation.map(i => tourSchedule[0].getAccommodation[parseInt(i)])}
                                            isDisabled={isDisabled} />
                                    </div>
                                </div>
                                <div className="d-flex line-input mb-25">
                                    <div className="mlr-50 input-alone">
                                        <label className="d-block title-create-tour">{languageList.txtRecommendedEntertainment}<span className="requird-star">*</span></label>
                                        <Select onFocus={(e) => handleFocus(e.target)}
                                            onBlur={(e) => handleBlur(e.target)}
                                            isSearchable={true}
                                            placeholder=''
                                            onChange={(value) => handleSelectRecommendEntertainment(value, 0)}
                                            isMulti
                                            options={tourSchedule[0].getEntertainment}
                                            value={tourSchedule[0].indexEntertainment.map(i => tourSchedule[0].getEntertainment[parseInt(i)])}
                                            isDisabled={isDisabled} />
                                    </div>
                                </div>
                                <div className="d-flex line-input mb-25">
                                    <div className="mlr-50 input-alone">
                                        <label className="d-block title-create-tour">{languageList.txtRecommendedRestaurants}<span className="requird-star">*</span></label>
                                        <Select onFocus={(e) => handleFocus(e.target)}
                                            onBlur={(e) => handleBlur(e.target)}
                                            isSearchable={true}
                                            onChange={(value) => handleSelectRecommendRestaurants(value, 0)}
                                            isMulti
                                            options={tourSchedule[0].getRestaurants}
                                            placeholder=''
                                            value={tourSchedule[0].indexRestaurants.map(i => tourSchedule[0].getRestaurants[parseInt(i)])}
                                            isDisabled={isDisabled} />
                                    </div>
                                </div>
                            </div>
                            {tourSchedule[0].show &&
                                <div onClick={() => handleClickShowHide(0)} className='space-icon-show-container btn-show-hide-overflow'><BsChevronUp className='icon-show-container' /></div>
                            }
                        </div>
                    }
                </div>
            }
        </div>
    )
}

export default memo(TourSchedule)