import { memo, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaRegPaperPlane } from 'react-icons/fa'
import './Home.css'
import BackgroundHome from '../../images/bgHome.jpg'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { english, vietnamese } from '../../Languages/Home';
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


const responsive = {
    desktop: {
        breakpoint: { max: 1920, min: 1080 },
        items: 4,
        slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};

const responsiveFetures = {
    desktop: {
        breakpoint: { max: 4000, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};

function Home({ languageSelected }) {
    let languageList = (languageSelected === 'EN' ? english : vietnamese)

    const navigate = useNavigate()

    useLayoutEffect(() => {
        languageList = (languageSelected === 'EN' ? english : vietnamese)
    }, [languageSelected])

    const listItem = [{
        id: 1,
        link: 'https://ceblog.s3.amazonaws.com/wp-content/uploads/2012/05/20172622/ce-travel.jpg'
    },
    {
        id: 2,
        link: 'https://wttc.org/DesktopModules/MVC/NewsArticleList/images/141_20201013185512_Consumer%20Survey%20Finds%2070%20Percent%20of%20Travelers%20Plan%20to%20Holiday%20in%202021.jpg'
    },
    {
        id: 3,
        link: 'https://img.freepik.com/free-photo/full-shot-travel-concept-with-landmarks_23-2149153258.jpg?3'
    },
    {
        id: 4,
        link: 'https://v-biz.vn/static/media/Travel.ff88c854.jpg'
    },
    {
        id: 5,
        link: 'https://hips.hearstapps.com/hmg-prod/images/where-to-travel-in-2022-1640200544.jpg'
    },
    {
        id: 6,
        link: 'https://youmatter.world/app/uploads/sites/2/2019/11/travel-world.jpg'
    },
    {
        id: 7,
        link: 'https://ceblog.s3.amazonaws.com/wp-content/uploads/2012/05/20172622/ce-travel.jpg'
    },
    {
        id: 8,
        link: 'https://wttc.org/DesktopModules/MVC/NewsArticleList/images/141_20201013185512_Consumer%20Survey%20Finds%2070%20Percent%20of%20Travelers%20Plan%20to%20Holiday%20in%202021.jpg'
    },
    {
        id: 9,
        link: 'https://img.freepik.com/free-photo/full-shot-travel-concept-with-landmarks_23-2149153258.jpg?3'
    },
    {
        id: 10,
        link: 'https://v-biz.vn/static/media/Travel.ff88c854.jpg'
    },
    {
        id: 11,
        link: 'https://hips.hearstapps.com/hmg-prod/images/where-to-travel-in-2022-1640200544.jpg'
    },
    {
        id: 12,
        link: 'https://youmatter.world/app/uploads/sites/2/2019/11/travel-world.jpg'
    }]

    const arrayGroup = [[{
        id: 13,
        link: Hotel1
    },
    {
        id: 14,
        link: Hotel2
    },
    {
        id: 15,
        link: Hotel3
    },
    {
        id: 16,
        link: Hotel4
    },
    {
        id: 17,
        link: Attraction1
    },
    {
        id: 18,
        link: Attraction2
    }],
    [{
        id: 19,
        link: Transport1
    },
    {
        id: 20,
        link: Transport2
    },
    {
        id: 21,
        link: Restaurant1
    },
    {
        id: 22,
        link: Restaurant2
    },
    {
        id: 23,
        link: Restaurant3
    },
    {
        id: 24,
        link: Restaurant4
    }]]

    const listImageForum = [{
        id: 1,
        link: 'https://cdn.searchenginejournal.com/wp-content/uploads/2021/09/16-reasons-why-social-media-is-important-to-your-company-616d3200e6dc6-sej-1520x800.png'
    },
    {
        id: 2,
        link: 'https://cdn.searchenginejournal.com/wp-content/uploads/2020/09/outstanding-social-media-campaigns-5f60d3e4bb13b.png'
    },
    {
        id: 3,
        link: 'https://d4y70tum9c2ak.cloudfront.net/contentImage/cp-xkfWuQLB8A-LnxHmXAXyjr697tiDTJ-H-hSl1VjA/resized.png'
    },
    {
        id: 4,
        link: 'https://www.pagepersonnel.fr/sites/pagepersonnel.fr/files/legacy/shutterstock_767934082_970x480.jpg'
    },
    {
        id: 5,
        link: 'https://wewin.com.vn/wp-content/uploads/2021/09/social-media-manager-la-lam-gi.png'
    }]

    const role = sessionStorage.getItem('role')

    return (
        <div className='container home-main'>
            <img src={BackgroundHome} className='bg-image' />
            <div className='border-search container search'
                onClick={() => navigate('/tours')}>
                <FaRegPaperPlane className='icon-search' />
                <input placeholder={languageList[0]} className='input-search' />
                <button className='btn-search'>{languageList[1]}</button>
            </div>

            <div className='container place' onClick={() => navigate('/tours')}>
                <h1 className='title-home'>{languageList[2]}</h1>
                <div className='title-home description-home'>{languageList[3]}</div>
                <div className='slider'>
                    <Carousel autoPlay={true}
                        autoPlaySpeed={1500}
                        swipeable={false}
                        showDots={true}
                        draggable={false}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        infinite={true}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px">
                        {listItem.map((item, index) => (<img src={item.link} key={index} className="image-slide image-hover" />))}
                    </Carousel>
                </div>
            </div>

            <div className='container place' onClick={() => navigate('/services')}>
                <h1 className='title-home title-left'>{languageList[4]}</h1>
                <div className='slider'>
                    <Carousel autoPlay={true}
                        swipeable={false}
                        showDots={true}
                        draggable={false}
                        responsive={responsiveFetures}
                        ssr={true} // means to render carousel on server-side.
                        infinite={true}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px">
                        {arrayGroup.map((item, index) => (<div className='slide-fetured' key={index + 100}>
                            <div>
                                <img src={item[0].link} key={item[0].id} className="image-group image-group1 image-hover" />
                                <img src={item[1].link} key={item[1].id} className="image-group image-group1 image-hover" />
                            </div>
                            <div><img src={item[2].link} key={item[2].id} className="image-group image-group2 image-hover" /></div>
                            <div>
                                <img src={item[3].link} key={item[3].id} className="image-group image-group3 image-hover" />
                                <img src={item[4].link} key={item[4].id} className="image-group image-group3 image-hover" />
                                <img src={item[5].link} key={item[5].id} className="image-group image-group3 image-hover" />
                            </div>
                        </div>
                        ))}
                    </Carousel>
                </div>
            </div>

            <div className='container place' onClick={() => navigate('/forum')}>
                <h1 className='title-home'>{languageList[5]}</h1>
                <div className='title-home description-home'>{languageList[6]}</div>
                <div className='slider'>
                    <Carousel autoPlay={true}
                        autoPlaySpeed={1500}
                        swipeable={false}
                        showDots={true}
                        draggable={false}
                        responsive={responsive}
                        ssr={true} // means to render carousel on server-side.
                        infinite={true}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px">
                        {listImageForum.map((item, index) => (<img src={item.link} key={index} className="image-slide image-hover" />))}
                    </Carousel>
                </div>
            </div>

        </div>)
}

export default memo(Home)