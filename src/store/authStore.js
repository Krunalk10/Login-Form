import { create } from 'zustand'

const useAuthStore = create((set, get) => ({
  // Holds all registered users
  users: JSON.parse(localStorage.getItem('registered_users')) || [],
  // Holds the currently logged-in user session
  user: JSON.parse(localStorage.getItem('current_session_user')) || null,

  login: (email, password) => {
    const { users } = get()
    const foundUser = users.find((u) => u.email === email && u.password === password)

    if (foundUser) {
      localStorage.setItem('current_session_user', JSON.stringify(foundUser))
      set({ user: foundUser })
      return true
    }
    return false
  },

  signup: (userData) => {
    const { users } = get()
    
    // Simple check to ensure email isn't duplicated
    if (users.some(u => u.email === userData.email)) {
      return { success: false, message: 'Email already registered!' }
    }

    const updatedUsers = [...users, userData]
    localStorage.setItem('registered_users', JSON.stringify(updatedUsers))
    localStorage.setItem('current_session_user', JSON.stringify(userData))
    
    set({ users: updatedUsers, user: userData })
    return { success: true }
  },

  logout: () => {
    localStorage.removeItem('current_session_user')
    set({ user: null })
  },
}))

export default useAuthStore