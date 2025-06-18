import React from 'react'
import { Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../pages/admin/Dashboard";
import AdminLayout from '../layouts/AdminLayout';
// import Profile from '../pages/admin/Profile';
// import Settings from '../pages/admin/Settings';
import UserTab from '../pages/admin/user/UserTab';
import SettingTab from '../pages/admin/setting/SettingTab';
import DepartmentTab from '../pages/admin/department/DepartmentTab';
import AttendanceTab from '../pages/admin/attendance/AttendanceTab';
import EmployeeTab from '../pages/admin/Employee/EmployeeTab';
// import ProfileTab from '../pages/admin/profile/ProfileTab';



const AdminRoute = () => {
    return (
        <Route
            path='/admin/*'
            element={
                <PrivateRoute
                    allowedRole={['admin']}>
                    <AdminLayout />
                </PrivateRoute>
            }>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="user/*" element={<UserTab />} /> {/* Note the `*` here */}
            <Route path="employee/*" element={<EmployeeTab />} />

            {/* <Route path="profile/*" element={<ProfileTab />} /> */}
            <Route path="settings/*" element={<SettingTab />} />
            <Route path="department/*" element={<DepartmentTab />} />
            <Route path="attendance/*" element={<AttendanceTab />} />
        </Route>
    )
}

export default AdminRoute


