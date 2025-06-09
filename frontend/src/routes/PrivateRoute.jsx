import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRole }) => {
  const { isAuthenticated, loggedData } = useSelector((state) => state.auth);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!allowedRole.includes(loggedData?.role)) return <Navigate to="/unauthorized" replace />;

  return children;
};

export default PrivateRoute;
