"use client"

import React, { useState } from "react"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
// import { FcGoogle } from "react-icons/fc";

const Register = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    return (
        <div className="min-h-[90vh] flex justify-center items-center">
            <form
                className="w-full max-w-md space-y-4 p-8 bg-white shadow-sm rounded-lg"
            // onSubmit={loginSubmit}
            >
                <h2 className="text-2xl font-bold text-center mb-6">Register</h2>

                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                     focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="Enter your name"
                        // value={registerData.name}
                        // onChange={(e) =>
                        //     setRegisterData({ ...registerData, name: e.target.value })
                        // }
                        required
                    />
                </div>

                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                       focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        placeholder="Enter your email"
                        // value={loginData.email}
                        // onChange={(e) =>
                        //   setLoginData({ ...loginData, email: e.target.value })
                        // }
                        required
                    />
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                         focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary pr-10"
                            placeholder="Enter your password"
                            //   value={loginData.password}
                            //   onChange={(e) =>
                            //     setLoginData({ ...loginData, password: e.target.value })
                            //   }
                            required
                        />
                        <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff className="h-5 w-5 cursor-pointer text-gray-500" />
                            ) : (
                                <Eye className="h-5 w-5 cursor-pointer text-gray-500" />
                            )}
                        </button>
                    </div>
                </div>

                {/* {error && <div className="text-red-500">{error}</div>} */}

                <div className="flex flex-col gap-4 items-center justify-between">
                    {/* <Button
                        type="submit"
                        className="w-full bg-white text-black hover:bg-gray-100 duration-200 text-md flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-md"
                    >
                        <FcGoogle className="text-xl" />
                        Sign up with Google
                    </Button> */}

                    <Button type="submit" className="w-full">
                        {/* {loading ? "Loading..." : "Login"} */}
                        Login
                    </Button>

                    <Link
                        href="/login"
                        className="text-sm text-gray-500 hover:text-primary duration-200"
                    >

                        Already have an account? Login
                    </Link>
                </div>
            </form>
        </div>
    )
}

export default Register