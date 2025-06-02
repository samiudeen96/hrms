import { MdOutlineDashboard } from "react-icons/md";
import { GrLogout } from "react-icons/gr";
import { LiaUserTieSolid } from "react-icons/lia";
import { PiTreeViewThin } from "react-icons/pi";
import { LiaUserCogSolid } from "react-icons/lia";
import { MdOutlineLogout } from "react-icons/md";

// admin properties
export const adminMenu = [
  // {
  //   name: "Dashboard",
  //   icon: MdOutlineDashboard,
  //   path: "/admin/dashboard",
  // },
  // {
  //   header: "Employee Management",
  //   name: "Employee",
  //   icon: LiaUserTieSolid,
  //   path: "/admin/employees",
  //   children: [
  //     {
  //       name: "View employees"
  //     }
  //   ]
  //   // children: [
  //   //   {
  //   //     name: "Employees",
  //   //     child: [
  //   //       {
  //   //         name: "View employees",
  //   //       },
  //   //     ],
  //   //   },
  //   //   {
  //   //     name: "Departments",
  //   //     child: [
  //   //       {
  //   //         name: "Add department",
  //   //       },
  //   //     ],
  //   //   },
  //   //   {
  //   //     name: "Positions",
  //   //     child: [
  //   //       {
  //   //         name: "Add position",
  //   //       },
  //   //     ],
  //   //   },
  //   // ],
  // },
  {
    menu: [
      {
        name: "Dashboard",
        icon: MdOutlineDashboard,
        path: "/admin/dashboard",
      },
    ],
  },
  {
    header: "Employee Management",
    menu: [
      {
        name: "Employee",
        icon: LiaUserTieSolid,
        path: "/admin/employees",
        children: [
          {
            name: "View employees",
            path: "/admin/employees",
          },
          {
            name: "Manage employees",
          }
        ],
      },
      {
        name: "Department",
        icon: PiTreeViewThin,
        path: "",
      },
      {
        name: "Position",
        icon: LiaUserCogSolid,
        path: "",
      },
    ],
  },
  {
    name: "Logout",
    action: "logout",
    icon: MdOutlineLogout,
  },
];

// employee properties
