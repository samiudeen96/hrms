
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminRoute from './routes/AdminRoute'
import EmployeeRoute from './routes/EmployeeRoute';
import Login from "./pages/auth/Login";
import Register from './pages/auth/Register';
import { Toaster } from 'react-hot-toast';
import Signup from './pages/auth/Signup';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useEmpInfo } from './hooks/empHook';
import { getRedirectPathByRole } from './utils/helper';
import { useNavigate } from "react-router-dom";
import InfoModal from "./components/InfoModel"

function App() {
  const infoModal = useSelector(state => state.infoModal.isModalOpen)
  return (
    <>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
      <Router>
        <Routes>

          {/* PublicRoutes */}
          <Route path="/admin/signup" element={<Signup />} />
          <Route path="/employee/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Root />} />

          {/* Admin Routes */}
          {AdminRoute()}

          {/* Employee Routes */}
          {EmployeeRoute()}

          {/* Public Routes */}

        </Routes>
      </Router>

      {infoModal && <InfoModal />}
    </>
  )
}

function Root() {
  const { role, isAuthenticated } = useSelector((state) => state.auth);
  const { data: employee, refetch } = useEmpInfo();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      refetch(); // manually fetch employee data if logged in
    }
  }, [isAuthenticated, refetch]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    } else if (!employee) {
      navigate("/register");
    } else {
      navigate(getRedirectPathByRole(role));
    }
  }, [isAuthenticated, employee, role, navigate]);

  return null; // since we're redirecting imperatively
}

export default App
