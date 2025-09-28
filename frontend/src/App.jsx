import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SingupPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import toast, { Toaster } from "react-hot-toast"
import { useQuery } from "@tanstack/react-query";

const App = () => {
    const {data} = useQuery({
        queryKey:"todos",
        queryFn:async()=>{
            
        }
    })
    return (
        <div className="">
            <button className="m-5 outline-1 p-2 bg-amber-400" onClick={() => { toast.success("hello toasty") }}>Show Toast</button>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/notification" element={<NotificationPage />} />
                <Route path="/onboard" element={<OnboardingPage />} />
                <Route path="/call" element={<CallPage />} />
                <Route path="/chat" element={<ChatPage />} />
            </Routes>
            <Toaster />
        </div>
    );
}

export default App;