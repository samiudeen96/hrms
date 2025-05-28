
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

function App() {


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
    </>
  )
}

function Root() {
  const { token, role, isAuthenticated } = useSelector((state) => state.auth);

  const redirectTo = role === 'admin'
    ? '/admin/dashboard'
    : role === 'employee'
    ? '/employee/dashboard'
    : '/login';

  return <Navigate to={isAuthenticated ? redirectTo : "/login"} />;
}

export default App
