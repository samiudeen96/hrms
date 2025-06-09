import React from 'react'
import { Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from '../pages/hrManager/Dashboard';
import HrLayout from '../layouts/HrLayout';



const HrRoute = () => {
    return (
        <Route
            path='/hr/*'
            element={
                <PrivateRoute
                    allowedRole={['hr_manager']}>
                    <HrLayout />
                </PrivateRoute>
            }>
            <Route path="dashboard" element={<Dashboard />} />
        </Route>
    )
}

export default HrRoute


