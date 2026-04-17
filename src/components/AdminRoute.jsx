import { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const ADMIN_EMAIL = "kushwahavivek6265@gmail.com"

export default function AdminRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) {
        setAuthorized(false)
        setLoading(false)
        return
      }

      if (session.user.email !== ADMIN_EMAIL) {
        await supabase.auth.signOut()
        setAuthorized(false)
        setLoading(false)
        return
      }

      setAuthorized(true)
      setLoading(false)
    }

    checkSession()
  }, [])

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-300 dark:border-gray-700 border-t-yellow-400 dark:border-t-yellow-400 rounded-full animate-spin"></div>
      </div>
    )
  }

  return authorized ? children : <Navigate to="/admin-login" replace />
}
