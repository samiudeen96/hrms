import { Route } from "react-router-dom";
import AdminLayout from '../layouts/AdminLayout';
import Dashboard from '../pages/admin/Dashboard';
import PrivateRoute from "./PrivateRoute";

const AdminRoute = () => {
    return (
        <Route
            path='/admin'
            element={
                <PrivateRoute
                    allowedRole={['admin']}>
                    <AdminLayout />
                </PrivateRoute>}>
            <Route
                path="/admin/dashboard"
                element={<Dashboard />}
            />
        </Route>
    )
}

export default AdminRoute;