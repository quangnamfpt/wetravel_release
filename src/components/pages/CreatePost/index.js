import { memo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

function CreatePost({ languageSelected }) {
    const languageDisplay = languageSelected === 'EN' ? english : vietnamese
    const topicPost = languageSelected === 'EN' ? typePostEnglish : typePostVietnamese

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState()
    const [isPublish, setIsPublish] = useState(true)
    const [topic, setTopic] = useState(1)

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
        <div className='container container-create-post'>
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
                                <label className="d-block text-bold">{languageDisplay.txtDescription}</label>
                                <textarea value={description} rows={4} onChange={(e) => setDescription(e.target.value)}
                                    className="input-inline input-title-post" type='text' />
                            </div>
                        </div>
                        <div className="d-flex line-input mb-20">
                            <div className="input-alone">
                                <label className="d-block text-bold">{languageDisplay.txtContent}<span className="requird-star">*</span></label>
                                <ReactQuill
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
                                                    options={topicPost}
                                                    isSearchable={false}
                                                    hideSelectedOptions={false}
                                                    closeMenuOnSelect={true}
                                                    classNamePrefix="select"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <button className='btn btn-warning w-100 btn-submit-post'>{languageDisplay.txtPost}</button>
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