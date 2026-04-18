import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, Phone, Sun, Moon } from 'lucide-react'
import { COMPANY } from '../lib/constants'
import QuoteModal from './QuoteModal'
import { useTheme } from '../context/ThemeContext'
import KushwahaLogo from './KushwahaLogo'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/about', label: 'About' },
  { to: '/industries', label: 'Industries' },
  { to: '/capabilities', label: 'Capabilities' },
  { to: '/quality', label: 'Quality' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-brand-dark/90 backdrop-blur border-b border-gray-200 dark:border-brand-border transition-colors">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Brand */}
          <NavLink to="/" className="flex items-center gap-3 flex-shrink-0 group active:scale-95 transition-transform">
            <div className="flex items-center">
              <KushwahaLogo className="w-56 md:w-[320px] h-auto" width="100%" height="100%" />
            </div>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden md:flex gap-6 items-center">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) => 
                  `text-sm transition-colors ${isActive ? 'text-brand-accent font-semibold' : 'text-brand-muted hover:text-brand-accent'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-6">
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-600 hover:text-brand-accent dark:text-brand-muted dark:hover:text-brand-accent transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a href={`tel:${COMPANY.phone}`} className="hidden lg:flex items-center gap-2 text-sm text-gray-600 dark:text-brand-muted hover:text-gray-900 dark:hover:text-brand-light transition-colors font-mono">
              <Phone size={16} className="text-brand-accent" />
              {COMPANY.phone}
            </a>
            
            <button 
              className="bg-brand-accent text-brand-dark font-semibold px-6 py-2.5 rounded-lg hover:bg-brand-gold active:scale-95 transition-all duration-200 text-sm hidden md:block" 
              onClick={() => setQuoteOpen(true)}
            >
              Request Quote
            </button>

            <button 
              className="md:hidden p-2 text-gray-900 dark:text-brand-light hover:text-brand-accent transition-colors" 
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-gray-50 dark:bg-brand-steel border-b border-gray-200 dark:border-brand-border animate-fade-in">
            <div className="flex flex-col px-6 py-4">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) => 
                    `py-4 border-b border-gray-200 dark:border-brand-border/50 text-lg transition-colors ${isActive ? 'text-brand-accent font-semibold' : 'text-gray-900 dark:text-brand-light hover:text-brand-accent'}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="py-6 flex flex-col gap-4">
                <a href={`tel:${COMPANY.phone}`} className="flex items-center justify-center gap-2 text-brand-muted btn-secondary w-full py-3 rounded-lg border border-brand-border hover:border-brand-accent hover:text-brand-accent transition-colors font-mono">
                  <Phone size={18} />
                  {COMPANY.phone}
                </a>
                <button 
                  className="bg-brand-accent text-brand-dark font-semibold px-6 py-3 rounded-lg hover:bg-brand-gold active:scale-95 transition-all duration-200 w-full" 
                  onClick={() => { setQuoteOpen(true); setMenuOpen(false) }}
                >
                  Request Quote
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {quoteOpen && <QuoteModal onClose={() => setQuoteOpen(false)} />}
    </>
  )
}
