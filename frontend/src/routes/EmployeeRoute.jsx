import { Route } from "react-router-dom";
import Dashboard from "../pages/employee/Dashboard";
import EmployeeLayout from "../layouts/EmployeeLayout";
// import Signup from "../pages/auth/Signup";
import PrivateRoute from '../routes/PrivateRoute';

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
        </Route>
    )
}

export default EmployeeRoute;