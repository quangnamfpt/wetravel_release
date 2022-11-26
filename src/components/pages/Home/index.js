import { memo, useLayoutEffect } from 'react'
import { FaRegPaperPlane } from 'react-icons/fa'
import './Home.css'
import BackgroundHome from '../../images/bgHome.jpg'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { english, vietnamese } from '../../Languages/Home';

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
        link: 'https://ceblog.s3.amazonaws.com/wp-content/uploads/2012/05/20172622/ce-travel.jpg'
    },
    {
        id: 14,
        link: 'https://wttc.org/DesktopModules/MVC/NewsArticleList/images/141_20201013185512_Consumer%20Survey%20Finds%2070%20Percent%20of%20Travelers%20Plan%20to%20Holiday%20in%202021.jpg'
    },
    {
        id: 15,
        link: 'https://img.freepik.com/free-photo/full-shot-travel-concept-with-landmarks_23-2149153258.jpg?3'
    },
    {
        id: 16,
        link: 'https://v-biz.vn/static/media/Travel.ff88c854.jpg'
    },
    {
        id: 17,
        link: 'https://hips.hearstapps.com/hmg-prod/images/where-to-travel-in-2022-1640200544.jpg'
    },
    {
        id: 18,
        link: 'https://youmatter.world/app/uploads/sites/2/2019/11/travel-world.jpg'
    }],
    [{
        id: 19,
        link: 'https://ceblog.s3.amazonaws.com/wp-content/uploads/2012/05/20172622/ce-travel.jpg'
    },
    {
        id: 20,
        link: 'https://wttc.org/DesktopModules/MVC/NewsArticleList/images/141_20201013185512_Consumer%20Survey%20Finds%2070%20Percent%20of%20Travelers%20Plan%20to%20Holiday%20in%202021.jpg'
    },
    {
        id: 21,
        link: 'https://img.freepik.com/free-photo/full-shot-travel-concept-with-landmarks_23-2149153258.jpg?3'
    },
    {
        id: 22,
        link: 'https://v-biz.vn/static/media/Travel.ff88c854.jpg'
    },
    {
        id: 23,
        link: 'https://hips.hearstapps.com/hmg-prod/images/where-to-travel-in-2022-1640200544.jpg'
    },
    {
        id: 24,
        link: 'https://youmatter.world/app/uploads/sites/2/2019/11/travel-world.jpg'
    }], [{
        id: 25,
        link: 'https://ceblog.s3.amazonaws.com/wp-content/uploads/2012/05/20172622/ce-travel.jpg'
    },
    {
        id: 26,
        link: 'https://wttc.org/DesktopModules/MVC/NewsArticleList/images/141_20201013185512_Consumer%20Survey%20Finds%2070%20Percent%20of%20Travelers%20Plan%20to%20Holiday%20in%202021.jpg'
    },
    {
        id: 27,
        link: 'https://img.freepik.com/free-photo/full-shot-travel-concept-with-landmarks_23-2149153258.jpg?3'
    },
    {
        id: 28,
        link: 'https://v-biz.vn/static/media/Travel.ff88c854.jpg'
    },
    {
        id: 29,
        link: 'https://hips.hearstapps.com/hmg-prod/images/where-to-travel-in-2022-1640200544.jpg'
    },
    {
        id: 30,
        link: 'https://youmatter.world/app/uploads/sites/2/2019/11/travel-world.jpg'
    }]]
    return (
        <div className='container home-main'>
            <img src={BackgroundHome} className='bg-image' />
            <div className='border-search container search'>
                <FaRegPaperPlane className='icon-search' />
                <input placeholder={languageList[0]} className='input-search' />
                <button className='btn-search'>{languageList[1]}</button>
            </div>

            <div className='container place'>
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

            <div className='container place'>
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

            <div className='container place'>
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

        </div>)
}

export default memo(Home)