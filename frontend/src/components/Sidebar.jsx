import { Link, useLocation } from "react-router-dom"
import useAuthUser from "../hooks/useAuthUser"
import { BellIcon, HomeIcon, UserIcon, MessageCircle, Video } from "lucide-react"
import Logo from "./Logo"

const Sidebar = () => {
    const { authUser } = useAuthUser()
    const location = useLocation()
    const currentPath = location.pathname


    return (
        <aside className="w-64 bg-base-200 border-r border-base-300 hidden lg:flex flex-col h-screen sticky top-0">
            {/* Header/Logo */}
            <div className="p-4 border-b border-base-300">
                <Link to="/" className="hover:opacity-80 transition-opacity">
                    <Logo size="medium" variant="sidebar" />
                </Link>

            </div>
            
            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                <Link 
                    to="/" 
                    className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/" ? "btn-active" : ""}`}
                >
                    <HomeIcon className="size-5" />
                    <span>Home</span>
                </Link>
                
                <Link 
                    to="/chat" 
                    className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/chat" ? "btn-active" : ""}`}
                >
                    <MessageCircle className="size-5" />
                    <span>Chat</span>
                </Link>
                
                <Link 
                    to="/notifications" 
                    className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case ${currentPath === "/notifications" ? "btn-active" : ""}`}
                >
                    <BellIcon className="size-5" />
                    <span>Notifications</span>
                </Link>
            </nav>
            
            {/* User Profile */}
            <div className="p-4 border-t border-base-300 mt-auto">
                <div className="flex items-center gap-3">
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img src={authUser?.profilePic} alt="User-avatar" />
                        </div>
                    </div>

                    <div className="flex-1">
                        <p className="font-semibold text-sm">{authUser?.fullName}</p>
                        <p className="text-xs text-success flex items-center gap-1">
                            <span className="size-2 rounded-full bg-success inline-block" />
                            Online
                        </p>
                    </div>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar






