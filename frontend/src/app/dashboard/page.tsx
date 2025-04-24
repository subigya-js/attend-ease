"use client"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useAuth } from '../../../context/AuthController'

interface UserData {
  user_id: string;
  name: string;
  email: string;
}

const Dashboard = () => {
  const { logout, checkAuth } = useAuth()
  const [userData, setUserData] = React.useState<UserData | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const fetchUserData = async () => {
    try {
      setLoading(true)
      setError(null)
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No authentication token found')
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/current`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error('Failed to fetch user data')
      }
      const data: UserData = await response.json()
      setUserData(data)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An unknown error occurred')
      }
      logout()
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (checkAuth()) {
      fetchUserData()
    } else {
      router.push('/login')
    }
  }, [router, checkAuth])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
        <Button className="mt-4" onClick={fetchUserData}>Retry</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Welcome, {userData?.name || 'User'}</h1>
        <div>
          <Button variant="destructive" onClick={handleLogout}>Logout</Button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-8">
        <h2 className="text-2xl font-semibold mb-4">User Information</h2>
        <ul className="space-y-2">
          <li><strong>Name:</strong> {userData?.name}</li>
          <li><strong>Email:</strong> {userData?.email}</li>
        </ul>
      </div>
    </div>
  )
}

export default Dashboard
