import { memo, createContext } from 'react'
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { englishAdminMenu, vietnameseAdminMenu } from '../../Languages/AdminMenu';
import { AiFillCaretLeft, AiFillCaretRight, AiOutlineCheckCircle, AiOutlineApartment } from 'react-icons/ai'
import { MdOutlineTour, MdOutlineTouchApp, MdPeopleOutline, MdOutlineFeedback } from 'react-icons/md'
import { FaRegHandshake } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { HiOutlineHome } from 'react-icons/hi'
import { StickyContainer, Sticky } from 'react-sticky';
import './AdminHome.scss'

export const OnShowSidebar = createContext()

function AdminHome({ languageSelected, children }) {
    const navigate = useNavigate()
    let adminMenuLabel = (languageSelected === 'EN' ? englishAdminMenu : vietnameseAdminMenu)
    const pathName = window.location.pathname

    const { collapseSidebar, collapsed } = useProSidebar();

    const handleClickOpenCloseSidebar = () => {
        collapseSidebar();
    }

    const handleClickMenuItem = (path) => {
        navigate(path)
    }

    return (
        <OnShowSidebar.Provider value={collapsed}>
            <div className='container home-main'>
                <StickyContainer>
                    <div className='home-partner-main d-flex'>
                        <Sidebar className='menu-sidebar-admin'>
                            <Sticky>
                                {({ style }) => (
                                    <Menu style={style}>
                                        <MenuItem className='menu-item-left' onClick={handleClickOpenCloseSidebar} icon={collapsed ? <AiFillCaretLeft /> : <AiFillCaretRight />} />
                                        <MenuItem icon={<HiOutlineHome />}
                                            onClick={() => handleClickMenuItem('/admin/dashboard')}
                                            className={`menu-item-left ${pathName === '/admin/dashboard' && 'selected-menu-item-admin'}`}>
                                            {adminMenuLabel.txtDashboard}
                                        </MenuItem>
                                        <SubMenu icon={<AiOutlineApartment />} className='menu-item-left menu-sub-main' label={adminMenuLabel.txtSuppliers}>
                                            <MenuItem onClick={() => handleClickMenuItem('/admin/suppliers/accommodation')}
                                                className={`menu-item-left item-sub-menu ${pathName === '/admin/suppliers/accommodation' ? 'selected-menu-item-admin' : 'unselected-menu-item-admin'}`}>
                                                {adminMenuLabel.txtAccommodation}
                                            </MenuItem>
                                            <MenuItem onClick={() => handleClickMenuItem('/admin/suppliers/entertainment')}
                                                className={`menu-item-left item-sub-menu ${pathName === '/admin/suppliers/entertainment' ? 'selected-menu-item-admin' : 'unselected-menu-item-admin'}`}>
                                                {adminMenuLabel.txtEntertainment}
                                            </MenuItem>
                                            <MenuItem onClick={() => handleClickMenuItem('/admin/suppliers/restaurant')} className={`menu-item-left item-sub-menu ${pathName === '/admin/suppliers/restaurant' ? 'selected-menu-item-admin' : 'unselected-menu-item-admin'}`}>
                                                {adminMenuLabel.txtRestaurant}
                                            </MenuItem>
                                        </SubMenu>
                                        <MenuItem icon={<MdOutlineTour />} onClick={() => navigate('/admin/services/tour-product')} className={`menu-item-left ${pathName === '/admin/services/tour-product' && 'selected-menu-item-admin'}`}>
                                            {adminMenuLabel.txtTourProduct}
                                        </MenuItem>
                                        <SubMenu label={adminMenuLabel.txtBooking} icon={<MdOutlineTouchApp />} className='menu-item-left menu-sub-main'>
                                            <MenuItem onClick={() => navigate('/admin/booking')} className={`menu-item-left item-sub-menu ${pathName === '/admin/booking' && 'selected-menu-item-admin'}`}>
                                                {adminMenuLabel.txtHistoryBooking}
                                            </MenuItem>
                                            <MenuItem onClick={() => navigate('/admin/request-cancel')} className={`menu-item-left item-sub-menu ${pathName === '/admin/request-cancel' && 'selected-menu-item-admin'}`}>
                                                {adminMenuLabel.txtRequestCancellation}
                                            </MenuItem>
                                        </SubMenu>
                                        <MenuItem onClick={() => navigate('/admin/customers')} icon={<MdPeopleOutline />} className={`menu-item-left ${pathName === '/admin/customers' && 'selected-menu-item-admin'}`}>
                                            {adminMenuLabel.txtCustomer}
                                        </MenuItem>
                                        <MenuItem onClick={() => navigate('/admin/partners')} icon={<FaRegHandshake />} className={`menu-item-left ${pathName === '/admin/partners' && 'selected-menu-item-admin'}`}>
                                            {adminMenuLabel.txtPartner}
                                        </MenuItem>
                                        <SubMenu label={adminMenuLabel.txtReport} icon={<MdOutlineFeedback />} className='menu-item-left menu-sub-main'>
                                            <MenuItem onClick={() => navigate('/admin/report/feedback')} className={`menu-item-left item-sub-menu ${pathName === '/admin/report/feedback' && 'selected-menu-item-admin'}`}>
                                                {adminMenuLabel.txtFeedback}
                                            </MenuItem>
                                            <MenuItem onClick={() => navigate('/admin/report/post')} className={`menu-item-left item-sub-menu ${pathName === '/admin/report/post' && 'selected-menu-item-admin'}`}>
                                                {adminMenuLabel.txtPost}
                                            </MenuItem>
                                        </SubMenu>
                                        <MenuItem onClick={() => navigate('/admin/service-confirm')} icon={<AiOutlineCheckCircle />} className={`menu-item-left ${pathName === '/admin/service-confirm' && 'selected-menu-item-admin'}`}>
                                            {adminMenuLabel.txtServiceConfirm}
                                        </MenuItem>
                                    </Menu>
                                )}
                            </Sticky>
                        </Sidebar>
                        <div className='content-right-admin' id='content-right-admin'>
                            {children}
                        </div>
                    </div>
                </StickyContainer>
            </div>
        </OnShowSidebar.Provider>
    )
}

export default memo(AdminHome)