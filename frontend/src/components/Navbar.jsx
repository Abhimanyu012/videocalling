import { Link, useLocation } from "react-router"
import useAuthUser from "../hooks/useAuthUser"
import { BellIcon, LogOut, Palette } from "lucide-react"
import ThemeSelector from "./ThemeSelector"
import useLogout from "../hooks/useLogout"
import Logo from "./Logo"

const Navbar = () => {
    const { authUser } = useAuthUser()
    const location = useLocation()
    const isChatPage = location.pathname?.startsWith("/chat")

    const { logoutMutation} = useLogout()


    return (
        <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between w-full gap-4">
                    {/* Logo - Hidden on large screens when sidebar is visible */}
                    <div className="flex-1 lg:hidden">
                        <Link to="/" className="hover:opacity-80 transition-opacity">
                            <Logo size="medium" variant="navbar" />
                        </Link>
                    </div>

                    {/* Right side actions */}
                    <div className="flex items-center gap-2 sm:gap-3 lg:ml-auto">
                        {/* Notifications */}
                        <Link 
                            to="/notifications" 
                            className="btn btn-ghost btn-circle"
                            aria-label="Notifications"
                        >
                            <BellIcon className="size-5" />
                        </Link>

                        {/* Theme Selector */}
                        <div className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-base-300 transition-colors">
                            <Palette className="size-5 hidden sm:block" />
                            <ThemeSelector />
                        </div>

                        {/* User Avatar */}
                        <div className="avatar">
                            <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={authUser?.profilePic} alt="User avatar" />
                            </div>
                        </div>

                        {/* Logout Button */}
                        <button 
                            className="btn btn-ghost btn-circle" 
                            onClick={logoutMutation}
                            aria-label="Logout"
                        >
                            <LogOut className="size-5" />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar