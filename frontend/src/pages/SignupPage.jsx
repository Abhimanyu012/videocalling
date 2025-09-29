import { useState } from 'react'
import { ShipWheelIcon } from "lucide-react"
import { Link } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { signup } from '../lib/api';

const SignupPage = () => {
    const [signupData, setSignUpData] = useState({
        fullName: "",
        email: "",
        password: ""
    });
    const queryClient = useQueryClient()

    const { mutate:signupMutation, isPending, error } = useMutation({
        mutationFn: signup,
        onSuccess: (data) => {
            console.log("Signup successful:", data);
            queryClient.invalidateQueries({
                queryKey: ["authUser"]
            })
        }
    })

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
                    <div className="mb-3 flex items-center gap-3 justify-center lg:justify-start">
                        <ShipWheelIcon className="size-10 text-primary" />
                        <span className="text-3xl font-extrabold text-primary tracking-tight">Let'sMEET</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-2 text-center lg:text-left">
                        Create your account
                    </p>
                    <p className="text-base text-gray-600 mb-2 text-center lg:text-left">
                        Join Let'sMEET and start connecting instantly.
                    </p>
                    {/* {error if any} */}

                    {
                        error&&(
                            <div className="alert alert-error mb-3">
                                <span>{error.response.data.message }</span>
                            </div>
                        )
                    }
                    <hr className='mb-4 text-violet-400 shadow-2xl font-extralight'/>

                    {/* Signup Form */}
                    <form onSubmit={handleSignup} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                            <input
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
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
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                                placeholder="email@gmail.com"
                                value={signupData.email}
                                onChange={e => setSignUpData({ ...signupData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition"
                                placeholder="********"
                                value={signupData.password}
                                onChange={e => setSignUpData({ ...signupData, password: e.target.value })}
                                required
                            />
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