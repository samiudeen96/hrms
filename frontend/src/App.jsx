import { BrowserRouter as Router, Routes, Route, Navigate, } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import { getRedirectPathByRole } from "./utils/helper";
import { useSelector } from "react-redux";
import InfoModal from "./components/InfoModal"
import AdminRoute from "./routes/AdminRoute";
import UserLogin from "./pages/auth/UserLogin";
import EmployeeRoute from "./routes/EmployeeRoute";
import HrRoute from "./routes/HrRoute";

function App() {
  const infoModal = useSelector(state => state.infoModal.isModalOpen)
  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/admin/signup" element={<Signup />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/" element={<Root />} />

          {/* Admin/Employer Routes */}
          {AdminRoute()}

           {/* employee/Employee Routes */}
          {EmployeeRoute()}

          {/* hr/Hr Routes */}
          {HrRoute()}

        </Routes>
      </Router>
      {infoModal && <InfoModal />}
    </>
  );
};

export default App;

const Root = () => {
  const { loggedData, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated || !loggedData?.role) {
    return <Navigate to="/login" replace />;
  }

  const redirectTo = getRedirectPathByRole(loggedData?.role || "");
  

  return <Navigate to={redirectTo} replace />;
};
