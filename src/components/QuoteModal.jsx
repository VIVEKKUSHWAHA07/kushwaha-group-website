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
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={onClose}>
      <div 
        className="bg-brand-card border border-brand-border rounded-2xl p-8 w-full max-w-2xl mx-auto my-auto animate-fade-up relative shadow-2xl shadow-black/50" 
        onClick={e => e.stopPropagation()}
      >
        <button 
          className="absolute top-6 right-6 text-brand-muted hover:text-white transition-colors p-2 rounded-full hover:bg-brand-steel" 
          onClick={onClose}
        >
          <X size={24} />
        </button>
        
        <h2 className="font-display text-4xl text-brand-light border-b border-brand-border pb-4 mb-8">Request a Quote</h2>
        
        {status.message && (
          <div className={`p-4 rounded-lg mb-6 text-sm font-medium border ${status.type === 'error' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20 text-center text-lg'}`}>
            {status.message}
          </div>
        )}

        {status.type !== 'success' && (
          <form className="flex flex-col gap-5 font-body" onSubmit={handleSubmit}>
            {/* Honeypot */}
            <input type="text" name="website" className="hidden" onChange={handleChange} value={formData.website} tabIndex="-1" autoComplete="off" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-brand-muted uppercase tracking-wider">Full Name *</label>
                <input 
                  type="text" name="client_name" required maxLength="100" 
                  className="w-full bg-brand-dark/50 border border-brand-border rounded-lg px-4 py-3 text-brand-light placeholder:text-brand-muted focus:outline-none focus:border-brand-accent transition-colors" 
                  onChange={handleChange} value={formData.client_name} 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-brand-muted uppercase tracking-wider">Company/Organization</label>
                <input 
                  type="text" name="company_name" maxLength="100" 
                  className="w-full bg-brand-dark/50 border border-brand-border rounded-lg px-4 py-3 text-brand-light placeholder:text-brand-muted focus:outline-none focus:border-brand-accent transition-colors" 
                  onChange={handleChange} value={formData.company_name} 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-brand-muted uppercase tracking-wider">Email Address *</label>
                <input 
                  type="email" name="email" required 
                  className="w-full bg-brand-dark/50 border border-brand-border rounded-lg px-4 py-3 text-brand-light placeholder:text-brand-muted focus:outline-none focus:border-brand-accent transition-colors" 
                  onChange={handleChange} value={formData.email} 
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-brand-muted uppercase tracking-wider">Phone Number</label>
                <input 
                  type="tel" name="phone" maxLength="15" 
                  className="w-full bg-brand-dark/50 border border-brand-border rounded-lg px-4 py-3 text-brand-light placeholder:text-brand-muted focus:outline-none focus:border-brand-accent transition-colors" 
                  onChange={handleChange} value={formData.phone} 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-brand-muted uppercase tracking-wider">Product Interest</label>
                <select 
                  name="product_interest" 
                  className="w-full bg-brand-dark/50 border border-brand-border rounded-lg px-4 py-3 text-brand-light placeholder:text-brand-muted focus:outline-none focus:border-brand-accent transition-colors appearance-none" 
                  onChange={handleChange} value={formData.product_interest}
                >
                  <option value="" className="text-brand-muted">Select a product...</option>
                  <option value="Injection Moulding Screw">Injection Moulding Screw</option>
                  <option value="Injection Moulding Barrel">Injection Moulding Barrel</option>
                  <option value="Extrusion Screw">Extrusion Screw</option>
                  <option value="Extrusion Barrel">Extrusion Barrel</option>
                  <option value="Blow Moulding Screw">Blow Moulding Screw</option>
                  <option value="Blow Moulding Barrel">Blow Moulding Barrel</option>
                  <option value="Custom Order">Custom Order</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-brand-muted uppercase tracking-wider">Machine Type</label>
                <select 
                  name="machine_type" 
                  className="w-full bg-brand-dark/50 border border-brand-border rounded-lg px-4 py-3 text-brand-light placeholder:text-brand-muted focus:outline-none focus:border-brand-accent transition-colors appearance-none" 
                  onChange={handleChange} value={formData.machine_type}
                >
                  <option value="" className="text-brand-muted">Select a type...</option>
                  {MACHINE_TYPES.map(m => (
                    <option key={m.id} value={m.label}>{m.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-brand-muted uppercase tracking-wider">Quantity Required</label>
              <input 
                type="text" name="quantity" maxLength="50" placeholder="e.g. 2 sets"
                className="w-full bg-brand-dark/50 border border-brand-border rounded-lg px-4 py-3 text-brand-light placeholder:text-brand-muted focus:outline-none focus:border-brand-accent transition-colors font-mono" 
                onChange={handleChange} value={formData.quantity} 
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-brand-muted uppercase tracking-wider">Message / Specific Requirements</label>
              <textarea 
                name="message" rows="4" maxLength="1000" placeholder="Provide any specifications or special requests..."
                className="w-full bg-brand-dark/50 border border-brand-border rounded-lg px-4 py-3 text-brand-light placeholder:text-brand-muted focus:outline-none focus:border-brand-accent transition-colors resize-y" 
                onChange={handleChange} value={formData.message}
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              className="mt-4 bg-brand-accent text-brand-dark font-semibold px-6 py-4 rounded-lg hover:bg-brand-gold active:scale-95 transition-all duration-200 flex justify-center items-center text-lg shadow-lg shadow-brand-accent/20"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : 'Send Quote Request'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
