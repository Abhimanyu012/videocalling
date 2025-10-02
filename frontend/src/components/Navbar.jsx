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
                <div className="flex items-center justify-end w-full">
                    {/* only if we are in the chatpage */}
                    {isChatPage && (
                        <div className="flex-1">
                            <Link to="/" className="hover:opacity-80 transition-opacity">
                                <Logo size="medium" variant="navbar" />
                            </Link>
                        </div>
                    )}

                    <div className="flex items-center gap-3 sm:gap-4">
                        <Link to="/notifications" className={`btn btn-ghost justify-start w-full gap-3 px-3 normal-case `}>
                            <BellIcon className="size-5 text-base-content opacity-70" />

                        </Link>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-base-200 transition-colors">
                            <Palette className="size-5 text-base-content opacity-70" />
                            <ThemeSelector />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="avatar btn btn-ghost justify-start w-full gap-3 px-3 normal-case ">
                            <div className="w-5.5 rounded-full ">
                                <img src={authUser?.profilePic} alt="User-avatar" />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">

                        <button className="avatar btn btn-ghost justify-start w-full gap-3 px-3 normal-case " onClick={logoutMutation}>
                            <LogOut className="size-5" />
                        </button>
                    </div>

                </div>
            </div>
        </nav>
    )
}

export default Navbar