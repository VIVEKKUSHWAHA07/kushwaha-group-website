import { useState } from 'react'
import { MapPin, Phone, Mail, Loader2, MessageCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { COMPANY, MACHINE_TYPES } from '../lib/constants'

export default function Contact() {
  const [formData, setFormData] = useState({
    client_name: '', company_name: '', email: '', phone: '',
    product_interest: '', machine_type: '', quantity: '', message: '', website: ''
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState({ type: '', message: '' })

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

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
      const { error } = await supabase.from('quote_requests').insert([{
        client_name: formData.client_name,
        company_name: formData.company_name,
        email: formData.email,
        phone: formData.phone,
        product_interest: formData.product_interest,
        machine_type: formData.machine_type,
        quantity: formData.quantity,
        message: formData.message,
      }])
      if (error) throw error

      setStatus({ type: 'success', message: 'Thank you! We have received your inquiry and will contact you within 24 hours.' })
      supabase.functions.invoke('send-quote-email', {
        body: {
          clientName: formData.client_name, companyName: formData.company_name,
          email: formData.email, phone: formData.phone,
          productInterest: formData.product_interest, machineType: formData.machine_type,
          quantity: formData.quantity, message: formData.message,
        }
      }).catch(err => console.error('Edge function error:', err))
    } catch (err) {
      console.error(err)
      setStatus({ type: 'error', message: 'Something went wrong. Please try WhatsApp or call us directly.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white dark:bg-brand-dark transition-colors min-h-screen font-body pb-24">
      
      <header className="bg-gray-50 dark:bg-brand-steel border-b border-gray-200 dark:border-brand-border py-20 text-center px-6 transition-colors">
        <h1 className="font-display text-6xl text-gray-900 dark:text-white uppercase mb-4 animate-fade-up">Contact Us</h1>
        <p className="text-brand-accent font-mono uppercase tracking-widest animate-fade-up" style={{ animationDelay: '0.1s' }}>Get in touch for custom requirements</p>
      </header>

      <div className="max-w-7xl mx-auto px-6 mt-16">
        
        {/* Top Info Cards Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          <div className="flex flex-col gap-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="bg-gray-50 dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-xl p-8 flex items-start gap-6 hover:border-brand-accent dark:hover:border-brand-accent transition-colors">
              <div className="bg-white dark:bg-brand-steel border border-gray-200 dark:border-transparent p-4 rounded-full text-brand-accent"><MapPin size={28} /></div>
              <div>
                <h3 className="font-display text-2xl text-gray-900 dark:text-white uppercase mb-2">Corporate Address</h3>
                <p className="text-gray-600 dark:text-brand-muted leading-relaxed max-w-sm">{COMPANY.address}</p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-xl p-8 flex items-start gap-6 hover:border-brand-accent dark:hover:border-brand-accent transition-colors">
              <div className="bg-white dark:bg-brand-steel border border-gray-200 dark:border-transparent p-4 rounded-full text-brand-accent"><Phone size={28} /></div>
              <div>
                <h3 className="font-display text-2xl text-gray-900 dark:text-white uppercase mb-2">Phone</h3>
                <a href={`tel:${COMPANY.phone}`} className="text-gray-800 dark:text-brand-light hover:text-brand-accent dark:hover:text-brand-accent transition-colors block mb-2">{COMPANY.phone}</a>
                <span className="font-mono text-xs text-gray-500 dark:text-brand-muted uppercase tracking-widest">Mon-Sat, 9AM to 6PM</span>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-xl p-8 flex items-start gap-6 hover:border-brand-accent dark:hover:border-brand-accent transition-colors">
              <div className="bg-white dark:bg-brand-steel border border-gray-200 dark:border-transparent p-4 rounded-full text-brand-accent"><Mail size={28} /></div>
              <div>
                <h3 className="font-display text-2xl text-gray-900 dark:text-white uppercase mb-2">Email</h3>
                <a href={`mailto:${COMPANY.email}`} className="text-gray-800 dark:text-brand-light hover:text-brand-accent transition-colors block">{COMPANY.email}</a>
              </div>
            </div>

            <a href={`https://wa.me/${COMPANY.whatsapp}?text=${encodeURIComponent(COMPANY.whatsappMsg)}`} target="_blank" rel="noreferrer" 
               className="bg-gray-50 dark:bg-brand-card border border-green-500/30 dark:border-brand-accent/40 rounded-xl p-8 flex items-center justify-center gap-4 hover:border-green-500 dark:hover:border-brand-accent hover:bg-green-50 dark:hover:bg-green-500/10 transition-all group shadow-lg shadow-green-500/5">
              <MessageCircle size={32} className="text-green-500 group-hover:scale-110 transition-transform" />
              <span className="font-display text-2xl text-gray-900 dark:text-white uppercase group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">Message on WhatsApp</span>
            </a>
          </div>

          {/* Map Frame */}
          <div className="h-full min-h-[400px] border border-gray-200 dark:border-brand-border rounded-xl overflow-hidden shadow-xl animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <iframe 
              src={COMPANY.googleMapsEmbed}
              width="100%" 
              height="100%" 
              className="border-0 w-full h-full grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-white dark:bg-brand-card border border-gray-200 dark:border-brand-border rounded-2xl p-8 lg:p-12 shadow-2xl animate-fade-up" style={{ animationDelay: '0.4s' }}>
          <h2 className="font-display text-4xl text-brand-accent uppercase mb-8 border-b border-gray-200 dark:border-brand-border pb-4 w-fit pr-10">Send an Inquiry</h2>
          
          {status.message && (
            <div className={`p-4 rounded-lg mb-8 border ${status.type === 'error' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}`}>
              {status.message}
            </div>
          )}

          {status.type !== 'success' && (
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <input type="text" name="website" className="hidden" tabIndex="-1" autoComplete="off" onChange={handleChange} value={formData.website} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-gray-600 dark:text-brand-muted font-mono text-xs uppercase tracking-widest pl-1">Full Name *</label>
                  <input type="text" name="client_name" required className="bg-gray-50 dark:bg-brand-dark/50 border border-gray-200 dark:border-brand-border rounded-lg px-4 py-3 text-gray-900 dark:text-brand-light placeholder:text-gray-400 dark:placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-accent transition-colors" onChange={handleChange} value={formData.client_name} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-600 dark:text-brand-muted font-mono text-xs uppercase tracking-widest pl-1">Company</label>
                  <input type="text" name="company_name" className="bg-gray-50 dark:bg-brand-dark/50 border border-gray-200 dark:border-brand-border rounded-lg px-4 py-3 text-gray-900 dark:text-brand-light placeholder:text-gray-400 dark:placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-accent transition-colors" onChange={handleChange} value={formData.company_name} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-gray-600 dark:text-brand-muted font-mono text-xs uppercase tracking-widest pl-1">Email Address *</label>
                  <input type="email" name="email" required className="bg-gray-50 dark:bg-brand-dark/50 border border-gray-200 dark:border-brand-border rounded-lg px-4 py-3 text-gray-900 dark:text-brand-light placeholder:text-gray-400 dark:placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-accent transition-colors" onChange={handleChange} value={formData.email} />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-600 dark:text-brand-muted font-mono text-xs uppercase tracking-widest pl-1">Phone Number</label>
                  <input type="tel" name="phone" className="bg-gray-50 dark:bg-brand-dark/50 border border-gray-200 dark:border-brand-border rounded-lg px-4 py-3 text-gray-900 dark:text-brand-light placeholder:text-gray-400 dark:placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-accent transition-colors" onChange={handleChange} value={formData.phone} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-gray-600 dark:text-brand-muted font-mono text-xs uppercase tracking-widest pl-1">Product Area</label>
                  <select name="product_interest" className="bg-gray-50 dark:bg-brand-dark/50 border border-gray-200 dark:border-brand-border rounded-lg px-4 py-3 text-gray-900 dark:text-brand-light focus:outline-none focus:border-brand-accent transition-colors" onChange={handleChange} value={formData.product_interest}>
                    <option value="">Select...</option>
                    <option value="Injection Moulding Screw">Injection Moulding Screw</option>
                    <option value="Injection Moulding Barrel">Injection Moulding Barrel</option>
                    <option value="Extrusion Screw">Extrusion Screw</option>
                    <option value="Extrusion Barrel">Extrusion Barrel</option>
                    <option value="Custom Order">Custom Order</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-600 dark:text-brand-muted font-mono text-xs uppercase tracking-widest pl-1">Machine</label>
                  <select name="machine_type" className="bg-gray-50 dark:bg-brand-dark/50 border border-gray-200 dark:border-brand-border rounded-lg px-4 py-3 text-gray-900 dark:text-brand-light focus:outline-none focus:border-brand-accent transition-colors" onChange={handleChange} value={formData.machine_type}>
                    <option value="">Select...</option>
                    {MACHINE_TYPES.map(m => <option key={m.id} value={m.label}>{m.label}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-gray-600 dark:text-brand-muted font-mono text-xs uppercase tracking-widest pl-1">Quantity</label>
                  <input type="text" name="quantity" placeholder="e.g. 5 Sets" className="bg-gray-50 dark:bg-brand-dark/50 border border-gray-200 dark:border-brand-border rounded-lg px-4 py-3 text-gray-900 dark:text-brand-light placeholder:text-gray-400 dark:placeholder:text-brand-muted/50 focus:outline-none focus:border-brand-accent transition-colors" onChange={handleChange} value={formData.quantity} />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-gray-600 dark:text-brand-muted font-mono text-xs uppercase tracking-widest pl-1">Message Detail</label>
                <textarea name="message" rows="4" className="bg-gray-50 dark:bg-brand-dark/50 border border-gray-200 dark:border-brand-border rounded-lg px-4 py-3 text-gray-900 dark:text-brand-light focus:outline-none focus:border-brand-accent transition-colors resize-y" onChange={handleChange} value={formData.message}></textarea>
              </div>

              <div className="mt-4">
                <button type="submit" disabled={loading} className="bg-brand-accent text-brand-dark font-display text-xl uppercase tracking-wider px-10 py-4 rounded-lg hover:bg-brand-gold active:scale-95 transition-all shadow-lg shadow-brand-accent/20 flex items-center justify-center gap-3 w-full md:w-auto">
                  {loading && <Loader2 className="animate-spin" size={24} />}
                  Submit Inquiry
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  )
}
