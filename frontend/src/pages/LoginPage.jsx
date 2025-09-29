import React, { useState } from 'react'
import { ShipWheelIcon } from "lucide-react"
import { Link } from 'react-router';

const LoginPage = () => {
  const [signupData, setSignUpData] = useState({
    email: "",
    password: ""
  });

  const handleSignup = (e) => {
    e.preventDefault()
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-2 sm:px-4">
      <div className="bg-white shadow-lg rounded-xl flex flex-col lg:flex-row w-full max-w-4xl overflow-hidden border border-primary/20 p-4 sm:p-6 md:p-8">
        {/* Left side: Signup form */}
        <div className="w-full lg:w-1/2 p-4 sm:p-6 md:p-8 flex flex-col justify-center">
          {/* Logo */}
          <div className="mb-6 flex items-center gap-3 justify-center lg:justify-start">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-2xl font-bold text-primary">Let'sMEET</span>
          </div>
          {/* Signup Form */}
                <form onSubmit={handleSignup} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                  type="email"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="email@gmail.com"
                  value={signupData.email}
                  onChange={e => setSignUpData({ ...signupData, email: e.target.value })}
                  required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                  type="password"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                  placeholder="********"
                  value={signupData.password}
                  onChange={e => setSignUpData({ ...signupData, password: e.target.value })}
                  required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition text-sm"
                >
                  Sign Up
                </button>
                </form>
                <p className="mt-4 text-sm text-gray-500 text-center lg:text-left">
                Don't have an account? <Link to={"/signup"}><span className='text-primary'> signup</span></Link>
                </p>
              </div>
              {/* Right side: Illustration or info */}
        <div className="hidden lg:flex w-1/2 bg-primary/10 items-center justify-center flex-col p-4">
          <img
            src="/i.png"
            alt="Signup Illustration"
            className="max-w-xs w-full mb-6 rounded-lg shadow object-contain"
          />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
