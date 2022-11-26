import Hotel1 from '../../images/hotel-detail (1).png'
import Hotel2 from '../../images/hotel-detail (2).png'
import Hotel3 from '../../images/hotel-detail (3).png'
import Restaurant1 from '../../images/buffet.png'
import Restaurant2 from '../../images/casual.png'
import Restaurant3 from '../../images/snack.png'
import Restaurant4 from '../../images/otherRestaurant.png'
import Entertainment1 from '../../images/entertainment_relax.png'
import Entertainment2 from '../../images/entertainment2.png'
import Entertainment3 from '../../images/entertainment_other.png'
import Entertainment4 from '../../images/entertainment4.png'
import Entertainment5 from '../../images/entertainment5.png'

const beforeEnglishCampingServiceText = "Let's talk about the category of your "
const beforeVietnameseCampingServiceText = "Hãy cho chúng tôi biết về dịch vụ "

export const englishCampingServiceText = [`${beforeEnglishCampingServiceText} accommodation`, `${beforeEnglishCampingServiceText} entertainment`,
`${beforeEnglishCampingServiceText} restaurants'`]
export const vietnameseCampingServiceText = [`${beforeVietnameseCampingServiceText} chỗ ở của bạn`, `${beforeVietnameseCampingServiceText} giải trí của bạn`
    , `${beforeVietnameseCampingServiceText} nhà hàng của bạn`]

export const englishTypeService = [[{
    logo: Hotel3,
    title: 'Hotel',
    description: 'A commercial accommodation that provides private rooms with meals and guest services.'
},
{
    logo: Hotel1,
    title: 'Home Stay',
    description: 'A budget accommodation where the guest has private room while sharing some shared areas with other guests.'
},
{
    logo: Hotel2,
    title: 'Motel',
    description: "Guests will have the whole place to themselves—they don't have to share facilities such as bathrooms, common rooms, and kitchen with other guests."
}], [{
    logo: Entertainment5,
    title: 'Sightseeing',
    description: 'Activities of tourists during the day to visit a place with tourism resources for the purpose of learning and enjoying the values of tourism resources.'
},
{
    logo: Entertainment2,
    title: 'Sports & Outdoor ',
    description: 'Outdoor sports help participants have a better overall health, improve mental health, and improve quality of life.'
},
{
    logo: Entertainment4,
    title: 'Water sports & activities',
    description: "Sport is conducted in a natural environment giving you an enjoyable experience."
},
{
    logo: Entertainment1,
    title: 'Relaxation',
    description: "Provide you with resort services to relieve stress and fatigue."
},
{
    logo: Entertainment3,
    title: 'Other',
    description: "Other type of business."
}], [{
    logo: Restaurant1,
    title: 'Buffet restaurant',
    description: 'Customers can walk, stand or sit as they like when dining according to the self-service model according to their preferences.'
},
{
    logo: Restaurant2,
    title: 'Casual Dining restaurant',
    description: 'This is the most popular type of cuisine today, often serving many different customers but no less luxurious.'
},
{
    logo: Restaurant3,
    title: 'Snack Bar Restaurant',
    description: "A variety of drinks and snacks for customers to relax in the evening."
},
{
    logo: Restaurant4,
    title: 'Other',
    description: "Other type of business."
}]]

export const vietnameseTypeService = [[{
    logo: Hotel3,
    title: 'Khách Sạn',
    description: 'Một nơi lưu trú thương mại cung cấp các phòng riêng có thể bao gồm với các bữa ăn và dịch vụ khách.'
},
{
    logo: Hotel1,
    title: 'Nhà Dân',
    description: 'Một chỗ ở bình dân, nơi khách có phòng riêng trong khi chia sẻ một số khu vực chung với những khách khác.'
},
{
    logo: Hotel2,
    title: 'Nhà Nghỉ',
    description: "Du khách sẽ có toàn bộ nơi ở cho riêng mình — họ không phải dùng chung các tiện nghi như phòng tắm, phòng sinh hoạt chung và nhà bếp với những khách khác."
}], [{
    logo: Entertainment5,
    title: 'Tham quan',
    description: 'Hoạt động của khách du lịch trong ngày đến tham quan địa điểm có tài nguyên du lịch nhằm mục đích tìm hiểu, thưởng thức các giá trị của tài nguyên du lịch.'
},
{
    logo: Entertainment2,
    title: 'Thể thao & Ngoài trời',
    description: 'Các môn thể thao ngoài trời giúp người tham gia có một sức khỏe tổng thể tốt hơn, nâng cao trí lực, nâng cao chất lượng cuộc sống.'
},
{
    logo: Entertainment4,
    title: 'Hoạt động & thể thao dưới nước',
    description: "Các môn thể thao được tiến hành trong môi trường tự nhiên mang lại cho bạn trải nghiệm thú vị."
},
{
    logo: Entertainment1,
    title: 'Thư giãn',
    description: "Cung cấp cho bạn các dịch vụ nghỉ dưỡng để giải tỏa căng thẳng và mệt mỏi."
},
{
    logo: Entertainment3,
    title: 'Khác',
    description: "Loại hình kinh doanh khác."
}], [{
    logo: Restaurant1,
    title: 'Nhà hàng tự chọn',
    description: 'Khách hàng có thể đi, đứng hoặc ngồi tùy thích khi dùng bữa theo mô hình tự phục vụ theo sở thích.'
},
{
    logo: Restaurant2,
    title: 'Nhà hàng ăn tối thông thường',
    description: 'Đây là loại hình ẩm thực phổ biến nhất hiện nay, thường phục vụ nhiều đối tượng khách hàng khác nhau nhưng không kém phần sang trọng.'
},
{
    logo: Restaurant3,
    title: 'Nhà hàng Snack Bar',
    description: "Đồ uống và đồ ăn nhẹ đa dạng cho khách hàng thư giãn vào buổi tối."
},
{
    logo: Restaurant4,
    title: 'Khác',
    description: "Loại hình kinh doanh khác."
}]]