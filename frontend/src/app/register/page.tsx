"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Loader2 } from "lucide-react"
// import { FcGoogle } from "react-icons/fc";

const Register = () => {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const [registerData, setRegisterData] = useState<{
        name: string
        email: string
        password: string
    }>({
        name: "",
        email: "",
        password: "",
    })
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const NEXT_PUBLIC_API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setRegisterData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }
    const registerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        setError(null)
        const response = await fetch(`${NEXT_PUBLIC_API_BASE_URL}/api/user/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registerData),
        })
        const data = await response.json()
        if (!response.ok) {
            setError(data.message)
            setLoading(false)
            return
        }

        setRegisterData({
            name: "",
            email: "",
            password: "",
        });

        console.log(data.user);
        setLoading(false);

        router.push("/login")
    }

    return (
        <div className="min-h-[90vh] flex justify-center items-center">
            <form
                className="w-full max-w-md space-y-4 p-8 bg-white shadow-sm rounded-lg"
                onSubmit={registerSubmit}
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
                        value={registerData.name}
                        onChange={handleChange}
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
                        value={registerData.email}
                        onChange={handleChange}
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
                            value={registerData.password}
                            onChange={handleChange}
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

                {error && <div className="text-red-500">{error}</div>}

                <div className="flex flex-col gap-4 items-center justify-between">
                    {/* <Button
                        type="submit"
                        className="w-full bg-white text-black hover:bg-gray-100 duration-200 text-md flex items-center justify-center gap-2 py-2 border border-gray-300 rounded-md"
                    >
                        <FcGoogle className="text-xl" />
                        Sign up with Google
                    </Button> */}

                    <Button type="submit" className={`w-full ${loading ? "opacity-50 cursor-not-allowed" : ""}`}>
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                                Register
                            </>
                        ) : (
                            "Register"
                        )}
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