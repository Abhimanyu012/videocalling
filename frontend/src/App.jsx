import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import toast, { Toaster } from "react-hot-toast"
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios.js";

const App = () => {
    const { data: authData } =
        useQuery({
            queryKey: ["authUser"],
            queryFn: async () => {
                const res = await axiosInstance.get("/auth/me")
                return res.data
            },
            retry: false

        })

    const authUser = authData?.user
    return (
        <div className="">
            <Routes>
                <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" replace />} />
                <Route path="/signup" element={!authUser ? <SignupPage/> : <Navigate to="/" replace />} />
                <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" replace />} />
                <Route path="/notification" element={authUser ? <NotificationPage /> : <Navigate to="/login" replace />} />
                <Route path="/onboard" element={authUser ? <OnboardingPage /> : <Navigate to="/login" replace />} />
                <Route path="/call" element={authUser ? <CallPage /> : <Navigate to="/login" replace />} />
                <Route path="/chat" element={authUser ? <ChatPage /> : <Navigate to="/login" replace />} />
            </Routes>
            <Toaster />
        </div>
    );
}

export default App;