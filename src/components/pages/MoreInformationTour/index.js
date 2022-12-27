import { memo, useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './MoreInformationTour.scss'
import { english, vietnamese } from '../../Languages/MoreInformationTour'
import { english as englishTag, vietnamese as vietnameseTag } from '../../Languages/TourTag'
import { BsTrash } from 'react-icons/bs'
import { TbCameraPlus } from 'react-icons/tb'
import ReactQuill from 'react-quill'
import Select from 'react-select';
import 'react-quill/dist/quill.bubble.css'
import GoogleMapLayout from '../../Layout/GoogleMapLayout'
import { API_POST_CREATE_TOUR } from "../../API"
import axios from 'axios'
import LoadingDialog from '../../Layout/LoadingDialog'
import { toast } from 'react-toastify'
import { UploadImage } from '../../../firebase/UploadImage'

function MoreInformationTour({ languageSelected, tour, setTour, tourSchedule, isDisabled }) {
    const languageList = (languageSelected === 'EN' ? english : vietnamese)
    const tagList = (languageSelected === 'EN' ? englishTag : vietnameseTag)
    const navigate = useNavigate()

    const [showLoading, setShowLoading] = useState(false)

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

    const handleBlur = (input) => {
        input.style.border = 'solid 1px #D9D9D9'
    }

    const handleFocus = (input) => {
        input.style.border = 'solid 1px #4874E8'
    }

    const handleAddImage = ((value) => {
        let files = [...tour.images];
        for (let i = 0; i < value.length; i++) {
            files.push(value[i])
        }
        setTour({ ...tour, images: files });
    })

    const handleDeleteImage = ((index) => {
        let files = [];
        for (let i = 0; i < tour.images.length; i++) {
            if (i !== index) {
                files.push(tour.images[i])
            }
        }
        setTour({ ...tour, images: files });
    })

    const styleMap = {
        width: '100%',
        height: '300px'
    }

    const handleSelectTag = (value) => {
        let tags = []
        for (let i = 0; i < value.length; i++) {
            tags.push(value[i].value)
        }
        setTour({ ...tour, tag: tags })
    }

    const count = useRef(-1)
    const [leng, setLeng] = useState(0)
    useEffect(() => {
        if (leng === count.current) {
            count.current = -1;
            setLeng(0)
            setShowLoading(false)
            toast.success(languageList.txtAddSuccess)
            navigate('/admin/services/tour-product')
        }
    }, [leng])

    const checkTourSchedule = () => {
        if (tour.mode == 1 && tourSchedule.length != tour.numberOfDay) {
            return false
        } else {
            tourSchedule.forEach(element => {
                if (element.name === '' || element.content === '' || element.content === '<p><br></p>' || element.toPlace === '') {
                    return false
                }
            });
        }
        return true
    }

    const handleClickCreateTour = () => {
        if (tour.code === '' || tour.name === '' || (tour.mode == 0 && (tour.startTime === '' || tour.endTime === ''))
            || tour.introduce === '' || tour.introduce === '<p><br></p>' || tour.addressStart === '' || !checkTourSchedule
            || tour.images.length === 0) {
            setShowLoading(false)
            toast.warning(languageList.txtNotFullInformation)
        }
        else if (parseInt(tour.priceAdult) < 1000 || parseInt(tour.priceChildren) < 1000) {
            setShowLoading(false)
            toast.warning(languageList.txtInvalid)
        }
        else {
            const tourData = {
                "tourName": tour.name,
                "tourCode": tour.code,
                "startPlace": tour.startPlace,
                "endPlace": tour.endPlace,
                "status": tour.status,
                "tourType": 1,
                "startDate": tour.type != 1 ? tour.startDate : '',
                "tourMode": tour.mode,
                "numberOfDay": tour.numberOfDay,
                "numberOfNight": tour.numberOfNight,
                "minAdult": tour.minAdult,
                "maxAdult": tour.maxAdult,
                "minChildren": tour.minChildren,
                "maxChildren": tour.maxChildren,
                "minToStart": tour.minToActive,
                "maxToStart": tour.maxToActive,
                "startTime": tour.startTime,
                "endTime": tour.endTime,
                "priceAdult": tour.adultPrice,
                "priceChildren": tour.childrenPrice,
                "totalPrice": tour.totalPrice,
                "deposit": tour.deposit,
                "note": "note",
                "tourCategoryId": tour.category,
                "tourDetailDTO":
                {
                    "tourIntroduce": tour.introduce,
                    "tourInclude": tour.include,
                    "tourNonInclude": tour.nonInclude,
                    "generalTerms": tour.generalTerms,
                    "addressStart": tour.addressStart,
                    "description": tour.description,
                    "moreDescription": tour.moreDescription,
                    "priceAdult": tour.adultPrice,
                    "priceChildren": tour.childrenPrice,
                    "longitude": tour.longitude,
                    "latitude": tour.latitude,
                    "tagOfTourDTOList":
                        [...tour.tag].map((tagItem) => (
                            {
                                "tagId": tagItem
                            }
                        )
                        )
                },
                "tourScheduleDTOList": tour.mode == 1 ?
                    [...tourSchedule].map((tourScheduleItem) => (
                        {
                            "tourScheduleName": tourScheduleItem.name,
                            "content": tourScheduleItem.content,
                            "toPlace": tourScheduleItem.toPlace,
                            "accommodationService": tourScheduleItem.recommendAccommodation.join(' '),
                            "restaurantService": tourScheduleItem.recommendRestaurants.join(' '),
                            "entertainmentService": tourScheduleItem.recommendEntertainment.join(' ')
                        }
                    )
                    ) : [{
                        "tourScheduleName": [...tourSchedule][0].name,
                        "content": [...tourSchedule][0].content,
                        "toPlace": [...tourSchedule][0].toPlace,
                        "accommodationService": [...tourSchedule][0].recommendAccommodation.join(' '),
                        "restaurantService": [...tourSchedule][0].recommendRestaurants.join(' '),
                        "entertainmentService": [...tourSchedule][0].recommendEntertainment.join(' ')
                    }]
            }
            setShowLoading(true)
            count.current = tour.images.length
            axios.post(API_POST_CREATE_TOUR, tourData)
                .then((res) => {
                    UploadImage(tour.images, 'tour', count, setLeng, res.data.data.tourId, 'information', 0, 'images')
                })
                .catch((e) => {

                })
        }
    }

    useEffect(() => {
        if (!parseInt(tour.adultPrice)) {
            setTour({ ...tour, adultPrice: 1000 })
        }
    }, [tour.adultPrice])

    useEffect(() => {
        if (!parseInt(tour.childrenPrice)) {
            setTour({ ...tour, childrenPrice: 1000 })
        }
    }, [tour.childrenPrice])

    useEffect(() => {
        if (!parseInt(tour.totalPrice)) {
            setTour({ ...tour, totalPrice: 1000 })
        }
    }, [tour.totalPrice])

    useEffect(() => {
        if (!parseInt(tour.deposit)) {
            setTour({ ...tour, deposit: 1000 })
        }
    }, [tour.deposit])

    return (
        <div>
            {showLoading && <LoadingDialog />}
            <div className='d-flex bg-none'>
                <div className='w-55 mr-10'>
                    <div className='item-lr'>
                        <div className="d-flex line-input mt-20">
                            <div className="mlr-50 input-alone">
                                <label className="d-block title-create-tour">{languageList.txtIntroduct}<span className="requird-star">*</span></label>
                                <ReactQuill
                                    defaultValue={tour.introduce}
                                    onChange={(value) => setTour({ ...tour, introduce: value })}
                                    className="input-inline border-none quill-create-tour"
                                    readOnly={isDisabled}
                                    theme="snow" modules={modules} formats={formats} />
                            </div>
                        </div>
                        <div className="d-flex line-input mt-20">
                            <div className="mlr-50 input-alone">
                                <label className="d-block title-create-tour">{languageList.txtInclude}</label>
                                <ReactQuill
                                    defaultValue={tour.include}
                                    onChange={(value) => setTour({ ...tour, include: value })}
                                    className="input-inline border-none quill-create-tour"
                                    readOnly={isDisabled}
                                    theme="snow" modules={modules} formats={formats} />
                            </div>
                        </div>
                        <div className="d-flex line-input mt-20">
                            <div className="mlr-50 input-alone">
                                <label className="d-block title-create-tour">{languageList.txtNonInclude}</label>
                                <ReactQuill
                                    defaultValue={tour.nonInclude}
                                    onChange={(value) => setTour({ ...tour, nonInclude: value })}
                                    className="input-inline border-none quill-create-tour"
                                    readOnly={isDisabled}
                                    theme="snow" modules={modules} formats={formats} />
                            </div>
                        </div>
                        <div className="d-flex line-input mt-20">
                            <div className="mlr-50 input-alone">
                                <label className="d-block title-create-tour">{languageList.txtGeneralTerms}</label>
                                <ReactQuill
                                    defaultValue={tour.generalTerms}
                                    onChange={(value) => setTour({ ...tour, generalTerms: value })}
                                    className="input-inline border-none quill-create-tour"
                                    readOnly={isDisabled}
                                    theme="snow" modules={modules} formats={formats} />
                            </div>
                        </div>
                        <div className="d-flex line-input mt-20">
                            <div className="mlr-50 input-alone">
                                <label className="d-block title-create-tour">{languageList.txtMoreDescription}</label>
                                <ReactQuill
                                    defaultValue={tour.moreDescription}
                                    onChange={(value) => setTour({ ...tour, moreDescription: value })}
                                    className="input-inline border-none quill-create-tour"
                                    readOnly={isDisabled}
                                    theme="snow" modules={modules} formats={formats} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-45 ml-10'>
                    <div className='item-lr'>
                        <div className="d-flex line-input mt-20">
                            <div className="mlr-50 input-alone">
                                <label className="d-block title-create-tour">{languageList.txtTag}</label>
                                <Select className='input-inline basic-multi-select'
                                    onFocus={(e) => handleFocus(e.target)}
                                    onBlur={(e) => handleBlur(e.target)}
                                    onChange={handleSelectTag}
                                    defaultValue={tour.tag.map((item) => tagList[item - 1])}
                                    isMulti
                                    isDisabled={isDisabled}
                                    options={tagList}
                                    hideSelectedOptions={false}
                                    closeMenuOnSelect={false}
                                    classNamePrefix="select"
                                    placeholder=""
                                />
                            </div>
                        </div>
                        {tour.type == 1 ?
                            <>
                                <div className="d-flex line-input">
                                    <div className="mlr-50 input-alone">
                                        <label className="d-block title-create-tour">{languageList.txtAdultPrice}<span className="requird-star">*</span></label>
                                        <input type='number'
                                            value={tour.adultPrice}
                                            disabled={isDisabled}
                                            onChange={(e) => setTour({ ...tour, adultPrice: e.target.value })}
                                            onFocus={(e) => handleFocus(e.target)}
                                            onBlur={(e) => handleBlur(e.target)}
                                            min={1000}
                                            className="input-inline" />
                                    </div>
                                </div>
                                <div className="d-flex line-input">
                                    <div className="mlr-50 input-alone">
                                        <label className="d-block title-create-tour">{languageList.txtChildrenPrice}<span className="requird-star">*</span></label>
                                        <input type='number'
                                            value={tour.childrenPrice} disabled={isDisabled}
                                            onChange={(e) => setTour({ ...tour, childrenPrice: e.target.value })}
                                            onFocus={(e) => handleFocus(e.target)}
                                            onBlur={(e) => handleBlur(e.target)}
                                            min={1000}
                                            className="input-inline" />
                                    </div>
                                </div>
                            </>
                            :
                            <div className="d-flex line-input">
                                <div className="mlr-50 input-alone">
                                    <label className="d-block title-create-tour">{languageList.txtTotalPrice}<span className="requird-star">*</span></label>
                                    <input type='number'
                                        value={tour.totalPrice} disabled={isDisabled}
                                        onChange={(e) => setTour({ ...tour, totalPrice: e.target.value })}
                                        onFocus={(e) => handleFocus(e.target)}
                                        onBlur={(e) => handleBlur(e.target)}
                                        min={1000}
                                        className="input-inline" />
                                </div>
                            </div>
                        }
                        {tour.type == 2 &&
                            <div className="d-flex line-input">
                                <div className="mlr-50 input-alone">
                                    <label className="d-block title-create-tour">{languageList.txtDeposit}<span className="requird-star">*</span></label>
                                    <input type='number'
                                        value={tour.deposit} disabled={isDisabled}
                                        onChange={(e) => setTour({ ...tour, deposit: e.target.value })}
                                        onFocus={(e) => handleFocus(e.target)}
                                        onBlur={(e) => handleBlur(e.target)}
                                        min={1000}
                                        className="input-inline" />
                                </div>
                            </div>}
                    </div>
                    <div className='mt-20 item-lr p-lr-10'>
                        <label className='title mb-10'>{languageList.txtShuttleAndLocationInformation}</label>
                        <div className="d-flex line-input">
                            <div className="mlr-50 ">
                                <label className="d-block title-create-tour">{languageList.txtCity}</label>
                                <input value={tour.startPlace}
                                    onFocus={(e) => handleFocus(e.target)}
                                    onBlur={(e) => handleBlur(e.target)}
                                    className="input-inline" type='text' disabled />
                            </div>
                            <div className="mlr-50">
                                <label className="d-block title-create-tour">{languageList.txtAddress}<span className="requird-star">*</span></label>
                                <input
                                    onFocus={(e) => handleFocus(e.target)}
                                    onBlur={(e) => handleBlur(e.target)}
                                    value={tour.addressStart} disabled={isDisabled}
                                    onChange={(e) => setTour({ ...tour, addressStart: e.target.value })}
                                    className="input-inline" type='text' />
                            </div>
                        </div>
                    </div>
                    <div className='item-lr mt-20'>
                        <GoogleMapLayout languageSelected={languageSelected} style={styleMap} tour={tour} setTour={setTour} hadOnclick={!isDisabled} hadSearch />
                        <div className="d-flex line-input mt-20">
                            <div className="mlr-50 ">
                                <label className="d-block title-create-tour">{languageList.txtLongitude}</label>
                                <input
                                    value={tour.longitude}
                                    className="input-inline mb-10" disabled />
                            </div>
                            <div className="mlr-50">
                                <label className="d-block title-create-tour">{languageList.txtLatitude}</label>
                                <input
                                    disabled
                                    value={tour.latitude}
                                    className="input-inline mb-10" />
                            </div>
                        </div>
                    </div>
                    <div className='mt-20 item-lr p-lr-10'>
                        <label className='title mb-10'>{languageList.txtImage}<span className="requird-star">*</span></label>
                        <div className='grid-image-tour'>
                            {tour.images.map((image, index) => (
                                <div className="image-selected p-lr-20" onClick={() => handleDeleteImage(index)}>
                                    {!isDisabled && <div className='layer-delete'>
                                        <div className='check-delete-image' />
                                        <BsTrash className='image-trash' />
                                    </div>
                                    }
                                    <img className="image-selected image-tour" src={URL.createObjectURL(image)} />
                                </div>
                            ))}
                            {tour.images.length < 12 && !isDisabled &&
                                <label htmlFor='images' className='add-image-button p-lr-20'>
                                    <div className="select-image-service select-image-tour" >
                                        <TbCameraPlus className='icon-camera-plus' />
                                        <div className='text-camera-plus d-block'>{languageList.txtAddImage}</div>
                                    </div>
                                    <input onChange={(e) => handleAddImage(e.target.files)} type="file" id='images' accept="image/*" className='select-image-hide' multiple />
                                </label>
                            }
                        </div>
                    </div>
                    {(tour.type == 1 && window.location.pathname !== '/admin/view-detail-tour' && window.location.pathname !== '/admin/edit-tour') &&
                        <div className="d-flex line-input">
                            <div className="input-alone">
                                <div onClick={handleClickCreateTour} className='input-inline btn-create-tour'>{languageList.txtCreateTour}</div>
                            </div>
                        </div>
                    }
                </div>
            </div>

        </div>
    )
}

export default memo(MoreInformationTour)