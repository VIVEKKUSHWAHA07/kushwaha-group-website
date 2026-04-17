import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import { supabase } from '../lib/supabase'
import ProductCard from '../components/ProductCard'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialFilter = searchParams.get('filter') || 'all'
  
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [machineFilter, setMachineFilter] = useState(initialFilter)
  const [typeFilter, setTypeFilter] = useState('all') 
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchProducts()
    if (machineFilter !== initialFilter) {
      setSearchParams({ filter: machineFilter })
    }
  }, [machineFilter, typeFilter, searchQuery])

  const fetchProducts = async () => {
    setLoading(true)
    try {
      let query = supabase.from('products').select('*').order('created_at', { ascending: false })
      
      if (machineFilter !== 'all') {
        query = query.eq('machine_type', machineFilter)
      }
      if (typeFilter !== 'all') {
        query = query.eq('product_type', typeFilter)
      }
      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`)
      }

      const { data, error } = await query
      if (error) throw error
      setProducts(data)
    } catch (err) {
      console.error('Error fetching products:', err)
    } finally {
      setLoading(false)
    }
  }

  const machineTabs = [
    { id: 'all', label: 'All Machines' },
    { id: 'injection', label: 'Injection' },
    { id: 'extrusion', label: 'Extrusion' },
    { id: 'blow_moulding', label: 'Blow Moulding' },
    { id: 'custom', label: 'Custom' }
  ]

  const typeTabs = [
    { id: 'all', label: 'All Types' },
    { id: 'screw', label: 'Screws Only' },
    { id: 'barrel', label: 'Barrels Only' }
  ]

  return (
    <div className="bg-white dark:bg-brand-dark transition-colors min-h-screen py-20 font-body">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-16 animate-fade-up opacity-0" style={{ animationDelay: '0.1s' }}>
          <h1 className="font-display text-6xl md:text-7xl text-gray-900 dark:text-white uppercase mb-4">Product Catalogue</h1>
          <p className="text-gray-600 dark:text-brand-muted text-lg max-w-2xl">Browse our high-performance manufacturing catalogue engineered for precision.</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Sidebar */}
          <aside className="w-full lg:w-1/4 sticky top-28 flex flex-col gap-8 animate-fade-up opacity-0" style={{ animationDelay: '0.2s' }}>
            
            <div className="flex flex-col gap-2">
              <label className="font-mono text-xs text-gray-600 dark:text-brand-muted uppercase tracking-widest pl-1">Search Products</label>
              <div className="relative">
                <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-brand-muted" />
                <input 
                  type="text" 
                  placeholder="e.g. Bimetallic Screw..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-gray-50 dark:bg-brand-steel border border-gray-200 dark:border-brand-border rounded-lg pl-10 pr-4 py-3 text-gray-900 dark:text-brand-light placeholder:text-gray-400 dark:placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-accent transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="font-mono text-xs text-gray-600 dark:text-brand-muted uppercase tracking-widest pl-1">Machine Type</label>
              <div className="flex flex-col gap-2">
                {machineTabs.map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => setMachineFilter(tab.id)}
                    className={`text-left px-4 py-2 rounded-lg font-mono text-sm transition-all duration-200 border ${machineFilter === tab.id ? 'bg-brand-accent/10 border-brand-accent text-brand-accent shadow-sm shadow-brand-accent/10' : 'bg-transparent border-transparent text-gray-600 dark:text-brand-muted hover:bg-gray-100 dark:hover:bg-brand-steel hover:text-gray-900 dark:hover:text-brand-light'}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="font-mono text-xs text-gray-600 dark:text-brand-muted uppercase tracking-widest pl-1">Component Type</label>
              <div className="flex flex-wrap gap-2">
                {typeTabs.map(tab => (
                  <button 
                    key={tab.id}
                    onClick={() => setTypeFilter(tab.id)}
                    className={`px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-200 border ${typeFilter === tab.id ? 'bg-brand-accent text-brand-dark border-brand-accent font-semibold' : 'bg-gray-100 dark:bg-brand-steel/50 border-gray-200 dark:border-brand-border text-gray-600 dark:text-brand-muted hover:border-brand-accent/50'}`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

          </aside>

          {/* Grid */}
          <main className="w-full lg:w-3/4 animate-fade-up opacity-0" style={{ animationDelay: '0.3s' }}>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1,2,3,4,5,6].map(n => (
                  <div key={n} className="bg-gray-50 dark:bg-brand-card rounded-xl h-[400px] animate-pulse border border-gray-200 dark:border-brand-border"></div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-brand-card border border-gray-200 dark:border-brand-border border-dashed rounded-xl p-16 text-center flex flex-col items-center justify-center">
                <Search size={48} className="text-gray-400 dark:text-brand-muted opacity-50 mb-6" />
                <h2 className="font-display text-4xl text-gray-900 dark:text-brand-light mb-2">No Products Found</h2>
                <p className="text-gray-600 dark:text-brand-muted mb-8 max-w-md">We couldn't find any products matching your current filters. Try adjusting your parameters.</p>
                <button onClick={() => { setMachineFilter('all'); setTypeFilter('all'); setSearchQuery(''); }} className="border border-gray-300 dark:border-brand-border text-gray-900 dark:text-brand-light px-6 py-3 rounded-lg hover:border-brand-accent hover:text-brand-accent dark:hover:border-brand-accent dark:hover:text-brand-accent transition-all duration-200 uppercase tracking-widest text-xs font-mono font-semibold">
                  Clear All Filters
                </button>
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  )
}
