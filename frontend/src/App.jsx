import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SingupPage from "./pages/SingupPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";

function App() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200" data-theme="dark --prefersdark">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SingupPage />} />
                <Route path="/notification" element={<NotificationPage />} />
                <Route path="/onboard" element={<OnboardingPage />} />
                <Route path="/call" element={<CallPage />} />
                <Route path="/chat" element={<ChatPage />} />
            </Routes>
        </div>
    );
}

export default App;