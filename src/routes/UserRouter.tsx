import { Routes, Route, useLocation } from "react-router-dom";
import LoginPage from "../Assets/Login/LoginPage";
import Home from "../Assets/UserHome/Home";
import SignUpForm from "../Assets/Register/UserRegister";
import VerifyAccount from "../Assets/VerifyAccount/VerifyAccount";
import OTPPage from "../Assets/OTPLogin/OTPPage";
import Profile from "../Assets/UserProfile/Profile";
import UploadCamera from "../Assets/Post/SelectPost";
import VideoUpload from "../Assets/VideoUpload/VideoUpload";
import OtherProfiles from "../Assets/OtherProfiles/OtherProfiles";
import SocketToast from "../Other/SocketToast";
import Videos from "../Assets/Videos/Videos";
import ShowVideos from "../Assets/Videos/ShowVideos";
import ViewStream from "../Assets/LiveStream/ViewStream";
import SocketMessage from "../Other/SocketMessage";
import { Offcanvas } from "../Assets/Components/Canvas";
import Shorts from "../Assets/Shorts/Shorts";
import Live from "../Assets/LiveStream/Live";
import NotFoundPage from "./404";
import PostShow from "../Assets/UserHome/PostShow";
import LiveVideos from "../Assets/LiveStream/LiveVideos";
import UserChannel from "../Assets/Channel/UserChannel";

const UserRoutes: React.FC = () => {
    const location = useLocation();

    return (
        <>
            <SocketToast />
            <SocketMessage />
            {!location.pathname.startsWith("/admin") && (
                <div className="w-full mt-0 h-[80px]">
                    <Offcanvas />
                </div>
            )}
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/" element={<Home />} />
                <Route path="/shorts/:id" element={<Shorts />} />
                <Route path="/register" element={<SignUpForm />} />
                <Route path="/verify-account/:VerificationLink/:UserId" element={<VerifyAccount />} />
                <Route path="/otp/:UserId" element={<OTPPage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/:ProfileLink" element={<OtherProfiles />} />
                <Route path="/post/" element={<UploadCamera />} />
                <Route path="/post/:id" element={<PostShow />} />
                <Route path="/videos/upload" element={<VideoUpload />} />
                <Route path="/stream/" element={<Live />} />
                <Route path="/live" element={<LiveVideos />} />
                <Route path="/live/:key" element={<ViewStream />} />
                <Route path="/videos" element={<Videos />} />
                <Route path="/videos/:VideoLink" element={<ShowVideos />} />
                <Route path="/shorts" element={<Shorts />} />
                <Route path="/channel" element={<UserChannel />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </>
    );
};

export default UserRoutes;
