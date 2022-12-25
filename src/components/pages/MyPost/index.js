import { memo, useState, useEffect } from 'react'
import BackgroundForum from '../../images/bg_forum.jpg'
import Forum1 from '../../images/forum (1).jpg'
import Forum2 from '../../images/forum (2).jpg'
import { useNavigate } from 'react-router-dom'
import './MyPost.scss'
import { english, typePostEnglish, typePostVietnamese, vietnamese } from '../../Languages/ListPostForum'
import { BsChatLeftDots, BsThreeDotsVertical } from 'react-icons/bs'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { FiTrash } from 'react-icons/fi'
import { Scrollbars } from 'react-custom-scrollbars-2';
import Question from '../../images/question.png'
import axios from 'axios'
import { API_GET_LIST_POST } from '../../API'
import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from "../../../firebase/Config";

function MyPost({ languageSelected }) {
    const languageDisplay = languageSelected === 'EN' ? english : vietnamese
    const languageTypePost = languageSelected === 'EN' ? typePostEnglish : typePostVietnamese

    const navigate = useNavigate()

    const [listPost, setListPost] = useState([])

    useEffect(() => {
        axios.get(API_GET_LIST_POST, {
            params: {
                page: 1,
                size: 99999,
                accountId: sessionStorage.getItem('id')
            }
        }).then((res) => {
            const data = res.data.data.content
            let listPostRaw = []
            if (data.length === 0) {
                setListPost([])
            }
            data.forEach((item) => {
                const postRaw = {
                    id: item.postId,
                    topic: item.topicId,
                    accountId: item.accountId,
                    accountName: `${item.firstName} ${item.lastName !== null ? item.lastName : ''}`,
                    dateCreate: item.timePost.split('T')[0],
                    title: item.title,
                    description: item.description,
                    content: item.content,
                    isPublic: item.isPublic,
                    isBlock: item.isBlock,
                    image: Forum1,
                    comment: []
                }

                getDownloadURL(ref(storage, `forum/${postRaw.id}/post/images/image-0`)).then((url) => {
                    postRaw.image = url
                    listPostRaw.push(postRaw)
                    if (listPostRaw.length === data.length) {
                        setListPost(listPostRaw)
                    }
                })
            })
        }).catch(err => console.error(err))
    }, [])

    let listPostShow = []

    listPost.forEach((post) => {
        let postRaw = post
        let content = post.content.replace(/<br>/g, '<div class="mb-10"></div>')
        postRaw.content = content
        listPostShow.push(postRaw)
    })

    const role = sessionStorage.getItem('role')

    return (
        <div className='fade-in container bg-all-my-post'>
            <div className='bg-white bg-my-post m-20 mt-20'>
                <div className='header-my-post'>
                    <label className='text-bold font-20'>{languageSelected === 'EN' ? 'My post' : 'Bài viết của tôi'}</label>
                    <button className='btn btn-warning btn-create-new-post mb-0' onClick={() => role != 1 ? navigate('/create-post') : navigate('/admin/create-post')}>
                        {languageSelected === 'EN' ? 'Create new post' : 'Tạo bài viết mới'}
                    </button>
                </div>
                <div className='list-my-post'>
                    {listPostShow.length === 0 ?
                        <div className='my-post-blank'>
                            <img src={Question} />
                            <div className='font-20 text-bold'>
                                {languageSelected === 'EN' ? 'You have not posted any posts yet' : 'Bạn chưa đăng bài viết nào'}
                            </div>
                        </div>
                        :
                        <Scrollbars>
                            {listPostShow.map((post, index) => (
                                <>
                                    {index === 0 && <div className='mt-20' />}
                                    <div className='d-flex mb-20 mr-20 p-0-50 each-post'>
                                        <img src={post.image} className='image-list-port-forum' onClick={() => navigate(`/forum/post`, { state: { post: post, listPost: listPost, index: index } })} />
                                        <div className='pl-20 short-information-post w-100'>
                                            <div>
                                                <div className='d-flex space-between'>
                                                    <div onClick={() => navigate(`/forum/post`, { state: { post: post, listPost: listPost, index: index } })}
                                                        className='topic-post-in-list font-14 mb-10'>{languageTypePost[parseInt(post.topic) - 1].label.toUpperCase()}</div>
                                                    <div>
                                                        {!post.isBlock &&
                                                            <Menu menuButton={<MenuButton className='btn-action'><BsThreeDotsVertical /></MenuButton>} transition>
                                                                <MenuItem onClick={() => navigate(`${role == 1 ? '/admin/edit-post' : '/edit-post'}`, { state: { post: post } })}>
                                                                    <MdOutlineModeEditOutline /><label className='ml-5'>{languageDisplay.txtEdit}</label>
                                                                </MenuItem>
                                                            </Menu>
                                                        }
                                                    </div>
                                                </div>
                                                <div className='title m-0 font-20 title-post'
                                                    onClick={() => navigate(`/forum/post`, { state: { post: post, listPost: listPost, index: index } })}>
                                                    {post.title.substring(0, 100)}{post.title.length > 100 ? '...' : ''}
                                                </div>
                                                <div onClick={() => navigate(`/forum/post`, { state: { post: post, listPost: listPost, index: index } })}>
                                                    {post.description.substring(0, 150)}{post.description.length > 150 ? '...' : ''}
                                                </div>
                                            </div>
                                            <div className='d-flex space-between' onClick={() => navigate(`/forum/post`, { state: { post: post, listPost: listPost, index: index } })}>
                                                <div>
                                                    <label className='title m-0 font-14'>{post.accountName}</label>
                                                    <input type='date' className='fake-label pl-20' disabled value={post.dateCreate} />
                                                </div>
                                                <div>
                                                    <div>
                                                        {post.isBlock ?
                                                            <label className='text-bold blocked-post'>{languageSelected === 'EN' ? 'Blocked' : 'Đã khoá'}</label>
                                                            :
                                                            <>
                                                                {post.isPublic ?
                                                                    <label className='text-bold public-post'>{languageSelected === 'EN' ? 'Public' : 'Công khai'}</label>
                                                                    :
                                                                    <label className='text-bold private-post'>{languageSelected === 'EN' ? 'Private' : 'Riêng tư'}</label>
                                                                }
                                                            </>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            ))}
                        </Scrollbars>
                    }
                </div>
            </div>
        </div>
    )
}

export default memo(MyPost)