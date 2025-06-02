import { adminMenu } from '../utils/constant';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/reducers/authSlice';
import { logo } from "../assets/index";
import { IoIosArrowDown } from "react-icons/io";
import { useInfoModal } from '../hooks/infoModalHook';
import { useState } from 'react';

const SideBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { showModal } = useInfoModal();

    const [openMenus, setOpenMenus] = useState({});

    const toggleMenu = (index) => {
        setOpenMenus((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const handleLogout = () => {
        showModal({
            text1: "Are you sure you want to logout?",
            buttonName: "Logout",
            color: "bg-primary",
            actionType: "logout",
            onConfirm: () => dispatch(logout()),
        });
    };

    const menuHandler = (item) => {
        if (item.action === "logout") {
            handleLogout();
        } else if (item.path) {
            navigate(item.path);
        }
    };

    return (
        <div className="w-60 border-r border-gray-200/50 sticky top-0 z-20 h-[100vh] flex justify-center p-5">
            <div className="w-full">
                {/* Logo */}
                <div className="mb-10">
                    <img src={logo} alt="logo" />
                </div>

                {/* Menu Rendering */}
                {adminMenu.map((item, index) => (
                    <div key={`menu-${index}`} className="mb-3">
                        {item?.header && (
                            <>
                                <div className="border-b-2 border-gray-200/50 mt-3"></div>
                                <p className="text-xs text-gray-400 my-2">{item.header}</p>
                            </>
                        )}

                        {item.menu ? (
                            item.menu.map((child, childIndex) => {
                                const isOpen = openMenus[`${index}-${childIndex}`];
                                const isActive = child.path === location.pathname;

                                return (
                                    <div key={`child-${index}-${childIndex}`} className="mb-2">
                                        {/* Parent Menu Item */}
                                        <div
                                            onClick={() => {
                                                if (child.children) {
                                                    toggleMenu(`${index}-${childIndex}`);
                                                } else {
                                                    menuHandler(child);
                                                }
                                            }}
                                            className={`flex items-center justify-between p-2 rounded cursor-pointer hover:bg-primary hover:text-white ${isActive ? "bg-primary text-white" : ""
                                                }`}
                                        >
                                            <div className="flex items-center">
                                                {child.icon && <child.icon className="mr-2 w-5 h-5" />}
                                                <p className="text-sm">{child.name}</p>
                                            </div>
                                            {child.children && <IoIosArrowDown className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />}
                                        </div>

                                        {/* Sub Menu Items */}
                                        {child.children && isOpen && (

                                            <div className={`flex flex-col justify-center ${child.children ? "mt-1" : ""}`}>
                                                {isOpen && (
                                                    child.children.map((subChild, subIndex) => {
                                                        const isSubActive = subChild.path === location.pathname;
                                                        return (
                                                            <div
                                                                key={`sub-child-${index}-${childIndex}-${subIndex}`}
                                                                onClick={() => menuHandler(subChild)}
                                                                className={`line py-2 ps-3 text-xs cursor-pointer flex items-center group ${isSubActive ? "text-primary font-semibold" : "text-gray-600 hover:text-primary"
                                                                    }`}
                                                            >
                                                                {/* <div className='rounded-full w-2.5 h-2.5 bg-gray-200/50 absolute z-10' /> */}
                                                                <div className={`z-10 rounded-full w-2.5 h-2.5  absolute top-1/2 -translate-y-1/2 ${isSubActive ? "bg-primary" : "bg-gray-200 group-hover:bg-primary"
                                                                    }`}/>
                                                                <div className='ms-6'>{subChild.name}</div>
                                                            </div>
                                                        )
                                                    })
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            })
                        ) : (
                            // Standalone Action (e.g. Logout)
                            <div
                                className="flex items-center p-2 hover:bg-primary hover:text-white rounded cursor-pointer"
                                onClick={() => menuHandler(item)}
                            >
                                {item.icon && <item.icon className="mr-2 w-5 h-5" />}
                                <p className="text-sm">{item.name}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SideBar;
