import { useNavigate, useLocation, Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";


const Tabs = ({ tabs, basePath }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const currentPath = location.pathname.split("/").pop();

  return (
    <div className="flex border-b border-gray-200 mb-4 justify-between">
      <div className="flex space-x-4">
        {tabs.map((tab) => {
          const isActive = currentPath === tab.path;
          return (
            <button
              key={tab.path}
              onClick={() => navigate(`${basePath}/${tab.path}`)}
              className={`text-sm px-4 py-2 font-medium transition-all border-b-3 ${isActive
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-primary"
                }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* {location.pathname !== "/admin/user/add" &&
        <Link to={'/admin/user/add'} className='button_primary'>
          <IoMdAdd className="w-5 h-5" /> <span>Add User</span>
        </Link>} */}

    </div>
  );
};

export default Tabs;
