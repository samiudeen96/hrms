import { MdOutlineDashboard } from "react-icons/md";
import { GrLogout } from "react-icons/gr";
import { LiaUserTieSolid } from "react-icons/lia";
import { PiTreeViewThin } from "react-icons/pi";
import { LiaUserCogSolid } from "react-icons/lia";
import { MdOutlineLogout } from "react-icons/md";

// admin properties
export const adminMenu = [
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
      },
      {
        name: "Department",
        icon: PiTreeViewThin,
      },
      {
        name: "Attendance",
        icon: PiTreeViewThin,
        children: [
          {
            name: "Daily Attendance",
            path: "/admin/attendance",
          },
          {
            name: "Employee-wise Logs",
          },
          {
            name: "Manual Entry",
          },
        ],
      },
      {
        name: "Leaves",
        icon: PiTreeViewThin,
        children: [
          {
            name: "Leave Requests",
          },
          {
            name: "Leave History",
          },
          {
            name: "Leave Reports",
          },
        ],
      },
      {
        name: "Projects",
        icon: PiTreeViewThin,
        children: [
          {
            name: "Projects",
          },
          {
            name: "Tasks",
          },
        ],
      },

      {
        name: "Payroll",
        icon: PiTreeViewThin,
        children: [
          {
            name: "Generate Payroll",
          },
          {
            name: "Pay Slips",
          },
        ],
      },

      {
        name: "Performance",
        icon: PiTreeViewThin,
      },
      {
        name: "Documents",
        icon: PiTreeViewThin,
      },
      {
        name: "Announcements",
        icon: PiTreeViewThin,
      },
      {
        name: "Resignations",
        icon: PiTreeViewThin,
      },
      {
        name: "Holidays",
        icon: PiTreeViewThin,
      },
      {
        name: "Notifications",
        icon: PiTreeViewThin,
      },
      {
        name: "Settings",
        icon: PiTreeViewThin,
      }

      //       Tasks
      // ├── All Tasks
      // ├── Assign Task
    ],
  },
  // {
  //   name: "Logout",
  //   action: "logout",
  //   icon: MdOutlineLogout,
  // },
];

// employee properties

// Attendance
// ├── Daily Attendance
// ├── Employee-wise Logs
// ├── Manual Entry
