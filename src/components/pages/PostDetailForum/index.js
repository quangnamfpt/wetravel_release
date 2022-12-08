import { memo, useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './PostDetailForum.scss'
import { typePostEnglish, typePostVietnamese } from '../../Languages/ListPostForum'
import { english, vietnamese } from '../../Languages/PostDetailForum'
import Carousel from 'react-multi-carousel';
import Lottie from 'lottie-react'
import UploadingAnimation from '../../Animation/uploading.json'
import { CgDanger } from 'react-icons/cg'
import PopupReport from '../../Layout/PopupReport';
import { BiTrashAlt } from 'react-icons/bi'
import PopupCreateAlert from '../../Layout/PopupCreateAlert'

const responsive = {
    desktop: {
        breakpoint: { max: 1920, min: 1080 },
        items: 3,
        slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
    }
};

function PostDetailForum({ languageSelected }) {
    const navigate = useNavigate()

    const languageTypePost = languageSelected === 'EN' ? typePostEnglish : typePostVietnamese
    const languageList = languageSelected === 'EN' ? english : vietnamese

    const [showReport, setShowReport] = useState(false)
    const [idReasonReport, setIdReasonReport] = useState(0)

    const role = sessionStorage.getItem('role')

    const createReportPost = () => {
        console.log('Post report: ', post.id)
    }
    const blockPost = () => {
        console.log('Post report: ', post.id)
    }
    const callbackConfirm = useRef(role == 1 ? blockPost : createReportPost)

    const [showConfirm, setShowConfirm] = useState(false)
    const [titleConfirm, setTitleConfirm] = useState(languageList.txtBlock)
    const [shortReason, setShortReason] = useState(languageList.txtShortReason)
    const [fullReason, setFullReason] = useState(languageList.txtFullReason)
    const [isRed, setIsRed] = useState(true)
    const [textOk, setTextOk] = useState(languageList.txtBlock)
    const [textCancel, setTextCancel] = useState(languageList.txtCancel)

    const handleClickBlock = () => {
        setShowConfirm(true)
    }

    const [newComment, setNewComment] = useState('')
    const [newReply, setNewReply] = useState('')

    const id = sessionStorage.getItem('id')

    const postParam = useLocation().state.post

    const [post, setPost] = useState(postParam)
    const listPost = useLocation().state.listPost
    const index = useLocation().state.index

    useEffect(() => {
        setPost(postParam)
    }, [postParam.id])

    const handleClickReport = () => {
        setShowReport(true)
    }

    const handleClickBtnReply = (id) => {
        const element = document.getElementById(id)
        if (element.style.display === 'block') {
            element.style.display = 'none'
        } else {
            element.style.display = 'block'
            element.scrollIntoView({
                behavior: 'auto',
                block: 'center',
                inline: 'center'
            })
        }
    }

    const handleClickSendComment = () => {
        if (newComment !== '') {
            const firstName = sessionStorage.getItem('firstName')
            const lastName = sessionStorage.getItem('lastName')
            let listCommentCurrent = [...post.comment]
            let addComment = {
                content: newComment,
                isUploaded: false,
                name: firstName + ' ' + lastName,
                createDate: new Date().toISOString().split('T')[0],
                reply: [],
                parentComment: null
            }
            listCommentCurrent.splice(0, 0, addComment);
            for (let i = 0; i < post.comment.length; i++) {
                const element = document.getElementById(`reply-input-${i}`)
                element.style.display = 'none'
            }
            setPost({ ...post, comment: listCommentCurrent })
            setNewComment('')
        }
    }

    const handleClickReplyComment = (index, id) => {
        if (newReply !== '') {
            const firstName = sessionStorage.getItem('firstName')
            const lastName = sessionStorage.getItem('lastName')
            let listReplyCurrent = [...post.comment]
            let addReply = {
                content: newReply,
                isUploaded: false,
                name: firstName + ' ' + lastName,
                createDate: new Date().toISOString().split('T')[0],
                parentComment: id
            }
            listReplyCurrent[index].reply.push(addReply)
            setPost({ ...post, comment: listReplyCurrent })
            setNewReply('')
        }
    }

    return (
        <div className='container post-detail'>
            {showConfirm &&
                <PopupCreateAlert textOk={textOk} textCancel={textCancel} title={titleConfirm} shortReason={shortReason} fullReason={fullReason} callback={callbackConfirm.current} isRed={isRed} setShowDialog={setShowConfirm} />
            }
            {showReport && <PopupReport setShowReport={setShowReport} languageSelected={languageSelected} idReason={idReasonReport} setIdReason={setIdReasonReport} callback={callbackConfirm} />}
            <img src={post.image} className='w-75 bg-image rotation-0 mt-20 mb-20 image-post-detail' />
            <div className='w-75 bg-white pd-20 main-content-post-detail'>
                <div className='content-post-detail topic-post mb-20'>{languageTypePost[parseInt(post.topic) - 1].label.toUpperCase()}</div>
                <div className='content-post-detail title-post-detail mb-20'>{post.title}</div>
                <div className='content-post-detail d-flex center-horizontal mb-20'>
                    <label className='text-bold mr-20'>{post.accountName}</label>
                    <input type='date' disabled className='fake-label date-create-post-detail' value={post.dateCreate} />
                </div>
                <div className='content-post-detail text-bold'>{post.description}</div>
                <div className='content-post-detail text-left' dangerouslySetInnerHTML={{ __html: post.content }}></div>
                {role !== null &&
                    <>
                        {role != 1 ?
                            <div className='content-post-detail requird-star link-report'
                                onClick={handleClickReport}>
                                <CgDanger />{languageList.txtReport}
                            </div>
                            :
                            <div className='content-post-detail requird-star link-report'
                                onClick={handleClickBlock}>
                                <BiTrashAlt />{languageSelected === 'EN' ? 'Block' : 'Khoá'}
                            </div>
                        }
                    </>
                }
                <div className='content-post-detail space-comment'>
                    {role !== null &&
                        <div className='input-comment d-flex'>
                            <input type='text' value={newComment} placeholder={languageList.txtComment} className='w-75 input-comment-post-detail'
                                onChange={(e) => setNewComment(e.target.value)} />
                            <button className='btn btn-primary w-25 btn-send-comment'
                                onClick={handleClickSendComment}>
                                {languageList.txtSend}
                            </button>
                        </div>
                    }
                    {post.comment.map((comment, index) => (
                        <div className='space-each-comment text-left'>
                            <div className='hover-comment'>
                                <div className='title m-0'>
                                    <div className='mark-comment' />
                                    <div className='d-flex space-between'>
                                        <div className='name-comment d-flex'>
                                            <label className={`${!comment.isUploaded && 'comment-uploading'}`}>{comment.name}</label>
                                            {!comment.isUploaded &&
                                                <Lottie
                                                    animationData={UploadingAnimation}
                                                    autoPlay
                                                    loop
                                                    className='uploading-ani-comment' />
                                            }
                                        </div>
                                    </div>
                                </div>
                                <input type='date' disabled className='fake-label mb-10 create-date-post-detail' value={comment.createDate} />
                                <div className={`content-word-wrap ${!comment.isUploaded && 'comment-uploading'}`}>{comment.content}</div>
                                {role !== null &&
                                    <div className={`btn-reply-post-detail ${!comment.isUploaded && 'comment-uploading'}`} onClick={() => comment.isUploaded && handleClickBtnReply(`reply-input-${index}`)}>{languageList.txtReply}</div>
                                }
                            </div>
                            <div className='space-reply mt-20'>
                                {comment.reply.map((reply) => (
                                    <div className='mt-20 hover-reply'>
                                        <div className='title m-0 title-reply'>
                                            <div className='mark-reply' />
                                            <div className='name-comment d-flex'>
                                                <label className={`${!reply.isUploaded && 'comment-uploading'}`}>{reply.name}</label>
                                                {!reply.isUploaded &&
                                                    <Lottie
                                                        animationData={UploadingAnimation}
                                                        autoPlay
                                                        loop
                                                        className='uploading-ani-comment' />
                                                }
                                            </div>
                                        </div>
                                        <div className={`create-date-post-detail date-reply ${!reply.isUploaded && 'comment-uploading'}`}>{reply.createDate}</div>
                                        <div className={`content-word-wrap content-reply ${!reply.isUploaded && 'comment-uploading'}`}>{reply.content}</div>
                                    </div>
                                ))}
                            </div>
                            <div id={`reply-input-${index}`} className='reply-box'>
                                <div className='d-flex'>
                                    <input value={newReply} onChange={(e) => setNewReply(e.target.value)} type="text" className='reply-input' placeholder={languageList.txtRespondToComments} />
                                    <button className='btn btn-send-reply w-15' onClick={() => handleClickReplyComment(index, comment.id)}>
                                        {languageList.txtReply}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className='w-100 bg-white mt-20 bg-another-post'>
                <header className='title text-left'>{languageList.txtAnotherPost}</header>
                <div>
                    <Carousel autoPlay={true}
                        autoPlaySpeed={3000}
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
                        {listPost.map((item, indexPost) => (
                            indexPost !== index &&
                            <div className='each-post-another' onClick={() => navigate(role != 1 ? '/forum/post' : '/admin/forum/post', { state: { post: item, listPost: listPost, index: indexPost } })}>
                                <img src={item.image} className='image-another-post-slide' />
                                <div className='topic-another-post'>{languageTypePost[parseInt(item.topic) - 1].label.toUpperCase()}</div>
                                <div className='title m-0 title-another-post'>{item.title}</div>
                                <div className='title text-left account-name-another-post'>{item.accountName}</div>
                            </div>
                        ))}
                    </Carousel>
                </div>
            </div >
        </div >
    )
}

export default memo(PostDetailForum)