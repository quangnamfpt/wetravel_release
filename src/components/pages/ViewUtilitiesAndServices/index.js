import { memo, useContext } from 'react'
import Select from 'react-select';
import Entertainment from '../../images/movies.png'
import Cart from '../../images/cart.png'
import Bell from '../../images/hotel-bell.png';
import Spa from '../../images/spa.png'
import Restaurant from '../../images/restaurant.png'
import PlayTime from '../../images/playtime.png'
import Business from '../../images/briefcase.png'
import Car from '../../images/car.png'
import Storehouse from '../../images/storehouse.png'
import Wifi from '../../images/wifi-signal.png'
import { englishUtilitiesAndServicesPlaceholder, englishUtilitiesAndServicesDetail, vietnameseUtilitiesAndServicesPlaceholder, vietnameseUtilitiesAndServicesDetail } from '../../Languages/UtilitiesAndServices';
import { CommonDataForAllViewService } from '../ViewInformationDetailService';

function ViewUtilitiesAndServices({ languageSelected }) {
    const service = useContext(CommonDataForAllViewService)

    let languageListUtilitiesAndServicesDetail = (languageSelected === 'EN' ? englishUtilitiesAndServicesDetail : vietnameseUtilitiesAndServicesDetail)
    let languageListUtilitiesAndServicesPlaceholder = (languageSelected === 'EN' ? englishUtilitiesAndServicesPlaceholder : vietnameseUtilitiesAndServicesPlaceholder)

    return (
        <div>
            <div className="d-flex line-input line-input-3-line align-up">
                <div className='w-45 d-flex box-select-utilities'>
                    <img src={Wifi} className='icon-image icon-select' />
                    <Select className='input-inline basic-multi-select'
                        placeholder={languageListUtilitiesAndServicesPlaceholder[0]}
                        isMulti
                        isDisabled
                        classNamePrefix="select"
                        options={languageListUtilitiesAndServicesDetail[0]}
                        defaultValue={service.utilitiesInternet.map((value) => languageListUtilitiesAndServicesDetail[0][value.utilitiesSubcategoryId - 1])}
                    />
                </div>
                <div className='w-45 d-flex box-select-utilities'>
                    <img src={Storehouse} className='icon-image icon-select' />
                    <Select className='input-inline basic-multi-select'
                        placeholder={languageListUtilitiesAndServicesPlaceholder[1]}
                        isMulti
                        isDisabled
                        classNamePrefix="select"
                        options={languageListUtilitiesAndServicesDetail[1]}
                        defaultValue={service.utilitiesFacilities.map((value) => languageListUtilitiesAndServicesDetail[1][value.utilitiesSubcategoryId - 4])}
                    />
                </div>
            </div>
            <div className="d-flex line-input line-input-3-line align-up">
                <div className='w-45 d-flex box-select-utilities'>
                    <img src={Bell} className='icon-image icon-select' />
                    <Select className='input-inline basic-multi-select'
                        placeholder={languageListUtilitiesAndServicesPlaceholder[2]}
                        isMulti
                        isDisabled
                        classNamePrefix="select"
                        options={languageListUtilitiesAndServicesDetail[2]}
                        defaultValue={service.utilitiesAccomodationService.map((value) => languageListUtilitiesAndServicesDetail[2][value.utilitiesSubcategoryId - 9])}
                    />
                </div>
                <div className='w-45 d-flex box-select-utilities'>
                    <img src={Spa} className='icon-image icon-select' />
                    <Select className='input-inline basic-multi-select'
                        placeholder={languageListUtilitiesAndServicesPlaceholder[3]}
                        isMulti
                        isDisabled
                        classNamePrefix="select"
                        options={languageListUtilitiesAndServicesDetail[3]}
                        defaultValue={service.utilitiesBeautyRelaxation.map((value) => languageListUtilitiesAndServicesDetail[3][value.utilitiesSubcategoryId - 14])}
                    />
                </div>
            </div><div className="d-flex line-input line-input-3-line align-up">
                <div className='w-45 d-flex box-select-utilities'>
                    <img src={Restaurant} className='icon-image icon-select' />
                    <Select className='input-inline basic-multi-select'
                        placeholder={languageListUtilitiesAndServicesPlaceholder[4]}
                        isMulti
                        isDisabled
                        classNamePrefix="select"
                        options={languageListUtilitiesAndServicesDetail[4]}
                        defaultValue={service.utilitiesFoodService.map((value) => languageListUtilitiesAndServicesDetail[4][value.utilitiesSubcategoryId - 18])}
                    />
                </div>
                <div className='w-45 d-flex box-select-utilities'>
                    <img src={Entertainment} className='icon-image icon-select' />
                    <Select className='input-inline basic-multi-select'
                        placeholder={languageListUtilitiesAndServicesPlaceholder[5]}
                        isMulti
                        isDisabled
                        classNamePrefix="select"
                        options={languageListUtilitiesAndServicesDetail[5]}
                        defaultValue={service.utilitiesEntertainment.map((value) => languageListUtilitiesAndServicesDetail[5][value.utilitiesSubcategoryId - 26])}
                    />
                </div>
            </div><div className="d-flex line-input line-input-3-line align-up">
                <div className='w-45 d-flex box-select-utilities'>
                    <img src={PlayTime} className='icon-image icon-select' />
                    <Select className='input-inline basic-multi-select'
                        placeholder={languageListUtilitiesAndServicesPlaceholder[6]}
                        isMulti
                        isDisabled
                        classNamePrefix="select"
                        options={languageListUtilitiesAndServicesDetail[6]}
                        defaultValue={service.utilitiesChildrenService.map((value) => languageListUtilitiesAndServicesDetail[6][value.utilitiesSubcategoryId - 32])}
                    />
                </div>
                <div className='w-45 d-flex box-select-utilities'>
                    <img src={Cart} className='icon-image icon-select' />
                    <Select id='Internet' className='input-inline basic-multi-select'
                        placeholder={languageListUtilitiesAndServicesPlaceholder[7]}
                        isMulti
                        isDisabled
                        classNamePrefix="select"
                        options={languageListUtilitiesAndServicesDetail[7]}
                        defaultValue={service.utilitiesShopping.map((value) => languageListUtilitiesAndServicesDetail[7][value.utilitiesSubcategoryId - 35])}
                    />
                </div>
            </div><div className="d-flex line-input line-input-3-line align-up">
                <div className='w-45 d-flex box-select-utilities'>
                    <img src={Business} className='icon-image icon-select' />
                    <Select id='Internet' className='input-inline basic-multi-select'
                        placeholder={languageListUtilitiesAndServicesPlaceholder[8]}
                        isMulti
                        isDisabled
                        classNamePrefix="select"
                        options={languageListUtilitiesAndServicesDetail[8]}
                        defaultValue={service.utilitiesBusinessService.map((value) => languageListUtilitiesAndServicesDetail[8][value.utilitiesSubcategoryId - 39])}
                    />
                </div>
                <div className='w-45 d-flex box-select-utilities'>
                    <img src={Car} className='icon-image icon-select' />
                    <Select id='Internet' className='input-inline basic-multi-select'
                        placeholder={languageListUtilitiesAndServicesPlaceholder[9]}
                        isMulti
                        isDisabled
                        classNamePrefix="select"
                        options={languageListUtilitiesAndServicesDetail[9]}
                        defaultValue={service.utilitiesVehicle.map((value) => languageListUtilitiesAndServicesDetail[9][value.utilitiesSubcategoryId - 44])}
                    />
                </div>
            </div>
        </div>
    )
}

export default memo(ViewUtilitiesAndServices)