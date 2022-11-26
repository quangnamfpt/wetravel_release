import { useState, memo, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Carousel from 'react-multi-carousel';

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

const commonService = [{
    logo: HotelLogo,
    logoSelected: HotelLogoSelect,
    name: 'Accommodation'
},
{
    logo: AttractionLogo,
    logoSelected: AttractionLogoSelect,
    name: 'Entertainment'
},
{
    logo: RestaurantsLogo,
    logoSelected: RestaurantsLogoSelect,
    name: 'Restaurants'
}]

const detailCategory = [
    {
        title: 'Registering your accommodation is easy at We Travel',
        description: 'Your accommodation whether it is a hotel, resort, homestay, ... or a yacht can be registered to sell rooms for free. Our marketing team will help your property appear more on search engines like Google, thus increasing your chances of selling rooms.',
        image: [Hotel1, Hotel2, Hotel3, Hotel4]
    },
    {
        title: 'Bring joy and comfort',
        description: 'Let more people enjoy the great experience offers from your service! From attractions, tours and more.',
        image: [Attraction1, Attraction2]
    },
    {
        title: 'Accompany customers to move safely and quickly',
        description: 'Provide all types of transportation business to pick up and drop off customers on tour, fast, convenient and safe.',
        image: [Transport1, Transport2]
    },
    {
        title: 'Providing the best quality food service',
        description: 'Cooperating with We travel to bring perfect food service, and satisfy customers when they come to enjoy delicious food.',
        image: [Restaurant1, Restaurant2, Restaurant3, Restaurant4, Restaurant5]
    }
]

function CreateService() {
    const [indexServiceSelected, setIndexServiceSelected] = useState(0)

    const handleSelectAnService = (index) => {
        setIndexServiceSelected(index)
    }

    useEffect(() => {
        sessionStorage.setItem('index-service-selected', indexServiceSelected)
    }, [indexServiceSelected])

    return (<div className='container home-main'>
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
                <Link to='/register-partner' className='btn btn-primary btn-register-service-category'>Register Now</Link>
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
    </div>)
}

export default memo(CreateService)