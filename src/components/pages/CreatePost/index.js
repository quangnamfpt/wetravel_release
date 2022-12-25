import { memo, useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { StickyContainer, Sticky } from 'react-sticky'
import { typePostVietnamese, typePostEnglish } from '../../Languages/ListPostForum'
import { english, vietnamese } from '../../Languages/CreatePost'
import './CreatePost.scss'
import ReactQuill from 'react-quill'
import Select from 'react-select';
import 'react-quill/dist/quill.bubble.css'
import { TbCameraPlus } from 'react-icons/tb'
import Switch from 'react-switch'
import ConfirmDialog from '../../Layout/ConfirmDialog'
import axios from 'axios'
import { API_ADD_POST, API_UPDATE_POST } from '../../API'
import { toast } from 'react-toastify'
import LoadingDialog from '../../Layout/LoadingDialog'
import { UploadImage } from '../../../firebase/UploadImage'

function CreatePost({ languageSelected }) {
    const languageDisplay = languageSelected === 'EN' ? english : vietnamese
    const topicPost = languageSelected === 'EN' ? typePostEnglish : typePostVietnamese

    const navigate = useNavigate()

    const postParam = useLocation().state

    const [showLoading, setShowLoading] = useState(false)

    const [showConfirm, setShowConfirm] = useState(false)
    const [titleConfirm, setTitleConfirm] = useState('asd')
    const [contentConfirm, setContentConfirm] = useState('asd')
    const callbackConfirm = useRef(() => { })
    const [isRed, setIsRed] = useState(true)
    const [textOk, setTextOk] = useState('Ok')
    const [textCancel, setTextCancel] = useState('Cancel')

    const [id, setId] = useState(0)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState()
    const [isPublish, setIsPublish] = useState(true)
    const [topic, setTopic] = useState(1)

    const role = sessionStorage.getItem('role')

    const editPost = window.location.pathname.includes('edit-post')

    useEffect(() => {
        if (editPost) {
            const post = postParam.post
            setId(post.id)
            setTitle(post.title)
            setDescription(post.description)
            setContent(post.content)
            setIsPublish(post.isPublic)
            setTopic(parseInt(post.topic))

            axios({
                url: post.image,
                method: 'GET',
                responseType: 'blob',
            }).then(blob => {
                setImage(blob.data)
            })
        }
    }, [])

    const [leng, setLeng] = useState(0)
    useEffect(() => {
        if (leng === 1) {
            setShowLoading(false)
            toast.success(editPost ? languageDisplay.txtEditSuccess : languageDisplay.txtPostSuccess)
            navigate(`${role == 1 ? '/admin/my-post' : '/my-post'}`)
        }
    }, [leng])

    const handleClickShowConfig = (title, content, callback, isRed, textOk, textCancel) => {
        if (title === '' || description === '' || content === '' || content === '<p><br></p>' || content.replace(/ /g, '') === '<p></p>'
            || !image) {
            toast.error(languageDisplay.txtWarningFullInformation)
        }
        else {
            setShowConfirm(true)
            setTitleConfirm(title)
            setContentConfirm(content)
            callbackConfirm.current = callback
            setIsRed(isRed)
            setTextOk(textOk)
            setTextCancel(textCancel)
        }
    }

    const handlePost = () => {
        setShowLoading(true)
        const data = {
            "topicId": topic,
            "accountId": sessionStorage.getItem('id'),
            "title": title,
            "description": description,
            "content": content,
            "isPublic": isPublish
        }
        axios.post(API_ADD_POST, data).then((res) => {
            UploadImage([image], 'forum', 1, setLeng, res.data.data.postId, 'post', 0, 'images')
        }).catch((err) => {
            setShowLoading(false)
            console.error(err)
        })
        setShowConfirm(false)
    }

    const handleEditPost = () => {
        const data = {
            "topicId": topic,
            "accountId": sessionStorage.getItem('id'),
            "title": title,
            "description": description,
            "content": content,
            "isPublic": isPublish
        }
        console.log(data)
        axios.put(`${API_UPDATE_POST}${id}`, data).then((res) => {
            UploadImage([image], 'forum', 1, setLeng, id, 'post', 0, 'images')
        }).catch((err) => {
            setShowLoading(false)
            console.error(err)
        })
    }

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ 'header': 1 }, { 'header': 2 }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }],
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'font': [] }],
            [{ 'align': [] }],
            ['clean'],
        ]
    }

    const formats = [
        'header', 'font', 'background', 'color', 'code', 'size',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent', 'script', 'align', 'direction',
        'link', 'image', 'code-block', 'formula', 'video'
    ]

    return (
        <div className='fade-in container container-create-post'>
            {showLoading &&
                <LoadingDialog />}
            {showConfirm &&
                <ConfirmDialog textOk={textOk} textCancel={textCancel} title={titleConfirm} content={contentConfirm} callback={callbackConfirm.current} isRed={isRed} setShowDialog={setShowConfirm} />
            }
            <StickyContainer>
                <div className='d-flex'>
                    <div className='w-75 min-100-vh bg-common mr-20'>
                        <h2 className='text-bold mb-20'>{languageDisplay.txtCreateNewPost}</h2>
                        <div className="d-flex line-input">
                            <div className="input-alone">
                                <label className="d-block text-bold">{languageDisplay.txtPostTitle}<span className="requird-star">*</span></label>
                                <input value={title} onChange={(e) => setTitle(e.target.value)}
                                    className="input-inline input-title-post" type='text' />
                            </div>
                        </div>
                        <div className="d-flex line-input">
                            <div className="input-alone">
                                <label className="d-block text-bold">{languageDisplay.txtDescription}<span className="requird-star">*</span></label>
                                <textarea value={description} rows={4} onChange={(e) => setDescription(e.target.value)}
                                    className="input-inline input-title-post" type='text' />
                            </div>
                        </div>
                        <div className="d-flex line-input mb-20">
                            <div className="input-alone">
                                <label className="d-block text-bold">{languageDisplay.txtContent}<span className="requird-star">*</span></label>
                                <ReactQuill
                                    value={content}
                                    defaultValue={content}
                                    onChange={setContent}
                                    className="input-inline border-none quill-create-tour"
                                    theme="snow" modules={modules} formats={formats} />
                            </div>
                        </div>
                        <div className="d-flex line-input mb-20">
                            <div className="input-alone">
                                <label className="d-block text-bold">{languageDisplay.txtImage}<span className="requird-star">*</span></label>
                                <label htmlFor='select-image-create-post' className='input-inline space-select-image-create-post'>
                                    <input hidden id='select-image-create-post' type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
                                    {image ?
                                        <img className='image-select-create-post' src={URL.createObjectURL(image)} />
                                        :
                                        <label htmlFor='select-image-create-post'>
                                            <div className="select-image-service select-image-tour" >
                                                <TbCameraPlus className='icon-camera-plus' />
                                                <div className='text-camera-plus d-block'>{languageDisplay.txtAddImage}</div>
                                            </div>
                                        </label>
                                    }
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='w-25'>
                        <Sticky>
                            {({ style }) => (
                                <div style={style}>
                                    <div className='bg-common'>
                                        <div className='d-flex space-between'>
                                            <label className="d-block text-bold">{languageDisplay.txtPublish}</label>
                                            <Switch
                                                onChange={setIsPublish}
                                                checked={isPublish}
                                                onColor='#235EFA'
                                                uncheckedIcon={false}
                                                checkedIcon={false}
                                                className="react-switch"
                                            />
                                        </div>
                                        <div className="d-flex line-input mt-20">
                                            <div className="input-alone">
                                                <label className="d-block title-create-tour">{languageDisplay.txtTopic}</label>
                                                <Select className='input-inline basic-multi-select'
                                                    onChange={(e) => setTopic(e.value)}
                                                    defaultValue={topicPost[parseInt(topic - 1)]}
                                                    value={topicPost[parseInt(topic - 1)]}
                                                    options={topicPost}
                                                    isSearchable={false}
                                                    hideSelectedOptions={false}
                                                    closeMenuOnSelect={true}
                                                    classNamePrefix="select"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button className='btn btn-warning w-100 btn-submit-post'
                                        onClick={() => editPost ?
                                            handleClickShowConfig(languageDisplay.txtEditPost, languageDisplay.txtWarningEditPost,
                                                () => handleEditPost(), false, languageDisplay.txtEdit, languageDisplay.txtCancel)
                                            :
                                            handleClickShowConfig(languageDisplay.txtPost, languageDisplay.txtWarningPost,
                                                () => handlePost(), false, languageDisplay.txtPost, languageDisplay.txtCancel)}>
                                        {editPost ? languageDisplay.txtEditPost : languageDisplay.txtPost}
                                    </button>
                                </div>
                            )}
                        </Sticky>
                    </div>
                </div>
            </StickyContainer>
        </div>
    )
}

export default memo(CreatePost)