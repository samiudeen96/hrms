import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom"

const PrivateRoute = ({ children, allowedRole }) => {
    // const token = store.getState().auth.token;

    // const { isAuthenticated, role } = useSelector((state) => state.auth);

    const token = localStorage.getItem("token")
    const user = token ? JSON.parse(localStorage.getItem("user")) : null;
    const isAuthenticated = !!token

    if (!isAuthenticated) return <Navigate to='/login' replace />
    if (!allowedRole.includes(user.role)) return <Navigate to='/unauthorized' replace />

    return children;
}

export default PrivateRoute;