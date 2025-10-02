import { useState } from 'react'
import { Eye, EyeOff } from "lucide-react"
import Logo from '../components/Logo'
import { Link } from 'react-router-dom';
import useSignup from '../hooks/useSignup';

const SignupPage = () => {
    const [signupData, setSignUpData] = useState({
        fullName: "",
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const { isPending, error, signupMutation } = useSignup()

    const handleSignup = (e) => {
        e.preventDefault()
        signupMutation(signupData)
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white shadow-lg rounded-xl flex flex-col lg:flex-row w-full max-w-6xl overflow-hidden border border-primary/30 p-6">
                {/* Left side: Signup form */}
                <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
                    {/* Logo */}
                    <div className="mb-3 justify-center lg:justify-start">
                        <Logo size="large" variant="default" className="justify-center lg:justify-start" />
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-2 text-center lg:text-left">
                        Create your account
                    </p>
                    <p className="text-base text-gray-600 mb-2 text-center lg:text-left">
                        Join Let'sMEET and start connecting instantly.
                    </p>
                    {/* {error if any} */}

                    {
                        error && (
                            <div className="alert alert-error mb-3">
                                <span>{error.response.data.message}</span>
                            </div>
                        )
                    }
                    <hr className='mb-4 text-violet-400 shadow-2xl font-extralight' />

                    {/* Signup Form */}
                    <form onSubmit={handleSignup} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition text-gray-900 bg-white"
                                placeholder="Type your name"
                                value={signupData.fullName}
                                onChange={e => setSignUpData({ ...signupData, fullName: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition text-gray-900 bg-white"
                                placeholder="email@gmail.com"
                                value={signupData.email}
                                onChange={e => setSignUpData({ ...signupData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition pr-10 text-gray-900 bg-white"
                                    placeholder="********"
                                    value={signupData.password}
                                    onChange={e => setSignUpData({ ...signupData, password: e.target.value })}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            <span className="text-xs text-gray-500 mt-1 block">Password must be at least 6 characters long</span>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                        >
                            {isPending ? "Signing..." : "Create Account"}
                        </button>
                    </form>
                    <p className="mt-4 text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary hover:underline">Login</Link>
                    </p>
                </div>
                {/* Right side: Illustration */}
                <div className="hidden lg:flex w-1/2 bg-primary/10 items-center justify-center flex-col">
                    <img
                        src="/i.png"
                        alt="Signup Illustration"
                        className="max-w-xs w-full mb-6 rounded-lg shadow"
                    />
                    <span className="text-primary text-3xl font-bold mb-2">Welcome!</span>
                    <p className="text-center text-gray-700 max-w-xs">
                        Welcome to Let'sMEET — sign up to connect, collaborate, and communicate with people everywhere. Get started in seconds.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignupPage