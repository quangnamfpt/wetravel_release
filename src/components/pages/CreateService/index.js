import { useState, memo, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import Carousel from 'react-multi-carousel';
import { english, vietnamese } from '../../Languages/CreateService';

import HotelLogo from '../../images/hotel.png'
import HotelLogoSelect from '../../images/hotel_select.png'
import AttractionLogo from '../../images/attractions.png'
import AttractionLogoSelect from '../../images/attractions_select.png'
import RestaurantsLogo from '../../images/restaurants.png'
import RestaurantsLogoSelect from '../../images/restaurants_select.png'
import Background from '../../images/background_partner.jpg'

import Hotel1 from '../../images/hotel (1).jpg'
import Hotel2 from '../../images/hotel (2).jpg'
import Hotel3 from '../../images/hotel (3).jpg'
import Hotel4 from '../../images/hotel (4).jpg'

import Attraction1 from '../../images/attractions (1).jpg'
import Attraction2 from '../../images/attractions (2).jpg'

import Transport1 from '../../images/transport (1).jpg'
import Transport2 from '../../images/transport (2).jpg'

import Restaurant1 from '../../images/restaurant (1).jpg'
import Restaurant2 from '../../images/restaurant (2).jpg'
import Restaurant3 from '../../images/restaurant (3).jpg'
import Restaurant4 from '../../images/restaurant (4).jpg'
import Restaurant5 from '../../images/restaurant (5).jpg'

import './CreateService.scss'

const responsive = {
    desktop: {
        breakpoint: { max: 1920, min: 1080 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};

function CreateService({ languageSelected }) {
    const [indexServiceSelected, setIndexServiceSelected] = useState(0)

    const languageDisplay = languageSelected === 'EN' ? english : vietnamese

    const commonService = [{
        logo: HotelLogo,
        logoSelected: HotelLogoSelect,
        name: languageDisplay.txtAccommodation
    },
    {
        logo: AttractionLogo,
        logoSelected: AttractionLogoSelect,
        name: languageDisplay.txtEntertainment
    },
    {
        logo: RestaurantsLogo,
        logoSelected: RestaurantsLogoSelect,
        name: languageDisplay.txtRestaurants
    }]

    const detailCategory = [
        {
            title: languageDisplay.txtTitleAccommodation,
            description: languageDisplay.txtDescriptionAccommodation,
            image: [Hotel1, Hotel2, Hotel3, Hotel4]
        },
        {
            title: languageDisplay.txtTitleEntertainment,
            description: languageDisplay.txtDescriptionEntertainment,
            image: [Attraction1, Attraction2]
        },
        {
            title: languageDisplay.txtTitleRestaurants,
            description: languageDisplay.txtDescriptionRestaurants,
            image: [Restaurant1, Restaurant2, Restaurant3, Restaurant4, Restaurant5]
        }
    ]

    const role = sessionStorage.getItem('role')

    const handleSelectAnService = (index) => {
        setIndexServiceSelected(index)
    }

    useEffect(() => {
        sessionStorage.setItem('index-service-selected', indexServiceSelected)
    }, [indexServiceSelected])

    return (
        <>
            {role == 2 ? <Navigate to='/error' /> :
                <div className='container home-main'>
                    <img src={Background} className='bg-image-partner-create-service' />
                    <div className='container select-service-category'>
                        {commonService.map((service, index) => (
                            <div className={`container item-service-category ${indexServiceSelected === index && 'item-service-category-select'}`}
                                onClick={() => handleSelectAnService(index)}>
                                <img src={indexServiceSelected === index ? service.logoSelected : service.logo} className='logo-service-category' />
                                <label className='name-service-category'>{service.name}</label>
                                {indexServiceSelected === index && <div className='line-category-select' />}
                            </div>
                        ))
                        }
                    </div>
                    <div className='container select-service-category information-service-category'>
                        <div className='common-description-service-category item-description-service-category'>
                            <div className='title-service-category'>{detailCategory[indexServiceSelected].title}</div>
                            <label className='description-service-category'>{detailCategory[indexServiceSelected].description}</label>
                            <Link to='/register-partner' className='btn btn-primary btn-register-service-category'>{languageDisplay.txtRegisterNow}</Link>
                        </div>
                        <Carousel
                            className='slider-description-service-category item-description-service-category'
                            swipeable={false}
                            autoPlay={true}
                            showDots={true}
                            draggable={false}
                            responsive={responsive}
                            ssr={true} // means to render carousel on server-side.
                            infinite={true}
                            containerClass="carousel-container"
                            removeArrowOnDeviceType={["tablet", "mobile"]}
                            dotListClass="custom-dot-list-style"
                            itemClass="carousel-item-padding-40-px">
                            {detailCategory[indexServiceSelected].image.map((item) => <img src={item} className='image-description-service-category' />)}
                        </Carousel>
                    </div>
                </div>
            }
        </>
    )
}

export default memo(CreateService)