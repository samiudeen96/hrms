import { adminMenu } from '../utils/constant'
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout } from '../redux/reducers/authSlice';
import { modalOpen, modalClose } from '../redux/reducers/infoModalSlice';
import { logo } from "../assets/index"

const SideBar = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const content = {
        text: "Are you sure you want to logout?",
        buttonName: "Logout",
        color: "bg-primary",
        handler: function () {
            dispatch(logout());
            dispatch(modalClose());
        }
    }

    const menuHandler = (item) => {
        if (item.action === "logout") {
            dispatch(modalOpen(content))
        } else {
            navigate(item.path);
            console.log("Clicked", item.name);
        }
    }

    return (
        <div className="w-60 bg-gray-50 border border-r border-gray-200/50 sticky top-0 z-20 h-[100vh] flex justify-center p-5">
            <div className='w-full'>
                <div className='mb-10'>
                    <img src={logo} alt="logo" />
                </div>
                {adminMenu.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <button onClick={() => menuHandler(item)} key={index} className={` ${item.path === location.pathname ? "bg-primary text-white" : ""} w-full px-4 py-3 rounded-sm mb-3 flex items-center gap-3 hover:bg-primary hover:text-white`}>
                            <Icon className='w-5 h-5' />
                            <p>{item.name}</p>
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

export default SideBar