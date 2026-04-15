import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function About() {
  return (
    <div style={styles.page}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div className="container">
          <h1 style={styles.heroTitle}>About Kushwaha Group</h1>
          <p style={styles.heroSub}>Precision Engineering. Proven Performance.</p>
        </div>
      </section>

      {/* Content Section */}
      <section style={styles.contentSection}>
        <div className="container" style={styles.contentGrid}>
          
          <div style={styles.contentBlock}>
            <h2 style={styles.heading}>Our Story</h2>
            <p style={styles.text}>
              Kushwaha Group was founded with a singular mission — to deliver precision-engineered screw and barrel solutions to India's plastics processing industry. Based in Ahmedabad, Gujarat, we combine traditional metallurgical expertise with modern manufacturing to produce components that outlast and outperform.
            </p>
          </div>

          <div style={styles.contentBlock}>
            <h2 style={styles.heading}>Our Vision</h2>
            <p style={styles.text}>
              To become India's most trusted manufacturer of screw and barrel assemblies, serving both domestic and international plastics processors with unmatched quality and reliability.
            </p>
          </div>

          <div style={styles.contentBlock}>
            <h2 style={styles.heading}>Why Ahmedabad?</h2>
            <p style={styles.text}>
              Located in the heart of Gujarat's booming plastics manufacturing cluster, we are strategically positioned to access top-tier raw materials, world-class heat treatment facilities, and seamless logistics channels to deliver our products pan-India.
            </p>
          </div>

        </div>
      </section>

      {/* CTA Section */}
      <section style={styles.cta}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={styles.ctaTitle}>Let's Build Together</h2>
          <Link to="/contact" style={styles.btn}>
            Request a Quote <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  )
}

const styles = {
  page: {
    fontFamily: 'var(--font-body)',
  },
  hero: {
    backgroundColor: 'var(--color-navy)',
    padding: '80px 0',
    textAlign: 'center',
    color: '#fff',
  },
  heroTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '3rem',
    textTransform: 'uppercase',
    marginBottom: '10px',
  },
  heroSub: {
    color: 'var(--color-amber)',
    fontSize: '1.2rem',
    fontWeight: 500,
  },
  contentSection: {
    padding: '80px 0',
    backgroundColor: '#fff',
  },
  contentGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '60px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  contentBlock: {
    borderLeft: '4px solid var(--color-amber)',
    paddingLeft: '24px',
  },
  heading: {
    fontFamily: 'var(--font-display)',
    fontSize: '2rem',
    color: 'var(--color-navy)',
    textTransform: 'uppercase',
    marginBottom: '16px',
  },
  text: {
    color: 'var(--color-steel)',
    fontSize: '1.1rem',
    lineHeight: 1.8,
  },
  cta: {
    backgroundColor: '#F4F6F9',
    padding: '80px 0',
  },
  ctaTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '2.5rem',
    color: 'var(--color-navy)',
    textTransform: 'uppercase',
    marginBottom: '30px',
  },
  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    backgroundColor: 'var(--color-amber)',
    color: '#fff',
    padding: '16px 36px',
    textDecoration: 'none',
    fontFamily: 'var(--font-display)',
    fontSize: '1.2rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
  }
}
