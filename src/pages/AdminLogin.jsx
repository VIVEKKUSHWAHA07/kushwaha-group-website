import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

const ADMIN_EMAIL = "kushwahavivek6265@gmail.com"

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (signInError) throw signInError

      if (data.user.email !== ADMIN_EMAIL) {
        await supabase.auth.signOut()
        throw new Error("Access denied. Not an authorized admin.")
      }

      navigate('/admin')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 transition-colors p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700 transition-colors">
        
        <div className="text-center justify-center flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gray-900 dark:bg-black rounded-lg border-2 border-yellow-400 flex items-center justify-center font-display text-3xl text-white mb-4">
            KG
          </div>
          <h1 className="text-2xl font-display text-gray-900 dark:text-yellow-400 tracking-wider">
            ADMIN LOGIN
          </h1>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded bg-red-100 border border-red-400 text-red-700 dark:bg-red-900/30 dark:border-red-500/50 dark:text-red-400 text-sm font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-mono text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-yellow-400 dark:focus:border-yellow-400 transition-colors"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-mono text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wide">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-yellow-400 dark:focus:border-yellow-400 transition-colors"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-display text-lg uppercase tracking-wider py-4 rounded-lg flex justify-center items-center transition-colors disabled:opacity-50 h-14"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

      </div>
    </div>
  )
}
