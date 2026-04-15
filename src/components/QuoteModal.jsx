import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { MACHINE_TYPES } from '../lib/constants'

export default function QuoteModal({ onClose, defaultProduct = '' }) {
  const [formData, setFormData] = useState({
    client_name: '',
    company_name: '',
    email: '',
    phone: '',
    product_interest: defaultProduct,
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
    
    // Honeypot check
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
      const { data, error } = await supabase
        .from('quote_requests')
        .insert([{
          client_name: formData.client_name,
          company_name: formData.company_name,
          email: formData.email,
          phone: formData.phone,
          product_interest: formData.product_interest,
          machine_type: formData.machine_type,
          quantity: formData.quantity,
          message: formData.message,
        }])
        .select()

      if (error) throw error

      setStatus({ type: 'success', message: 'Thank you! We have received your inquiry and will contact you within 24 hours.' })
      
      // Fire Edge Function in background
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
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={e => e.stopPropagation()}>
        <button style={styles.closeBtn} onClick={onClose}><X size={24} /></button>
        
        <h2 style={styles.title}>Request a Quote</h2>
        
        {status.message && (
          <div style={status.type === 'error' ? styles.errorMsg : styles.successMsg}>
            {status.message}
          </div>
        )}

        {status.type !== 'success' && (
          <form style={styles.form} onSubmit={handleSubmit}>
            {/* Honeypot */}
            <input type="text" name="website" style={{ display: 'none' }} onChange={handleChange} value={formData.website} tabIndex="-1" autoComplete="off" />
            
            <div style={styles.formRow}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name *</label>
                <input type="text" name="client_name" required maxLength="100" style={styles.input} onChange={handleChange} value={formData.client_name} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Company/Organization</label>
                <input type="text" name="company_name" maxLength="100" style={styles.input} onChange={handleChange} value={formData.company_name} />
              </div>
            </div>

            <div style={styles.formRow}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Email Address *</label>
                <input type="email" name="email" required style={styles.input} onChange={handleChange} value={formData.email} />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Phone Number</label>
                <input type="tel" name="phone" maxLength="15" style={styles.input} onChange={handleChange} value={formData.phone} />
              </div>
            </div>

            <div style={styles.formRow}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Product Interest</label>
                <select name="product_interest" style={styles.input} onChange={handleChange} value={formData.product_interest}>
                  <option value="">Select a product...</option>
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
                  <option value="">Select a type...</option>
                  {MACHINE_TYPES.map(m => (
                    <option key={m.id} value={m.label}>{m.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Quantity Required</label>
              <input type="text" name="quantity" maxLength="50" style={styles.input} onChange={handleChange} value={formData.quantity} placeholder="e.g. 2 sets" />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Message / Specific Requirements</label>
              <textarea name="message" rows="4" maxLength="1000" style={styles.textarea} onChange={handleChange} value={formData.message}></textarea>
            </div>

            <button type="submit" disabled={loading} style={styles.submitBtn}>
              {loading ? <Loader2 className="spinner" size={20} /> : 'Send Quote Request'}
            </button>
          </form>
        )}
      </div>
      <style>{`
        .spinner { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  modal: {
    backgroundColor: 'var(--color-white)',
    width: '100%',
    maxWidth: '600px',
    borderRadius: 'var(--radius-lg, 14px)',
    padding: '32px',
    position: 'relative',
    maxHeight: '90vh',
    overflowY: 'auto',
    boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
  },
  closeBtn: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: 'var(--color-navy)'
  },
  title: {
    fontFamily: 'var(--font-display)',
    fontSize: '28px',
    color: 'var(--color-navy)',
    marginBottom: '24px',
    borderBottom: '2px solid var(--color-bg)',
    paddingBottom: '12px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    fontFamily: 'var(--font-body)',
  },
  formRow: {
    display: 'flex',
    gap: '16px',
    flexWrap: 'wrap',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
    flex: '1 1 calc(50% - 8px)',
  },
  label: {
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--color-steel)'
  },
  input: {
    padding: '10px 12px',
    border: '1px solid #DDE1E9',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    fontFamily: 'inherit',
  },
  textarea: {
    padding: '10px 12px',
    border: '1px solid #DDE1E9',
    borderRadius: '6px',
    fontSize: '14px',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
  },
  submitBtn: {
    backgroundColor: 'var(--color-amber)',
    color: 'var(--color-white)',
    border: 'none',
    padding: '14px',
    borderRadius: '6px',
    fontSize: '16px',
    fontWeight: 600,
    cursor: 'pointer',
    marginTop: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorMsg: {
    backgroundColor: '#FEE2E2',
    color: '#B91C1C',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '20px',
    fontSize: '14px',
  },
  successMsg: {
    backgroundColor: '#D1FAE5',
    color: '#047857',
    padding: '20px',
    borderRadius: '6px',
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: 500,
  }
}
