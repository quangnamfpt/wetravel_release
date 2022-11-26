import { memo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import './PopupCalender.scss'
import { english, vietnamese } from '../../Languages/PopupCalender';

function PopupCalender({ idViewBooking, id, title, navigateUrl, languageSelected }) {
    const languageList = languageSelected === 'EN' ? english : vietnamese

    const navigate = useNavigate()
    const [date, setDate] = useState(dayjs(new Date().toISOString().split("T")[0]));

    const [paramDate, setParamDate] = useState('')
    useEffect(() => {
        setParamDate(`${date.year()}-${date.month() + 1}-${date.date()}`)
    }, [date])

    const handleClickCancel = () => {
        document.getElementById(id).style.display = 'none'
    }

    return (
        <div id={id} className='none bg-popup'>
            <div className='locationPopupDate'>
                <div className='back-select-date'>
                    <div className='title-warning-select-date'>{title}</div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDatePicker
                            className='btn-font-size-18'
                            displayStaticWrapperAs="desktop"
                            value={date}
                            onChange={(newValue) => {
                                setDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <div className='float-end mr-20'>
                        <button className='btn btn-primary btn-popup-calendar' onClick={() => navigate(navigateUrl, { state: { id: idViewBooking, startDate: paramDate } })}>{languageList.txtOk}</button>
                        <button className='btn btn-popup-calendar' onClick={handleClickCancel}>{languageList.txtCancel}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(PopupCalender)