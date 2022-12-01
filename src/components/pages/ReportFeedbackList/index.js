import { memo, useState, useEffect } from 'react'
import './ReportFeedbackList.scss'
import { AiFillCaretRight, AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_GET_LIST_FEEDBACK_REPORT } from '../../API'
import { english, vietnamese } from '../../Languages/ReasonReport'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { BiTrashAlt } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { GrStatusGood } from 'react-icons/gr'

function ReportFeedbackList({ languageSelected }) {
    const navigate = useNavigate()

    const reasonReport = languageSelected === 'EN' ? english : vietnamese

    const [listReportFeedback, setListReportFeedback] = useState([
        {
            tourId: 1,
            tourName: 'Tour Tam Dao',
            feedbackId: 1,
            content: 'Nhìn chung là ổn, tuy nhiên không thật sự vượt trội chất lượng với các tour công ty du lịch lữ hành khác',
            report: [
                {
                    name: 'Gia Bẻo',
                    date: '2022-01-01',
                    content: 'Có ngôn từ bạo lực'
                },
                {
                    name: 'Gia Bẻo',
                    date: '2022-01-01',
                    content: 'Có ngôn từ bạo lực'
                },
                {
                    name: 'Gia Bẻo',
                    date: '2022-01-01',
                    content: 'Có ngôn từ bạo lực'
                },
                {
                    name: 'Gia Bẻo',
                    date: '2022-01-01',
                    content: 'Có ngôn từ bạo lực'
                },
                {
                    name: 'Gia Bẻo',
                    date: '2022-01-01',
                    content: 'Có ngôn từ bạo lực'
                },
                {
                    name: 'Gia Bẻo',
                    date: '2022-01-01',
                    content: 'Có ngôn từ bạo lực'
                },
                {
                    name: 'Gia Bẻo',
                    date: '2022-01-01',
                    content: 'Có ngôn từ bạo lực'
                }
            ]
        },
        {
            tourId: 1,
            tourName: 'Tour Tam Dao',
            feedbackId: 1,
            content: 'Nhìn chung là ổn, tuy nhiên không thật sự vượt trội chất lượng với các tour công ty du lịch lữ hành khác',
            report: [
                {
                    name: 'Gia Bẻo',
                    date: '2022-01-01',
                    content: 'Có ngôn từ bạo lực'
                },
                {
                    name: 'Gia Bẻo',
                    date: '2022-01-01',
                    content: 'Có ngôn từ bạo lực'
                },
                {
                    name: 'Gia Bẻo',
                    date: '2022-01-01',
                    content: 'Có ngôn từ bạo lực'
                }
            ]
        },
        {
            tourId: 1,
            tourName: 'Tour Tam Dao',
            feedbackId: 1,
            content: 'Nhìn chung là ổn, tuy nhiên không thật sự vượt trội chất lượng với các tour công ty du lịch lữ hành khác',
            report: [
                {
                    name: 'Gia Bẻo',
                    date: '2022-01-01',
                    content: 'Có ngôn từ bạo lực'
                },
                {
                    name: 'Gia Bẻo',
                    date: '2022-01-01',
                    content: 'Có ngôn từ bạo lực'
                },
                {
                    name: 'Gia Bẻo',
                    date: '2022-01-01',
                    content: 'Có ngôn từ bạo lực'
                }
            ]
        },
        {
            tourId: 1,
            tourName: 'Tour Tam Dao',
            feedbackId: 1,
            content: 'Nhìn chung là ổn, tuy nhiên không thật sự vượt trội chất lượng với các tour công ty du lịch lữ hành khác',
            report: [
                {
                    name: 'Gia Bẻo',
                    date: '2022-01-01',
                    content: 'Có ngôn từ bạo lực'
                },
                {
                    name: 'Gia Bẻo',
                    date: '2022-01-01',
                    content: 'Có ngôn từ bạo lực'
                },
                {
                    name: 'Gia Bẻo',
                    date: '2022-01-01',
                    content: 'Có ngôn từ bạo lực'
                }
            ]
        }
    ])

    const [numberPage, setNumberPage] = useState(1)
    const [numberOfPages, setNumberOfPages] = useState([1, 2])

    useEffect(() => {
        axios.get(`${API_GET_LIST_FEEDBACK_REPORT}?page=${numberPage}&size=4`)
            .then((res) => {
                const data = res.data.data.content
                let feedbackReportRaw = []
                data.forEach((item) => {
                    let feedback = {
                        tourId: 1,
                        tourName: 'Tour Tam Dao',
                        feedbackId: item.feedbackId,
                        content: item.content
                    }
                    let reportsRaw = []
                    item.reportFeedbackDTOList.forEach((report) => {
                        let reportRaw = {
                            name: 'Gia Bẻo',
                            date: '2022-01-01',
                            reason: report.reasonReportFeedbackId
                        }
                        reportsRaw.push(reportRaw)
                    })
                    feedback.report = reportsRaw
                    feedbackReportRaw.push(feedback)
                })
                setListReportFeedback(feedbackReportRaw)

                const totalPage = res.data.data.totalPages
                let numberOfPagesRaw = []
                for (let i = 0; i < totalPage; i++) {
                    numberOfPagesRaw.push(i + 1)
                }
                setNumberOfPages(numberOfPagesRaw)
            })
    }, [numberPage])

    return (
        <div>
            <div className='d-flex'>
                {listReportFeedback.map((feedback) => (
                    <div className='bg-white box-shadow-common br-10 w-22 mlr-2-5-per tab-report'>
                        <div className='bd-bottom'>
                            <div className='p-10 d-flex space-between pb-0'>
                                <div className='d-flex center-vertical link-to-tour'>
                                    <div className='text-bold font-18'
                                        onClick={() => navigate('/admin/preview', { state: { id: feedback.tourId } })}>
                                        {feedback.tourName}
                                    </div>
                                    <AiFillCaretRight />
                                </div>
                                <div>
                                    <Menu menuButton={<MenuButton className='btn-action'><BsThreeDotsVertical /></MenuButton>} transition>
                                        <MenuItem>
                                            <BiTrashAlt />{languageSelected === 'EN' ? 'Delete' : 'Xoá'}
                                        </MenuItem>
                                        <MenuItem>
                                            <GrStatusGood />{languageSelected === 'EN' ? 'Keep it' : 'Giữ lại'}
                                        </MenuItem>
                                    </Menu>
                                </div>
                            </div>
                            <div className='p-10 text-bold pb-0'>Content:</div>
                            <div className='p-10'>{feedback.content}</div>
                        </div>
                        {feedback.report.map((report) => (
                            <div className='bg-white box-shadow-common br-10 p-20 m-10'>
                                <div className='text-bold'>{report.name}</div>
                                <input type='date' disabled className='fake-label color-gray font-14' value={report.date} />
                                <div>{reasonReport[report.reason - 1]}</div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className='d-flex float-end paging mt-20'>
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
        </div>
    )
}

export default memo(ReportFeedbackList)