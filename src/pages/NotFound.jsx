import { Link } from 'react-router-dom'
import { ArrowLeft, Settings } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-brand-dark transition-colors flex items-center justify-center font-body p-6 relative overflow-hidden">
      
      {/* Background Ambient Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-3xl"></div>
      
      {/* Spinning Gear Background */}
      <Settings size={600} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-brand-border/10 animate-spin-slow object-center" />

      <div className="max-w-2xl text-center relative z-10 flex flex-col items-center">
        <h1 className="font-display text-[12rem] md:text-[16rem] text-brand-accent leading-none drop-shadow-2xl mb-4 animate-fade-up">
          404
        </h1>
        
        <h2 className="font-display text-4xl md:text-5xl text-gray-900 dark:text-white uppercase tracking-widest mb-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
          Page Not Found
        </h2>
        
        <p className="text-gray-600 dark:text-brand-muted text-xl mb-12 max-w-lg mb-8 animate-fade-up font-light" style={{ animationDelay: '0.2s' }}>
          The machine component you are looking for has been moved, removed, or is temporarily unavailable. 
        </p>

        <div className="flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <Link to="/" className="bg-brand-accent text-brand-dark font-display text-xl uppercase tracking-wider px-10 py-4 rounded-lg hover:bg-brand-gold active:scale-95 transition-all w-full sm:w-auto inline-flex items-center justify-center gap-2">
            <ArrowLeft size={20} /> Return to Factory Floor
          </Link>
          <Link to="/products" className="border border-gray-200 dark:border-brand-border bg-gray-50 dark:bg-brand-steel text-gray-900 dark:text-brand-light font-display text-xl uppercase tracking-wider px-10 py-4 rounded-lg hover:border-brand-accent dark:hover:border-brand-accent focus:outline-none transition-all w-full sm:w-auto">
            Browse Catalogue
          </Link>
        </div>
      </div>
      
    </div>
  )
}
