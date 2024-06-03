import { Routes, Route } from "react-router-dom";
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
import StartStream from "../Assets/LiveStream/StartStream";
import Videos from "../Assets/Videos/Videos";
import ShowVideos from "../Assets/Videos/ShowVideos";

const UserRoutes: React.FC = () => {

    return (
        <>
            <SocketToast />
            {/* <div style={{scrollbarWidth:'none', WebkitOverflowScrolling:'touch' }} className="overflow-x-hidden"> */}
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<SignUpForm />} />
                    <Route path="/verify-account/:VerificationLink/:UserId" element={<VerifyAccount />} />
                    <Route path="/otp/:UserId" element={<OTPPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/profile/:ProfileLink" element={<OtherProfiles />} />
                    <Route path="/post/" element={<UploadCamera />} />
                    <Route path="/videos/upload" element={<VideoUpload />} />
                    <Route path="/test" element={<StartStream />} />
                    <Route path="/videos" element={<Videos />} />
                    <Route path="/videos/watch/:VideoLink" element={<ShowVideos />} />
                    {/* <Route path="*" element={<Preloader/>} /> */}
                </Routes>
            {/* </div> */}
        </>
    );
};

export default UserRoutes;
