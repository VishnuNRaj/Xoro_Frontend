import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./Assets/Login/LoginPage";
import Home from "./Assets/UserHome/Home";
import SignUpForm from "./Assets/Register/UserRegister";
import VerifyAccount from "./Assets/VerifyAccount/VerifyAccount";
import 'react-toastify/dist/ReactToastify.css';
import OTPPage from "./Assets/OTPLogin/OTPPage";
import AdminLogin from "./Assets/AdminLogin/AdminLogin";
import AdminLoginOTP from "./Assets/AdminOTPLogin/AdminLoginOTP";
import Dashboard from "./Assets/AdminDashboard/Dashboard";
import UserManagement from "./Assets/AdminUserManagement/Usermanagement";
import Profile from "./Assets/UserProfile/Profile";
import Gallery from "./Assets/Post/PostPage2";
import Camera from "./Assets/Post/PostPage1";




function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<SignUpForm />} />
        <Route path="/verify-account/:VerificationLink/:UserId" element={<VerifyAccount />} />
        <Route path="/otp/:UserId" element={<OTPPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/otp/:UserId" element={<AdminLoginOTP />} />
        <Route path="/admin/" element={<Dashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/post/camera" element={<Camera />} />
        <Route path="/post/gallery" element={<Gallery />} />
        {/* <Route path="/post/upload/:imgDataString" element={<PostPage2 />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
