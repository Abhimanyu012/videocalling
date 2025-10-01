import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import NotificationPage from "./pages/NotificationPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import { Toaster } from "react-hot-toast"

import PageLoader from "./components/PageLoader.jsx";

import useAuthUser from "./hooks/useAuthUser.js";

const App = () => {

    const { isLoading, authUser } = useAuthUser();
    const isAuthenticated = Boolean(authUser)
    const isOnboarded = authUser?.isOnboarded
    console.log("authUser:", authUser, "isOnboarded:", isOnboarded);
    if (isLoading) return (
        <PageLoader />
    )

    return (
        <div className="">
            <Routes>
                <Route path="/" element={isAuthenticated && isOnboarded ? (<HomePage />) : (<Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />)} />
                <Route path="/signup" element={!isAuthenticated ? <SignupPage /> : <Navigate to="/" replace />} />
                <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />} />
                <Route path="/notification" element={isAuthenticated ? <NotificationPage /> : <Navigate to="/login" replace />} />
                <Route path="/onboarding" element={isAuthenticated ? (!isOnboarded ? (<OnboardingPage />) : (<Navigate to="/" />)) : (<Navigate to="/login" />)} />
                <Route path="/chat" element={isAuthenticated ? <ChatPage /> : <Navigate to="/login" replace />} />
            </Routes>
            <Toaster />
        </div>
    );
}

export default App;
