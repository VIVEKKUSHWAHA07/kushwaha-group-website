import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import { COMPANY } from '../lib/constants'
import QuoteModal from './QuoteModal'

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

  return (
    <>
      <header style={styles.header}>
        <div style={styles.container}>

          {/* Brand */}
          <NavLink to="/" style={styles.brand}>
            <span style={styles.brandName}>{COMPANY.name}</span>
            <span style={styles.brandTagline}>{COMPANY.tagline}</span>
          </NavLink>

          {/* Desktop Nav */}
          <nav className="navbar-desktop" style={styles.desktopNav}>
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                style={({ isActive }) => ({
                  ...styles.navLink,
                  ...(isActive ? styles.navLinkActive : {}),
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Side */}
          <div style={styles.right}>
            <a href={`tel:${COMPANY.phone}`} className="navbar-phone" style={styles.phone}>
              <Phone size={14} />
              {COMPANY.phone}
            </a>
            <button style={styles.ctaBtn} onClick={() => setQuoteOpen(true)}>
              Get a Quote
            </button>
            <button className="navbar-hamburger" style={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={24} color="#fff" /> : <Menu size={24} color="#fff" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div style={styles.mobileMenu}>
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                style={({ isActive }) => ({
                  ...styles.mobileLink,
                  ...(isActive ? styles.mobileLinkActive : {}),
                })}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <button style={styles.mobileCta} onClick={() => { setQuoteOpen(true); setMenuOpen(false) }}>
              Get a Quote
            </button>
          </div>
        )}
      </header>

      {quoteOpen && <QuoteModal onClose={() => setQuoteOpen(false)} />}
    </>
  )
}

const styles = {
  header: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backgroundColor: '#0A1628',
    borderBottom: '2px solid #E07B00',
    width: '100%',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
    height: '68px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '24px',
  },
  brand: {
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.2,
    flexShrink: 0,
  },
  brandName: {
    fontFamily: "'Barlow Condensed', sans-serif",
    fontWeight: 800,
    fontSize: '22px',
    color: '#FFFFFF',
    letterSpacing: '0.5px',
  },
  brandTagline: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '10px',
    color: '#E07B00',
    letterSpacing: '0.3px',
  },
  desktopNav: {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
  },
  navLink: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '13px',
    fontWeight: 500,
    color: '#CBD5E0',
    textDecoration: 'none',
    padding: '6px 10px',
    borderRadius: '4px',
    transition: 'color 0.2s',
  },
  navLinkActive: {
    color: '#E07B00',
    fontWeight: 600,
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flexShrink: 0,
  },
  phone: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontFamily: "'Inter', sans-serif",
    fontSize: '12px',
    color: '#CBD5E0',
    textDecoration: 'none',
  },
  ctaBtn: {
    backgroundColor: '#E07B00',
    color: '#FFFFFF',
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: '13px',
    padding: '8px 18px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
  },
  hamburger: {
    display: 'none',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
  },
  mobileMenu: {
    backgroundColor: '#0D1F3C',
    padding: '12px 24px 20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    borderTop: '1px solid #1E3A5F',
  },
  mobileLink: {
    fontFamily: "'Inter', sans-serif",
    fontSize: '15px',
    fontWeight: 500,
    color: '#CBD5E0',
    textDecoration: 'none',
    padding: '10px 0',
    borderBottom: '1px solid #1E3A5F',
  },
  mobileLinkActive: {
    color: '#E07B00',
    fontWeight: 600,
  },
  mobileCta: {
    marginTop: '12px',
    backgroundColor: '#E07B00',
    color: '#FFFFFF',
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600,
    fontSize: '15px',
    padding: '12px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
  },
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '32px',
    minWidth: '300px',
    position: 'relative',
  },
  modalClose: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
}
