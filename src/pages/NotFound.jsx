import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div style={styles.page}>
      <div style={styles.content}>
        <h1 style={styles.errorText}>404</h1>
        <h2 style={styles.subtitle}>Page Not Found</h2>
        <p style={styles.text}>
          The page you are looking for does not exist or has been moved.
        </p>
        <div style={styles.btnGroup}>
          <Link to="/" style={styles.btnPrimary}>Go Home</Link>
          <Link to="/products" style={styles.btnSecondary}>View Products</Link>
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--color-navy)',
    color: '#fff',
    textAlign: 'center',
    padding: '20px'
  },
  content: {
    maxWidth: '600px'
  },
  errorText: {
    fontFamily: 'var(--font-display)',
    fontSize: '10rem',
    fontWeight: 800,
    color: 'var(--color-amber)',
    lineHeight: 1,
    marginBottom: '10px'
  },
  subtitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '3rem',
    textTransform: 'uppercase',
    marginBottom: '20px',
    letterSpacing: '1px'
  },
  text: {
    fontFamily: 'var(--font-body)',
    fontSize: '1.2rem',
    color: '#CBD5E0',
    marginBottom: '40px'
  },
  btnGroup: {
    display: 'flex',
    gap: '20px',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  btnPrimary: {
    backgroundColor: 'var(--color-amber)',
    color: '#fff',
    padding: '16px 36px',
    textDecoration: 'none',
    fontFamily: 'var(--font-display)',
    fontSize: '1.3rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    borderRadius: '4px',
    transition: 'background-color 0.2s'
  },
  btnSecondary: {
    backgroundColor: 'transparent',
    color: '#fff',
    border: '2px solid #fff',
    padding: '14px 36px',
    textDecoration: 'none',
    fontFamily: 'var(--font-display)',
    fontSize: '1.3rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    borderRadius: '4px',
    transition: 'all 0.2s'
  }
}
