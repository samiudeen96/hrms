import { Route } from "react-router-dom";
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import PrivateRoute from "./PrivateRoute";
import Employee from "../pages/admin/Employee";
import Attendance from "../pages/admin/Attendance";

const AdminRoute = () => {
    return (
        <Route
            path='/admin'
            element={
                <PrivateRoute
                    allowedRole={['admin']}>
                    <AdminLayout />
                </PrivateRoute>}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="employees" element={<Employee />} />
            <Route path="attendance" element={<Attendance />} />
        </Route>
    )
}

export default AdminRoute;