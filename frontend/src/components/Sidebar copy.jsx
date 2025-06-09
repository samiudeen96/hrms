import { useNavigate, useLocation } from 'react-router-dom';
import { logo } from "../assets/index";
import { IoIosArrowDown } from "react-icons/io";
import { useState } from 'react';
// import { useDispatch } from 'react-redux';
import { useInfoModal } from '../hooks/infoModalHook';

const Sidebar = ({ menu }) => {
    const navigate = useNavigate();
    const location = useLocation();
    // const dispatch = useDispatch();
    const { showModal } = useInfoModal();
    const [openMenuKey, setOpenMenuKey] = useState(null);

    const handleLogout = () => {
        showModal({
            text1: "Are you sure you want to logout?",
            buttonName: "Logout",
            color: "bg-primary",
            actionType: "logout", // used in switch
        });
    };


    const menuHandler = (item) => {
        if (item.action === "logout") {
            handleLogout();
        } else if (item.path) {
            navigate(item.path);
        }
    };

    const handleParentClick = (key, hasChildren, child) => {
        if (hasChildren) {
            setOpenMenuKey((prevKey) => (prevKey === key ? null : key));
        } else {
            setOpenMenuKey(null);
            menuHandler(child);
        }
    };

    return (
        <div className="flex justify-center h-full">
            <div className="w-full">
                {/* Logo */}
                <div className="px-5 py-4">
                    <img className='h-8' src={logo} alt="logo" />
                </div>

                {/* Menu Rendering */}
                <div className='h-[calc(100vh-64px)] overflow-y-auto pb-3 px-5'>
                    {menu.map((item, index) => (
                        <div key={`menu-${index}`} className="">
                            {item.menu ? (
                                item.menu.map((child, childIndex) => {
                                    const key = `${index}-${childIndex}`;
                                    const isOpen = openMenuKey === key;

                                    // ✅ Make parent active if path matches or any child matches
                                    const isActive =
                                        (child.path && location.pathname.startsWith(child.path)) ||
                                        (child.children?.some(sub => sub.path === location.pathname));

                                    return (
                                        <div key={`child-${key}`} className="mb-2">
                                            {/* Parent Menu Item */}
                                            <div
                                                onClick={() => handleParentClick(key, !!child.children, child)}
                                                className={`flex items-center justify-between p-2 cursor-pointer border-l-3 hover:border-primary hover:text-primary
                                                ${isActive ? "border-primary bg-[#fff8f1] text-primary" : "border-white"}`}
                                            >
                                                <div className="flex items-center">
                                                    {child.icon && <child.icon className="mr-2 w-5 h-5" />}
                                                    <p className="text-xs">{child.name}</p>
                                                </div>
                                                {child.children && (
                                                    <IoIosArrowDown className={`transition-transform w-3 h-3 ${isOpen ? 'rotate-180' : ''}`} />
                                                )}
                                            </div>

                                            {/* Sub Menu Items */}
                                            {child.children && isOpen && (
                                                <div className="flex flex-col justify-center mt-1">
                                                    {child.children.map((subChild, subIndex) => {
                                                        const isSubActive = subChild.path === location.pathname;

                                                        return (
                                                            <div
                                                                key={`sub-child-${key}-${subIndex}`}
                                                                onClick={() => menuHandler(subChild)}
                                                                className={`line py-2 ps-3.5 text-xs cursor-pointer flex items-center group 
                                                                ${isSubActive ? "text-primary" : "text-gray-600 hover:text-primary"}`}
                                                            >
                                                                <div
                                                                    className={`z-10 rotate-45 w-2 h-2 absolute top-1/2 -translate-y-1/2 
                                                                    ${isSubActive ? "bg-primary" : "bg-gray-200 group-hover:bg-primary"}`}
                                                                />
                                                                <div className="ms-6">{subChild.name}</div>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })
                            ) : (
                                // Standalone Action (e.g. Logout)
                                <div
                                    className="flex items-center border-l-3 border-white p-2 hover:text-primary hover:border-primary cursor-pointer"
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
        </div>
    );
};

export default Sidebar;
