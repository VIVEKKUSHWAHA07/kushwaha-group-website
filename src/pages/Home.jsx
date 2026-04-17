import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Box } from 'lucide-react'
import { supabase } from '../lib/supabase'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchFeatured() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3)
      
      if (data) setFeaturedProducts(data)
      setLoading(false)
    }
    fetchFeatured()
  }, [])

  return (
    <div className="font-body overflow-hidden transition-colors">
      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] flex items-center bg-white dark:bg-brand-dark overflow-hidden transition-colors">
        {/* Subtle diagonal grid pattern */}
        <div className="absolute inset-0 opacity-20 dark:opacity-20 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(232,197,71,0.05) 10px, rgba(232,197,71,0.05) 20px)' }}></div>
        
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 flex flex-col md:flex-row items-center gap-12 py-20">
          
          {/* Left Column */}
          <div className="flex-1 w-full flex flex-col items-start gap-6">
            <div className="animate-fade-up opacity-0" style={{ animationDelay: '0.1s' }}>
              <span className="font-mono text-xs text-brand-accent border border-brand-accent/30 px-4 py-1.5 rounded-full uppercase tracking-widest backdrop-blur-sm bg-white/50 dark:bg-brand-dark/50">
                ISO Certified Manufacturer
              </span>
            </div>
            
            <h1 className="font-display text-7xl md:text-8xl lg:text-9xl text-gray-900 dark:text-white leading-[0.85] animate-fade-up opacity-0 text-left" style={{ animationDelay: '0.2s' }}>
              PRECISION<br/>
              <span className="text-brand-accent">SCREWS</span> &<br/>
              BARRELS
            </h1>
            
            <p className="text-gray-600 dark:text-brand-muted text-lg md:text-xl max-w-xl leading-relaxed animate-fade-up opacity-0 font-light" style={{ animationDelay: '0.3s' }}>
              Manufacturers of high-performance components engineered for durability and maximum output. We build for Injection, Extrusion, and Blow Moulding machines.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 animate-fade-up opacity-0 mt-4" style={{ animationDelay: '0.4s' }}>
              <Link to="/products" className="bg-brand-accent text-brand-dark font-display tracking-wide text-xl px-8 py-4 rounded hover:bg-brand-gold active:scale-95 transition-all duration-200">
                View Catalogue
              </Link>
              <Link to="/contact" className="border border-gray-300 dark:border-brand-border text-gray-900 dark:text-brand-light font-display tracking-wide text-xl px-8 py-4 rounded hover:border-brand-accent dark:hover:border-brand-accent hover:text-brand-accent dark:hover:text-brand-accent active:scale-95 transition-all duration-200">
                Request Quote
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="hidden md:flex flex-col items-center justify-center w-5/12 animate-fade-up opacity-0" style={{ animationDelay: '0.5s' }}>
            <div className="relative">
              {/* Rotating abstract gear/industrial element mockup */}
              <div className="w-80 h-80 border border-brand-border/30 rounded-full animate-spin-slow flex items-center justify-center relative shadow-2xl shadow-brand-accent/5">
                <div className="w-64 h-64 border border-brand-border/50 rounded-full flex items-center justify-center">
                  <div className="w-48 h-48 border border-brand-border/80 rounded-full"></div>
                </div>
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center backdrop-blur-sm">
                <span className="font-display text-8xl text-gray-900 dark:text-brand-light drop-shadow-2xl">2500+</span>
                <span className="font-mono text-brand-accent uppercase tracking-widest text-sm mt-2 font-semibold">Products Delivered</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-gray-50 dark:bg-brand-steel border-y border-gray-200 dark:border-brand-border py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-gray-200 dark:divide-brand-border/20">
            <div className="flex flex-col flex-1 items-center justify-center text-center px-4">
              <div className="font-display text-5xl md:text-6xl text-brand-accent mb-2">15+</div>
              <div className="font-mono text-xs text-gray-800 dark:text-brand-light uppercase tracking-widest">Years Experience</div>
            </div>
            <div className="flex flex-col flex-1 items-center justify-center text-center px-4">
              <div className="font-display text-5xl md:text-6xl text-brand-accent mb-2">2500+</div>
              <div className="font-mono text-xs text-gray-800 dark:text-brand-light uppercase tracking-widest">Products</div>
            </div>
            <div className="flex flex-col flex-1 items-center justify-center text-center px-4">
              <div className="font-display text-5xl md:text-6xl text-brand-accent mb-2">50+</div>
              <div className="font-mono text-xs text-gray-800 dark:text-brand-light uppercase tracking-widest">Industries</div>
            </div>
            <div className="flex flex-col flex-1 items-center justify-center text-center px-4">
              <div className="font-display text-5xl md:text-6xl text-brand-accent mb-2">100%</div>
              <div className="font-mono text-xs text-gray-800 dark:text-brand-light uppercase tracking-widest">Pan India</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-white dark:bg-brand-dark transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 dark:border-brand-border pb-6">
            <h2 className="font-display text-5xl md:text-6xl text-gray-900 dark:text-white">Featured Products</h2>
            <Link to="/products" className="text-brand-accent hover:text-brand-gold font-mono uppercase tracking-widest text-sm mb-2 flex items-center gap-2 group transition-colors">
              View All Catalogue <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map(n => (
                <div key={n} className="bg-gray-50 dark:bg-brand-card rounded-xl h-[400px] animate-pulse border border-gray-200 dark:border-brand-border"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProducts.length > 0 ? (
                featuredProducts.map(p => <ProductCard key={p.id} product={p} />)
              ) : (
                <div className="col-span-full py-20 text-center border border-dashed border-gray-300 dark:border-brand-border rounded-xl">
                  <Box size={48} className="mx-auto text-gray-400 dark:text-brand-muted mb-4 opacity-50" />
                  <p className="font-mono text-gray-500 dark:text-brand-muted">No featured products yet.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* CAPABILITIES STRIP */}
      <section className="py-12 bg-white dark:bg-brand-dark border-y border-gray-200 dark:border-brand-border overflow-hidden relative transition-colors">
        <div className="flex whitespace-nowrap animate-slide-left opacity-0" style={{ animationDelay: '0.2s' }}>
          {/* We'll duplicate the string to make it visually full width depending on screen size easily */}
          {[1,2,3].map((_, idx) => (
            <div key={idx} className="flex gap-4 px-4 items-center shrink-0">
              {['Injection Moulding', 'Extrusion', 'Blow Moulding', 'Custom CNC Machining', 'Bimetallic Coating', 'Nitriding'].map(tag => (
                <div key={tag} className="border border-gray-200 dark:border-brand-border bg-gray-50 dark:bg-brand-card/50 text-gray-800 dark:text-brand-light rounded-full px-6 py-3 text-sm font-mono hover:border-brand-accent dark:hover:border-brand-accent hover:text-brand-accent transition-colors cursor-default whitespace-nowrap">
                  {tag}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-gray-50 dark:bg-brand-card py-24 border-y border-gray-200 dark:border-brand-border relative overflow-hidden transition-colors">
        <div className="absolute inset-0 opacity-5" style={{ background: 'radial-gradient(circle at center, #E8C547 0%, transparent 60%)' }}></div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-display text-5xl md:text-7xl text-gray-900 dark:text-white mb-8 uppercase leading-none">
            Built To Your Exact<br/>Specifications
          </h2>
          <p className="font-body text-gray-600 dark:text-brand-muted mb-10 max-w-2xl mx-auto text-lg">
            Whether you need a standard replacement or a highly customized screw profile for specialized polymers, our engineering team is ready to deliver.
          </p>
          <button 
            onClick={() => document.querySelector('.ctaBtn')?.click()} // Hack to click the navbar CTA internally since QuoteModal state is lifted or local. Let's redirect to contact.
            className="hidden" id="trigger-modal"
          ></button>
          <Link to="/contact" className="bg-brand-accent text-brand-dark font-display tracking-widest uppercase text-2xl px-12 py-5 rounded-lg hover:bg-brand-gold active:scale-95 transition-all shadow-xl shadow-brand-accent/20 inline-block">
            Send an RFQ
          </Link>
        </div>
      </section>
    </div>
  )
}
