import { Link } from 'react-router-dom'
import { ArrowRight, Settings, CheckCircle, PenTool, LayoutTemplate, Factory, Sliders, Box } from 'lucide-react'
import { CAPABILITY_STATS, INDUSTRIES_SERVED } from '../lib/constants'

export default function Home() {
  return (
    <div style={styles.page}>
      {/* 8.1 Hero Section */}
      <section style={styles.hero}>
        <div className="container" style={styles.heroContainer}>
          <div style={styles.heroLeft}>
            <h1 style={styles.heroHeadline}>
              PRECISION SCREWS & BARRELS FOR PLASTICS PROCESSING
            </h1>
            <p style={styles.heroSub}>
              Manufacturers of high-performance components engineered for durability and maximum output. We build for Injection, Extrusion, and Blow Moulding machines.
            </p>
            <div style={styles.ctaGroup}>
              <Link to="/contact" style={styles.btnPrimary}>
                Request a Quote <ArrowRight size={20} />
              </Link>
              <Link to="/products" style={styles.btnSecondary}>
                View Products
              </Link>
            </div>
          </div>
          <div style={styles.heroRight}>
            <Settings size={280} color="var(--color-amber)" opacity={0.2} style={styles.heroIcon} />
            <Settings size={140} color="#fff" opacity={0.1} style={styles.heroIconSmall} />
          </div>
        </div>
      </section>

      {/* 8.2 Stats Strip */}
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

      {/* 8.3 Products Overview */}
      <section style={styles.section}>
        <div className="container">
          <h2 style={styles.sectionTitle}>Precision Engineered Products</h2>
          <div style={styles.productGrid}>
            <ProductCard icon={<LayoutTemplate size={40} />} title="Injection Moulding" link="injection" />
            <ProductCard icon={<Factory size={40} />} title="Extrusion" link="extrusion" />
            <ProductCard icon={<Box size={40} />} title="Blow Moulding" link="blow_moulding" />
            <ProductCard icon={<Sliders size={40} />} title="Custom Orders" link="custom" />
          </div>
        </div>
      </section>

      {/* 8.4 Why Choose Us */}
      <section style={{ ...styles.section, backgroundColor: '#fff' }}>
        <div className="container">
          <h2 style={styles.sectionTitle}>Why Choose Kushwaha Group</h2>
          <div style={styles.whyGrid}>
            <div style={styles.whyCard}>
              <CheckCircle size={40} color="var(--color-amber)" />
              <h3 style={styles.whyTitle}>Precision Manufacturing</h3>
              <p style={styles.whyDesc}>Every component is CNC machined to exact tolerances ensuring zero-defect performance in high-pressure environments.</p>
            </div>
            <div style={styles.whyCard}>
              <Settings size={40} color="var(--color-amber)" />
              <h3 style={styles.whyTitle}>All Machine Types</h3>
              <p style={styles.whyDesc}>From 20mm to 300mm, we supply matched geometries for single and twin screw applications across all plastics processes.</p>
            </div>
            <div style={styles.whyCard}>
              <PenTool size={40} color="var(--color-amber)" />
              <h3 style={styles.whyTitle}>Custom Orders</h3>
              <p style={styles.whyDesc}>Need a complex mixing section or barrier flight? Send us your drawing and we'll deliver exactly what you specify.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8.5 Industries Preview */}
      <section style={styles.section}>
        <div className="container">
          <h2 style={styles.sectionTitle}>Industries We Serve</h2>
          <div style={styles.industryGrid}>
            {INDUSTRIES_SERVED.slice(0, 3).map((ind, i) => (
              <div key={i} style={styles.industryCard}>
                <h3 style={styles.indTitle}>{ind.name}</h3>
                <p style={styles.indDesc}>{ind.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'right', marginTop: '30px' }}>
            <Link to="/industries" style={styles.viewAll}>
              View All Industries <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* 8.6 CTA Banner */}
      <section style={styles.ctaBanner}>
        <div className="container" style={styles.ctaBannerContent}>
          <h2 style={styles.ctaBannerTitle}>Have a Custom Requirement? We Build to Your Specifications.</h2>
          <Link to="/contact" style={styles.ctaBannerBtn}>Get a Free Quote</Link>
        </div>
      </section>
    </div>
  )
}

function ProductCard({ icon, title, link }) {
  return (
    <Link to={`/products?filter=${link}`} style={styles.pCard}>
      <div style={styles.pCardIcon}>{icon}</div>
      <h3 style={styles.pCardTitle}>{title}</h3>
      <div style={styles.pCardArrow}><ArrowRight /></div>
    </Link>
  )
}

const styles = {
  page: {
    fontFamily: 'var(--font-body)',
  },
  hero: {
    minHeight: '80vh',
    backgroundColor: 'var(--color-navy)',
    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.02) 10px, rgba(255,255,255,0.02) 20px)',
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden'
  },
  heroContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '40px',
    padding: '80px 20px',
    position: 'relative',
    zIndex: 10
  },
  heroLeft: {
    flex: '1 1 60%',
  },
  heroHeadline: {
    fontFamily: 'var(--font-display)',
    fontSize: 'clamp(3rem, 5vw, 4.5rem)',
    fontWeight: 800,
    color: 'var(--color-white)',
    lineHeight: 1.1,
    marginBottom: '20px',
    textTransform: 'uppercase'
  },
  heroSub: {
    fontSize: '1.1rem',
    color: '#CBD5E0',
    marginBottom: '40px',
    maxWidth: '600px',
    lineHeight: 1.6
  },
  ctaGroup: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap'
  },
  btnPrimary: {
    backgroundColor: 'var(--color-amber)',
    color: 'var(--color-white)',
    padding: '16px 32px',
    fontFamily: 'var(--font-display)',
    fontSize: '1.2rem',
    textTransform: 'uppercase',
    fontWeight: 700,
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '10px',
    borderRadius: '4px',
    transition: 'background-color 0.2s',
  },
  btnSecondary: {
    backgroundColor: 'transparent',
    color: 'var(--color-white)',
    border: '2px solid var(--color-white)',
    padding: '14px 32px',
    fontFamily: 'var(--font-display)',
    fontSize: '1.2rem',
    textTransform: 'uppercase',
    fontWeight: 700,
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: '4px',
    transition: 'all 0.2s',
  },
  heroRight: {
    flex: '1 1 40%',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  heroIcon: {
    position: 'absolute',
    animation: 'spin 60s linear infinite',
  },
  heroIconSmall: {
    position: 'absolute',
    animation: 'spin 40s linear infinite reverse',
  },
  statsStrip: {
    backgroundColor: '#EEF2F7',
    padding: '40px 0',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    textAlign: 'center'
  },
  statBox: {
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
  },
  statValue: {
    fontFamily: 'var(--font-display)',
    fontSize: '2.5rem',
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
  section: {
    padding: '80px 0',
  },
  sectionTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '2.5rem',
    color: 'var(--color-navy)',
    marginBottom: '40px',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  productGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px'
  },
  pCard: {
    backgroundColor: '#fff',
    padding: '40px 30px',
    borderRadius: '12px',
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: 'var(--shadow-card)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    color: 'var(--color-navy)',
    textAlign: 'center'
  },
  pCardIcon: {
    color: 'var(--color-navy)',
    marginBottom: '20px',
  },
  pCardTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    marginBottom: '16px',
    textTransform: 'uppercase'
  },
  pCardArrow: {
    color: 'var(--color-amber)',
  },
  whyGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '40px',
  },
  whyCard: {
    textAlign: 'center',
    padding: '30px',
  },
  whyTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.8rem',
    color: 'var(--color-navy)',
    margin: '20px 0 10px',
    textTransform: 'uppercase'
  },
  whyDesc: {
    color: 'var(--color-steel)',
    lineHeight: 1.6
  },
  industryGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '30px',
  },
  industryCard: {
    backgroundColor: '#fff',
    borderLeft: '4px solid var(--color-amber)',
    padding: '30px',
    boxShadow: 'var(--shadow-card)',
  },
  indTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    color: 'var(--color-navy)',
    marginBottom: '10px',
    textTransform: 'uppercase'
  },
  indDesc: {
    color: 'var(--color-steel)'
  },
  viewAll: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    color: 'var(--color-navy)',
    fontWeight: 600,
    textDecoration: 'none',
    fontFamily: 'var(--font-display)',
    fontSize: '1.2rem',
    textTransform: 'uppercase'
  },
  ctaBanner: {
    backgroundColor: 'var(--color-amber)',
    padding: '60px 0',
    textAlign: 'center'
  },
  ctaBannerContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '30px'
  },
  ctaBannerTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '2.5rem',
    color: '#fff',
    maxWidth: '800px',
    margin: '0 auto',
    textTransform: 'uppercase'
  },
  ctaBannerBtn: {
    backgroundColor: '#fff',
    color: 'var(--color-amber)',
    padding: '16px 40px',
    fontFamily: 'var(--font-display)',
    fontSize: '1.3rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    textDecoration: 'none',
    borderRadius: '4px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s'
  }
}
