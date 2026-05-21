import useAuthStore from '../store/authStore'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="bg-white/80 backdrop-blur-md border border-stone-100 shadow-sm px-6 py-4 flex justify-between items-center rounded-2xl mb-8">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
          ✓
        </div>
        <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-800 to-teal-700 bg-clip-text text-transparent hidden sm:block">
          FlowState
        </h1>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="font-semibold text-stone-800 text-sm sm:text-base">{user?.name}</p>
          <p className="text-xs text-stone-400">{user?.email}</p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-stone-100 hover:bg-red-50 hover:text-red-600 text-stone-600 px-4 py-2 rounded-xl text-sm font-medium transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default Navbar