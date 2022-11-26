import { memo, useState, useEffect } from 'react'
import { english, vietnamese } from '../../Languages/TourSchedule'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './TourSchedule.scss'
import Select from 'react-select';
import { BsChevronUp, BsChevronDown } from 'react-icons/bs'


function TourSchedule({ languageSelected, tour, tourSchedule, setTourSchedule, serviceList, isDisabled }) {
    const languageList = (languageSelected === 'EN' ? english : vietnamese)

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
        console.log('schedule: ', value)
        let newDataForm = [...tourSchedule]
        newDataForm[index].content = value
        setTourSchedule(newDataForm)
    })

    const handleInputDestination = ((value, index) => {
        let newDataForm = [...tourSchedule]
        newDataForm[index].toPlace = value
        setTourSchedule(newDataForm)
    })

    const handleClickShowHide = ((index) => {
        let newDataForm = [...tourSchedule]
        newDataForm[index].show = !newDataForm[index].show
        setTourSchedule(newDataForm)
    })

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
                                            <input onFocus={(e) => handleFocus(e.target)}
                                                onBlur={(e) => handleBlur(e.target)}
                                                onChange={(e) => handleInputDestination(e.target.value, index)}
                                                value={item.toPlace} disabled={isDisabled}
                                                className="input-inline" type='text' />
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
                                        <input onFocus={(e) => handleFocus(e.target)}
                                            onBlur={(e) => handleBlur(e.target)}
                                            onChange={(e) => handleInputDestination(e.target.value, 0)}
                                            value={tourSchedule[0].toPlace} disabled={isDisabled}
                                            className="input-inline" type='text' />
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