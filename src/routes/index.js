import Home from '../components/pages/Home';
import Register from '../components/pages/Register';
import VerifyEmail from '../components/pages/VerifyEmail';
import RegisterInfomationLayout from '../components/Layout/RegisterInfomationLayout';
import RegisterInformation from '../components/pages/RegisterInformation';
import RegisterProfilePartner from '../components/pages/RegisterProfilePartner';
import ChangePassword from '../components/pages/ChangePassword';
import CreateService from '../components/pages/CreateService';
import PartnerHome from '../components/pages/PartnerHome';
import Hiring from '../components/images/hiring.png';
import Camping1 from '../components/images/camping1.png';
import SelectDetailService from '../components/pages/SelectDetailService';
import RegisterInformationServiceLayout from '../components/Layout/RegisterInformationServiceLayout';
import HeaderOnly from '../components/Layout/HeaderOnly';
import AdminHome from '../components/Layout/AdminHome';
import AdminSuppliersAccommodation from '../components/pages/AdminSuppliersAccommodation';
import AdminSuppliersEntertainment from '../components/pages/AdminSuppliersEntertainment';
import AdminSuppliersRestaurant from '../components/pages/AdminSuppliersRestaurant';
import ViewInformationDetailService from '../components/pages/ViewInformationDetailService';
import ViewListServicePending from '../components/pages/ViewListServicePending';
import ListTourProduct from '../components/pages/ListTourProduct';
import CreateTour from '../components/pages/CreateTour';
import TourList from '../components/pages/TourList';
import TourDetail from '../components/pages/TourDetail';
import BookingTour from '../components/pages/BookingTour';
import AfterPay from '../components/pages/AfterPay';
import ViewBookingList from '../components/pages/ViewBookingList';
import ListPartner from '../components/pages/ListPartner';
import ListCustomer from '../components/pages/ListCustomer';
import ProfileLayout from '../components/Layout/ProfileLayout';
import NotFound from '../components/pages/NotFound';
import ViewTour from '../components/pages/ViewTour';
import ViewInformationDetailPartner from '../components/pages/ViewInformationDetailPartner';
import ViewProfileCustomer from '../components/pages/ViewProfileCustomer';
import ListBookingTable from '../components/pages/ListBookingTable';
import ListPostForum from '../components/pages/ListPostForum';
import PostDetailForum from '../components/pages/PostDetailForum';
import MyPost from '../components/pages/MyPost';
import CreatePost from '../components/pages/CreatePost'
import ChangePasswordAccount from '../components/pages/ChangePasswordAccount';
import AdminDashboard from '../components/pages/AdminDashboard';
import RequestCancelList from '../components/pages/RequestCancelList';
import RequestCancelDetail from '../components/pages/RequestCancelDetail';
import ReportFeedbackList from '../components/pages/ReportFeedbackList';
import ReportPostList from '../components/pages/ReportPostList';
import ServicesList from '../components/pages/ServicesList';
import ServiceDetail from '../components/pages/ServiceDetail';

const publicRoute = [
    { path: '/', needLogin: false, component: Home },
    { path: '/register', needLogin: false, component: Register, layout: null, role: 3 },
    { path: '/register-partner', needLogin: false, component: Register, layout: null, role: 2 },
    { path: '/checkmail', needLogin: false, component: VerifyEmail, layout: null },
    { path: '/register-information-customer', needLogin: false, component: RegisterInformation, layout: RegisterInfomationLayout, image: Camping1, role: 3 },
    { path: '/register-information-partner', needLogin: false, component: RegisterInformation, layout: RegisterInfomationLayout, image: Hiring, role: 2 },
    { path: '/register-profile-partner', needLogin: false, role: 2, component: RegisterProfilePartner, layout: HeaderOnly },
    { path: '/forgot-password', needLogin: false, component: ChangePassword, layout: RegisterInfomationLayout, changePassword: true },
    { path: '/change-password-account', needLogin: true, component: ChangePasswordAccount, layout: RegisterInfomationLayout, changePassword: true, needAccount: true },
    { path: '/admin/change-password-account', needLogin: true, component: ChangePasswordAccount, layout: RegisterInfomationLayout, changePassword: true, needAccount: true },
    { path: '/select-service', needLogin: false, component: CreateService, layout: HeaderOnly },
    { path: '/partner', needLogin: false, component: PartnerHome, layout: HeaderOnly },
    { path: '/partner/select-detail-service', needLogin: true, component: SelectDetailService, layout: HeaderOnly },
    { path: '/partner/register-information-service', needLogin: true, component: RegisterInformationServiceLayout, layout: HeaderOnly },
    { path: '/partner/edit-service', needLogin: true, component: RegisterInformationServiceLayout, layout: HeaderOnly },
    { path: '/admin/dashboard', needLogin: true, component: AdminDashboard, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/suppliers/accommodation', needLogin: true, component: AdminSuppliersAccommodation, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/suppliers/entertainment', needLogin: true, component: AdminSuppliersEntertainment, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/suppliers/restaurant', needLogin: true, component: AdminSuppliersRestaurant, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/service-confirm', needLogin: true, component: ViewListServicePending, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/view-service-confirm', needLogin: true, component: ViewInformationDetailService, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/view-service', needLogin: true, component: ViewInformationDetailService, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/services/tour-product', needLogin: true, component: ListTourProduct, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/services/create-tour', needLogin: true, component: CreateTour, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/booking', needLogin: true, component: ViewBookingList, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/request-cancel', needLogin: true, component: RequestCancelList, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/partners', needLogin: true, component: ListPartner, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/customers', needLogin: true, component: ListCustomer, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/view-detail-tour', needLogin: true, component: ViewTour, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/edit-tour', needLogin: true, component: ViewTour, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/view-detail-service', needLogin: true, component: ViewInformationDetailService, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/tours', needLogin: false, component: TourList },
    { path: '/tour-detail', needLogin: false, component: TourDetail },
    { path: '/admin/preview', needLogin: true, component: TourDetail },
    { path: '/booking-tour', needLogin: true, component: BookingTour },
    { path: '/afterpay', needLogin: true, component: AfterPay, layout: null },
    { path: '/profile', needLogin: true, component: ProfileLayout },
    { path: '/*', needLogin: false, component: NotFound },
    { path: '/admin/view-detail-partner', needLogin: true, component: ViewInformationDetailPartner, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/view-detail-customer', needLogin: true, component: ViewProfileCustomer, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/booking/list-booking', needLogin: true, component: ListBookingTable, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/forum', needLogin: false, component: ListPostForum },
    { path: '/forum/post', needLogin: false, component: PostDetailForum },
    { path: '/admin/forum', needLogin: true, component: ListPostForum },
    { path: '/admin/forum/post', needLogin: true, component: PostDetailForum },
    { path: '/my-post', needLogin: true, component: MyPost },
    { path: '/admin/my-post', needLogin: true, component: MyPost },
    { path: '/create-post', needLogin: true, component: CreatePost },
    { path: '/admin/create-post', needLogin: true, component: CreatePost },
    { path: '/edit-post', needLogin: true, component: CreatePost },
    { path: '/admin/edit-post', needLogin: true, component: CreatePost },
    { path: '/admin/view-detail-request-cancel', needLogin: true, component: RequestCancelDetail, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/report/feedback', needLogin: true, component: ReportFeedbackList, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/report/post', needLogin: true, component: ReportPostList, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/services', needLogin: false, component: ServicesList },
    { path: '/service-detail', needLogin: false, component: ServiceDetail },
    { path: '/admin/detail-service', needLogin: true, component: ServiceDetail }
]

const privateRoute = [

]

export { publicRoute, privateRoute }