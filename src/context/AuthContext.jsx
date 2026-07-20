import { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('lunara_user')
    if (stored) setUser(JSON.parse(stored))
    setLoading(false)
  }, [])

  function login(email, password) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password.length >= 6) {
          const loggedInUser = { name: email.split('@')[0], email }
          setUser(loggedInUser)
          localStorage.setItem('lunara_user', JSON.stringify(loggedInUser))
          resolve(loggedInUser)
        } else {
          reject(new Error('Invalid email or password.'))
        }
      }, 600)
    })
  }

  function register(name, email, password) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = { name, email }
        setUser(newUser)
        localStorage.setItem('lunara_user', JSON.stringify(newUser))
        resolve(newUser)
      }, 600)
    })
  }

  function logout() {
    setUser(null)
    localStorage.removeItem('lunara_user')
  }

  function updateProfile(updates) {
    setUser((prev) => {
      const updated = { ...prev, ...updates }
      localStorage.setItem('lunara_user', JSON.stringify(updated))
      return updated
    })
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  )
}