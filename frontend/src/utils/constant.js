import { MdOutlineDashboard } from "react-icons/md";
import { GrLogout } from "react-icons/gr";
import { LiaUserTieSolid } from "react-icons/lia";

// admin properties
export const adminMenu = [
  {
    name: "Dashboard",
    icon: MdOutlineDashboard,
    path: "/admin/dashboard",
  },
  {
    name: "Employees",
    icon: LiaUserTieSolid,
    path: "/admin/employees",
  },
  {
    name: "Logout",
    action: "logout",
    icon: GrLogout,
  },
];

// employee properties
