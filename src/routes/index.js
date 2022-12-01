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
import AdminSuppliers from '../components/pages/AdminSuppliers';
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
    { path: '/', component: Home },
    { path: '/register', component: Register, layout: null, role: 3 },
    { path: '/register-partner', component: Register, layout: null, role: 2 },
    { path: '/checkmail', component: VerifyEmail, layout: null },
    { path: '/register-information-customer', component: RegisterInformation, layout: RegisterInfomationLayout, image: Camping1, role: 3 },
    { path: '/register-information-partner', component: RegisterInformation, layout: RegisterInfomationLayout, image: Hiring, role: 2 },
    { path: '/register-profile-partner', role: 2, component: RegisterProfilePartner, layout: HeaderOnly },
    { path: '/change-password', component: ChangePassword, layout: RegisterInfomationLayout, changePassword: true },
    { path: '/change-password-account', component: ChangePasswordAccount, layout: RegisterInfomationLayout, changePassword: true, needAccount: true },
    { path: '/admin/change-password-account', component: ChangePasswordAccount, layout: RegisterInfomationLayout, changePassword: true, needAccount: true },
    { path: '/select-service', component: CreateService, layout: HeaderOnly },
    { path: '/partner', component: PartnerHome, layout: HeaderOnly },
    { path: '/partner/select-detail-service', component: SelectDetailService, layout: HeaderOnly },
    { path: '/partner/register-information-service', component: RegisterInformationServiceLayout, layout: HeaderOnly },
    { path: '/partner/edit-service', component: RegisterInformationServiceLayout, layout: HeaderOnly },
    { path: '/admin/dashboard', component: AdminDashboard, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/suppliers/accommodation', component: AdminSuppliers, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/suppliers/entertainment', component: AdminSuppliers, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/suppliers/restaurant', component: AdminSuppliers, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/service-confirm', component: ViewListServicePending, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/view-service-confirm', component: ViewInformationDetailService, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/view-service', component: ViewInformationDetailService, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/services/tour-product', component: ListTourProduct, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/services/create-tour', component: CreateTour, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/booking', component: ViewBookingList, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/request-cancel', component: RequestCancelList, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/partners', component: ListPartner, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/customers', component: ListCustomer, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/view-detail-tour', component: ViewTour, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/edit-tour', component: ViewTour, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/view-detail-service', component: ViewInformationDetailService, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/tours', component: TourList },
    { path: '/tour-detail', component: TourDetail },
    { path: '/admin/preview', component: TourDetail },
    { path: '/booking-tour', component: BookingTour },
    { path: '/afterpay', component: AfterPay, layout: null },
    { path: '/profile', component: ProfileLayout },
    { path: '/*', component: NotFound },
    { path: '/admin/view-detail-partner', component: ViewInformationDetailPartner, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/view-detail-customer', component: ViewProfileCustomer, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/booking/list-booking', component: ListBookingTable, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/forum', component: ListPostForum },
    { path: '/forum/post', component: PostDetailForum },
    { path: '/admin/forum', component: ListPostForum },
    { path: '/admin/forum/post', component: PostDetailForum },
    { path: '/my-post', component: MyPost },
    { path: '/admin/my-post', component: MyPost },
    { path: '/create-post', component: CreatePost },
    { path: '/admin/create-post', component: CreatePost },
    { path: '/admin/view-detail-request-cancel', component: RequestCancelDetail, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/report/feedback', component: ReportFeedbackList, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/admin/report/post', component: ReportPostList, layout: HeaderOnly, secondLayout: AdminHome },
    { path: '/services', component: ServicesList },
    { path: '/service-detail', component: ServiceDetail }
]

const privateRoute = [

]

export { publicRoute, privateRoute }