import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import ProductCard from '../components/ProductCard'

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialFilter = searchParams.get('filter') || 'all'
  
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [machineFilter, setMachineFilter] = useState(initialFilter)
  const [typeFilter, setTypeFilter] = useState('all') // all, screw, barrel

  useEffect(() => {
    fetchProducts()
    // Sync URL if filter changes via buttons
    if (machineFilter !== initialFilter) {
      setSearchParams({ filter: machineFilter })
    }
  }, [machineFilter, typeFilter])

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
    { id: 'injection', label: 'Injection Moulding' },
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
    <div style={styles.page}>
      <div style={styles.header}>
        <div className="container">
          <h1 style={styles.title}>Our Products</h1>
          <p style={styles.subtitle}>Browse our high-performance manufacturing catalogue.</p>
        </div>
      </div>

      <div className="container" style={styles.content}>
        
        {/* Filters */}
        <div style={styles.filterSection}>
          <div style={styles.filterGroup}>
            {machineTabs.map(tab => (
              <button 
                key={tab.id}
                onClick={() => setMachineFilter(tab.id)}
                style={machineFilter === tab.id ? styles.tabActive : styles.tabInactive}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div style={styles.filterGroup}>
            {typeTabs.map(tab => (
              <button 
                key={tab.id}
                onClick={() => setTypeFilter(tab.id)}
                style={typeFilter === tab.id ? styles.tabActive : styles.tabInactive}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content grid */}
        {loading ? (
          <div style={styles.grid}>
            {[1,2,3,4,5,6].map(n => (
              <div key={n} style={styles.skeletonCard}>
                <div style={styles.skeletonImg}></div>
                <div style={{ padding: '20px' }}>
                  <div style={styles.skeletonLineLg}></div>
                  <div style={styles.skeletonLineSm}></div>
                  <div style={styles.skeletonLineSm}></div>
                </div>
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <div style={styles.grid}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <h2 style={styles.emptyTitle}>Catalogue Updating</h2>
            <p style={styles.emptyText}>Our product catalogue is being updated for this category. Contact us for full specifications and availability.</p>
            <Link to="/contact" style={styles.btn}>Get a Quote</Link>
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}

const styles = {
  page: { backgroundColor: 'var(--color-bg)', minHeight: '100vh', fontFamily: 'var(--font-body)' },
  header: {
    backgroundColor: 'var(--color-navy)',
    padding: '60px 0',
    textAlign: 'center',
    color: '#fff',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '3rem',
    textTransform: 'uppercase',
  },
  subtitle: {
    color: 'var(--color-amber)',
    fontSize: '1.2rem',
    marginTop: '10px'
  },
  content: {
    padding: '60px 20px',
  },
  filterSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginBottom: '40px',
    alignItems: 'center'
  },
  filterGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px',
    justifyContent: 'center',
  },
  tabInactive: {
    backgroundColor: '#fff',
    border: '1px solid var(--color-border)',
    color: 'var(--color-steel)',
    padding: '8px 16px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 500,
    transition: 'all 0.2s',
  },
  tabActive: {
    backgroundColor: 'var(--color-amber)',
    border: '1px solid var(--color-amber)',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 600,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
  },
  emptyState: {
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: '60px 20px',
    borderRadius: '8px',
    border: '1px dashed var(--color-border)',
    maxWidth: '600px',
    margin: '0 auto'
  },
  emptyTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '2rem',
    color: 'var(--color-navy)',
    marginBottom: '15px'
  },
  emptyText: {
    color: 'var(--color-steel)',
    marginBottom: '30px',
    lineHeight: 1.6
  },
  btn: {
    display: 'inline-block',
    backgroundColor: 'var(--color-amber)',
    color: '#fff',
    padding: '14px 32px',
    textDecoration: 'none',
    fontFamily: 'var(--font-display)',
    fontSize: '1.1rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    borderRadius: '4px'
  },
  // Skeleton Styles
  skeletonCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-card)',
    animation: 'pulse 1.5s infinite ease-in-out'
  },
  skeletonImg: {
    width: '100%',
    height: '220px',
    backgroundColor: '#E2E8F0'
  },
  skeletonLineLg: {
    height: '24px',
    width: '70%',
    backgroundColor: '#E2E8F0',
    marginBottom: '15px',
    borderRadius: '4px'
  },
  skeletonLineSm: {
    height: '16px',
    width: '100%',
    backgroundColor: '#E2E8F0',
    marginBottom: '10px',
    borderRadius: '4px'
  }
}
