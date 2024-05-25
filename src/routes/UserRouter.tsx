import { Routes, Route } from "react-router-dom";
import LoginPage from "../Assets/Login/LoginPage";
import Home from "../Assets/UserHome/Home";
import SignUpForm from "../Assets/Register/UserRegister";
import VerifyAccount from "../Assets/VerifyAccount/VerifyAccount";
import OTPPage from "../Assets/OTPLogin/OTPPage";
import Profile from "../Assets/UserProfile/Profile";
import UploadCamera from "../Assets/Post/SelectPost";
import VideoUpload from "../Assets/VideoUpload/VideoUpload";
// import CreativeEditorSDKComponent from "../Assets/Test";
import OtherProfiles from "../Assets/OtherProfiles/OtherProfiles";
import SocketToast from "../Other/SocketToast";
import StartStream from "../Assets/LiveStream/StartStream";
// import ViewStream from "../Assets/LiveStream/ViewStream";

const UserRoutes: React.FC = () => {
    
    return (
        <>
            <SocketToast />
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<SignUpForm />} />
                <Route path="/verify-account/:VerificationLink/:UserId" element={<VerifyAccount />} />
                <Route path="/otp/:UserId" element={<OTPPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/:ProfileLink" element={<OtherProfiles />} />
                <Route path="/post/" element={<UploadCamera />} />
                <Route path="/video/upload" element={<VideoUpload />} />
                <Route path="/test" element={<StartStream />} />
                {/* <Route path="/test2" element={<ViewStream />} /> */}
            </Routes>
        </>
    );
};

export default UserRoutes;
