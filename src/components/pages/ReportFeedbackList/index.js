import { memo, useState, useEffect, useRef } from 'react'
import './ReportFeedbackList.scss'
import { AiFillCaretRight, AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { API_BLOCK_FEEDBACK, API_DELETE_REPORT_FEEDBACK, API_GET_LIST_FEEDBACK_REPORT } from '../../API'
import { english, vietnamese } from '../../Languages/ReasonReport'
import { english as englishDisplay, vietnamese as vietnameseDisplay } from '../../Languages/ReportFeedbackList'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { BiTrashAlt } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { GrStatusGood } from 'react-icons/gr'
import Question from '../../images/question.png'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { toast } from 'react-toastify'
import ConfirmDialog from '../../Layout/ConfirmDialog'
import PopupCreateAlert from '../../Layout/PopupCreateAlert'

function ReportFeedbackList({ languageSelected }) {
    const navigate = useNavigate()

    const reasonReport = languageSelected === 'EN' ? english : vietnamese
    const languageDisplay = languageSelected === 'EN' ? englishDisplay : vietnameseDisplay

    const [showConfirm, setShowConfirm] = useState(false)
    const [titleConfirm, setTitleConfirm] = useState('asd')
    const [contentConfirm, setContentConfirm] = useState('asd')
    const callbackConfirm = useRef(() => { })
    const [isRed, setIsRed] = useState(true)
    const [textOk, setTextOk] = useState('Ok')
    const [textCancel, setTextCancel] = useState('Cancel')

    const [showConfirmAlert, setShowConfirmAlert] = useState(false)
    const [shortReason, setShortReason] = useState(languageDisplay.txtShortReason)
    const [fullReason, setFullReason] = useState(languageDisplay.txtFullReason)

    const [accountId, setAccountId] = useState(0)

    const [listReportFeedback, setListReportFeedback] = useState([])

    const [numberPage, setNumberPage] = useState(1)
    const [numberOfPages, setNumberOfPages] = useState([1, 2])

    useEffect(() => {
        axios.get(`${API_GET_LIST_FEEDBACK_REPORT}?page=${numberPage}&size=4`)
            .then((res) => {
                const data = res.data.data.content
                let feedbackReportRaw = []
                data.forEach((item) => {
                    let feedback = {
                        tourId: item.tourId,
                        tourName: 'Tour Tam Dao',
                        feedbackId: item.feedbackId,
                        content: item.content,
                        accountId: item.accountId
                    }
                    let reportsRaw = []
                    item.reportFeedbackDTOList.forEach((report) => {
                        let reportRaw = {
                            name: report.firstName + report.lastName,
                            date: report.createDate,
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

    const handleClickShowConfig = (title, content, callback, isRed, textOk, textCancel) => {
        setShowConfirm(true)
        setTitleConfirm(title)
        setContentConfirm(content)
        callbackConfirm.current = callback
        setIsRed(isRed)
        setTextOk(textOk)
        setTextCancel(textCancel)
    }

    const handleBlockFeedback = (id, index) => {
        setShowConfirm(false)
        axios.put(`${API_BLOCK_FEEDBACK}${id}`).then(() => {
            handleDeleteReport(id, index, true)
        }).catch((err) => {
            console.error(err)
        })
    }

    const handleClickBlock = (callback, accountId) => {
        console.log(accountId)
        setShowConfirmAlert(true)
        callbackConfirm.current = callback
        setAccountId(accountId)
    }

    const handleDeleteReport = (id, index, isBlock) => {
        axios.delete(`${API_DELETE_REPORT_FEEDBACK}${id}`).then(() => {
            {
                isBlock ?
                    toast.success(languageSelected === 'En' ? 'Block feedback success' : 'Đã khoá đánh giá')
                    :
                    toast.success(languageSelected === 'En' ? 'Feedback has been withheld' : 'Đánh giá đã được giữ lại.')
            }
            let listReportFeedbackRaw = [...listReportFeedback]
            listReportFeedbackRaw.splice(index, 1)
            setListReportFeedback(listReportFeedbackRaw)
        }).catch(err => {
            console.error(err)
        })
        setShowConfirmAlert(false)
        setShowConfirm(false)
    }

    return (
        <div>
            {showConfirmAlert &&
                <PopupCreateAlert callback={callbackConfirm.current} textOk={languageDisplay.txtBlock}
                    textCancel={languageDisplay.txtCancel} title={languageDisplay.txtBlockeedback}
                    shortReason={shortReason}
                    fullReason={fullReason} accountId={accountId}
                    isRed={true} setShowDialog={setShowConfirmAlert} />
            }
            {showConfirm &&
                <ConfirmDialog textOk={textOk} textCancel={textCancel} title={titleConfirm} content={contentConfirm} callback={callbackConfirm.current} isRed={isRed} setShowDialog={setShowConfirm} />
            }
            <div className='d-flex'>
                {listReportFeedback.length > 0 ?
                    <>
                        {listReportFeedback.map((feedback, index) => (
                            <div className='bg-white box-shadow-common br-10 w-22 mlr-2-5-per tab-report'>
                                <div className='bd-bottom'>
                                    <div className='p-10 d-flex space-between pb-0'>
                                        <div className='d-flex center-vertical link-to-tour'>
                                            <div className='text-bold font-18'
                                                onClick={() => navigate('/admin/preview', { state: { id: feedback.tourId } })}>
                                                {feedback.tourName.substring(0, 25)}{feedback.tourName.length > 25 && '...'}
                                            </div>
                                            <AiFillCaretRight />
                                        </div>
                                        <div>
                                            <Menu menuButton={<MenuButton className='btn-action'><BsThreeDotsVertical /></MenuButton>} transition>
                                                <MenuItem
                                                    onClick={() => handleClickBlock(() => handleBlockFeedback(feedback.feedbackId, index), feedback.accountId)}>
                                                    <BiTrashAlt />{languageSelected === 'EN' ? 'Block' : 'Khoá'}
                                                </MenuItem>
                                                <MenuItem onClick={() => handleClickShowConfig(languageDisplay.txtKeepFeedback, languageDisplay.txtWarningKeep,
                                                    () => handleDeleteReport(feedback.feedbackId, index, false), false, languageDisplay.txtTextKeep, languageDisplay.txtCancel)}>
                                                    <GrStatusGood />{languageSelected === 'EN' ? 'Keep it' : 'Giữ lại'}
                                                </MenuItem>
                                            </Menu>
                                        </div>
                                    </div>
                                    <div className='p-10 text-bold pb-0'>{languageSelected === 'EN' ? 'Content' : 'Nội dung'}:</div>
                                    <div className='p-10'>{feedback.content}</div>
                                </div>
                                <div className='list-overflow'>
                                    <Scrollbars>
                                        {feedback.report.map((report) => (
                                            <div className='bg-white box-shadow-common br-10 p-20 m-10'>
                                                <div className='text-bold'>{report.name}</div>
                                                <input type='date' disabled className='fake-label color-gray font-14' value={report.date} />
                                                <div>{reasonReport[report.reason - 1]}</div>
                                            </div>
                                        ))}
                                    </Scrollbars>
                                </div>
                            </div>
                        ))}
                    </>
                    :
                    <div className='d-flex center-screen mt-nega-54'>
                        <img src={Question} />
                    </div>
                }
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