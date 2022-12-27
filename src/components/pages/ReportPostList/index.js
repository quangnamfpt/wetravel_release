import { memo, useState, useEffect, useRef } from 'react'
import { AiFillCaretRight, AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { BiTrashAlt } from 'react-icons/bi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { GrStatusGood } from 'react-icons/gr'
import '../ReportFeedbackList/ReportFeedbackList.scss'
import { Scrollbars } from 'react-custom-scrollbars-2';
import { typePostEnglish, typePostVietnamese } from '../../Languages/ListPostForum'
import axios from 'axios';
import { API_BLOCK_POST, API_DELETE_REPORT_POST, API_GET_LIST_POST } from '../../API';
import Forum1 from '../../images/forum (1).jpg'
import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from "../../../firebase/Config";
import { toast } from 'react-toastify'
import PopupCreateAlert from '../../Layout/PopupCreateAlert'
import { english, vietnamese } from '../../Languages/ReportPostList';
import { english as englishReasonReport, vietnamese as vietnameseReasonReport } from '../../Languages/ReasonReport';
import ConfirmDialog from '../../Layout/ConfirmDialog'

function ReportPostList({ languageSelected }) {
    const navigate = useNavigate()

    const languageDisplay = languageSelected === 'EN' ? english : vietnamese
    const languageTypePost = languageSelected === 'EN' ? typePostEnglish : typePostVietnamese
    const languageReasonReport = languageSelected === 'EN' ? englishReasonReport : vietnameseReasonReport

    const [changeData, setChangeData] = useState(true)

    const [numberPage, setNumberPage] = useState(1)
    const [numberOfPages, setNumberOfPages] = useState([])

    const [showConfirm, setShowConfirm] = useState(false)
    const [titleConfirm, setTitleConfirm] = useState('asd')
    const [contentConfirm, setContentConfirm] = useState('asd')
    const callbackConfirm = useRef(() => { })
    const [isRed, setIsRed] = useState(true)
    const [textOk, setTextOk] = useState('Ok')
    const [textCancel, setTextCancel] = useState('Cancel')

    const [showConfirmAlert, setShowConfirmAlert] = useState(false)
    const [shortReason, setShortReason] = useState(languageDisplay.txtSummaryReason)
    const [fullReason, setFullReason] = useState(languageDisplay.txtFullReason)

    const [accountId, setAccountId] = useState(0)

    const [listReportPost, setListReportPost] = useState([])

    useEffect(() => {
        axios.get(API_GET_LIST_POST, {
            params: {
                page: numberPage,
                size: 4,
                checkReport: 1
            }
        }).then((res) => {
            const data = res.data.data
            let listReportPostRaw = []
            if (data.content.length === 0) {
                setListReportPost([])
            }
            data.content.forEach((post) => {
                let reportsRaw = []
                post.reportPostDTOList.forEach((report) => {
                    const reportItem = {
                        name: report.firstName + ' ' + report.lastName,
                        date: report.createDate,
                        reasonId: report.reasonReportPostId
                    }
                    reportsRaw.push(reportItem)
                })

                const reportPost = {
                    id: post.postId,
                    title: post.title,
                    topic: post.topicId,
                    accountId: post.accountId,
                    accountName: `${post.firstName} ${post.lastName !== null ? post.lastName : ''}`,
                    dateCreate: post.timePost.split('T')[0],
                    description: post.description,
                    content: post.content,
                    image: Forum1,
                    comment: [],
                    report: reportsRaw
                }
                getDownloadURL(ref(storage, `forum/${reportPost.id}/post/images/image-0`)).then((url) => {
                    reportPost.image = url
                    listReportPostRaw.push(reportPost)
                    if (listReportPostRaw.length === data.content.length) {
                        setListReportPost(listReportPostRaw)
                        const totalPage = data.totalPages
                        let numberOfPagesRaw = []
                        for (let i = 0; i < totalPage; i++) {
                            numberOfPagesRaw.push(i + 1)
                        }
                        setNumberOfPages(numberOfPagesRaw)
                    }
                })
            })
        }).catch((e) => setListReportPost([]))
    }, [numberPage, changeData])

    const handleBlockPost = (postId) => {
        axios.put(`${API_BLOCK_POST}${postId}`)
            .then(() => {
                setChangeData(!changeData)
                toast.success(languageDisplay.txtBlocked)
            }).catch((e) => console.error(e))
    }

    const handleDeleteReport = (postId, isBlock) => {
        setShowConfirmAlert(false)
        setShowConfirm(false)
        //choc api
        axios.delete(`${API_DELETE_REPORT_POST}${postId}`).then(() => {
            if ([...listReportPost].length === 1 && numberPage > 1) {
                setNumberPage(numberPage - 1)
            }
            setChangeData(!changeData)
            toast.success(languageDisplay.txtKeeped)
        }).catch(e => {
            console.error(e)
        })
    }

    const handleClickBlock = (postId, accountId) => {
        setAccountId(accountId)
        callbackConfirm.current = () => handleBlockPost(postId)
        setShowConfirmAlert(true)
    }

    const handleClickKeepIt = (title, content, callback, isRed, textOk, textCancel) => {
        setShowConfirm(true)
        setTitleConfirm(title)
        setContentConfirm(content)
        callbackConfirm.current = callback
        setIsRed(isRed)
        setTextOk(textOk)
        setTextCancel(textCancel)
    }

    return (
        <div>
            {showConfirm &&
                <ConfirmDialog textOk={textOk} textCancel={textCancel} title={titleConfirm} content={contentConfirm} callback={callbackConfirm.current} isRed={isRed} setShowDialog={setShowConfirm} />
            }
            {showConfirmAlert &&
                <PopupCreateAlert callback={callbackConfirm.current} textOk={languageDisplay.txtBlock}
                    textCancel={languageDisplay.txtCancel} title={languageDisplay.txtBlock}
                    shortReason={shortReason}
                    fullReason={fullReason} accountId={accountId}
                    isRed={true} setShowDialog={setShowConfirmAlert} />
            }
            <div className='d-flex'>
                {listReportPost.map((post, index) => (
                    <div className='bg-white box-shadow-common br-10 w-22 mlr-2-5-per tab-report'>
                        <div className='bd-bottom'>
                            <div className='p-10 d-flex space-between pb-0'>
                                <div className='d-flex center-vertical link-to-tour'
                                    onClick={() => navigate('/admin/forum/post', { state: { post: post } })}>
                                    <div className='text-bold font-16'>
                                        {post.title.substring(0, 25)}{post.title.length > 25 && '...'}
                                    </div>
                                    <AiFillCaretRight />
                                </div>
                                <div>
                                    <Menu menuButton={<MenuButton className='btn-action'><BsThreeDotsVertical /></MenuButton>} transition>
                                        <MenuItem onClick={() => handleClickBlock(post.id, post.accountId)}>
                                            <BiTrashAlt />{languageSelected === 'EN' ? 'Block' : 'Khoá'}
                                        </MenuItem>
                                        <MenuItem
                                            onClick={() => handleClickKeepIt(languageDisplay.txtKeepIt, languageDisplay.txtWarningKeepIt,
                                                () => handleDeleteReport(post.id, false), false, languageDisplay.txtKeepIt, languageDisplay.txtCancel)}>
                                            <GrStatusGood />{languageSelected === 'EN' ? 'Keep it' : 'Giữ lại'}
                                        </MenuItem>
                                    </Menu>
                                </div>
                            </div>
                            <div className='p-10 color-gray font-14'>{languageTypePost[parseInt(post.topic) - 1].label}</div>
                        </div>
                        <div className='list-overflow'>
                            <Scrollbars>
                                {post.report.map((report) => (
                                    <div className='bg-white box-shadow-common br-10 p-20 m-10'>
                                        <div className='text-bold'>{report.name}</div>
                                        <input type='date' disabled className='fake-label color-gray font-14' value={report.date} />
                                        <div>{languageReasonReport[parseInt(report.reasonId) - 1]}</div>
                                    </div>
                                ))}
                            </Scrollbars>
                        </div>
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

export default memo(ReportPostList)