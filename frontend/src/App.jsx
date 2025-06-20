import { BrowserRouter as Router, Routes, Route, Navigate, } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import { getRedirectPathByRole } from "./utils/helper";
import { useDispatch, useSelector } from "react-redux";
import InfoModal from "./components/InfoModal"
import AdminRoute from "./routes/AdminRoute";
import EmployeeRoute from "./routes/EmployeeRoute";
import HrRoute from "./routes/HrRoute";
import UserLogin from "./pages/auth/userAuth/UserLogin";
import Register from "./pages/auth/userAuth/Register";
import { useEffect } from "react";
import { setRegisteredData } from "./redux/reducers/authSlice";
import { useEmpProfile } from "./hooks/employeeHook";

function App() {
  const infoModal = useSelector(state => state.infoModal.isModalOpen)
  const dispatch = useDispatch();
  const { data: employeeProfile, isSuccess } = useEmpProfile();

  useEffect(() => {
    if (employeeProfile && isSuccess) {
      dispatch(setRegisteredData({ registeredInfo: employeeProfile }));
    }
  }, [employeeProfile, isSuccess]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/admin/signup" element={<Signup />} />
          <Route path="/admin/login" element={<Login />} />

          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<Register />} />

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
  const { loggedData, isAuthenticated, storedRegisteredUuid } = useSelector((state) => state.auth);

  console.log("strored uuid", storedRegisteredUuid);
  const { data: employeeProfile } = useEmpProfile();


  if (!isAuthenticated || !loggedData?.role) {
    return <Navigate to="/login" replace />;
  }

  const role = loggedData?.role || "";
  let redirectTo = getRedirectPathByRole(role);

  if (role !== "admin" && !storedRegisteredUuid) {
    redirectTo = "/register";
  }

  return <Navigate to={redirectTo} replace />;
};
