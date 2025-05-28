import { useSelector } from "react-redux";
import { store } from "../redux/store.js"
import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children, allowedRole }) => {
    // const token = store.getState().auth.token;

    const { isAuthenticated, role } = useSelector((state) => state.auth);

    if (!isAuthenticated) return <Navigate to='/login' replace />
    if (!allowedRole.includes(role)) return <Navigate to='/unauthorized' replace />

    return children;
}

export default PrivateRoute;