import { Routes, Route } from "react-router-dom";
import AdminLogin from "../Assets/AdminLogin/AdminLogin";
import AdminLoginOTP from "../Assets/AdminOTPLogin/AdminLoginOTP";
import Dashboard from "../Assets/AdminDashboard/Dashboard";
import UserManagement from "../Assets/AdminUserManagement/Usermanagement";

const AdminRoutes:React.FC = () => {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/otp/:UserId" element={<AdminLoginOTP />} />
      <Route path="/admin/" element={<Dashboard />} />
      <Route path="/admin/users" element={<UserManagement />} />
    </Routes>
  );
};

export default AdminRoutes;
