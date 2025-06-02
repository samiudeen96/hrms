import { adminMenu } from '../utils/constant'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from '../redux/reducers/authSlice';
import { modalOpen, modalClose } from '../redux/reducers/infoModalSlice';
import { logo } from "../assets/index"
import { IoIosArrowDown } from "react-icons/io";
import { useInfoModal } from '../hooks/infoModalHook';


const SideNav = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
     const { showModal } = useInfoModal();

    const handleLogout = () => {
        showModal({
            text1: "Are you sure you want to logout?",
            buttonName: "Logout",
            color: "bg-primary",
            actionType: "logout",
            onConfirm: () => dispatch(logout()), // Pass the logout action
        });
    };

    const menuHandler = (item) => {
        if (item.action === "logout") {
            handleLogout(); // Use the new modal system
        } else {
            navigate(item.path);
        }
    };

    return (
        <div className="w-60 bg-gray-50 border-r border-gray-200/50 sticky top-0 z-20 h-[100vh] flex justify-center p-5">
            <div className='w-full'>
                <div className='mb-10'>
                    <img src={logo} alt="logo" />
                </div>
                {adminMenu.map((item, index) => {
                    return (
                        <div key={`menu-${index}`} className="mb-3">
                            {item?.header && (
                                <>
                                    <p className='text-xs font-semibold mt-5 '>{item.header}</p>
                                    <div className='border-b-2 border-[#eeeeee] my-2'></div>
                                </>
                            )}

                            {/* Render menu items */}
                            {item.menu ? (
                                item.menu.map((child, childIndex) => (
                                    <div key={`child-${index}-${childIndex}`} onClick={() => menuHandler(child)} className={`${child.path === location.pathname ? "bg-primary text-white" : ""} flex items-center p-2 hover:bg-primary hover:text-white rounded cursor-pointer`}>
                                        {child.icon && <child.icon className="mr-2 w-5 h-5" />}
                                        <p className='text-sm'>{child.name}</p>
                                    </div>
                                ))
                            ) : (
                                // Render standalone items like logout
                                <div
                                    key={`action-${index}`}
                                    className="flex items-center p-2 hover:bg-primary hover:text-white rounded cursor-pointer"
                                    onClick={() => menuHandler(item)}
                                >
                                    {item.icon && <item.icon className="mr-2 w-5 h-5" />}
                                    <p className='text-sm'>{item.name}</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default SideNav;