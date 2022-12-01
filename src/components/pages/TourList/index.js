import { memo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import BackgroundHome from '../../images/bgHome.jpg'
import { FaRegPaperPlane } from 'react-icons/fa'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { english, vietnamese } from '../../Languages/Home';
import { english as englishTourList, vietnamese as vietnameseTourList } from '../../Languages/TourList'
import './TourList.scss'
import { API_GET_ALL_TOUR } from '../../API';
import LoadingDialog from '../../Layout/LoadingDialog'
import axios from 'axios'
import { ref, listAll, getDownloadURL } from 'firebase/storage'
import { storage } from "../../../firebase/Upload";

function TourList({ languageSelected }) {
    const [getDataComplete, setGetDataComplete] = useState(false)
    const languageList = (languageSelected === 'EN' ? english : vietnamese)
    const optionSideBar = (languageSelected === 'EN' ? englishTourList : vietnameseTourList)
    const [searchName, setSearchName] = useState('')
    const [changeName, setChangeName] = useState(false)

    const [optionPrice, setOptionPrice] = useState([-1, -1, 0])

    const [optionCategory, setOptionCategory] = useState([])

    const handleSelectOptionPrice = (from, to, value) => {
        setOptionPrice([from, to, value])
    }

    const [count, setCount] = useState(0)

    const navigate = useNavigate()

    const [tours, setTours] = useState([])

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'VND'
    });

    const maxItemInPage = 12

    const totlePage = Math.ceil(count / maxItemInPage)

    let numberOfPages = []
    for (let i = 0; i < totlePage; i++) {
        numberOfPages.push(i + 1)
    }

    const [numberPage, setNumberPage] = useState(1)

    useEffect(() => {
        setNumberPage(1)
    }, [searchName, optionPrice, optionCategory])

    useEffect(() => {
        setGetDataComplete(false)
        axios.get(API_GET_ALL_TOUR, {
            params: {
                page: numberPage,
                size: maxItemInPage,
                tourName: searchName,
                tourCategoryList: optionCategory.join(','),
                fromPrice: optionPrice[0],
                toPrice: optionPrice[1],
                status: 1
            }
        }).then((res) => {
            setCount(res.data.data.countTour)
            let tourRaw = []
            let leng = 0
            const count = res.data.data.tourDTO.length
            for (let i = 0; i < count; i++) {
                let tourDTO = {
                    name: res.data.data.tourDTO[i].tourName,
                    id: res.data.data.tourDTO[i].tourId,
                    price: res.data.data.tourDTO[i].priceAdult,
                    type: res.data.data.tourDTO[i].tourType,
                    maxAdult: res.data.data.tourDTO[i].maxAdult,
                    maxChildren: res.data.data.tourDTO[i].maxChildren,
                    minToActive: res.data.data.tourDTO[i].minToStart,
                    totalPrice: res.data.data.tourDTO[i].totalPrice
                }
                listAll(ref(storage, `tour/${res.data.data.tourDTO[i].tourId}/information/images`)).then((res) => {
                    console.log(res.items[0].fullPath)
                    getDownloadURL(ref(storage, res.items[0].fullPath))
                        .then((url) => {
                            axios({
                                url: url,
                                method: 'GET',
                                responseType: 'blob',
                            }).then(blob => {
                                tourDTO.image = URL.createObjectURL(blob.data)
                                tourRaw.push(tourDTO)
                                leng++
                                if (leng == count) {
                                    setTours(tourRaw)
                                    setGetDataComplete(true)
                                }
                            })
                        })
                })
            }
        }).catch((e) => {
            setTours([])
            setGetDataComplete(true)
        })
    }, [numberPage, changeName, optionPrice, optionCategory])

    const handleCheckedCategory = (target) => {
        let optionCategoryRaw = [...optionCategory]
        if (target.checked) {
            optionCategoryRaw.push(target.value)
        }
        else {
            const index = optionCategoryRaw.indexOf(target.value)
            optionCategoryRaw.splice(index, 1)
        }
        setOptionCategory(optionCategoryRaw)
    }

    return (
        <div className='container home-main tour-list-main'>
            <img src={BackgroundHome} className='bg-image' />
            <div className='border-search container search'>
                <FaRegPaperPlane className='icon-search' />
                <input onChange={(e) => setSearchName(e.target.value)} placeholder={languageList[0]} className='input-search' />
                <button onClick={() => setChangeName(!changeName)} className='btn-search'>{languageList[1]}</button>
            </div>
            <div className='container'>
                <div className='d-flex mt-50-import'>
                    <div className='option-tour-list w-35'>
                        <div className='section-tour-detail box-shadow-tour-list'>
                            <label className='title d-block mb-10'>{optionSideBar.txtTitlePrice}</label>
                            <label htmlFor='AllPrice' className='d-flex radio-custom mb-20'>
                                <input name='optionPrice' onChange={(e) => handleSelectOptionPrice(-1, -1, e.target.value)} id='AllPrice' type='radio' value='0' hidden />
                                <div htmlFor='AllPrice' className={`radio-spuare mr-20 ${optionPrice[2] == 0 && 'radio-custom-checked'}`} />
                                <label htmlFor='AllPrice' className='option-label'>{optionSideBar.txtAll}</label>
                            </label>
                            <label htmlFor='0to5' className='d-flex radio-custom mb-20'>
                                <input name='optionPrice' onChange={(e) => handleSelectOptionPrice(0, 5000000, e.target.value)} id='0to5' type='radio' value='1' hidden />
                                <div htmlFor='0to5' className={`radio-spuare mr-20 ${optionPrice[2] == 1 && 'radio-custom-checked'}`} />
                                <label htmlFor='0to5' className='option-label'>{optionSideBar.txt0to5}</label>
                            </label>
                            <label htmlFor='5to10' className='d-flex radio-custom mb-20'>
                                <input name='optionPrice' onChange={(e) => handleSelectOptionPrice(5000000, 10000000, e.target.value)} id='5to10' type='radio' value='2' hidden />
                                <div htmlFor='5to10' className={`radio-spuare mr-20 ${optionPrice[2] == 2 && 'radio-custom-checked'}`} />
                                <label htmlFor='5to10' className='option-label'>{optionSideBar.txt5to10}</label>
                            </label>
                            <label htmlFor='10to20' className='d-flex radio-custom mb-20'>
                                <input name='optionPrice' onChange={(e) => handleSelectOptionPrice(10000000, 20000000, e.target.value)} id='10to20' type='radio' value='3' hidden />
                                <div htmlFor='10to20' className={`radio-spuare mr-20 ${optionPrice[2] == 3 && 'radio-custom-checked'}`} />
                                <label htmlFor='10to20' className='option-label'>{optionSideBar.txt10to20}</label>
                            </label>
                        </div>
                        <div className='mt-20 section-tour-detail box-shadow-tour-list'>
                            <label className='title'>{optionSideBar.txtTourCategory}</label>
                            <label htmlFor='TourDiscover' className='d-flex radio-custom mb-20'>
                                <input onChange={(e) => handleCheckedCategory(e.target)} id='TourDiscover' type='checkbox' value='1' hidden />
                                <div htmlFor='TourDiscover' className={`radio-spuare mr-20 ${optionCategory.indexOf('1') !== -1 && 'radio-custom-checked'}`} />
                                <label htmlFor='TourDiscover' className='option-label'>{optionSideBar.txtTourDiscover}</label>
                            </label>
                            <label htmlFor='Adventure' className='d-flex radio-custom mb-20'>
                                <input onChange={(e) => handleCheckedCategory(e.target)} id='Adventure' type='checkbox' value='2' hidden />
                                <div htmlFor='Adventure' className={`radio-spuare mr-20 ${optionCategory.indexOf('2') !== -1 && 'radio-custom-checked'}`} />
                                <label htmlFor='Adventure' className='option-label'>{optionSideBar.txtAdventure}</label>
                            </label>
                            <label htmlFor='Ecotourism' className='d-flex radio-custom mb-20'>
                                <input onChange={(e) => handleCheckedCategory(e.target)} id='Ecotourism' type='checkbox' value='3' hidden />
                                <div htmlFor='Ecotourism' className={`radio-spuare mr-20 ${optionCategory.indexOf('3') !== -1 && 'radio-custom-checked'}`} />
                                <label htmlFor='Ecotourism' className='option-label'>{optionSideBar.txtEcotourism}</label>
                            </label>
                            <label htmlFor='Cultural' className='d-flex radio-custom mb-20'>
                                <input onChange={(e) => handleCheckedCategory(e.target)} id='Cultural' type='checkbox' value='4' hidden />
                                <div htmlFor='Cultural' className={`radio-spuare mr-20 ${optionCategory.indexOf('4') !== -1 && 'radio-custom-checked'}`} />
                                <label htmlFor='Cultural' className='option-label'>{optionSideBar.txtTourCultural}</label>
                            </label>
                            <label htmlFor='Resort' className='d-flex radio-custom mb-20'>
                                <input onChange={(e) => handleCheckedCategory(e.target)} id='Resort' type='checkbox' value='5' hidden />
                                <div htmlFor='Resort' className={`radio-spuare mr-20 ${optionCategory.indexOf('5') !== -1 && 'radio-custom-checked'}`} />
                                <label htmlFor='Resort' className='option-label'>{optionSideBar.txtTourResort}</label>
                            </label>
                            <label htmlFor='MICE' className='d-flex radio-custom mb-20'>
                                <input onChange={(e) => handleCheckedCategory(e.target)} id='MICE' type='checkbox' value='6' hidden />
                                <div htmlFor='MICE' className={`radio-spuare mr-20 ${optionCategory.indexOf('6') !== -1 && 'radio-custom-checked'}`} />
                                <label htmlFor='MICE' className='option-label'>{optionSideBar.txtMICE}</label>
                            </label>
                            <label htmlFor='Leisure' className='d-flex radio-custom mb-20'>
                                <input onChange={(e) => handleCheckedCategory(e.target)} id='Leisure' type='checkbox' value='7' hidden />
                                <div htmlFor='Leisure' className={`radio-spuare mr-20 ${optionCategory.indexOf('7') !== -1 && 'radio-custom-checked'}`} />
                                <label htmlFor='Leisure' className='option-label'>{optionSideBar.txtLeisure}</label>
                            </label>
                            <label htmlFor='Culinary' className='d-flex radio-custom mb-20'>
                                <input onChange={(e) => handleCheckedCategory(e.target)} id='Culinary' type='checkbox' value='8' hidden />
                                <div htmlFor='Culinary' className={`radio-spuare mr-20 ${optionCategory.indexOf('8') !== -1 && 'radio-custom-checked'}`} />
                                <label htmlFor='Culinary' className='option-label'>{optionSideBar.txtCulinary}</label>
                            </label>
                        </div>
                    </div>
                    <div className='container'>
                        <div className='grid-tour'>
                            {getDataComplete ?
                                [...tours].map((tour, index) => (
                                    <label key={index} className='tour-item' onClick={() => navigate('/tour-detail', { state: { id: tour.id } })}>
                                        <img src={tour.image} className='image-main-tour' />
                                        <div className='short-information-tour pd-short-information-tour'>
                                            <div className='tour-name'>{tour.name}</div>
                                            {tour.type === 1 ?
                                                <div className='tour-price'>{formatter.format(tour.price)}</div>
                                                :
                                                <div className='tour-price'>{formatter.format(tour.totalPrice / (tour.maxAdult + tour.maxChildren))} - {formatter.format(tour.totalPrice / tour.minToActive)}</div>
                                            }
                                        </div>
                                    </label>
                                )) : <LoadingDialog />
                            }
                        </div>
                        <div className='d-flex paging float-end mb-20'>
                            {numberPage > 1 && <label onClick={() => setNumberPage(pre => pre - 1)} className='btn-paging unseleted'>
                                <AiOutlineLeft />
                            </label>}
                            {numberOfPages.map((item) => (
                                <label className={`btn-paging ${numberPage === item ? 'selected-paging' : 'unseleted'}`} onClick={() => setNumberPage(item)}>{item}</label>
                            ))}
                            {numberPage < numberOfPages.length && numberOfPages.length > 1 && <label onClick={() => setNumberPage(pre => pre + 1)} className='btn-paging unseleted'>
                                <AiOutlineRight />
                            </label>}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default memo(TourList)