import { Link } from 'react-router-dom'
import { CAPABILITY_STATS } from '../lib/constants'

export default function Capabilities() {
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div className="container">
          <h1 style={styles.title}>Manufacturing Capabilities</h1>
          <p style={styles.subtitle}>Engineered to precise specifications</p>
        </div>
      </div>

      {/* Stats Strip Reuse */}
      <section style={styles.statsStrip}>
        <div className="container">
          <div style={styles.statsGrid}>
            {CAPABILITY_STATS.map((stat, i) => (
              <div key={i} style={styles.statBox}>
                <div style={styles.statValue}>{stat.value}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={styles.content}>
        <div className="container" style={styles.specGrid}>
          
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Screw Types</h2>
            <ul style={styles.list}>
              <li>General Purpose Screws</li>
              <li>Barrier Screws</li>
              <li>Mixing Screws</li>
              <li>Vented Screws</li>
              <li>High-Compression Screws</li>
            </ul>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Barrel Types</h2>
            <ul style={styles.list}>
              <li>Standard Single Barrels</li>
              <li>Bimetallic Barrels</li>
              <li>Nitride Barrels</li>
              <li>Twin Screw Barrels</li>
            </ul>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Materials Used</h2>
            <ul style={styles.list}>
              <li>EN41B Nitrided Steel</li>
              <li>EN19 Alloy Steel</li>
              <li>Bimetallic (Tungsten Carbide Lined)</li>
              <li>Stainless Steel (Food Grade)</li>
            </ul>
          </div>

          <div style={{ ...styles.card, ...styles.customCard }}>
            <h2 style={{ ...styles.cardTitle, color: '#fff' }}>Custom Orders</h2>
            <p style={{ color: '#fff', marginBottom: '20px', lineHeight: 1.6 }}>
              Have a unique geometry or material requirement? Send us your drawing. We manufacture 100% custom processing equipment.
            </p>
            <a 
              href="mailto:kushwahavivek6265@gmail.com?subject=Custom%20Drawing%20Request" 
              style={styles.mailBtn}
            >
              Send Custom Drawing
            </a>
          </div>

        </div>
      </section>
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
  statsStrip: {
    backgroundColor: '#fff',
    padding: '40px 0',
    borderBottom: '1px solid var(--color-border)'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    textAlign: 'center'
  },
  statBox: { padding: '20px' },
  statValue: {
    fontFamily: 'var(--font-display)',
    fontSize: '2.2rem',
    fontWeight: 700,
    color: 'var(--color-amber)',
    lineHeight: 1
  },
  statLabel: {
    color: 'var(--color-steel)',
    fontWeight: 600,
    marginTop: '8px',
    textTransform: 'uppercase',
    fontSize: '0.9rem'
  },
  content: {
    padding: '80px 0',
  },
  specGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '8px',
    boxShadow: 'var(--shadow-card)',
  },
  cardTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.8rem',
    color: 'var(--color-navy)',
    marginBottom: '20px',
    textTransform: 'uppercase',
    borderBottom: '2px solid var(--color-bg)',
    paddingBottom: '10px'
  },
  list: {
    listStyleType: 'disc',
    paddingLeft: '20px',
    color: 'var(--color-steel)',
    lineHeight: 2.2,
    fontSize: '1.1rem'
  },
  customCard: {
    backgroundColor: 'var(--color-amber)',
  },
  mailBtn: {
    display: 'inline-block',
    backgroundColor: '#fff',
    color: 'var(--color-amber)',
    padding: '12px 24px',
    textDecoration: 'none',
    fontFamily: 'var(--font-display)',
    fontSize: '1.2rem',
    textTransform: 'uppercase',
    fontWeight: 700,
    borderRadius: '4px',
  }
}
