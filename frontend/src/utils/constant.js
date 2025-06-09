// src/constants/roleMenu.js
import { MdOutlineDashboard } from "react-icons/md";
import { MdOutlineLogout } from "react-icons/md";
import { LuUser } from "react-icons/lu";
import { LiaCalendarCheckSolid, LiaCalendarTimes } from "react-icons/lia";
import { PiTreeViewBold } from "react-icons/pi";
import { AiOutlineDollar } from "react-icons/ai";
import { IoDocumentsOutline } from "react-icons/io5";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { TbUsers } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";

export const roleMenus = {
  admin: [
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
      header: "User Management",
      menu: [
        {
          name: "User",
          icon: TbUsers,
          path: "/admin/user/list",
          children: [
            { name: "Users", path: "/admin/user/list" },
            { name: "Add User", path: "/admin/user/add" },
            { name: "Inactive User", path: "/admin/user/inactive" },
          ],
        },
        {
          name: "Department",
          icon: PiTreeViewBold,
          path: "/admin/department/manage",
          children: [
            { name: "Manage Department", path: "/admin/department/manage" },
            { name: "Employee-wise", path: "/admin/department/list" },
          ],
        },
        {
          name: "Attendance",
          icon: LiaCalendarCheckSolid,
          children: [
            { name: "Daily Attendance", path: "/admin/attendance/daily" },
            { name: "Employee-wise Logs", path: "/admin/attendance/logs" },
            { name: "Manual Entry", path: "/admin/attendance/manual" },
          ],
        },
        {
          name: "Leaves",
          icon: LiaCalendarTimes,
          children: [
            { name: "Leave Requests", path: "/admin/leaves/requests" },
            { name: "Leave History", path: "/admin/leaves/history" },
            { name: "Leave Reports", path: "/admin/leaves/reports" },
          ],
        },
        // {
        //   name: "Projects",
        //   icon: LiaProjectDiagramSolid,
        //   children: [
        //     { name: "Projects", path: "/admin/projects" },
        //     { name: "Tasks", path: "/admin/tasks" },
        //   ],
        // },
        {
          name: "Payroll",
          icon: AiOutlineDollar,
          children: [
            { name: "Generate Payroll", path: "/admin/payroll/generate" },
            { name: "Pay Slips", path: "/admin/payroll/slips" },
          ],
        },
        // {
        //   name: "Performance",
        //   icon: GrDocumentPerformance,
        //   path: "/admin/performance",
        // },
        // {
        //   name: "Documents",
        //   icon: IoDocumentsOutline,
        //   path: "/admin/documents",
        // },
        // {
        //   name: "Announcements",
        //   icon: HiOutlineSpeakerphone,
        //   path: "/admin/announcements",
        // },
        // {
        //   name: "Resignations",
        //   icon: PiTreeViewThin,
        //   path: "/admin/resignations",
        // },
        // {
        //   name: "Holidays",
        //   icon: PiTreeViewThin,
        //   path: "/admin/holidays",
        // },
        {
          name: "Settings",
          icon: IoSettingsOutline,
          path: "/admin/settings/profile",
          children: [
            { name: "Profile", path: "/admin/settings/profile" },
            { name: "Branding", path: "/admin/settings/branding" },
            { name: "Settings", path: "/admin/settings/settings" },
          ],
        },
      ],
    },
  ],

  // You can create a trimmed down menu for HR
  hr: [
    {
      menu: [
        {
          name: "Dashboard",
          icon: MdOutlineDashboard,
          path: "/hr/dashboard",
        },
      ],
    },
    {
      header: "Employee",
      menu: [
        {
          name: "Attendance",
          icon: LiaCalendarCheckSolid,
          children: [
            { name: "Daily Logs", path: "/hr/attendance/daily" },
            { name: "Manual Entry", path: "/hr/attendance/manual" },
          ],
        },
        {
          name: "Leaves",
          icon: LiaCalendarTimes,
          path: "/hr/leaves",
        },
        {
          name: "Announcements",
          icon: HiOutlineSpeakerphone,
          path: "/hr/announcements",
        },
      ],
    },
  ],

  // Basic menu for employees
  employee: [
    {
      menu: [
        {
          name: "Dashboard",
          icon: MdOutlineDashboard,
          path: "/employee/dashboard",
        },
      ],
    },
    {
      header: "My Workspace",
      menu: [
        {
          name: "My Attendance",
          icon: LiaCalendarCheckSolid,
          path: "/employee/attendance",
        },
        {
          name: "Leave Requests",
          icon: LiaCalendarTimes,
          path: "/employee/leaves",
        },
        {
          name: "Documents",
          icon: IoDocumentsOutline,
          path: "/employee/documents",
        },
      ],
    },
  ],
};

// employee properties
// export const employeeMenu = [
//   {
//     menu: [
//       {
//         name: "Dashboard",
//         icon: MdOutlineDashboard,
//         path: "/employee/dashboard",
//       },
//     ],
//   },
//   {
//     name: "Logout",
//     action: "logout",
//     icon: MdOutlineLogout,
//   },
// ];

export const headerDropdown = {
  admin: [
    {
      name: "Profile",
      icon: LuUser,
      path: "/admin/settings/profile",
    },
    {
      name: "Logout",
      action: "logout",
      icon: MdOutlineLogout,
    },
  ],

    hr: [
    {
      name: "Profile",
      icon: LuUser,
      path: "/hr/settings/profile",
    },
    {
      name: "Logout",
      action: "logout",
      icon: MdOutlineLogout,
    },
  ],

  employee: [
    {
      name: "Profile",
      icon: LuUser,
      path: "/employee/settings/profile",
    },
    {
      name: "Logout",
      action: "logout",
      icon: MdOutlineLogout,
    },
  ],


};
