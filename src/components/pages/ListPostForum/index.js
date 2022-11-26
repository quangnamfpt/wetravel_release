import { memo, useState, useEffect } from 'react'
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

function ListPostForum({ languageSelected }) {
    const languageDisplay = languageSelected === 'EN' ? english : vietnamese
    const languageTypePost = languageSelected === 'EN' ? typePostEnglish : typePostVietnamese

    const navigate = useNavigate()

    const [showListTopic, setShowListTopic] = useState(false)
    const [topicSelected, setTopicSelected] = useState([])
    const [listPost, setListPost] = useState([
        {
            id: 1,
            topic: 1,
            accountName: 'Nguyen Van A',
            dateCreate: '2022-01-01',
            title: 'ABC Phượt hết Đà Nẵng chỉ với 1 triệu đồng',
            description: 'ABC Là thiên đường nghỉ dưỡng với những bãi biển đẹp, trải nghiệm vui chơi, giải trí và đồ ăn ngon với mức giá phải chăng, Đà Nẵng là điểm đến lý tưởng cho giới trẻ mê khám phá.            ',
            content: '<p>Di chuyển không tốn kém</p><p><br></p><p>Đến Đà Nẵng, du khách có thể sử dụng dịch vụ cho thuê xe máy vốn rất phổ biến. Với chi phí khoảng 80.000-120.000 đồng/ngày, du khách có thể tiết kiệm được một khoản kha khá. Ngoài ra, hệ thống xe bus, taxi cùng nhiều dịch vụ đặt xe qua ứng dụng tại Đà Nẵng cũng được nhiều du khách ưa chuộng vì không quá đắt đỏ.</p><p>Nhiều điểm tham quan miễn phí</p><p><br></p><p>Đến Đà Nẵng, du khách có thể ghé qua nhiều điểm tham quan miễn phí nhưng không kém phần hấp dẫn như công viên Biển Đông, sông Hàn, bán đảo Sơn Trà...</p><p><br></p><p>Du khách có thể thử thức dậy thật sớm, vừa ngắm bình minh, vừa dạo biển tại công viên Biển Đông. Tại đây, ngoài tận hưởng không gian trong lành, du khách sẽ được chiêm ngưỡng những ngọn núi trên bán đảo Sơn Trà và tượng Phật Bà của chùa Linh Ứng. Cho bồ câu ăn lúc 7h30 sáng hàng ngày là trải nghiệm khó bỏ qua khi đến đây.</p><p><br></p><p>Trên đường đi đến bán đảo Sơn Trà, từ trung tâm thành phố chạy xe theo đường Hoàng Sa, Lê Đức Thọ, du khách sẽ bắt gặp một bến tàu là nơi tập trung nhiều thuyền thúng và những bãi hoa muống biển thơ mộng. Ngoài ra, bãi đá Obama (giá vé 10.000 đồng/người), bãi Rạng, bãi Bụt (chỉ thu phí khi khách thuê chòi)... cũng là điểm đáng đến.</p><p>Đến bán đảo, du khách có thể tham quan một số địa điểm miễn phí như chùa Linh Ứng, đỉnh Bàn Cờ… Đỉnh Bàn Cờ là nơi ngắm toàn cảnh Đà Nẵng, từ đường bờ biển, các tòa cao ốc san sát tới những cây cầu bắc qua sông Hàn.</p>',
            image: Forum1,
            status: true,
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
                },
                {
                    id: 2,
                    name: 'Gia Bẻo',
                    createDate: '2022-03-08',
                    content: 'Tôi đã từng trải nghiệm, nó không hẳn là một trải nghiệm đáng tiền cho lắm',
                    isUploaded: true,
                    status: true,
                    reply: [
                        {
                            id: 1,
                            name: 'Xuân Quý',
                            createDate: '2022-03-08',
                            content: 'Có chuyện gì vậy', isUploaded: true,
                            status: true,
                        }
                    ]
                },
                {
                    id: 3,
                    name: 'Hoàng Sơn',
                    createDate: '2022-03-08',
                    content: 'Không quá ấn tượng',
                    reply: [],
                    isUploaded: true,
                    status: true,
                },
            ]
        },
        {
            id: 1,
            topic: 2,
            accountName: 'Nguyen Van A',
            dateCreate: '2022-01-01',
            title: 'XYZ Phượt hết Đà Nẵng chỉ với 1 triệu đồng',
            description: 'XYZ Là thiên đường nghỉ dưỡng với những bãi biển đẹp, trải nghiệm vui chơi, giải trí và đồ ăn ngon với mức giá phải chăng, Đà Nẵng là điểm đến lý tưởng cho giới trẻ mê khám phá.            ',
            content: '<p>Di chuyển không tốn kém</p>',
            image: Forum2,
            status: true,
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
                },
                {
                    id: 2,
                    name: 'Gia Bẻo',
                    createDate: '2022-03-08',
                    content: 'Tôi đã từng trải nghiệm, nó không hẳn là một trải nghiệm đáng tiền cho lắm',
                    isUploaded: true,
                    status: true,
                    reply: [
                        {
                            id: 1,
                            name: 'Xuân Quý',
                            createDate: '2022-03-08',
                            content: 'Có chuyện gì vậy', isUploaded: true,
                            status: true,
                        }
                    ]
                },
                {
                    id: 3,
                    name: 'Hoàng Sơn',
                    createDate: '2022-03-08',
                    content: 'Không quá ấn tượng',
                    reply: [],
                    isUploaded: true,
                    status: true,
                },
            ]
        },
        {
            id: 1,
            topic: 2,
            accountName: 'Nguyen Van A',
            dateCreate: '2022-01-01',
            title: 'XYZ Phượt hết Đà Nẵng chỉ với 1 triệu đồng',
            description: 'XYZ Là thiên đường nghỉ dưỡng với những bãi biển đẹp, trải nghiệm vui chơi, giải trí và đồ ăn ngon với mức giá phải chăng, Đà Nẵng là điểm đến lý tưởng cho giới trẻ mê khám phá.            ',
            content: '<p>Di chuyển không tốn kém</p>',
            image: BackgroundForum,
            status: true,
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
                },
                {
                    id: 2,
                    name: 'Gia Bẻo',
                    createDate: '2022-03-08',
                    content: 'Tôi đã từng trải nghiệm, nó không hẳn là một trải nghiệm đáng tiền cho lắm',
                    isUploaded: true,
                    status: true,
                    reply: [
                        {
                            id: 1,
                            name: 'Xuân Quý',
                            createDate: '2022-03-08',
                            content: 'Có chuyện gì vậy', isUploaded: true,
                            status: true,
                        }
                    ]
                },
                {
                    id: 3,
                    name: 'Hoàng Sơn',
                    createDate: '2022-03-08',
                    content: 'Không quá ấn tượng',
                    reply: [],
                    isUploaded: true,
                    status: true,
                },
            ]
        },
        {
            id: 1,
            topic: 2,
            accountName: 'Nguyen Van A',
            dateCreate: '2022-01-01',
            title: 'XYZ Phượt hết Đà Nẵng chỉ với 1 triệu đồng',
            description: 'XYZ Là thiên đường nghỉ dưỡng với những bãi biển đẹp, trải nghiệm vui chơi, giải trí và đồ ăn ngon với mức giá phải chăng, Đà Nẵng là điểm đến lý tưởng cho giới trẻ mê khám phá.            ',
            content: '<p>Di chuyển không tốn kém</p>',
            image: BackgroundForum,
            status: true,
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
                },
                {
                    id: 2,
                    name: 'Gia Bẻo',
                    createDate: '2022-03-08',
                    content: 'Tôi đã từng trải nghiệm, nó không hẳn là một trải nghiệm đáng tiền cho lắm',
                    isUploaded: true,
                    status: true,
                    reply: [
                        {
                            id: 1,
                            name: 'Xuân Quý',
                            createDate: '2022-03-08',
                            content: 'Có chuyện gì vậy', isUploaded: true,
                            status: true,
                        }
                    ]
                },
                {
                    id: 3,
                    name: 'Hoàng Sơn',
                    createDate: '2022-03-08',
                    content: 'Không quá ấn tượng',
                    reply: [],
                    isUploaded: true,
                    status: true,
                },
            ]
        },
        {
            id: 1,
            topic: 2,
            accountName: 'Nguyen Van A',
            dateCreate: '2022-01-01',
            title: 'XYZ Phượt hết Đà Nẵng chỉ với 1 triệu đồng',
            description: 'XYZ Là thiên đường nghỉ dưỡng với những bãi biển đẹp, trải nghiệm vui chơi, giải trí và đồ ăn ngon với mức giá phải chăng, Đà Nẵng là điểm đến lý tưởng cho giới trẻ mê khám phá.            ',
            content: '<p>Di chuyển không tốn kém</p>',
            image: BackgroundForum,
            status: true,
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
                },
                {
                    id: 2,
                    name: 'Gia Bẻo',
                    createDate: '2022-03-08',
                    content: 'Tôi đã từng trải nghiệm, nó không hẳn là một trải nghiệm đáng tiền cho lắm',
                    isUploaded: true,
                    status: true,
                    reply: [
                        {
                            id: 1,
                            name: 'Xuân Quý',
                            createDate: '2022-03-08',
                            content: 'Có chuyện gì vậy', isUploaded: true,
                            status: true,
                        }
                    ]
                },
                {
                    id: 3,
                    name: 'Hoàng Sơn',
                    createDate: '2022-03-08',
                    content: 'Không quá ấn tượng',
                    reply: [],
                    isUploaded: true,
                    status: true,
                },
            ]
        },
        {
            id: 1,
            topic: 2,
            accountName: 'Nguyen Van A',
            dateCreate: '2022-01-01',
            title: 'XYZ Phượt hết Đà Nẵng chỉ với 1 triệu đồng',
            description: 'XYZ Là thiên đường nghỉ dưỡng với những bãi biển đẹp, trải nghiệm vui chơi, giải trí và đồ ăn ngon với mức giá phải chăng, Đà Nẵng là điểm đến lý tưởng cho giới trẻ mê khám phá.            ',
            content: '<p>Di chuyển không tốn kém</p>',
            image: BackgroundForum,
            status: true,
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
                },
                {
                    id: 2,
                    name: 'Gia Bẻo',
                    createDate: '2022-03-08',
                    content: 'Tôi đã từng trải nghiệm, nó không hẳn là một trải nghiệm đáng tiền cho lắm',
                    isUploaded: true,
                    status: true,
                    reply: [
                        {
                            id: 1,
                            name: 'Xuân Quý',
                            createDate: '2022-03-08',
                            content: 'Có chuyện gì vậy', isUploaded: true,
                            status: true,
                        }
                    ]
                },
                {
                    id: 3,
                    name: 'Hoàng Sơn',
                    createDate: '2022-03-08',
                    content: 'Không quá ấn tượng',
                    reply: [],
                    isUploaded: true,
                    status: true,
                },
            ]
        }
    ])

    const [numberPage, setNumberPage] = useState(1)
    const [numberOfPages, setNumberOfPages] = useState([1, 2, 3])

    useEffect(() => {

    }, [])

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

    let listPostShow = []

    listPost.forEach((post) => {
        let postRaw = post
        let contentShort = postRaw.content.substring(0, 130)
        contentShort = contentShort.replace(/<p>|<br>|<div class="mb-10"><\/div>/g, '')
        contentShort = contentShort.replace(/<\/p>/g, ' ')
        contentShort = contentShort.replace(/  /g, '. ')
        postRaw.contentShort = contentShort + '...'
        let content = post.content.replace(/<br>/g, '<div class="mb-10"></div>')
        postRaw.content = content
        listPostShow.push(postRaw)
    })

    return (
        <div className='container home-main'>
            <img src={BackgroundForum} className='bg-image rotation-0' />
            <div className='border-search container search w-86'>
                <FaRegPaperPlane className='icon-search' />
                <input className='input-search' placeholder={languageDisplay.txtSearchByName} />
                <button className='btn-search'>{languageDisplay.txtSearch}</button>
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
                                <header className='title mb-10'>{languageDisplay.txtForYou}</header>
                                {listPostShow.map((post, index) => (
                                    <div className='d-flex mb-20 mr-20'>
                                        <img src={post.image} className='image-list-port-forum' />
                                        <div className='pl-20 short-information-post w-100'>
                                            <div>
                                                <div className='d-flex space-between'>
                                                    <div className='topic-post-in-list font-14 mb-10'>{languageTypePost[parseInt(post.topic) - 1].label.toUpperCase()}</div>
                                                    <div>
                                                        <Menu menuButton={<MenuButton className='btn-action'><BsThreeDotsVertical /></MenuButton>} transition>
                                                            <MenuItem className='requird-star'>
                                                                <CgDanger /><label className='ml-5'>{languageDisplay.txtReport}</label>
                                                            </MenuItem>
                                                            {/* {sessionStorage.getItem('role') == 1 && */}
                                                            <MenuItem>
                                                                <FiTrash /><label className='ml-5'>{languageDisplay.txtDelete}</label>
                                                            </MenuItem>
                                                            {/* } */}
                                                        </Menu>
                                                    </div>
                                                </div>
                                                <div className='title m-0 font-20 each-post' onClick={() => navigate('/forum/post', { state: { post: post, listPost: listPost, index: index } })}>{post.title}</div>
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