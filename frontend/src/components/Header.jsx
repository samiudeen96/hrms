import React, { useRef, useState, useEffect } from 'react';
import { GoBell } from "react-icons/go";
import { FaUser } from "react-icons/fa6";
import { headerDropdown } from "../utils/constant"
import { useInfoModal } from '../hooks/infoModalHook';
import { useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useSelector } from 'react-redux';
import { IoIosArrowDown } from "react-icons/io";

const Header = ({menu}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { loggedData } = useSelector((state) => state.auth);
  const location = useLocation();

  const toggleDropdown = () => setIsOpen(prev => !prev);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { showModal } = useInfoModal();
  const navigate = useNavigate();

  const handleLogout = () => {
    showModal({
      text1: "Are you sure you want to logout?",
      buttonName: "Logout",
      color: "bg-primary",
      actionType: "logout", // used in switch
    });
    setIsOpen(false);
  };


  const dropdownHandler = (item) => {
    if (item.action === "logout") {
      handleLogout();
    } else if (item.path) {
      navigate(item.path);
      setIsOpen(false);
    }
  };

  const splitedName = loggedData?.name.trim().split(" ").slice(0, 1);

  return (
    <div className='flex justify-between items-center bg-surface h-full px-5 py-2 relative'>
      <div className="nav">
        {/* <h3>Employees</h3>
        <p className='text-sm'>Manage employees</p> */}
      </div>

      <div className='flex items-center' ref={dropdownRef}>
        <div><GoBell className='w-5 h-5' /></div>
        <div className='border-l-2 h-8 border-gray-200/50 mx-5' />

        <div
          onClick={toggleDropdown}
          className='flex items-center gap-2 border border-background rounded p-1 cursor-pointer'
        >
          <div className='bg-background w-8 h-8 flex items-center justify-center rounded'>
            <FaUser />
          </div>
          <div>
            <p className='text-xs font-semibold mb-[-1px]'>{splitedName}</p>
            <p className='text-xs'>{loggedData?.role}</p>
          </div>
          {/* <div className='border-l-2 h-6 border-gray-200/50 mx-1' /> */}
          <IoIosArrowDown className={`w-3 h-3 ml-5 ${isOpen ? "rotate-180" : ""}`} />
        </div>

        {/* Dropdown Modal */}
        {isOpen && (
          <div className="absolute top-full right-5 mt-2 w-32 bg-white border border-gray-200 shadow-lg rounded z-50">
            <ul className="text-xs p-1">
              {menu.map((item, index) => {

                const isActive = item.path === location.pathname;

                return (
                  <li key={index} className={`p-2 w-full cursor-pointer gap-2 flex items-center border-l-3 hover:border-primary hover:text-primary
                                                ${isActive ? "border-primary bg-[#fff8f1] text-primary" : "border-white"}`} onClick={() => dropdownHandler(item)}><item.icon className='w-5 h-5' /><p>{item.name}</p></li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
