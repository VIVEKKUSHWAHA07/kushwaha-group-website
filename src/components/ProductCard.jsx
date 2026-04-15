import { Link } from 'react-router-dom'
import { Settings, ArrowRight } from 'lucide-react'

export default function ProductCard({ product }) {
  // Determine placeholder icon if no image
  const hasImage = Boolean(product.image_url)

  return (
    <div style={styles.card}>
      <Link to={`/products/${product.id}`} style={styles.imageLink}>
        {hasImage ? (
          <img 
            src={product.image_url} 
            alt={product.name} 
            loading="lazy" 
            style={styles.image} 
          />
        ) : (
          <div style={styles.placeholder}>
            <Settings size={60} color="#CBD5E0" />
          </div>
        )}
      </Link>

      <div style={styles.content}>
        <div style={styles.badge}>{product.machine_type.replace('_', ' ')}</div>
        <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
          <h3 style={styles.title}>{product.name}</h3>
        </Link>
        
        <div style={styles.meta}>
          {product.material && (
            <div style={styles.metaRow}>
              <strong>Material:</strong> {product.material}
            </div>
          )}
          {product.diameter_range && (
            <div style={styles.metaRow}>
              <strong>Diameter:</strong> {product.diameter_range}
            </div>
          )}
        </div>

        <div style={styles.actions}>
          <Link to={`/products/${product.id}`} style={styles.btnOutline}>
            View Details
          </Link>
          {/* Quote link will redirect to Contact for specific product or open modal from Detail page */}
          <Link to={`/contact?interest=${encodeURIComponent(product.name)}`} style={styles.btnSolid}>
            Request Quote <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  )
}

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: 'var(--shadow-card)',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  imageLink: {
    display: 'block',
    height: '220px',
    backgroundColor: 'var(--color-navy)',
    position: 'relative',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F4F6F9',
    borderBottom: '1px solid var(--color-border)'
  },
  content: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1
  },
  badge: {
    backgroundColor: '#FFFBEB',
    color: 'var(--color-amber)',
    padding: '4px 10px',
    borderRadius: '4px',
    fontSize: '0.75rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
    marginBottom: '12px'
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.4rem',
    color: 'var(--color-navy)',
    marginBottom: '12px',
    textTransform: 'uppercase',
    lineHeight: 1.2
  },
  meta: {
    color: 'var(--color-steel)',
    fontSize: '0.9rem',
    lineHeight: 1.6,
    marginBottom: '20px',
    flexGrow: 1
  },
  metaRow: {
    marginBottom: '4px'
  },
  actions: {
    display: 'flex',
    gap: '10px',
    marginTop: 'auto'
  },
  btnOutline: {
    flex: 1,
    textAlign: 'center',
    border: '1px solid var(--color-border)',
    color: 'var(--color-navy)',
    padding: '10px',
    borderRadius: '4px',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 600,
    fontFamily: 'var(--font-body)',
    transition: 'background-color 0.2s'
  },
  btnSolid: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    backgroundColor: 'var(--color-amber)',
    color: '#fff',
    padding: '10px',
    borderRadius: '4px',
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: 600,
    fontFamily: 'var(--font-body)',
    transition: 'background-color 0.2s'
  }
}
