import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import { COMPANY, NAV_LINKS } from '../lib/constants'

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-brand-steel border-t border-gray-300 dark:border-brand-border pt-20 pb-10 transition-colors">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16">
          {/* Company Info */}
          <div>
            <Link to="/" className="flex items-center gap-4 group mb-6">
              <img src="/logo.svg" alt="Kushwaha Group Logo" className="w-14 h-14 object-contain group-hover:scale-105 transition-transform" />
              <div className="flex flex-col">
                <span className="font-display tracking-wide text-3xl md:text-4xl text-gray-900 dark:text-brand-light group-hover:text-brand-accent transition-colors">KUSHWAHA GROUP</span>
                <span className="font-mono text-[10px] md:text-xs text-brand-accent uppercase tracking-widest leading-none mt-1">{COMPANY.tagline}</span>
              </div>
            </Link>
            <p className="text-gray-600 dark:text-brand-muted leading-relaxed mb-8">
              {COMPANY.subTagline}
            </p>
            <div className="flex flex-col gap-4 font-mono text-sm">
              <div className="flex items-start gap-4 text-gray-800 dark:text-brand-light">
                <MapPin size={20} className="text-brand-accent shrink-0" />
                <span className="leading-snug">{COMPANY.address}</span>
              </div>
              <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-4 text-gray-800 dark:text-brand-light hover:text-brand-accent transition-colors">
                <Phone size={20} className="text-brand-accent shrink-0" />
                <span>{COMPANY.phone}</span>
              </a>
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-4 text-gray-800 dark:text-brand-light hover:text-brand-accent transition-colors">
                <Mail size={20} className="text-brand-accent shrink-0" />
                <span>{COMPANY.email}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-12">
            <h3 className="font-display text-2xl text-gray-900 dark:text-white mb-6 uppercase tracking-wider">Quick Links</h3>
            <div className="flex flex-col gap-4">
              {NAV_LINKS.map(link => (
                <Link key={link.to} to={link.to} className="text-gray-600 dark:text-brand-muted hover:text-brand-accent hover:translate-x-1 transition-all duration-200 w-fit">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-display text-2xl text-gray-900 dark:text-white mb-6 uppercase tracking-wider">Our Products</h3>
            <div className="flex flex-col gap-4">
              <Link to="/products?filter=injection" className="text-gray-600 dark:text-brand-muted hover:text-brand-accent hover:translate-x-1 transition-all duration-200 flex items-center justify-between group border-b border-gray-200 dark:border-brand-border/50 pb-3">
                <span>Injection Moulding Screws</span>
                <span className="text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </Link>
              <Link to="/products?filter=extrusion" className="text-gray-600 dark:text-brand-muted hover:text-brand-accent hover:translate-x-1 transition-all duration-200 flex items-center justify-between group border-b border-gray-200 dark:border-brand-border/50 pb-3">
                <span>Extrusion Barrels</span>
                <span className="text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </Link>
              <Link to="/products?filter=blow_moulding" className="text-gray-600 dark:text-brand-muted hover:text-brand-accent hover:translate-x-1 transition-all duration-200 flex items-center justify-between group border-b border-gray-200 dark:border-brand-border/50 pb-3">
                <span>Blow Moulding Assemblies</span>
                <span className="text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </Link>
              <Link to="/capabilities" className="text-gray-600 dark:text-brand-muted hover:text-brand-accent hover:translate-x-1 transition-all duration-200 flex items-center justify-between group pb-3">
                <span>Custom Manufacturing</span>
                <span className="text-brand-accent opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-300 dark:border-brand-border flex flex-col md:flex-row items-center justify-between gap-4 text-gray-600 dark:text-brand-muted text-sm content-center">
          <p>&copy; {COMPANY.footerYear} {COMPANY.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-6">
            <p className="font-mono text-xs uppercase tracking-widest text-brand-steel bg-brand-accent/90 px-3 py-1 rounded-sm shadow-sm inline-block font-semibold">
              Powered by precision engineering
            </p>
            <Link to="/admin-login" className="text-xs text-gray-500 hover:text-yellow-400 transition-colors cursor-pointer">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
