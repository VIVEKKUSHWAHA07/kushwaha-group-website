import { Link } from 'react-router-dom'
import { ArrowRight, Package, Car, Layers, Sprout, Heart, Cpu } from 'lucide-react'
import { INDUSTRIES_SERVED } from '../lib/constants'

// Map icons from constants to actual components
const iconMap = {
  'Package': <Package size={40} />,
  'Car': <Car size={40} />,
  'Layers': <Layers size={40} />,
  'Sprout': <Sprout size={40} />,
  'Heart': <Heart size={40} />,
  'Cpu': <Cpu size={40} />
}

export default function Industries() {
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div className="container">
          <h1 style={styles.title}>Industries We Serve</h1>
          <p style={styles.subtitle}>Robust solutions for every sector of plastics manufacturing.</p>
        </div>
      </div>

      <div className="container" style={styles.content}>
        <div style={styles.grid}>
          {INDUSTRIES_SERVED.map((ind, i) => (
            <div key={i} style={styles.card}>
              <div style={styles.iconWrapper}>{iconMap[ind.icon]}</div>
              <h2 style={styles.cardTitle}>{ind.name}</h2>
              <p style={styles.cardDesc}>{ind.desc}</p>
              <Link to="/contact" style={styles.link}>
                Get Quote <ArrowRight size={18} />
              </Link>
            </div>
          ))}
        </div>

        <div style={styles.bottomSection}>
          <h3 style={styles.bottomTitle}>Don't see your industry?</h3>
          <p style={styles.bottomText}>We serve all plastics processing sectors. Contact us for specialized solutions.</p>
          <Link to="/contact" style={styles.btn}>Contact Us</Link>
        </div>
      </div>
    </div>
  )
}

const styles = {
  page: { backgroundColor: 'var(--color-bg)', minHeight: '100vh' },
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
    padding: '80px 20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '30px',
    marginBottom: '60px'
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: 'var(--shadow-card)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  iconWrapper: {
    color: 'var(--color-amber)',
    marginBottom: '20px',
  },
  cardTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.8rem',
    color: 'var(--color-navy)',
    marginBottom: '16px',
    textTransform: 'uppercase',
  },
  cardDesc: {
    color: 'var(--color-steel)',
    lineHeight: 1.6,
    marginBottom: '24px',
    flexGrow: 1,
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: 'var(--color-navy)',
    fontWeight: 600,
    textDecoration: 'none',
  },
  bottomSection: {
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: '60px 20px',
    borderRadius: '8px',
    border: '2px dashed var(--color-border)'
  },
  bottomTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '2rem',
    color: 'var(--color-navy)',
    textTransform: 'uppercase',
    marginBottom: '10px'
  },
  bottomText: {
    color: 'var(--color-steel)',
    marginBottom: '30px',
    fontSize: '1.1rem'
  },
  btn: {
    display: 'inline-block',
    backgroundColor: 'var(--color-amber)',
    color: '#fff',
    padding: '14px 32px',
    textDecoration: 'none',
    fontFamily: 'var(--font-display)',
    fontSize: '1.2rem',
    textTransform: 'uppercase',
    fontWeight: 700,
    borderRadius: '4px'
  }
}
