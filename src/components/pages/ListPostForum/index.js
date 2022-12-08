import { memo, useState, useEffect, useRef } from 'react'
import BackgroundForum from '../../images/bg_forum.jpg'
import Forum1 from '../../images/forum (1).jpg'
import Forum2 from '../../images/forum (2).jpg'
import { FaRegPaperPlane } from 'react-icons/fa'
import './ListPostForum.scss'
import { english, typePostEnglish, typePostVietnamese, vietnamese } from '../../Languages/ListPostForum'
import { BsChatLeftDots, BsThreeDotsVertical } from 'react-icons/bs'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import { StickyContainer, Sticky } from 'react-sticky'
import { useNavigate } from 'react-router-dom'
import { CgDanger } from 'react-icons/cg'
import { FiTrash } from 'react-icons/fi'
import PopupCreateAlert from '../../Layout/PopupCreateAlert'
import PopupReport from '../../Layout/PopupReport';
import { API_GET_LIST_POST } from '../../API'
import axios from 'axios'

function ListPostForum({ languageSelected }) {
    const languageDisplay = languageSelected === 'EN' ? english : vietnamese
    const languageTypePost = languageSelected === 'EN' ? typePostEnglish : typePostVietnamese

    const navigate = useNavigate()

    const [showConfirm, setShowConfirm] = useState(false)
    const [titleConfirm, setTitleConfirm] = useState(languageDisplay.txtDelete)
    const [shortReason, setShortReason] = useState(languageDisplay.txtShortReason)
    const [fullReason, setFullReason] = useState(languageDisplay.txtWarningDelete)
    const callbackConfirm = useRef(() => { })
    const [isRed, setIsRed] = useState(true)
    const [textOk, setTextOk] = useState(languageDisplay.txtDelete)
    const [textCancel, setTextCancel] = useState(languageDisplay.txtCancel)

    const [searchTitle, setSearchTitle] = useState('')
    const [changeSearch, setChangeSearch] = useState(true)

    const [showReport, setShowReport] = useState(false)
    const [idReasonReport, setIdReasonReport] = useState(0)

    const [topicSelected, setTopicSelected] = useState([])
    const [listPost, setListPost] = useState([])

    const [numberPage, setNumberPage] = useState(1)
    const [numberOfPages, setNumberOfPages] = useState([])

    useEffect(() => {
        axios.get(API_GET_LIST_POST, {
            params: {
                page: numberPage,
                size: 7,
                topicList: topicSelected.join(','),
                title: searchTitle,
                isPublic: 1,
                isBlock: 0
            }
        }).then((res) => {
            const data = res.data.data.content
            let listPostRaw = []
            data.forEach((item) => {
                const postRaw = {
                    id: 1,
                    topic: item.topicId,
                    accountId: item.accountId,
                    accountName: 'Nguyen Van A',
                    dateCreate: item.timePost.split('T')[0],
                    title: item.title,
                    description: item.description,
                    content: item.content,
                    image: Forum1,
                    comment: [
                        {
                            id: 1,
                            name: 'Xuan Quy',
                            createDate: '2022-03-08',
                            content: 'Thông tin của anh bạn đưa ra hay quá, tôi cũng sẽ làm thử.',
                            isUploaded: true,
                            status: true,
                            reply: [
                                {
                                    id: 1,
                                    name: 'Quang Nam',
                                    createDate: '2022-03-08',
                                    content: 'Đó là một trải nghiệm tuyệt vời',
                                    isUploaded: true,
                                    status: true
                                },
                                {
                                    id: 1,
                                    name: 'Xuan Quy',
                                    createDate: '2022-03-08',
                                    content: 'Cảm ơn',
                                    isUploaded: true,
                                    status: true
                                }
                            ]
                        }
                    ]
                }
                listPostRaw.push(postRaw)
            })
            setListPost(listPostRaw)
        }).catch(err => console.error(err))
    }, [numberPage, topicSelected, changeSearch])

    const handleSelectTopic = (value) => {
        let topicSelectedRaw = [...topicSelected]
        const indexTopic = topicSelectedRaw.indexOf(value)
        if (indexTopic !== -1) {
            topicSelectedRaw.splice(indexTopic, 1)
        } else {
            topicSelectedRaw.push(value)
        }
        setTopicSelected([...topicSelectedRaw])
    }

    const handleClickBlock = (callback) => {
        setShowConfirm(true)
        callbackConfirm.current = callback
    }

    const handleBlockPost = (idPost) => {
        console.log('idPost: ', idPost)
        setShowConfirm(false)
    }

    const handleClickReport = (callback) => {
        setShowReport(true)
        callbackConfirm.current = callback
    }

    const createReportPost = (idPost) => {
        console.log('createReportPost: ', idPost)
    }

    let listPostShow = []

    listPost.forEach((post) => {
        let postRaw = post
        let contentShort = postRaw.description.substring(0, 150)
        postRaw.contentShort = `${contentShort}${postRaw.description.length > 150 && '...'}`
        let content = post.content.replace(/<br>/g, '<div class="mb-10"></div>')
        postRaw.content = content
        listPostShow.push(postRaw)
    })

    const role = useRef(sessionStorage.getItem('role'))

    return (
        <div className='container home-main'>
            {showReport && <PopupReport setShowReport={setShowReport} languageSelected={languageSelected} idReason={idReasonReport} setIdReason={setIdReasonReport} callback={callbackConfirm.current} />}
            {showConfirm &&
                <PopupCreateAlert textOk={textOk} textCancel={textCancel} title={titleConfirm} shortReason={shortReason} fullReason={fullReason} callback={callbackConfirm.current} isRed={isRed} setShowDialog={setShowConfirm} />
            }
            <img src={BackgroundForum} className='bg-image rotation-0' />
            <div className='border-search container search w-86'>
                <FaRegPaperPlane className='icon-search' />
                <input className='input-search' placeholder={languageDisplay.txtSearchByName}
                    onChange={(e) => setSearchTitle(e.target.value)} />
                <button className='btn-search'
                    onClick={() => setChangeSearch(!changeSearch)}>{languageDisplay.txtSearch}</button>
            </div>
            <div className='container'>
                <div className='bg-white bg-list-post'>
                    <div className='container mb-50'>
                        <div className='text-center title-travel-forum'>{languageDisplay.txtTitle}</div>
                        <div className='text-center description-travel-forum'>{languageDisplay.txtDescription}</div>
                    </div>
                    <StickyContainer>
                        <div className='d-flex'>
                            <div className='w-70'>
                                <div className='d-flex space-between'>
                                    <header className='title mb-10'>{languageDisplay.txtForYou}</header>
                                    {role.current &&
                                        <button onClick={() => navigate(role.current != 1 ? '/my-post' : '/admin/my-post')} className='btn btn-warning mr-20 btn-create-new-post'>{languageDisplay.txtCreateNewPost}</button>
                                    }
                                </div>
                                {listPostShow.map((post, index) => (
                                    <div className='d-flex mb-20 mr-20'>
                                        <img src={post.image} className='image-list-port-forum' />
                                        <div className='pl-20 short-information-post w-100'>
                                            <div>
                                                <div className='d-flex space-between'>
                                                    <div className='topic-post-in-list font-14 mb-10'>{languageTypePost[parseInt(post.topic) - 1].label.toUpperCase()}</div>
                                                    <div>
                                                        {role.current !== null &&
                                                            <Menu menuButton={<MenuButton className='btn-action'><BsThreeDotsVertical /></MenuButton>} transition>
                                                                {role.current == 1 ?
                                                                    <MenuItem
                                                                        onClick={() => handleClickBlock(() => handleBlockPost(post.id))}>
                                                                        <FiTrash /><label className='ml-5'>{languageDisplay.txtDelete}</label>
                                                                    </MenuItem>
                                                                    :
                                                                    <>
                                                                        {post.accountId != sessionStorage.getItem('id') &&
                                                                            <MenuItem className='requird-star'
                                                                                onClick={() => handleClickReport(() => createReportPost(post.id))}>
                                                                                <CgDanger /><label className='ml-5'>{languageDisplay.txtReport}</label>
                                                                            </MenuItem>
                                                                        }
                                                                    </>
                                                                }
                                                            </Menu>
                                                        }
                                                    </div>
                                                </div>
                                                <div className='title m-0 font-20 each-post' onClick={() => navigate(role.current != 1 ? '/forum/post' : '/admin/forum/post', { state: { post: post, listPost: listPost, index: index } })}>{post.title}</div>
                                                <div>{post.contentShort}</div>
                                            </div>
                                            <div className='d-flex space-between'>
                                                <div>
                                                    <label className='title m-0 font-14'>{post.accountName}</label>
                                                    <input type='date' className='fake-label pl-20' disabled value={post.dateCreate} />
                                                </div>
                                                <div>
                                                    <BsChatLeftDots />
                                                    <label className='pl-5'>{post.comment.length}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
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
                            </div>
                            <div className='w-30'>
                                <Sticky>
                                    {({ style }) => (
                                        <div style={style}>
                                            <header className='title m-0'>{languageDisplay.txtTopic}</header>
                                            <div className='list-all-topic mt-10'>
                                                {
                                                    languageTypePost.map((topic, index) => (
                                                        <label className={`fade-in-${index} select-topic ${topicSelected.indexOf(topic.value) !== -1 && 'selected-topic'}`}
                                                            onClick={() => handleSelectTopic(topic.value)}>{topic.label}</label>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    )}
                                </Sticky>

                            </div>
                        </div>
                    </StickyContainer>
                </div>
            </div>
        </div >
    )
}

export default memo(ListPostForum)