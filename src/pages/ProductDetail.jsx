import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Settings, CheckCircle2 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import QuoteModal from '../components/QuoteModal'
import ErrorBoundary from '../components/ErrorBoundary'

export default function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single()
        
        if (error || !data) throw error
        setProduct(data)
      } catch (err) {
        console.error(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  if (loading) return (
    <div className="min-h-screen bg-white dark:bg-brand-dark transition-colors flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-gray-200 dark:border-brand-border border-t-brand-accent rounded-full animate-spin"></div>
    </div>
  )
  
  if (error || !product) return (
    <div className="min-h-screen bg-white dark:bg-brand-dark transition-colors flex flex-col items-center justify-center gap-6">
      <h2 className="font-display text-5xl text-gray-900 dark:text-brand-light">Product Not Found</h2>
      <Link to="/products" className="text-brand-accent font-mono uppercase tracking-widest hover:text-brand-gold transition-colors">
        &larr; Back to Catalogue
      </Link>
    </div>
  )

  const hasImage = Boolean(product.image_url)
  const specs = typeof product.specifications === 'string' 
    ? JSON.parse(product.specifications || '{}') 
    : (product.specifications || {})

  const cleanSpecs = Object.entries(specs).filter(
    ([k, v]) => !k.includes('@') && !String(v).includes('@') && k.trim() !== '' && String(v).trim() !== ''
  )

  return (
    <ErrorBoundary>
      <div className="bg-white dark:bg-brand-dark transition-colors min-h-screen font-body pb-24">
        
        {/* Breadcrumb Top Bar */}
        <div className="bg-gray-50 dark:bg-brand-steel border-b border-gray-200 dark:border-brand-border py-4">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-gray-600 dark:text-brand-muted">
              <Link to="/products" className="hover:text-brand-accent transition-colors">Products</Link>
              <span>/</span>
              <span className="text-gray-900 dark:text-brand-light">{product.machine_type.replace('_', ' ')}</span>
              <span>/</span>
              <span className="text-brand-accent truncate max-w-[200px] md:max-w-md">{product.name}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
            
            {/* Main Visual */}
            <div className="animate-fade-up opacity-0 lg:sticky lg:top-28 lg:h-fit" style={{ animationDelay: '0.1s' }}>
              <div className="bg-gray-50 dark:bg-brand-card rounded-2xl border border-gray-200 dark:border-brand-border overflow-hidden p-2 shadow-2xl shadow-brand-accent/5">
                <div className="aspect-[4/3] relative rounded-xl overflow-hidden bg-gray-100 dark:bg-brand-steel flex items-center justify-center">
                  {hasImage ? (
                    <>
                      <img 
                        src={product.image_url} 
                        alt={product.name} 
                        loading="lazy" 
                        className="w-full h-full object-contain bg-white dark:bg-brand-steel" 
                        onError={(e) => { 
                          e.target.style.display = 'none'; 
                          if (e.target.nextSibling && e.target.nextSibling.style) {
                            e.target.nextSibling.style.display = 'flex';
                          }
                        }} 
                      />
                      <div className="hidden w-full h-full items-center justify-center opacity-30 flex-col gap-2" style={{ display: 'none' }}>
                        <Settings size={60} className="text-gray-400 dark:text-brand-muted" />
                        <p className="font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-brand-muted">Image Unavailable</p>
                      </div>
                    </>
                  ) : (
                    <div className="text-center opacity-30">
                      <Settings size={80} className="mx-auto mb-4 text-gray-400 dark:text-brand-muted" />
                      <p className="font-mono text-sm uppercase tracking-widest dark:text-brand-muted text-gray-500">Image Unavailable</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Details & Specs */}
            <div className="animate-fade-up opacity-0 flex flex-col pt-4" style={{ animationDelay: '0.2s' }}>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="font-mono text-xs text-brand-accent border border-brand-accent/30 bg-brand-accent/10 px-3 py-1.5 rounded uppercase tracking-widest">
                  {product.machine_type.replace('_', ' ')}
                </span>
                <span className="font-mono text-xs text-gray-700 dark:text-brand-muted border border-gray-300 dark:border-brand-border bg-gray-100 dark:bg-brand-steel px-3 py-1.5 rounded uppercase tracking-widest">
                  {product.product_type}
                </span>
                {product.is_featured && (
                  <span className="font-mono text-xs text-brand-dark bg-brand-accent px-3 py-1.5 rounded uppercase tracking-widest font-semibold">
                    Featured
                  </span>
                )}
              </div>
              
              <h1 className="font-display text-5xl md:text-6xl text-gray-900 dark:text-white mb-6 uppercase leading-[1.1]">{product.name}</h1>
              
              <p className="text-gray-600 dark:text-brand-muted text-lg leading-relaxed mb-10 font-light">
                {product.description || "High-performance components engineered for precise tolerances and extended wear life. Designed to maximize operational efficiency and reduce downtime."}
              </p>
              <div className="bg-gray-50 dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-xl p-8 mb-10">
                <h3 className="font-display text-2xl text-gray-900 dark:text-brand-light uppercase mb-6 flex items-center gap-3">
                  <CheckCircle2 size={24} className="text-brand-accent" /> Technical Specifications
                </h3>
                
                <div className="flex flex-col font-mono text-sm">
                  {product.material && (
                    <div className="flex py-3 border-b border-gray-200 dark:border-brand-border/50 bg-[#0d1f3c]/5 dark:bg-brand-steel/50 px-4 rounded-t-lg">
                      <span className="text-gray-600 dark:text-brand-muted w-1/2 uppercase tracking-wider">Material</span>
                      <span className="text-gray-900 dark:text-brand-light w-1/2 font-semibold">{product.material}</span>
                    </div>
                  )}
                  {product.diameter_range && (
                    <div className="flex py-3 border-b border-gray-200 dark:border-brand-border/50 px-4">
                      <span className="text-gray-600 dark:text-brand-muted w-1/2 uppercase tracking-wider">Diameter</span>
                      <span className="text-gray-900 dark:text-brand-light w-1/2 font-semibold">{product.diameter_range}</span>
                    </div>
                  )}
                  {product.ld_ratio && (
                    <div className="flex py-3 border-b border-gray-200 dark:border-brand-border/50 bg-[#0d1f3c]/5 dark:bg-brand-steel/50 px-4">
                      <span className="text-gray-600 dark:text-brand-muted w-1/2 uppercase tracking-wider">L/D Ratio</span>
                      <span className="text-gray-900 dark:text-brand-light w-1/2 font-semibold">{product.ld_ratio}</span>
                    </div>
                  )}
                  {cleanSpecs.map(([k, v], i) => (
                    <div key={k} className={`flex py-3 border-b border-gray-200 dark:border-brand-border/50 px-4 ${i % 2 === (product.ld_ratio ? 0 : 1) ? '' : 'bg-[#0d1f3c]/5 dark:bg-brand-steel/50'}`}>
                      <span className="text-gray-600 dark:text-brand-muted w-1/2 uppercase tracking-wider">{k.replace(/_/g, ' ')}</span>
                      <span className="text-gray-900 dark:text-brand-light w-1/2 font-semibold">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-brand-steel border border-gray-200 dark:border-brand-border border-l-[3px] border-l-brand-copper dark:border-l-brand-copper rounded-xl p-8 sticky bottom-6 shadow-2xl">
                <h3 className="font-display text-2xl text-brand-accent uppercase mb-2">Ready to order?</h3>
                <p className="text-gray-600 dark:text-brand-muted mb-6 text-sm">Submit your requirements directly to our engineering team for a rapid quotation.</p>
                <button 
                  onClick={() => setQuoteOpen(true)}
                  className="w-full bg-brand-accent text-brand-dark font-display text-xl uppercase tracking-wider px-6 py-4 rounded-lg hover:bg-brand-gold active:scale-95 transition-all duration-200 shadow-lg shadow-brand-accent/20 animate-glow-pulse"
                >
                  Request Quote For This Item
                </button>
              </div>
            </div>

          </div>
        </div>

        {quoteOpen && (
          <QuoteModal 
            onClose={() => setQuoteOpen(false)} 
            defaultProduct={product.name} 
          />
        )}
      </div>
    </ErrorBoundary>
  )
}
