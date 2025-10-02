import { useState } from 'react'
// import { useNavigate } from 'react-router-dom';
import { ShipWheelIcon, Eye, EyeOff } from "lucide-react"
import { Link } from 'react-router';

import { useLogin } from '../hooks/useLogin';

const LoginPage = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const { isPending, error, loginMutation } = useLogin()

  const handleLogin = (e) => {
    e.preventDefault()
    loginMutation(loginData)
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-2 sm:px-4">
      <div className="bg-white shadow-lg rounded-xl flex flex-col lg:flex-row w-full max-w-4xl overflow-hidden border border-primary/20 p-4 sm:p-6 md:p-8">

        {/* Left side: Signup form */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-center">
          {/* Logo */}
          <div className="mb-8 flex items-center gap-3 justify-center lg:justify-start">
            <ShipWheelIcon className="size-10 text-primary" />
            <span className="text-3xl font-extrabold text-primary tracking-tight">Let'sMEET</span>
          </div>
          <p className="text-xl font-semibold text-gray-800 mb-1 text-center lg:text-left">
            Welcome Back
          </p>
          <p className="text-sm text-gray-500 mb-6 text-center lg:text-left">
            Log in to Let'sMEET and continue your journey with us.
          </p>

          {/* Display error message if login fails */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
              {error?.response?.data?.message || "Login failed. Please try again."}
            </div>
          )}

          {/* Signup Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                placeholder="email@gmail.com"
                value={loginData.email}
                onChange={e => setLoginData({ ...loginData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm pr-10"
                  placeholder="********"
                  value={loginData.password}
                  onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition text-sm"
            >
              {isPending ? "Logging..." : "Login"}
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-500 text-center lg:text-left">
            Don't have an account? <Link to={"/signup"}><span className='text-primary hover:underline'> signup</span></Link>
          </p>
        </div>
        {/* Right side: Illustration or info */}
        <div className="hidden lg:flex w-1/2 bg-primary/10 items-center justify-center flex-col p-4">
          <img
            src="/i.png"
            alt="Signup Illustration"
            className="max-w-xs w-full mb-6 rounded-lg shadow object-contain"
          />
          <p className="text-gray-700 text-center">
            Start your first video call in seconds. No downloads, no hassle – just share a link and connect instantly!
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
