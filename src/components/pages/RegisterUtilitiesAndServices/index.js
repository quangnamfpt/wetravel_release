import { memo } from 'react'
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import Entertainment from '../../images/movies.png'
import { BsArrowRight } from 'react-icons/bs'
import Cart from '../../images/cart.png'
import Bell from '../../images/hotel-bell.png';
import Spa from '../../images/spa.png'
import Restaurant from '../../images/restaurant.png'
import PlayTime from '../../images/playtime.png'
import Business from '../../images/briefcase.png'
import Car from '../../images/car.png'
import Storehouse from '../../images/storehouse.png'
import Wifi from '../../images/wifi-signal.png'
import {
    englishUtilitiesAndServicesPlaceholder, englishUtilitiesAndServicesDetail,
    vietnameseUtilitiesAndServicesPlaceholder, vietnameseUtilitiesAndServicesDetail,
    englishSaveAndNext, vietnameseSaveAndNext
} from '../../Languages/UtilitiesAndServices';

import './RegisterUtilitiesAndServices.scss'

function RegisterUtilitiesAndServices({ languageSelected, serviceData, setServiceData, handleClickSaveAndNext }) {
    const animatedComponents = makeAnimated();

    const languageListUtilitiesAndServicesDetail = languageSelected === 'EN' ? englishUtilitiesAndServicesDetail : vietnameseUtilitiesAndServicesDetail
    const languageListUtilitiesAndServicesPlaceholder = languageSelected === 'EN' ? englishUtilitiesAndServicesPlaceholder : vietnameseUtilitiesAndServicesPlaceholder
    const languageSaveAndNext = languageSelected === 'EN' ? englishSaveAndNext : vietnameseSaveAndNext

    const handleSelectInternet = (value) => {
        let newData = []
        for (let i = 0; i < value.length; i++) {
            newData.push(
                {
                    utilitiesSubcategoryId: value[i].value,
                    utilitiesCategoryId: 1
                })
        }
        setServiceData({ ...serviceData, utilitiesInternet: newData })
    }

    const handleSelectFacilities = (value) => {
        let newData = []
        for (let i = 0; i < value.length; i++) {
            newData.push(
                {
                    utilitiesSubcategoryId: value[i].value,
                    utilitiesCategoryId: 2
                })
        }
        setServiceData({ ...serviceData, utilitiesFacilities: newData })
    }

    const handleSelectAccomodationService = (value) => {
        let newData = []
        for (let i = 0; i < value.length; i++) {
            newData.push(
                {
                    utilitiesSubcategoryId: value[i].value,
                    utilitiesCategoryId: 3
                })
        }
        setServiceData({ ...serviceData, utilitiesAccomodationService: newData })
    }

    const handleSelectBeautyRelaxation = (value) => {
        let newData = []
        for (let i = 0; i < value.length; i++) {
            newData.push(
                {
                    utilitiesSubcategoryId: value[i].value,
                    utilitiesCategoryId: 4
                })
        }
        setServiceData({ ...serviceData, utilitiesBeautyRelaxation: newData })
    }
    const handleSelectFoodService = (value) => {
        let newData = []
        for (let i = 0; i < value.length; i++) {
            newData.push(
                {
                    utilitiesSubcategoryId: value[i].value,
                    utilitiesCategoryId: 5
                })
        }
        setServiceData({ ...serviceData, utilitiesFoodService: newData })
    }
    const handleSelectEntertainment = (value) => {
        let newData = []
        for (let i = 0; i < value.length; i++) {
            newData.push(
                {
                    utilitiesSubcategoryId: value[i].value,
                    utilitiesCategoryId: 6
                })
        }
        setServiceData({ ...serviceData, utilitiesEntertainment: newData })
    }
    const handleSelectChildrenService = (value) => {
        let newData = []
        for (let i = 0; i < value.length; i++) {
            newData.push(
                {
                    utilitiesSubcategoryId: value[i].value,
                    utilitiesCategoryId: 7
                })
        }
        setServiceData({ ...serviceData, utilitiesChildrenService: newData })
    }
    const handleSelectShopping = (value) => {
        let newData = []
        for (let i = 0; i < value.length; i++) {
            newData.push(
                {
                    utilitiesSubcategoryId: value[i].value,
                    utilitiesCategoryId: 8
                })
        }
        setServiceData({ ...serviceData, utilitiesShopping: newData })
    }
    const handleSelectBusinessService = (value) => {
        let newData = []
        for (let i = 0; i < value.length; i++) {
            newData.push(
                {
                    utilitiesSubcategoryId: value[i].value,
                    utilitiesCategoryId: 9
                })
        }
        setServiceData({ ...serviceData, utilitiesBusinessService: newData })
    }
    const handleSelectVehicle = (value) => {
        let newData = []
        for (let i = 0; i < value.length; i++) {
            newData.push(
                {
                    utilitiesSubcategoryId: value[i].value,
                    utilitiesCategoryId: 10
                })
        }
        setServiceData({ ...serviceData, utilitiesVehicle: newData })
    }

    return (
        <div className='container'>
            <div className='space-30 background-w'>
                <div className="d-flex line-input line-input-3-line align-up">
                    <div className='w-45 d-flex box-select-utilities'>
                        <img src={Wifi} className='icon-image icon-select' />
                        <Select className='input-inline basic-multi-select'
                            placeholder={languageListUtilitiesAndServicesPlaceholder[0]}
                            isMulti
                            hideSelectedOptions={false}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            classNamePrefix="select"
                            onChange={handleSelectInternet}
                            options={languageListUtilitiesAndServicesDetail[0]}
                            defaultValue={serviceData.utilitiesInternet.map((value) => languageListUtilitiesAndServicesDetail[0][value.utilitiesSubcategoryId - 1])}
                        />
                    </div>
                    <div className='w-45 d-flex box-select-utilities'>
                        <img src={Storehouse} className='icon-image icon-select' />
                        <Select className='input-inline basic-multi-select'
                            placeholder={languageListUtilitiesAndServicesPlaceholder[1]}
                            isMulti
                            hideSelectedOptions={false}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            classNamePrefix="select"
                            onChange={handleSelectFacilities}
                            options={languageListUtilitiesAndServicesDetail[1]}
                            defaultValue={serviceData.utilitiesFacilities.map((value) => languageListUtilitiesAndServicesDetail[1][value.utilitiesSubcategoryId - 4])}
                        />
                    </div>
                </div>
                <div className="d-flex line-input line-input-3-line align-up">
                    <div className='w-45 d-flex box-select-utilities'>
                        <img src={Bell} className='icon-image icon-select' />
                        <Select className='input-inline basic-multi-select'
                            placeholder={languageListUtilitiesAndServicesPlaceholder[2]}
                            isMulti
                            hideSelectedOptions={false}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            classNamePrefix="select"
                            onChange={handleSelectAccomodationService}
                            options={languageListUtilitiesAndServicesDetail[2]}
                            defaultValue={serviceData.utilitiesAccomodationService.map((value) => languageListUtilitiesAndServicesDetail[2][value.utilitiesSubcategoryId - 9])}
                        />
                    </div>
                    <div className='w-45 d-flex box-select-utilities'>
                        <img src={Spa} className='icon-image icon-select' />
                        <Select className='input-inline basic-multi-select'
                            placeholder={languageListUtilitiesAndServicesPlaceholder[3]}
                            isMulti
                            hideSelectedOptions={false}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            classNamePrefix="select"
                            onChange={handleSelectBeautyRelaxation}
                            options={languageListUtilitiesAndServicesDetail[3]}
                            defaultValue={serviceData.utilitiesBeautyRelaxation.map((value) => languageListUtilitiesAndServicesDetail[3][value.utilitiesSubcategoryId - 14])}
                        />
                    </div>
                </div><div className="d-flex line-input line-input-3-line align-up">
                    <div className='w-45 d-flex box-select-utilities'>
                        <img src={Restaurant} className='icon-image icon-select' />
                        <Select className='input-inline basic-multi-select'
                            placeholder={languageListUtilitiesAndServicesPlaceholder[4]}
                            isMulti
                            hideSelectedOptions={false}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            classNamePrefix="select"
                            onChange={handleSelectFoodService}
                            options={languageListUtilitiesAndServicesDetail[4]}
                            defaultValue={serviceData.utilitiesFoodService.map((value) => languageListUtilitiesAndServicesDetail[4][value.utilitiesSubcategoryId - 18])}
                        />
                    </div>
                    <div className='w-45 d-flex box-select-utilities'>
                        <img src={Entertainment} className='icon-image icon-select' />
                        <Select className='input-inline basic-multi-select'
                            placeholder={languageListUtilitiesAndServicesPlaceholder[5]}
                            isMulti
                            hideSelectedOptions={false}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            classNamePrefix="select"
                            onChange={handleSelectEntertainment}
                            options={languageListUtilitiesAndServicesDetail[5]}
                            defaultValue={serviceData.utilitiesEntertainment.map((value) => languageListUtilitiesAndServicesDetail[5][value.utilitiesSubcategoryId - 26])}
                        />
                    </div>
                </div><div className="d-flex line-input line-input-3-line align-up">
                    <div className='w-45 d-flex box-select-utilities'>
                        <img src={PlayTime} className='icon-image icon-select' />
                        <Select className='input-inline basic-multi-select'
                            placeholder={languageListUtilitiesAndServicesPlaceholder[6]}
                            isMulti
                            hideSelectedOptions={false}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            classNamePrefix="select"
                            onChange={handleSelectChildrenService}
                            options={languageListUtilitiesAndServicesDetail[6]}
                            defaultValue={serviceData.utilitiesChildrenService.map((value) => languageListUtilitiesAndServicesDetail[6][value.utilitiesSubcategoryId - 32])}
                        />
                    </div>
                    <div className='w-45 d-flex box-select-utilities'>
                        <img src={Cart} className='icon-image icon-select' />
                        <Select id='Internet' className='input-inline basic-multi-select'
                            placeholder={languageListUtilitiesAndServicesPlaceholder[7]}
                            isMulti
                            hideSelectedOptions={false}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            classNamePrefix="select"
                            onChange={handleSelectShopping}
                            options={languageListUtilitiesAndServicesDetail[7]}
                            defaultValue={serviceData.utilitiesShopping.map((value) => languageListUtilitiesAndServicesDetail[7][value.utilitiesSubcategoryId - 35])}
                        />
                    </div>
                </div><div className="d-flex line-input line-input-3-line align-up">
                    <div className='w-45 d-flex box-select-utilities'>
                        <img src={Business} className='icon-image icon-select' />
                        <Select id='Internet' className='input-inline basic-multi-select'
                            placeholder={languageListUtilitiesAndServicesPlaceholder[8]}
                            isMulti
                            hideSelectedOptions={false}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            classNamePrefix="select"
                            onChange={handleSelectBusinessService}
                            options={languageListUtilitiesAndServicesDetail[8]}
                            defaultValue={serviceData.utilitiesBusinessService.map((value) => languageListUtilitiesAndServicesDetail[8][value.utilitiesSubcategoryId - 39])}
                        />
                    </div>
                    <div className='w-45 d-flex box-select-utilities'>
                        <img src={Car} className='icon-image icon-select' />
                        <Select id='Internet' className='input-inline basic-multi-select'
                            placeholder={languageListUtilitiesAndServicesPlaceholder[9]}
                            isMulti
                            hideSelectedOptions={false}
                            closeMenuOnSelect={false}
                            components={animatedComponents}
                            classNamePrefix="select"
                            onChange={handleSelectVehicle}
                            options={languageListUtilitiesAndServicesDetail[9]}
                            defaultValue={serviceData.utilitiesVehicle.map((value) => languageListUtilitiesAndServicesDetail[9][value.utilitiesSubcategoryId - 44])}
                        />
                    </div>
                </div>
            </div>
            <button onClick={handleClickSaveAndNext} className='btn btn-primary btn-submit'>{`${languageSaveAndNext} `} <BsArrowRight /></button>
        </div>
    )
}

export default memo(RegisterUtilitiesAndServices)