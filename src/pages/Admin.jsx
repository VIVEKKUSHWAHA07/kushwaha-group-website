import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { LogOut, Plus, Trash2, Edit2, Image as ImageIcon, Loader2, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Admin() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => setSession(session))
    return () => subscription.unsubscribe()
  }, [])

  if (loading) return <div className="min-h-screen bg-brand-dark flex items-center justify-center"><Loader2 className="animate-spin text-brand-accent" size={40} /></div>
  if (!session) return <Login />
  return <Dashboard session={session} />
}

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError('Invalid credentials. Please try again.')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center p-6 font-body text-brand-light">
      <form onSubmit={handleLogin} className="bg-brand-card border border-brand-border p-10 rounded-2xl w-full max-w-md flex flex-col gap-6 shadow-2xl">
        <h1 className="font-display text-4xl text-white text-center uppercase tracking-wider mb-2">Admin Panel</h1>
        {error && <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-lg text-sm text-center font-mono">{error}</div>}
        <input type="email" placeholder="Email" required className="w-full bg-brand-steel border border-brand-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required className="w-full bg-brand-steel border border-brand-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-brand-accent transition-colors" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit" disabled={loading} className="w-full bg-brand-accent text-brand-dark font-display text-xl uppercase tracking-wider py-4 rounded-lg hover:bg-brand-gold active:scale-95 transition-all flex items-center justify-center gap-3">
          {loading ? <Loader2 className="animate-spin" size={24} /> : 'Login'}
        </button>
      </form>
    </div>
  )
}

function Dashboard() {
  const [activeTab, setActiveTab] = useState('products')
  const handleLogout = async () => await supabase.auth.signOut()

  return (
    <div className="min-h-screen bg-brand-dark font-body text-brand-light">
      <header className="bg-brand-steel border-b border-brand-border px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 hidden sm:flex">
             <img src="/logo.svg" alt="Logo" className="w-8 h-8 rounded shrink-0" />
             <h1 className="font-display text-2xl text-white uppercase tracking-wider m-0">Kushwaha Admin</h1>
          </div>
          
          <div className="flex gap-2">
            <button onClick={() => setActiveTab('products')} className={`px-4 py-2 font-mono text-xs uppercase tracking-widest rounded-lg transition-colors ${activeTab === 'products' ? 'bg-brand-accent text-brand-dark font-semibold' : 'text-brand-muted hover:bg-brand-card hover:text-white'}`}>Products</button>
            <button onClick={() => setActiveTab('quotes')} className={`px-4 py-2 font-mono text-xs uppercase tracking-widest rounded-lg transition-colors ${activeTab === 'quotes' ? 'bg-brand-accent text-brand-dark font-semibold' : 'text-brand-muted hover:bg-brand-card hover:text-white'}`}>Quotes</button>
          </div>

          <button onClick={handleLogout} className="text-brand-muted hover:text-brand-accent ml-4"><LogOut size={20} /></button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 mt-8">
        {activeTab === 'products' ? <ProductsManager /> : <QuoteRequestsManager />}
      </main>
    </div>
  )
}

function ProductsManager() {
  const [products, setProducts] = useState([])
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  
  const [formData, setFormData] = useState({ name: '', product_type: 'screw', machine_type: 'injection', material: '', diameter_range: '', ld_ratio: '', description: '', is_featured: false })
  const [specKeys, setSpecKeys] = useState('')
  const [specVals, setSpecVals] = useState('')
  const [file, setFile] = useState(null)
  const [existingImage, setExistingImage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => { fetchProducts() }, [])

  const fetchProducts = async () => {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    if (data) setProducts(data)
  }

  const handleEdit = (p) => {
    setEditingId(p.id)
    setFormData({ name: p.name, product_type: p.product_type, machine_type: p.machine_type, material: p.material || '', diameter_range: p.diameter_range || '', ld_ratio: p.ld_ratio || '', description: p.description || '', is_featured: p.is_featured })
    setExistingImage(p.image_url || '')
    setFile(null)
    if (p.specifications) {
      const parsed = typeof p.specifications === 'string' ? JSON.parse(p.specifications) : p.specifications
      setSpecKeys(Object.keys(parsed).join(','))
      setSpecVals(Object.values(parsed).join(','))
    } else { setSpecKeys(''); setSpecVals('') }
    setFormOpen(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure? This cannot be undone.')) return
    await supabase.from('products').delete().eq('id', id)
    fetchProducts()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      let finalImageUrl = existingImage
      if (file) {
        if (file.size > 2*1024*1024) throw new Error('Image must be under 2MB.')
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const { error: uploadError } = await supabase.storage.from('product-images').upload(fileName, file)
        if (uploadError) throw uploadError
        const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(fileName)
        finalImageUrl = publicUrl
      }
      let specs = {}
      const keys = specKeys.split(',').map(k => k.trim()).filter(Boolean)
      const vals = specVals.split(',').map(v => v.trim())
      keys.forEach((k, i) => { if (vals[i]) specs[k] = vals[i] })
      
      const payload = { ...formData, specifications: specs, image_url: finalImageUrl }
      if (editingId) await supabase.from('products').update(payload).eq('id', editingId)
      else await supabase.from('products').insert([payload])
      
      setFormOpen(false); fetchProducts()
    } catch (err) { setError(err.message) } 
    finally { setLoading(false) }
  }

  return (
    <div className="flex flex-col gap-6">
      {!formOpen && (
        <div className="flex justify-between items-center bg-brand-card p-6 rounded-xl border border-brand-border">
          <h2 className="font-display text-3xl text-white uppercase">Product Catalogue ({products.length})</h2>
          <button onClick={() => {
            setEditingId(null); setFile(null); setExistingImage(''); setSpecKeys(''); setSpecVals('');
            setFormData({ name: '', product_type: 'screw', machine_type: 'injection', material: '', diameter_range: '', ld_ratio: '', description: '', is_featured: false })
            setFormOpen(true)
          }} className="bg-brand-accent text-brand-dark px-6 py-3 rounded uppercase font-mono text-xs font-semibold hover:bg-brand-gold transition flex items-center gap-2">
            <Plus size={16}/> Add Product
          </button>
        </div>
      )}

      {formOpen && (
        <div className="bg-brand-card p-8 rounded-xl border border-brand-border animate-fade-up">
          <h2 className="font-display text-3xl text-white uppercase mb-6">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
          {error && <div className="bg-red-500/10 text-red-500 p-4 rounded-lg mb-6 text-sm">{error}</div>}
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input placeholder="Product Name *" required className="bg-brand-steel border border-brand-border rounded px-4 py-3 text-white" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              <div className="grid grid-cols-2 gap-4">
                <select className="bg-brand-steel border border-brand-border rounded px-4 py-3 text-white" value={formData.product_type} onChange={e => setFormData({...formData, product_type: e.target.value})}>
                  <option value="screw">Screw</option><option value="barrel">Barrel</option>
                </select>
                <select className="bg-brand-steel border border-brand-border rounded px-4 py-3 text-white" value={formData.machine_type} onChange={e => setFormData({...formData, machine_type: e.target.value})}>
                  <option value="injection">Injection</option><option value="extrusion">Extrusion</option>
                  <option value="blow_moulding">Blow Moulding</option><option value="custom">Custom</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <input placeholder="Material (e.g. EN41B)" className="bg-brand-steel border border-brand-border rounded px-4 py-3 text-white" value={formData.material} onChange={e => setFormData({...formData, material: e.target.value})} />
               <input placeholder="Diameter Range (e.g. 20-300mm)" className="bg-brand-steel border border-brand-border rounded px-4 py-3 text-white" value={formData.diameter_range} onChange={e => setFormData({...formData, diameter_range: e.target.value})} />
               <input placeholder="L/D Ratio" className="bg-brand-steel border border-brand-border rounded px-4 py-3 text-white" value={formData.ld_ratio} onChange={e => setFormData({...formData, ld_ratio: e.target.value})} />
            </div>

            <textarea placeholder="Description" rows="3" className="bg-brand-steel border border-brand-border rounded px-4 py-3 text-white resize-y" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />

            <div className="bg-brand-steel/50 p-6 rounded-lg border border-brand-border border-dashed">
              <label className="block text-brand-muted text-sm mb-3">Specifications (Comma separated keys and values)</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input placeholder="Keys: Flight Depth, Root Dia, RPM" className="bg-brand-steel border border-brand-border rounded px-4 py-3 text-white" value={specKeys} onChange={e => setSpecKeys(e.target.value)} />
                <input placeholder="Values: 4mm, 50mm, 300" className="bg-brand-steel border border-brand-border rounded px-4 py-3 text-white" value={specVals} onChange={e => setSpecVals(e.target.value)} />
              </div>
            </div>

            <div className="flex items-center gap-6 bg-brand-steel/50 p-6 rounded-lg border border-brand-border border-dashed">
               <div className="flex-1">
                 <label className="block text-brand-muted text-sm mb-2">Image Upload (Max 2MB, JPG/WEBP)</label>
                 <input type="file" accept="image/jpeg, image/png, image/webp" className="w-full text-sm text-brand-muted file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-brand-accent file:text-brand-dark hover:file:bg-brand-gold cursor-pointer" onChange={e => setFile(e.target.files[0])}/>
               </div>
               {existingImage && <img src={existingImage} className="h-16 w-16 object-cover rounded border border-brand-border" alt="Current"/>}
            </div>

            <label className="flex items-center gap-3 cursor-pointer w-fit">
              <input type="checkbox" className="w-5 h-5 accent-brand-accent bg-brand-steel border-brand-border rounded" checked={formData.is_featured} onChange={e => setFormData({...formData, is_featured: e.target.checked})} />
              <span className="text-white">Feature on Homepage</span>
            </label>

            <div className="flex gap-4 pt-4">
              <button type="submit" disabled={loading} className="bg-brand-accent text-brand-dark px-8 py-3 rounded uppercase font-mono text-sm font-semibold hover:bg-brand-gold transition flex items-center justify-center min-w-[150px]">
                {loading ? <Loader2 className="animate-spin" size={18}/> : 'Save Product'}
              </button>
              <button type="button" onClick={() => setFormOpen(false)} className="border border-brand-border text-brand-light px-8 py-3 rounded uppercase font-mono text-sm hover:border-brand-accent transition">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="bg-brand-card rounded-xl border border-brand-border overflow-x-auto shadow-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-brand-steel/80 border-b border-brand-border font-mono text-xs uppercase tracking-widest text-brand-muted">
              <th className="p-4 pl-6">Image</th>
              <th className="p-4">Product Details</th>
              <th className="p-4 hidden sm:table-cell">Type</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {products.map(p => (
              <tr key={p.id} className="hover:bg-brand-steel/30 transition-colors">
                <td className="p-4 pl-6 w-24">
                  {p.image_url ? <img src={p.image_url} className="w-12 h-12 rounded object-cover border border-brand-border" /> : <div className="w-12 h-12 rounded bg-brand-steel flex items-center justify-center text-brand-muted"><ImageIcon size={20}/></div>}
                </td>
                <td className="p-4">
                  <div className="text-white font-medium text-lg">{p.name}</div>
                  <div className="text-brand-muted text-sm">{p.material} {p.diameter_range ? `| ${p.diameter_range}` : ''}</div>
                </td>
                <td className="p-4 hidden sm:table-cell">
                  <span className="bg-brand-steel border border-brand-border px-2 py-1 rounded text-xs font-mono uppercase text-brand-light">{p.machine_type} {p.product_type}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <button onClick={() => handleEdit(p)} className="p-2 bg-brand-steel hover:bg-brand-accent text-brand-light hover:text-brand-dark rounded transition"><Edit2 size={16}/></button>
                    <button onClick={() => handleDelete(p.id)} className="p-2 bg-brand-steel hover:bg-red-500 text-brand-light hover:text-white rounded transition"><Trash2 size={16}/></button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && <tr><td colSpan="4" className="text-center p-12 text-brand-muted font-mono">No products in catalogue.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function QuoteRequestsManager() {
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [search, setSearch] = useState('')
  const [expandedRow, setExpandedRow] = useState(null)
  const LIMIT = 20

  useEffect(() => { fetchQuotes() }, [page, search])

  const fetchQuotes = async () => {
    setLoading(true)
    let query = supabase.from('quote_requests').select('*').order('created_at', { ascending: false }).range(page * LIMIT, (page + 1) * LIMIT - 1)
    if (search) query = query.or(`client_name.ilike.%${search}%,email.ilike.%${search}%`)
    const { data } = await query
    if (data) setQuotes(data)
    setLoading(false)
  }

  const handleStatusChange = async (id, newStatus) => {
    await supabase.from('quote_requests').update({ status: newStatus }).eq('id', id)
    fetchQuotes()
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row justify-between items-center bg-brand-card p-6 rounded-xl border border-brand-border gap-4">
        <input type="text" placeholder="Search by name or email..." className="w-full md:w-80 bg-brand-steel border border-brand-border rounded px-4 py-3 text-white focus:outline-none focus:border-brand-accent" value={search} onChange={e => { setSearch(e.target.value); setPage(0); }} />
        <div className="flex items-center gap-4 bg-brand-steel rounded-lg p-2 border border-brand-border">
          <button disabled={page === 0} onClick={() => setPage(page - 1)} className="p-2 hover:bg-brand-card text-brand-light disabled:opacity-50 rounded"><ChevronLeft size={20}/></button>
          <span className="font-mono text-sm uppercase tracking-wider text-brand-muted px-4 border-x border-brand-border/50">Page {page + 1}</span>
          <button disabled={quotes.length < LIMIT} onClick={() => setPage(page + 1)} className="p-2 hover:bg-brand-card text-brand-light disabled:opacity-50 rounded"><ChevronRight size={20}/></button>
        </div>
      </div>

      <div className="bg-brand-card rounded-xl border border-brand-border overflow-x-auto shadow-xl min-h-[500px]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-brand-steel/80 border-b border-brand-border font-mono text-xs uppercase tracking-widest text-brand-muted">
              <th className="p-4 pl-6">Date</th>
              <th className="p-4">Contact Detail</th>
              <th className="p-4">Requirement</th>
              <th className="p-4 w-1/3">Message</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-border">
            {loading && <tr><td colSpan="5" className="text-center p-12"><Loader2 className="animate-spin mx-auto text-brand-accent" size={30}/></td></tr>}
            {!loading && quotes.length === 0 && <tr><td colSpan="5" className="text-center p-12 text-brand-muted font-mono">No requests found.</td></tr>}
            {!loading && quotes.map(q => (
              <tr key={q.id} className="hover:bg-brand-steel/30 transition-colors">
                <td className="p-4 pl-6 text-brand-light text-sm font-mono whitespace-nowrap">{new Date(q.created_at).toLocaleDateString()}</td>
                <td className="p-4">
                  <div className="text-white font-medium">{q.client_name}</div>
                  <div className="text-brand-muted text-xs mb-1">{q.company_name || '-'}</div>
                  <a href={`mailto:${q.email}`} className="text-brand-accent hover:underline text-xs block">{q.email}</a>
                  <a href={`tel:${q.phone}`} className="text-brand-light text-xs block">{q.phone}</a>
                </td>
                <td className="p-4">
                  <div className="text-white text-sm mb-1">{q.product_interest || 'General'}</div>
                  <div className="text-brand-muted font-mono text-xs border border-brand-border/50 bg-brand-steel rounded px-2 py-1 w-fit mt-1">
                    {q.machine_type || 'N/A'} {q.quantity ? `| QTY: ${q.quantity}` : ''}
                  </div>
                </td>
                <td className="p-4 text-brand-light text-sm leading-relaxed max-w-xs">
                  {q.message && q.message.length > 80 && expandedRow !== q.id ? (
                    <span>{q.message.substring(0, 80)}... <button onClick={() => setExpandedRow(q.id)} className="text-brand-accent hover:underline font-semibold ml-1">More</button></span>
                  ) : (
                    <span>{q.message || <span className="text-brand-muted italic">No message provided.</span>} {expandedRow === q.id && <button onClick={() => setExpandedRow(null)} className="text-brand-muted hover:text-white underline ml-1">Less</button>}</span>
                  )}
                </td>
                <td className="p-4">
                  <select 
                    value={q.status || 'new'} 
                    onChange={e => handleStatusChange(q.id, e.target.value)}
                    className={`bg-brand-steel border rounded px-3 py-2 text-sm font-semibold focus:outline-none focus:border-brand-accent
                      ${q.status === 'new' || !q.status ? 'text-brand-accent border-brand-accent/30' : q.status === 'contacted' ? 'text-blue-400 border-blue-400/30' : 'text-green-500 border-green-500/30'}
                    `}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="closed">Closed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
