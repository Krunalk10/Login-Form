import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import useAuthStore from '../store/authStore'

function Login() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!formData.email || !formData.password) {
      setError('Please fill out all fields.')
      return
    }

    const success = login(formData.email, formData.password)
    if (success) {
      navigate('/home')
    } else {
      setError('Invalid email or password.')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-100 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-white/80 backdrop-blur-md shadow-xl rounded-3xl p-8 w-full max-w-md border border-white"
      >
        <h1 className="text-4xl font-bold text-center text-emerald-800 mb-2 tracking-tight">
          Welcome Back
        </h1>
        <p className="text-center text-stone-500 mb-6 text-sm">
          Simplify your day. Streamline your tasks.
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-sm font-medium border border-red-100 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-stone-500 mb-1 ml-1">Email Address</label>
            <input
              type="email"
              value={formData.email}
              placeholder="you@example.com"
              className="w-full p-3.5 rounded-xl bg-stone-50 border border-stone-200 outline-none focus:ring-2 focus:ring-emerald-400 transition-all text-stone-800"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-stone-500 mb-1 ml-1">Password</label>
            <input
              type="password"
              value={formData.password}
              placeholder="••••••••"
              className="w-full p-3.5 rounded-xl bg-stone-50 border border-stone-200 outline-none focus:ring-2 focus:ring-emerald-400 transition-all text-stone-800"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-medium shadow-md shadow-emerald-600/10 transition-all transform active:scale-[0.98] mt-2"
          >
            Sign In
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-stone-600">
          New around here?{' '}
          <Link to="/signup" className="text-emerald-600 font-bold hover:underline">
            Create an Account
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default Login