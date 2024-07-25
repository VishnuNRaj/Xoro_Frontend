import { Routes, Route } from "react-router-dom";
import AdminLogin from "../Assets/AdminLogin/AdminLogin";
import AdminLoginOTP from "../Assets/AdminOTPLogin/AdminLoginOTP";
import Dashboard from "../Assets/AdminDashboard/Dashboard";
import UserManagement from "../Assets/AdminUserManagement/Usermanagement";
import { OffcanvasAdmin } from "../Assets/Components/AdminHeader";
import CategoryManagement from "../Assets/AdminCategoryManagement/CategoryManagement";

const AdminRoutes: React.FC = () => {
  return (
    <>
      <div className="w-full h-[50px] z-50">
        <OffcanvasAdmin />
      </div>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/otp/:UserId" element={<AdminLoginOTP />} />
        <Route path="/admin/" element={<Dashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/category" element={<CategoryManagement />} />
      </Routes>
    </>
  );
};

export default AdminRoutes;
