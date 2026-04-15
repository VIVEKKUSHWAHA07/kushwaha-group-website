import { Link } from 'react-router-dom'
import { CheckCircle } from 'lucide-react'

export default function Quality() {
  const processSteps = [
    { title: 'Material Inspection', desc: 'Raw steel undergoes strict metallurgical testing before entering the shop floor.' },
    { title: 'CNC Machining', desc: 'Precision turning and milling to exact dimensional tolerances.' },
    { title: 'Heat Treatment', desc: 'Gas nitriding or induction hardening for superior wear resistance.' },
    { title: 'Surface Finishing', desc: 'Hard chrome plating or bimetallic coating for corrosion protection.' },
    { title: 'Quality Check & Dispatch', desc: 'Final dimensional and hardness testing before secure packaging.' }
  ]

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div className="container">
          <h1 style={styles.title}>Quality & Process</h1>
          <p style={styles.subtitle}>Uncompromising standards at every step.</p>
        </div>
      </div>

      <section style={styles.section}>
        <div className="container">
          <h2 style={styles.sectionTitle}>Our Manufacturing Process</h2>
          
          {/* Horizontal Timeline */}
          <div style={styles.timeline}>
            {processSteps.map((step, index) => (
              <div key={index} style={styles.step}>
                <div style={styles.stepCircle}>{index + 1}</div>
                <h3 style={styles.stepTitle}>{step.title}</h3>
                <p style={styles.stepDesc}>{step.desc}</p>
                {index < processSteps.length - 1 && <div style={styles.stepLine}></div>}
              </div>
            ))}
          </div>

        </div>
      </section>

      <section style={styles.standardsSection}>
        <div className="container" style={styles.grid}>
          
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Quality Standards</h2>
            <ul style={styles.list}>
              <li><CheckCircle size={20} color="var(--color-amber)"/> <strong>Dimensional Accuracy:</strong> Dial gauge and micrometer verification for exact OEM match.</li>
              <li><CheckCircle size={20} color="var(--color-amber)"/> <strong>Hardness Testing:</strong> Rockwell and Vickers hardness testing post heat treatment.</li>
              <li><CheckCircle size={20} color="var(--color-amber)"/> <strong>Nitriding Verification:</strong> Depth analysis to ensure minimum 0.5-0.6mm case depth.</li>
            </ul>
          </div>

          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Packaging & Dispatch</h2>
            <p style={styles.text}>
              Every screw and barrel assembly is coated in anti-rust oil, wrapped in protective VCI paper, and securely bolted into custom timber crating to prevent transit damage.
            </p>
            <p style={styles.text}>
              We proudly offer <strong>Pan-India Delivery</strong> directly to your factory floor.
            </p>
          </div>

        </div>
      </section>
    </div>
  )
}

const styles = {
  page: { backgroundColor: '#fff', minHeight: '100vh', fontFamily: 'var(--font-body)' },
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
  section: {
    padding: '80px 0',
    backgroundColor: 'var(--color-bg)'
  },
  sectionTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '2.5rem',
    color: 'var(--color-navy)',
    textAlign: 'center',
    marginBottom: '60px',
    textTransform: 'uppercase'
  },
  timeline: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    gap: '20px'
  },
  step: {
    flex: '1 1 150px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative'
  },
  stepCircle: {
    width: '50px',
    height: '50px',
    backgroundColor: 'var(--color-amber)',
    color: '#fff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'var(--font-display)',
    fontSize: '1.5rem',
    fontWeight: 700,
    marginBottom: '20px',
    zIndex: 2
  },
  stepTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.3rem',
    color: 'var(--color-navy)',
    marginBottom: '10px',
    textTransform: 'uppercase'
  },
  stepDesc: {
    color: 'var(--color-steel)',
    fontSize: '0.9rem',
    lineHeight: 1.5
  },
  stepLine: {
    position: 'absolute',
    top: '25px',
    left: 'calc(50% + 25px)',
    width: 'calc(100% - 10px)',
    height: '2px',
    backgroundColor: 'var(--color-border)',
    zIndex: 1
  },
  standardsSection: {
    padding: '80px 0',
    backgroundColor: '#fff'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '40px',
  },
  card: {
    backgroundColor: 'var(--color-bg)',
    padding: '40px',
    borderRadius: '8px',
  },
  cardTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '2rem',
    color: 'var(--color-navy)',
    marginBottom: '20px',
    textTransform: 'uppercase'
  },
  list: {
    listStyleType: 'none',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    color: 'var(--color-steel)',
    lineHeight: 1.6,
    fontSize: '1.1rem'
  },
  text: {
    color: 'var(--color-steel)',
    lineHeight: 1.8,
    fontSize: '1.1rem',
    marginBottom: '16px'
  }
}
