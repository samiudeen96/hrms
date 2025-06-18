import Dashboard from "../pages/employee/Dashboard";
import EmployeeLayout from "../layouts/EmployeeLayout";
// import Signup from "../pages/auth/Signup";
import PrivateRoute from '../routes/PrivateRoute';
import SettingTab from "../pages/employee/setting/SettingTab";
import { Route } from "react-router-dom";
import AttendanceTab from "../pages/employee/attendance/AttendanceTab";

const EmployeeRoute = () => {
    return (
        <Route
            path='/employee/*'
            element={
                <PrivateRoute
                    allowedRole={['employee']}>
                    <EmployeeLayout />
                </PrivateRoute>
            }>

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="attendance/*" element={<AttendanceTab />} />
            <Route path="settings/*" element={<SettingTab />} />
        </Route>
    )
}

export default EmployeeRoute;