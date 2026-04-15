import { useState } from 'react'
import { MapPin, Phone, Mail, Loader2, MessageCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { COMPANY, MACHINE_TYPES } from '../lib/constants'

export default function Contact() {
  const [formData, setFormData] = useState({
    client_name: '',
    company_name: '',
    email: '',
    phone: '',
    product_interest: '',
    machine_type: '',
    quantity: '',
    message: '',
    website: '' // honeypot
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (formData.website) {
      setStatus({ type: 'success', message: 'Thank you! We have received your inquiry.' })
      return
    }
    if (!formData.client_name || !formData.email) {
      setStatus({ type: 'error', message: 'Name and Email are required.' })
      return
    }

    setLoading(true)
    setStatus({ type: '', message: '' })

    try {
      const { data, error } = await supabase.from('quote_requests').insert([{
        client_name: formData.client_name,
        company_name: formData.company_name,
        email: formData.email,
        phone: formData.phone,
        product_interest: formData.product_interest,
        machine_type: formData.machine_type,
        quantity: formData.quantity,
        message: formData.message,
      }]).select()

      if (error) throw error

      setStatus({ type: 'success', message: 'Thank you! We have received your inquiry and will contact you within 24 hours.' })
      
      const edgeUrl = import.meta.env.VITE_EDGE_FUNCTION_URL
      if (edgeUrl && edgeUrl !== 'placeholder_for_now') {
        fetch(edgeUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            clientName: formData.client_name,
            companyName: formData.company_name,
            email: formData.email,
            phone: formData.phone,
            productInterest: formData.product_interest,
            machineType: formData.machine_type,
            quantity: formData.quantity,
            message: formData.message,
          })
        }).catch(err => console.error('Edge function error:', err))
      }
    } catch (err) {
      console.error(err)
      setStatus({ type: 'error', message: 'Something went wrong. Please try WhatsApp or call us directly.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <div className="container">
          <h1 style={styles.title}>Contact Us</h1>
          <p style={styles.subtitle}>Get in touch for requirements.</p>
        </div>
      </div>

      <div className="container" style={{ padding: '60px 20px' }}>
        <div className="contact-grid" style={styles.grid}>
          
          {/* Form (Right organically, but rendered first in DOM for mobile stacking) */}
          <div style={styles.formCard}>
            <h2 style={styles.formTitle}>Request a Quote</h2>
            {status.message && (
              <div style={status.type === 'error' ? styles.errorMsg : styles.successMsg}>
                {status.message}
              </div>
            )}
            
            {status.type !== 'success' && (
              <form style={styles.form} onSubmit={handleSubmit}>
                <input type="text" name="website" style={{ display: 'none' }} autoComplete="off" tabIndex="-1" onChange={handleChange} value={formData.website} />
                
                <div style={styles.formRow}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Full Name *</label>
                    <input type="text" name="client_name" required style={styles.input} onChange={handleChange} value={formData.client_name} />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Company/Organization</label>
                    <input type="text" name="company_name" style={styles.input} onChange={handleChange} value={formData.company_name} />
                  </div>
                </div>

                <div style={styles.formRow}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Email Address *</label>
                    <input type="email" name="email" required style={styles.input} onChange={handleChange} value={formData.email} />
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Phone Number</label>
                    <input type="tel" name="phone" style={styles.input} onChange={handleChange} value={formData.phone} />
                  </div>
                </div>

                <div style={styles.formRow}>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Product Interest</label>
                    <select name="product_interest" style={styles.input} onChange={handleChange} value={formData.product_interest}>
                      <option value="">Select...</option>
                      <option value="Injection Moulding Screw">Injection Moulding Screw</option>
                      <option value="Injection Moulding Barrel">Injection Moulding Barrel</option>
                      <option value="Extrusion Screw">Extrusion Screw</option>
                      <option value="Extrusion Barrel">Extrusion Barrel</option>
                      <option value="Blow Moulding Screw">Blow Moulding Screw</option>
                      <option value="Blow Moulding Barrel">Blow Moulding Barrel</option>
                      <option value="Custom Order">Custom Order</option>
                    </select>
                  </div>
                  <div style={styles.inputGroup}>
                    <label style={styles.label}>Machine Type</label>
                    <select name="machine_type" style={styles.input} onChange={handleChange} value={formData.machine_type}>
                      <option value="">Select...</option>
                      {MACHINE_TYPES.map(m => (
                        <option key={m.id} value={m.label}>{m.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Quantity Required</label>
                  <input type="text" name="quantity" style={styles.input} onChange={handleChange} value={formData.quantity} placeholder="e.g. 2 sets" />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Message / Specs</label>
                  <textarea name="message" rows="4" style={styles.textarea} onChange={handleChange} value={formData.message}></textarea>
                </div>

                <button type="submit" disabled={loading} style={styles.submitBtn}>
                  {loading ? <Loader2 className="spinner" size={20} /> : 'Send Quote Request'}
                </button>
              </form>
            )}
          </div>

          {/* Left Side Details */}
          <div style={styles.infoCol}>
            <h2 style={styles.infoTitle}>Connect With Us</h2>
            <div style={styles.contactList}>
              <div style={styles.contactItem}>
                <MapPin size={24} color="var(--color-amber)" />
                <div>
                  <h4 style={styles.itemHeading}>Address</h4>
                  <p style={styles.itemText}>{COMPANY.address}</p>
                </div>
              </div>
              <a href={`tel:${COMPANY.phone}`} style={styles.contactItemLink}>
                <Phone size={24} color="var(--color-amber)" />
                <div>
                  <h4 style={styles.itemHeading}>Phone</h4>
                  <p style={styles.itemText}>{COMPANY.phone}</p>
                </div>
              </a>
              <a href={`mailto:${COMPANY.email}`} style={styles.contactItemLink}>
                <Mail size={24} color="var(--color-amber)" />
                <div>
                  <h4 style={styles.itemHeading}>Email</h4>
                  <p style={styles.itemText}>{COMPANY.email}</p>
                </div>
              </a>
            </div>

            <a 
              href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(COMPANY.whatsappMsg)}`} 
              target="_blank" rel="noreferrer"
              style={styles.waBtnLg}
            >
              <MessageCircle size={24} /> Chat on WhatsApp
            </a>
          </div>

        </div>

        <div style={{ marginTop: '60px' }}>
          <iframe 
            src={COMPANY.googleMapsEmbed}
            width="100%" 
            height="350" 
            style={{ border: 0, borderRadius: '12px', boxShadow: 'var(--shadow-card)' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
      <style>{`
        .spinner { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .contact-grid { display: flex; flex-direction: column-reverse; gap: 40px; }
        @media (min-width: 992px) {
          .contact-grid { flex-direction: row; }
          .contact-grid > div:first-child { flex: 1.5; }
          .contact-grid > div:last-child { flex: 1; }
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
  formCard: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: 'var(--shadow-card)'
  },
  formTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '2rem',
    color: 'var(--color-navy)',
    marginBottom: '24px',
    textTransform: 'uppercase'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  formRow: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: '1 1 calc(50% - 8px)'
  },
  label: { fontSize: '13px', fontWeight: 600, color: 'var(--color-steel)' },
  input: {
    padding: '12px',
    border: '1px solid #DDE1E9',
    borderRadius: '6px',
    fontSize: '15px',
    outline: 'none',
    fontFamily: 'inherit',
  },
  textarea: {
    padding: '12px',
    border: '1px solid #DDE1E9',
    borderRadius: '6px',
    fontSize: '15px',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
  },
  submitBtn: {
    backgroundColor: 'var(--color-amber)',
    color: 'var(--color-white)',
    border: 'none',
    padding: '16px',
    borderRadius: '6px',
    fontSize: '1.1rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    fontFamily: 'var(--font-display)',
    cursor: 'pointer',
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: 'background-color 0.2s'
  },
  infoCol: {
    display: 'flex',
    flexDirection: 'column',
  },
  infoTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: '2rem',
    color: 'var(--color-navy)',
    marginBottom: '24px',
    textTransform: 'uppercase'
  },
  contactList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    marginBottom: '40px'
  },
  contactItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '20px'
  },
  contactItemLink: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '20px',
    textDecoration: 'none',
    color: 'inherit'
  },
  itemHeading: {
    fontFamily: 'var(--font-display)',
    fontSize: '1.2rem',
    color: 'var(--color-navy)',
    textTransform: 'uppercase',
    marginBottom: '6px'
  },
  itemText: {
    color: 'var(--color-steel)',
    fontSize: '1.1rem',
    lineHeight: 1.5
  },
  waBtnLg: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    backgroundColor: '#25D366',
    color: '#fff',
    padding: '16px 32px',
    textDecoration: 'none',
    fontFamily: 'var(--font-display)',
    fontSize: '1.2rem',
    fontWeight: 700,
    textTransform: 'uppercase',
    borderRadius: '6px',
    boxShadow: '0 4px 12px rgba(37,211,102,0.3)',
    transition: 'transform 0.2s'
  },
  errorMsg: {
    backgroundColor: '#FEE2E2',
    color: '#B91C1C',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '20px',
  },
  successMsg: {
    backgroundColor: '#D1FAE5',
    color: '#047857',
    padding: '20px',
    borderRadius: '6px',
    textAlign: 'center',
    fontWeight: 500,
  }
}
