/**
 * SECURITY NOTE — Supabase RLS Policies required for this admin panel:
 * - quote_requests: anon INSERT only | authenticated full access
 * - products: anon SELECT only | authenticated full access
 * - product-images bucket: public read | authenticated write
 * Verify these policies in Supabase Dashboard > Authentication > Policies
 */
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { LogOut, Plus, Trash2, Edit2, Image as ImageIcon, Loader2, PlusCircle, MinusCircle } from 'lucide-react'

export default function Admin() {
  const [activeTab, setActiveTab] = useState('products')
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin-login')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-brand-dark transition-colors font-body text-gray-900 dark:text-brand-light">
      <header className="bg-white dark:bg-brand-steel border-b border-gray-200 dark:border-brand-border px-6 py-4 sticky top-0 z-50 transition-colors shadow-sm dark:shadow-none">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <h1 className="font-display text-xl sm:text-2xl text-gray-900 dark:text-white uppercase tracking-wider m-0">
            KUSHWAHA GROUP — Admin Panel
          </h1>
          
          <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex gap-2">
              <button 
                onClick={() => setActiveTab('products')} 
                className={`px-4 py-2 font-mono text-xs uppercase tracking-widest rounded-lg transition-colors ${activeTab === 'products' ? 'bg-yellow-400 text-gray-900 font-semibold' : 'text-gray-600 dark:text-brand-muted hover:bg-gray-100 dark:hover:bg-brand-card hover:text-gray-900 dark:hover:text-white'}`}
              >
                Products
              </button>
              <button 
                onClick={() => setActiveTab('quotes')} 
                className={`px-4 py-2 font-mono text-xs uppercase tracking-widest rounded-lg transition-colors ${activeTab === 'quotes' ? 'bg-yellow-400 text-gray-900 font-semibold' : 'text-gray-600 dark:text-brand-muted hover:bg-gray-100 dark:hover:bg-brand-card hover:text-gray-900 dark:hover:text-white'}`}
              >
                Quote Requests
              </button>
            </div>

            <button onClick={handleLogout} className="text-gray-500 hover:text-red-500 dark:text-brand-muted dark:hover:text-red-400 flex items-center gap-2 transition-colors">
              <LogOut size={20} /> <span className="hidden sm:inline font-mono text-sm uppercase">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 sm:p-6 mt-4 sm:mt-8 animate-fade-in">
        {activeTab === 'products' ? <ProductsManager /> : <QuoteRequestsManager />}
      </main>
    </div>
  )
}

function ProductsManager() {
  const [products, setProducts] = useState([])
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  
  const [formData, setFormData] = useState({ name: '', product_type: '', machine_type: '', material: '', diameter_range: '', ld_ratio: '', description: '', is_featured: false })
  const [specs, setSpecs] = useState([{ key: '', value: '' }])
  const [file, setFile] = useState(null)
  const [existingImage, setExistingImage] = useState('')
  
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [tableLoading, setTableLoading] = useState(true)

  useEffect(() => { fetchProducts() }, [])

  const fetchProducts = async () => {
    setTableLoading(true)
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    if (data) setProducts(data)
    setTableLoading(false)
  }

  const handleEdit = (p) => {
    setEditingId(p.id)
    setFormData({ 
      name: p.name || '', 
      product_type: p.product_type || '', 
      machine_type: p.machine_type || '', 
      material: p.material || '', 
      diameter_range: p.diameter_range || '', 
      ld_ratio: p.ld_ratio || '', 
      description: p.description || '', 
      is_featured: p.is_featured || false 
    })
    setExistingImage(p.image_url || '')
    setFile(null)
    
    let specsArr = [{ key: '', value: '' }]
    if (p.specifications && Object.keys(p.specifications).length > 0) {
      specsArr = Object.entries(p.specifications).map(([key, value]) => ({ key, value }))
    }
    setSpecs(specsArr)
    setFormOpen(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product? This cannot be undone.')) return
    setTableLoading(true)
    await supabase.from('products').delete().eq('id', id)
    fetchProducts()
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      let finalImageUrl = existingImage

      if (file) {
        const fileExt = file.name.split('.').pop()
        const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
        const fileName = `public/${Date.now()}_${safeName}`
        
        const { error: uploadError } = await supabase.storage.from('product-images').upload(fileName, file)
        if (uploadError) throw uploadError
        
        const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(fileName)
        finalImageUrl = publicUrl
      }
      
      let specsObj = {}
      specs.forEach(s => {
        if (s.key.trim() && s.value.trim()) {
          specsObj[s.key.trim()] = s.value.trim()
        }
      })
      
      const payload = { ...formData, specifications: specsObj, image_url: finalImageUrl }
      
      if (editingId) {
        const { error: updateErr } = await supabase.from('products').update(payload).eq('id', editingId)
        if (updateErr) throw updateErr
      } else {
        const { error: insertErr } = await supabase.from('products').insert([payload])
        if (insertErr) throw insertErr
      }
      
      setFormOpen(false)
      fetchProducts()
    } catch (err) { 
      setError(err.message) 
    } finally { 
      setLoading(false) 
    }
  }

  const addSpecRow = () => setSpecs([...specs, { key: '', value: '' }])
  const removeSpecRow = (index) => setSpecs(specs.filter((_, i) => i !== index))
  const updateSpec = (index, field, val) => {
    const newSpecs = [...specs]
    newSpecs[index][field] = val
    setSpecs(newSpecs)
  }

  return (
    <div className="flex flex-col gap-6">
      {!formOpen && (
        <div className="flex justify-between items-center bg-white dark:bg-brand-card p-6 rounded-xl border border-gray-200 dark:border-brand-border transition-colors shadow-sm dark:shadow-none">
          <h2 className="font-display text-2xl sm:text-3xl text-gray-900 dark:text-white uppercase tracking-wider">Product Catalogue</h2>
          <button onClick={() => {
            setEditingId(null); setFile(null); setExistingImage(''); 
            setSpecs([{ key: '', value: '' }]);
            setFormData({ name: '', product_type: '', machine_type: '', material: '', diameter_range: '', ld_ratio: '', description: '', is_featured: false })
            setFormOpen(true)
          }} className="bg-yellow-400 text-gray-900 px-4 sm:px-6 py-2 sm:py-3 rounded uppercase font-mono text-xs sm:text-sm font-semibold hover:bg-yellow-500 transition flex items-center gap-2 shadow hover:shadow-md">
            <Plus size={16}/> <span className="hidden sm:inline">Add New Product</span>
          </button>
        </div>
      )}

      {formOpen && (
        <div className="bg-white dark:bg-brand-card p-6 sm:p-8 rounded-xl border border-gray-200 dark:border-brand-border animate-fade-up transition-colors shadow-lg">
          <h2 className="font-display text-2xl text-gray-900 dark:text-white uppercase tracking-wider mb-6 pb-4 border-b border-gray-200 dark:border-brand-border">{editingId ? 'Edit Product' : 'Add New Product'}</h2>
          
          {error && <div className="bg-red-100 border border-red-200 text-red-700 dark:bg-red-900/30 dark:border-red-500/50 dark:text-red-400 p-4 rounded-lg mb-6 text-sm">{error}</div>}
          
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-brand-muted mb-2">Name *</label>
                <input required className="w-full bg-gray-50 dark:bg-brand-steel border border-gray-200 dark:border-brand-border rounded px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-yellow-400" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-brand-muted mb-2">Product Type *</label>
                  <input required placeholder="e.g. Screw, Barrel" className="w-full bg-gray-50 dark:bg-brand-steel border border-gray-200 dark:border-brand-border rounded px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-yellow-400" value={formData.product_type} onChange={e => setFormData({...formData, product_type: e.target.value})} />
                </div>
                 <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-brand-muted mb-2">Machine Type *</label>
                  <input required placeholder="e.g. Injection, Extrusion" className="w-full bg-gray-50 dark:bg-brand-steel border border-gray-200 dark:border-brand-border rounded px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-yellow-400" value={formData.machine_type} onChange={e => setFormData({...formData, machine_type: e.target.value})} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div>
                 <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-brand-muted mb-2">Material</label>
                 <input className="w-full bg-gray-50 dark:bg-brand-steel border border-gray-200 dark:border-brand-border rounded px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-yellow-400" value={formData.material} onChange={e => setFormData({...formData, material: e.target.value})} />
               </div>
               <div>
                 <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-brand-muted mb-2">Diameter Range</label>
                 <input className="w-full bg-gray-50 dark:bg-brand-steel border border-gray-200 dark:border-brand-border rounded px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-yellow-400" value={formData.diameter_range} onChange={e => setFormData({...formData, diameter_range: e.target.value})} />
               </div>
               <div>
                 <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-brand-muted mb-2">L/D Ratio</label>
                 <input className="w-full bg-gray-50 dark:bg-brand-steel border border-gray-200 dark:border-brand-border rounded px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-yellow-400" value={formData.ld_ratio} onChange={e => setFormData({...formData, ld_ratio: e.target.value})} />
               </div>
            </div>

            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-brand-muted mb-2">Description</label>
              <textarea rows="3" className="w-full bg-gray-50 dark:bg-brand-steel border border-gray-200 dark:border-brand-border rounded px-4 py-3 text-gray-900 dark:text-white focus:outline-none focus:border-yellow-400 resize-y" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            </div>

            <div className="bg-gray-50 dark:bg-brand-steel/50 p-6 rounded-lg border border-gray-200 dark:border-brand-border transition-colors">
              <label className="block text-gray-900 dark:text-white font-display text-lg mb-4">Specifications</label>
              <p className="text-gray-500 dark:text-brand-muted text-xs font-mono mb-3">
                Add custom key-value pairs for additional specs. Example: Key = "Flight Depth" → Value = "4mm". Leave blank rows — they will be ignored on save.
              </p>
              <div className="space-y-3">
                {specs.map((s, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row gap-3 items-center">
                    <input placeholder="Key (e.g. Flight Depth)" className="w-full sm:w-1/2 bg-white dark:bg-brand-steel border border-gray-300 dark:border-brand-border rounded px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-yellow-400" value={s.key} onChange={e => updateSpec(idx, 'key', e.target.value)} />
                    <input placeholder="Value (e.g. 4mm)" className="w-full sm:w-1/2 bg-white dark:bg-brand-steel border border-gray-300 dark:border-brand-border rounded px-4 py-2 text-gray-900 dark:text-white focus:outline-none focus:border-yellow-400" value={s.value} onChange={e => updateSpec(idx, 'value', e.target.value)} />
                    <button type="button" onClick={() => removeSpecRow(idx)} disabled={specs.length === 1} className="p-2 text-gray-400 hover:text-red-500 disabled:opacity-30 disabled:hover:text-gray-400"><MinusCircle size={20}/></button>
                  </div>
                ))}
              </div>
              <button type="button" onClick={addSpecRow} className="mt-4 flex items-center gap-2 text-yellow-500 hover:text-yellow-600 dark:text-yellow-400 dark:hover:text-yellow-300 text-sm font-semibold font-mono uppercase transition-colors">
                <PlusCircle size={16}/> Add Row
              </button>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 bg-gray-50 dark:bg-brand-steel/50 p-6 rounded-lg border border-gray-200 dark:border-brand-border transition-colors">
               <div className="flex-1 w-full">
                 <label className="block text-xs font-mono uppercase tracking-wider text-gray-500 dark:text-brand-muted mb-2">Image Upload</label>
                 <input type="file" accept="image/*" className="w-full text-sm text-gray-600 dark:text-brand-muted file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-yellow-400 file:text-gray-900 hover:file:bg-yellow-500 cursor-pointer" onChange={e => setFile(e.target.files[0])}/>
               </div>
               {existingImage && <img src={existingImage} className="h-16 w-16 object-contain rounded shadow border border-gray-200 dark:border-brand-border bg-white dark:bg-brand-steel p-1" alt="Current"/>}
            </div>

            <label className="flex items-center gap-3 cursor-pointer w-fit p-2 rounded hover:bg-gray-50 dark:hover:bg-brand-steel/30 transition-colors">
               <input type="checkbox" className="w-5 h-5 accent-yellow-400 rounded cursor-pointer" checked={formData.is_featured} onChange={e => setFormData({...formData, is_featured: e.target.checked})} />
               <span className="text-gray-900 dark:text-white font-medium select-none">Feature on Homepage</span>
            </label>

            <div className="flex gap-4 pt-4 border-t border-gray-200 dark:border-brand-border mt-2">
              <button type="submit" disabled={loading} className="bg-yellow-400 text-gray-900 px-8 py-3 rounded-lg uppercase font-mono text-sm font-semibold hover:bg-yellow-500 active:scale-95 transition-all flex items-center justify-center min-w-[150px] shadow">
                {loading ? <Loader2 className="animate-spin" size={18}/> : 'Save Product'}
              </button>
              <button type="button" onClick={() => setFormOpen(false)} className="border border-gray-300 dark:border-brand-border text-gray-600 dark:text-brand-light px-8 py-3 rounded-lg uppercase font-mono text-sm hover:border-gray-400 dark:hover:border-white transition-colors bg-white dark:bg-transparent">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {!formOpen && (
        <div className="bg-white dark:bg-brand-card rounded-xl border border-gray-200 dark:border-brand-border overflow-x-auto shadow-sm dark:shadow-xl transition-colors">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 dark:bg-brand-steel/80 border-b border-gray-200 dark:border-brand-border font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-brand-muted">
                <th className="p-4 pl-6 w-20">Image</th>
                <th className="p-4">Name</th>
                <th className="p-4">Type</th>
                <th className="p-4">Machine Type</th>
                <th className="p-4">Material</th>
                <th className="p-4">Featured</th>
                <th className="p-4 text-right pr-6">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-brand-border">
              {tableLoading ? (
                <tr><td colSpan="7" className="text-center p-12"><Loader2 className="animate-spin mx-auto text-yellow-400" size={30}/></td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan="7" className="text-center p-12 text-gray-500 dark:text-brand-muted font-mono">No products in catalogue.</td></tr>
              ) : (
                products.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-brand-steel/30 transition-colors group">
                    <td className="p-4 pl-6">
                      {p.image_url ? 
                        <img src={p.image_url} className="w-10 h-10 rounded object-contain shadow border border-gray-200 dark:border-brand-border bg-white dark:bg-brand-steel p-0.5" /> 
                      : 
                        <div className="w-10 h-10 rounded bg-gray-100 dark:bg-brand-steel border border-gray-200 dark:border-brand-border flex items-center justify-center text-gray-400 dark:text-brand-muted"><ImageIcon size={16}/></div>
                      }
                    </td>
                    <td className="p-4 font-medium text-gray-900 dark:text-white">{p.name || '-'}</td>
                    <td className="p-4 text-gray-600 dark:text-brand-light capitalize text-sm">{p.product_type || '-'}</td>
                    <td className="p-4 text-gray-600 dark:text-brand-light capitalize text-sm">{p.machine_type || '-'}</td>
                    <td className="p-4 text-gray-600 dark:text-brand-light text-sm">{p.material || '-'}</td>
                    <td className="p-4">
                      {p.is_featured ? <span className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded text-xs font-bold uppercase tracking-wider border border-green-200 dark:border-green-800">Yes</span> : <span className="text-gray-400 dark:text-brand-muted text-xs font-mono">No</span>}
                    </td>
                    <td className="p-4 text-right pr-6">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleEdit(p)} className="p-2 border border-gray-200 dark:border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300 dark:text-brand-light dark:hover:bg-brand-steel dark:hover:text-white rounded-lg transition-all" title="Edit"><Edit2 size={16}/></button>
                        <button onClick={() => handleDelete(p.id)} className="p-2 border border-gray-200 dark:border-transparent text-gray-500 hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:text-brand-muted dark:hover:bg-red-500/20 dark:hover:text-red-400 rounded-lg transition-all" title="Delete"><Trash2 size={16}/></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

function QuoteRequestsManager() {
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [expandedRow, setExpandedRow] = useState(null)

  useEffect(() => { fetchQuotes() }, [])

  const fetchQuotes = async () => {
    setLoading(true)
    const { data } = await supabase.from('quote_requests').select('*').order('created_at', { ascending: false })
    if (data) setQuotes(data)
    setLoading(false)
  }

  const handleStatusCycle = async (id, currentStatus) => {
    const statusCycle = {
      'pending': 'responded',
      'responded': 'closed',
      'closed': 'pending'
    }
    const newStatus = statusCycle[currentStatus] || 'pending'
    const statusUpdatedAt = new Date().toISOString()
    
    // Optimistic UI update
    setQuotes(quotes.map(q => q.id === id ? { ...q, status: newStatus, status_updated_at: statusUpdatedAt } : q))
    await supabase.from('quote_requests').update({ status: newStatus, status_updated_at: statusUpdatedAt }).eq('id', id)
  }

  const renderStatusBadge = (id, status) => {
    const s = status || 'pending'
    const onClick = () => handleStatusCycle(id, s)
    
    if (s === 'responded') return <span onClick={onClick} className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:opacity-80 active:scale-95 transition-all select-none">Responded</span>
    if (s === 'closed') return <span onClick={onClick} className="bg-gray-200 text-gray-600 dark:bg-gray-800 dark:text-gray-400 border border-gray-300 dark:border-gray-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:opacity-80 active:scale-95 transition-all select-none">Closed</span>
    return <span onClick={onClick} className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 border border-yellow-200 dark:border-yellow-800 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider cursor-pointer hover:opacity-80 active:scale-95 transition-all select-none">Pending</span>
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="bg-white dark:bg-brand-card rounded-xl border border-gray-200 dark:border-brand-border overflow-x-auto shadow-sm dark:shadow-xl transition-colors">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="bg-gray-50 dark:bg-brand-steel/80 border-b border-gray-200 dark:border-brand-border font-mono text-xs uppercase tracking-widest text-gray-500 dark:text-brand-muted">
              <th className="p-4 pl-6 w-32">Date</th>
              <th className="p-4">Client Name</th>
              <th className="p-4">Company</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Product Interest</th>
              <th className="p-4">Machine Type</th>
              <th className="p-4">Quantity</th>
              <th className="p-4 text-center pr-6">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-brand-border">
            {loading && <tr><td colSpan="9" className="text-center p-12"><Loader2 className="animate-spin mx-auto text-yellow-400" size={30}/></td></tr>}
            {!loading && quotes.length === 0 && <tr><td colSpan="9" className="text-center p-12 text-gray-500 dark:text-brand-muted font-mono">No quote requests found.</td></tr>}
            
            {!loading && quotes.map(q => (
              <tr key={q.id} className="hover:bg-gray-50 dark:hover:bg-brand-steel/30 transition-colors group">
                <td className="p-4 pl-6 text-gray-600 dark:text-brand-light text-sm font-mono whitespace-nowrap">{new Date(q.created_at).toLocaleDateString()}</td>
                <td className="p-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">{q.client_name || '-'}</td>
                <td className="p-4 text-gray-600 dark:text-brand-light text-sm">{q.company_name || '-'}</td>
                <td className="p-4"><a href={`mailto:${q.email}`} className="text-yellow-600 dark:text-yellow-400 hover:underline text-sm">{q.email}</a></td>
                <td className="p-4"><a href={`tel:${q.phone}`} className="text-gray-600 dark:text-brand-light text-sm hover:underline">{q.phone || '-'}</a></td>
                <td className="p-4 text-gray-600 dark:text-brand-light text-sm">{q.product_interest || '-'}</td>
                <td className="p-4 text-gray-600 dark:text-brand-light text-sm capitalize">{q.machine_type || '-'}</td>
                <td className="p-4 text-gray-600 dark:text-brand-light text-sm">{q.quantity || '-'}</td>
                <td className="p-4 text-center pr-6 cursor-pointer">
                  {renderStatusBadge(q.id, q.status)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Expandable Message View for active rows - handled by clicking anywhere doesn't fit table well, let's just make it expand below */}
      {!loading && quotes.length > 0 && (
         <div className="text-sm text-gray-500 dark:text-brand-muted font-mono italic px-2">
            * Note: To view full messages, we display them when you click a row, or you can check the specific quote requirements below.
         </div>
      )}
      
      {/* Additional full-width message blocks for quotes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quotes.filter(q => q.message).map(q => (
          <div key={`msg-${q.id}`} className="bg-white dark:bg-brand-card p-5 rounded-lg border border-gray-200 dark:border-brand-border shadow-sm transition-colors">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {q.client_name} <span className="font-normal text-xs text-gray-500 dark:text-brand-muted">({new Date(q.created_at).toLocaleDateString()})</span>
              </h3>
              <div className="flex flex-col items-end gap-1">
                {renderStatusBadge(q.id, q.status)}
                {q.status_updated_at && <span className="text-[10px] text-gray-400 dark:text-brand-muted">Status updated: {new Date(q.status_updated_at).toLocaleDateString()}</span>}
              </div>
            </div>
            <p className="text-gray-700 dark:text-brand-light text-sm leading-relaxed whitespace-pre-wrap">{q.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
