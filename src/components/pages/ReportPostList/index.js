import { memo, useState } from 'react'
import { AiFillCaretRight, AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

function ReportPostList({ languageSelected }) {
    const navigate = useNavigate()

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
                                <div className='d-flex center-vertical link-to-tour mr-20'>
                                    <div className='text-bold font-16'
                                        onClick={() => navigate('/admin/preview', { state: { id: post.postId } })}>
                                        {post.title}
                                    </div>
                                    <AiFillCaretRight />
                                </div>
                                <div>...</div>
                            </div>
                            <div className='p-10 color-gray font-14'>{post.topicId}</div>
                        </div>
                        {post.report.map((report) => (
                            <div className='bg-white box-shadow-common br-10 p-20 m-10'>
                                <div className='text-bold'>{report.name}</div>
                                <input type='date' disabled className='fake-label color-gray font-14' value={report.date} />
                                <div>{report.content}</div>
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

export default memo(ReportPostList)