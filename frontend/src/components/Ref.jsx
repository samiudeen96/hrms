import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const Ref = () => {
  const [isOpen, setIsOpen] = useState(true);
  const activePath = "/vehicle-list"; // Replace this with router location if needed

  const menuItems = [
    { name: "Vehicle List", path: "/vehicle-list" },
    { name: "Vehicle Assignments", path: "/assignments" },
    { name: "Meter History", path: "/meter-history" },
    { name: "Expense History", path: "/expense-history" },
    { name: "Replacement Analysis", path: "/replacement-analysis" },
  ];

  return (
    <div className="w-full text-sm">
      {/* Main Heading */}
      <div
        className="flex items-center justify-between px-4 py-2 font-medium cursor-pointer hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center text-xs">🚗</div>
          <span>Vehicles</span>
        </div>
        <FaChevronDown
          className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {/* Sub Menu */}
      {isOpen && (
        <div className="ps-8 mt-1 space-y-1">
          {menuItems.map((item) => (
            <div
              key={item.path}
              className={`flex items-center space-x-2 cursor-pointer px-2 py-1 rounded hover:bg-violet-100 ${
                activePath === item.path ? "text-violet-600 font-semibold bg-violet-50" : "text-gray-600"
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  activePath === item.path ? "bg-violet-600" : "bg-gray-300"
                }`}
              />
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Ref;
