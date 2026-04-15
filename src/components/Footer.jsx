import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin } from 'lucide-react'
import { COMPANY, NAV_LINKS } from '../lib/constants'

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.container}>
        <div style={styles.grid}>
          {/* Company Info */}
          <div>
            <Link to="/" style={styles.brand}>
              <span style={styles.brandName}>{COMPANY.name}</span>
              <span style={styles.brandTagline}>{COMPANY.tagline}</span>
            </Link>
            <p style={styles.text}>{COMPANY.subTagline}</p>
            <div style={styles.contactList}>
              <div style={styles.contactItem}>
                <MapPin size={16} color="#E07B00" />
                <span>{COMPANY.address}</span>
              </div>
              <a href={`tel:${COMPANY.phone}`} style={styles.contactLink}>
                <Phone size={16} color="#E07B00" />
                <span>{COMPANY.phone}</span>
              </a>
              <a href={`mailto:${COMPANY.email}`} style={styles.contactLink}>
                <Mail size={16} color="#E07B00" />
                <span>{COMPANY.email}</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 style={styles.heading}>Quick Links</h3>
            <div style={styles.linkList}>
              {NAV_LINKS.map(link => (
                <Link key={link.path} to={link.path} style={styles.link}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 style={styles.heading}>Our Products</h3>
            <div style={styles.linkList}>
              <Link to="/products?filter=injection" style={styles.link}>Injection Moulding Screws</Link>
              <Link to="/products?filter=extrusion" style={styles.link}>Extrusion Barrels</Link>
              <Link to="/products?filter=blow_moulding" style={styles.link}>Blow Moulding Assemblies</Link>
              <Link to="/capabilities" style={styles.link}>Custom Manufacturing</Link>
            </div>
          </div>
        </div>

        <div style={styles.bottom}>
          <p>
            &copy; {COMPANY.footerYear} {COMPANY.name}. All Rights Reserved. | {COMPANY.address}
          </p>
        </div>
      </div>
    </footer>
  )
}

const styles = {
  footer: {
    backgroundColor: 'var(--color-navy)',
    color: '#CBD5E0',
    padding: '60px 0 20px',
    fontFamily: 'var(--font-body)',
  },
  container: {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    marginBottom: '40px',
  },
  brand: {
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '16px',
  },
  brandName: {
    fontFamily: 'var(--font-display)',
    fontWeight: 800,
    fontSize: '24px',
    color: 'var(--color-white)',
    letterSpacing: '0.5px',
  },
  brandTagline: {
    fontSize: '11px',
    color: 'var(--color-amber)',
    letterSpacing: '0.3px',
    textTransform: 'uppercase',
  },
  text: {
    fontSize: '14px',
    lineHeight: 1.6,
    marginBottom: '24px',
  },
  heading: {
    fontFamily: 'var(--font-display)',
    color: 'var(--color-white)',
    fontSize: '20px',
    marginBottom: '20px',
    letterSpacing: '0.5px',
    textTransform: 'uppercase',
  },
  contactList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  contactItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    fontSize: '14px',
  },
  contactLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14px',
    color: '#CBD5E0',
    textDecoration: 'none',
    transition: 'color 0.2s',
  },
  linkList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  link: {
    color: '#CBD5E0',
    textDecoration: 'none',
    fontSize: '15px',
    transition: 'color 0.2s',
  },
  bottom: {
    borderTop: '1px solid rgba(255,255,255,0.1)',
    paddingTop: '20px',
    textAlign: 'center',
    fontSize: '13px',
    color: '#A0AEC0',
  }
}
