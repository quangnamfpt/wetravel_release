import { memo, useState } from 'react'
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

function ReportPostList({ languageSelected }) {
    const navigate = useNavigate()

    const languageTypePost = languageSelected === 'EN' ? typePostEnglish : typePostVietnamese

    const [listPostFeedback, setListPostFeedback] = useState([
        {
            postId: 1,
            title: 'Phượt hết Đà Nẵng chỉ với 1 triệu đồng',
            topicId: 1,
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
            postId: 1,
            title: 'Phượt hết Đà Nẵng chỉ với 1 triệu đồng',
            topicId: 1,
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
        }, {
            postId: 1,
            title: 'Phượt hết Đà Nẵng chỉ với 1 triệu đồng',
            topicId: 1,
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
        }, {
            postId: 1,
            title: 'Phượt hết Đà Nẵng chỉ với 1 triệu đồng',
            topicId: 1,
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

    return (
        <div>
            <div className='d-flex'>
                {listPostFeedback.map((post) => (
                    <div className='bg-white box-shadow-common br-10 w-22 mlr-2-5-per tab-report'>
                        <div className='bd-bottom'>
                            <div className='p-10 d-flex space-between pb-0'>
                                <div className='d-flex center-vertical link-to-tour'>
                                    <div className='text-bold font-16'
                                        onClick={() => navigate('/admin/preview', { state: { id: post.postId } })}>
                                        {post.title.substring(0, 25)}{post.title.length > 25 && '...'}
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
                            <div className='p-10 color-gray font-14'>{languageTypePost[parseInt(post.topicId) - 1].label}</div>
                        </div>
                        <div className='list-overflow'>
                            <Scrollbars>
                                {post.report.map((report) => (
                                    <div className='bg-white box-shadow-common br-10 p-20 m-10'>
                                        <div className='text-bold'>{report.name}</div>
                                        <input type='date' disabled className='fake-label color-gray font-14' value={report.date} />
                                        <div>{report.content}</div>
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