import { memo, useState, useEffect } from 'react'
import Select from 'react-select';
import { Link, useNavigate } from 'react-router-dom'
import { english as englishStatus, vietnamese as vietnameseStatus } from '../../Languages/StatusTour'
import { english as englishType, vietnamese as vietnameseType } from '../../Languages/TourType'
import { english as englishTable, vietnamese as vietnameseTable } from '../../Languages/TableTour';
import { AiOutlineSearch, AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { HiOutlineEye } from 'react-icons/hi'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import axios from 'axios'
import { API_GET_ALL_TOUR, API_DELETE_TOUR } from '../../API';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import LoadingDialog from '../../Layout/LoadingDialog';
import { toast } from 'react-toastify'
import PopupCalender from '../../Layout/PopupCalender';

function ViewBookingList({ languageSelected }) {
    const [getDataComplete, setGetDataComplete] = useState(false)
    const [tour, setTour] = useState([])
    const [searchName, setSearchName] = useState('')
    const [searchStatus, setSearchStatus] = useState(-1)
    const [searchType, setSearchType] = useState(-1)

    const labelDay = languageSelected === 'EN' ? 'day' : 'ngày'
    const labelNight = languageSelected === 'EN' ? 'night' : 'đêm'

    const navigate = useNavigate()
    const [navigateUrl, setNavigateUrl] = useState('')
    const [idViewBooking, setIdViewBooking] = useState(-1)

    const optionsStatus = languageSelected === 'EN' ? englishStatus : vietnameseStatus
    const optionsType = languageSelected === 'EN' ? englishType : vietnameseType

    const table = languageSelected === 'EN' ? englishTable : vietnameseTable

    const [count, setCount] = useState(0)

    const totlePage = Math.ceil(count / 10)

    let numberOfPages = []
    const [numberPage, setNumberPage] = useState(1)

    const handleCLickViewBookingSIC = (idTour) => {
        setIdViewBooking(idTour)
        setNavigateUrl('list-booking')
        const popup = document.getElementById('select-date');
        popup.style.display = 'block'
    }

    useEffect(() => {
        setNumberPage(1)
    }, [searchName, searchStatus, searchType])

    useEffect(() => {
        axios.get(API_GET_ALL_TOUR, {
            params: {
                page: numberPage,
                size: 10,
                tourName: searchName,
                status: searchStatus,
                tourType: searchType
            }
        }).then((res) => {
            setCount(res.data.data.countTour)
            let tourRaw = []
            for (let i = 0; i < res.data.data.tourDTO.length; i++) {
                const tourDTO = {
                    id: res.data.data.tourDTO[i].tourId,
                    name: res.data.data.tourDTO[i].tourName,
                    code: res.data.data.tourDTO[i].tourCode,
                    category: res.data.data.tourDTO[i].tourCategoryId,
                    type: res.data.data.tourDTO[i].tourType,
                    status: res.data.data.tourDTO[i].status,
                    day: res.data.data.tourDTO[i].numberOfDay,
                    night: res.data.data.tourDTO[i].numberOfNight,
                    price: res.data.data.tourDTO[i].tourType === 1 ? res.data.data.tourDTO[i].priceAdult : res.data.data.tourDTO[i].totalPrice,
                    mode: res.data.data.tourDTO[i].tourMode,
                    startDate: res.data.data.tourDTO[i].startDate
                }
                tourRaw.push(tourDTO)
            }
            setTour(tourRaw)
            setGetDataComplete(true)
        }).catch((e) => {
            setTour([])
            setGetDataComplete(true)
        })
    }, [numberPage, searchName, searchStatus, searchType, getDataComplete])

    for (let i = 0; i < totlePage; i++) {
        numberOfPages.push(i + 1)
    }

    const formatter = new Intl.NumberFormat('vi-VI', {
        style: 'currency',
        currency: 'VND',
        currencyDisplay: 'code'
    });

    if (!getDataComplete) {
        return (<LoadingDialog />)
    }

    return (
        <div>
            <div className='d-flex tool-list-service-main'>
                <div className='d-flex list-service-tool'>
                    <label htmlFor='search-name' className='search-input-text'>
                        <AiOutlineSearch className='icon-inner icon-search-list-service' />
                        <input value={searchName} placeholder={table.txtName} onChange={(e) => setSearchName(e.target.value)} id='search-name' type='text' className='input-inline input-list-service search-name-service input-inline-list-service' />
                    </label>
                    <Select defaultValue={searchStatus !== -1 && optionsStatus[searchStatus]} onChange={(e) => setSearchStatus(e.value)} placeholder='Status' isSearchable={false} className='select-search-service select-status' options={optionsStatus} />
                    <Select defaultValue={searchType !== -1 && optionsType[searchType]} onChange={(e) => setSearchType(e.value)} placeholder='Type' isSearchable={false} className='select-search-service select-type' options={optionsType} />
                </div>
            </div>
            <div className='space-table'>
                <table className='table table-hover table-list-service mt-30 table-striped'>
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>{table.txtCode}</td>
                            <td>{table.txtName}</td>
                            <td>{table.txtNumberOfDay}</td>
                            <td>{table.txtPrice}/Total Price</td>
                            <td>{table.txtTourType}</td>
                            <td>{table.txtStatus}</td>
                            <td>{table.txtAction}</td>
                        </tr>
                    </thead>
                    <tbody>
                        {[...tour].map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.code}</td>
                                <td>{item.name}</td>
                                <td>{item.mode ? `${item.day} ${labelDay}/ ${item.night} ${labelNight}` : `1 ${labelDay}`}</td>
                                <td>{formatter.format(item.price)}</td>
                                <td>{item.type === 0 && 'Private' ||
                                    item.type === 1 && 'S.I.C' ||
                                    item.type === 2 && 'Custom join'}</td>
                                <td>
                                    {(optionsStatus[item.status].value == 1 && <label className='status status-active'>{optionsStatus[item.status].label}</label>)
                                        || (optionsStatus[item.status].value == 2 && <label className='status status-pause'>{optionsStatus[item.status].label}</label>)
                                        || (optionsStatus[item.status].value == 3 && <label className='status status-close'>{optionsStatus[item.status].label}</label>)}
                                </td>
                                <td>
                                    <Menu menuButton={<MenuButton className='btn-action'><BsThreeDotsVertical /></MenuButton>} transition>
                                        <MenuItem id={index} onClick={() => item.type == 1 ? handleCLickViewBookingSIC(item.id) : navigate('list-booking', { state: { id: item.id, startDate: item.startDate } })}>
                                            <div>
                                                <HiOutlineEye /> {table.txtViewBooking}
                                            </div>
                                        </MenuItem>
                                    </Menu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <PopupCalender idViewBooking={idViewBooking} id='select-date' title={table.txtTitleSelectDate} navigateUrl={navigateUrl} languageSelected={languageSelected} />
            </div>
            <div className='d-flex float-end paging'>
                {numberPage > 1 && <label onClick={() => setNumberPage(pre => pre - 1)} className='btn-paging unseleted'>
                    <AiOutlineLeft />
                </label>}
                {numberOfPages.map((item) => (
                    <label className={`btn-paging ${numberPage === item ? 'selected-paging' : 'unseleted'}`} onClick={() => setNumberPage(item)}>{item}</label>
                ))}
                {numberPage < numberOfPages.length && <label onClick={() => setNumberPage(pre => pre + 1)} className='btn-paging unseleted'>
                    <AiOutlineRight />
                </label>}
            </div>
        </div >
    )
}

export default memo(ViewBookingList)