import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Settings, Info } from 'lucide-react'
import { supabase } from '../lib/supabase'
import QuoteModal from '../components/QuoteModal'

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

  if (loading) return <div style={styles.centerBox}><div className="spinner-loader"></div></div>
  if (error || !product) return (
    <div style={styles.centerBox}>
      <h2>Product not found</h2>
      <Link to="/products" style={styles.backLink}><ArrowLeft size={16}/> Back to Products</Link>
    </div>
  )

  const hasImage = Boolean(product.image_url)
  const specs = typeof product.specifications === 'string' 
    ? JSON.parse(product.specifications || '{}') 
    : (product.specifications || {})

  return (
    <div style={styles.page}>
      
      {/* Breadcrumb & Top Bar */}
      <div style={styles.topBar}>
        <div className="container">
          <Link to="/products" style={styles.backLink}>
            <ArrowLeft size={18} /> Back to Products
          </Link>
        </div>
      </div>

      <div className="container" style={{ padding: '40px 20px' }}>
        <div className="detail-grid" style={styles.grid}>
          
          {/* Main Visual */}
          <div style={styles.visualCol}>
            {hasImage ? (
              <img src={product.image_url} alt={product.name} loading="lazy" style={styles.mainImage} />
            ) : (
              <div style={styles.placeholder}>
                <Settings size={120} color="#CBD5E0" />
                <p style={{ marginTop: '20px', color: '#A0AEC0' }}>No image available</p>
              </div>
            )}
          </div>

          {/* Details & Specs */}
          <div style={styles.infoCol}>
            <div style={styles.badgeGroup}>
              <span style={styles.badge}>{product.machine_type.replace('_', ' ')}</span>
              <span style={styles.badgeOutline}>{product.product_type}</span>
            </div>
            
            <h1 style={styles.title}>{product.name}</h1>
            
            <p style={styles.desc}>
              {product.description || "High-performance components engineered for precise tolerances and extended wear life."}
            </p>

            <div style={styles.specBox}>
              <h3 style={styles.specTitle}><Info size={18} /> Key Specifications</h3>
              <table style={styles.table}>
                <tbody>
                  {product.material && <tr><td style={styles.tdLabel}>Material</td><td style={styles.tdVal}>{product.material}</td></tr>}
                  {product.diameter_range && <tr><td style={styles.tdLabel}>Diameter Range</td><td style={styles.tdVal}>{product.diameter_range}</td></tr>}
                  {product.ld_ratio && <tr><td style={styles.tdLabel}>L/D Ratio</td><td style={styles.tdVal}>{product.ld_ratio}</td></tr>}
                  {Object.entries(specs).map(([k, v]) => (
                    <tr key={k}><td style={styles.tdLabel}>{k}</td><td style={styles.tdVal}>{v}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={styles.ctaBox}>
              <h3 style={styles.ctaBoxTitle}>Request Quote for This Product</h3>
              <p style={{ color: 'var(--color-steel)', marginBottom: '20px', fontSize: '0.95rem' }}>
                Need pricing or custom modifications for {product.name}? Submit a request directly.
              </p>
              <button style={styles.btnSolid} onClick={() => setQuoteOpen(true)}>
                Get a Quote
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

      <style>{`
        .spinner-loader {
          width: 40px; height: 40px;
          border: 4px solid var(--color-border);
          border-top-color: var(--color-amber);
          border-radius: 50%;
          animation: spin 1s infinite linear;
        }
        .detail-grid { display: flex; flexDirection: column; gap: 40px; }
        @media (min-width: 992px) {
          .detail-grid { flex-direction: row; align-items: flex-start; }
          .detail-grid > div:first-child { flex: 1.2; position: sticky; top: 100px; }
          .detail-grid > div:last-child { flex: 1; }
        }
      `}</style>
    </div>
  )
}

const styles = {
  page: { backgroundColor: 'var(--color-bg)', minHeight: '100vh', fontFamily: 'var(--font-body)' },
  centerBox: { height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' },
  topBar: {
    backgroundColor: '#fff',
    borderBottom: '1px solid var(--color-border)',
    padding: '16px 0',
  },
  backLink: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    color: 'var(--color-navy)',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '0.95rem'
  },
  visualCol: {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: 'var(--shadow-card)',
  },
  mainImage: {
    width: '100%',
    height: 'auto',
    borderRadius: '8px',
    display: 'block'
  },
  placeholder: {
    width: '100%',
    height: '400px',
    backgroundColor: '#F4F6F9',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  badgeGroup: {
    display: 'flex',
    gap: '10px',
    marginBottom: '16px'
  },
  badge: {
    backgroundColor: '#FFFBEB',
    color: 'var(--color-amber)',
    padding: '6px 12px',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontWeight: 700,
    textTransform: 'uppercase',
  },
  badgeOutline: {
    backgroundColor: 'transparent',
    border: '1px solid var(--color-border)',
    color: 'var(--color-steel)',
    padding: '5px 12px',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontWeight: 600,
    textTransform: 'uppercase',
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '2.5rem',
    color: 'var(--color-navy)',
    marginBottom: '20px',
    textTransform: 'uppercase',
    lineHeight: 1.1
  },
  desc: {
    color: 'var(--color-steel)',
    lineHeight: 1.8,
    fontSize: '1.1rem',
    marginBottom: '30px'
  },
  specBox: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
    marginBottom: '30px',
    border: '1px solid var(--color-border)'
  },
  specTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontFamily: 'var(--font-display)',
    fontSize: '1.4rem',
    color: 'var(--color-navy)',
    marginBottom: '20px',
    textTransform: 'uppercase'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  tdLabel: {
    padding: '12px 16px',
    borderBottom: '1px solid var(--color-border)',
    backgroundColor: '#F8FAFC',
    fontWeight: 600,
    color: 'var(--color-steel)',
    width: '40%',
    fontSize: '0.95rem'
  },
  tdVal: {
    padding: '12px 16px',
    borderBottom: '1px solid var(--color-border)',
    color: 'var(--color-navy)',
    fontSize: '0.95rem',
    fontWeight: 500
  },
  ctaBox: {
    backgroundColor: 'var(--color-navy)',
    borderRadius: '8px',
    padding: '30px',
    color: '#fff',
  },
  ctaBoxTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.8rem',
    marginBottom: '10px',
    textTransform: 'uppercase',
    color: 'var(--color-amber)'
  },
  btnSolid: {
    display: 'block',
    width: '100%',
    textAlign: 'center',
    backgroundColor: 'var(--color-amber)',
    color: '#fff',
    padding: '16px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: 700,
    fontFamily: 'var(--font-display)',
    border: 'none',
    cursor: 'pointer',
    textTransform: 'uppercase',
    transition: 'background-color 0.2s'
  }
}
