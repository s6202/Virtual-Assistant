import React, { useContext, useState } from 'react'
import { userDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import api from '../config/axios.js'

function Home() {
  const { userData, setUserData } = useContext(userDataContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    try {
      setLoading(true)
      await api.post('/api/auth/logout')
      setUserData(null)
      navigate('/signin')
    } catch (error) {
      console.log('Logout error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCustomize = () => {
    navigate('/customize')
  }

  if (!userData) {
    return (
      <div className="w-full h-screen bg-gradient-to-b from-[#030353] via-[#030353] to-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-2xl mb-4">Please sign in to continue</h1>
          <button 
            onClick={() => navigate('/signin')}
            className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600"
          >
            Sign In
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-screen bg-gradient-to-b from-[#030353] via-[#030353] to-black flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-6">
        <h1 className="text-white text-2xl font-bold">
          Welcome, <span className="text-blue-400">{userData.name}</span>
        </h1>
        <div className="flex gap-4">
          <button
            onClick={handleCustomize}
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
          >
            Customize Assistant
          </button>
          <button
            onClick={handleLogout}
            disabled={loading}
            className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 disabled:opacity-50"
          >
            {loading ? 'Logging out...' : 'Logout'}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center max-w-2xl">
          <h2 className="text-white text-4xl font-bold mb-6">
            Your Virtual Assistant
          </h2>
          
          {userData.assistantName && (
            <div className="mb-8">
              <h3 className="text-blue-400 text-2xl mb-4">
                Assistant: {userData.assistantName}
              </h3>
              {userData.assistantImage && (
                <div className="flex justify-center mb-4">
                  <img 
                    src={userData.assistantImage} 
                    alt="Assistant" 
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-400"
                  />
                </div>
              )}
            </div>
          )}

          <div className="bg-[#0000003d] backdrop-blur rounded-2xl p-8 border border-blue-400">
            <h3 className="text-white text-xl mb-4">Assistant Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white">
              <div className="p-4 bg-[#00000066] rounded-lg">
                <h4 className="text-blue-400 font-semibold mb-2">Voice Commands</h4>
                <p className="text-sm">Control your assistant with voice</p>
              </div>
              <div className="p-4 bg-[#00000066] rounded-lg">
                <h4 className="text-blue-400 font-semibold mb-2">Smart Responses</h4>
                <p className="text-sm">AI-powered intelligent responses</p>
              </div>
              <div className="p-4 bg-[#00000066] rounded-lg">
                <h4 className="text-blue-400 font-semibold mb-2">Task Management</h4>
                <p className="text-sm">Help you organize and manage tasks</p>
              </div>
              <div className="p-4 bg-[#00000066] rounded-lg">
                <h4 className="text-blue-400 font-semibold mb-2">24/7 Available</h4>
                <p className="text-sm">Always ready to assist you</p>
              </div>
            </div>
          </div>

          {!userData.assistantName && (
            <div className="mt-8">
              <p className="text-gray-300 mb-4">
                You haven't set up your assistant yet. Click below to customize it!
              </p>
              <button
                onClick={handleCustomize}
                className="bg-blue-500 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-600"
              >
                Setup Your Assistant
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
