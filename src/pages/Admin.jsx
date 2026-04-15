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

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) return <div style={styles.center}><Loader2 className="spinner" size={40} /></div>

  if (!session) {
    return <Login />
  }

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
    <div style={styles.loginPage}>
      <form onSubmit={handleLogin} style={styles.loginCard}>
        <h1 style={styles.loginTitle}>Admin Login</h1>
        {error && <div style={styles.errorBanner}>{error}</div>}
        <input 
          type="email" placeholder="Email" required style={styles.input}
          value={email} onChange={e => setEmail(e.target.value)}
        />
        <input 
          type="password" placeholder="Password" required style={styles.input}
          value={password} onChange={e => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading} style={styles.btnSolid}>
          {loading ? <Loader2 className="spinner" size={20} /> : 'Login as Admin'}
        </button>
      </form>
      <style>{`.spinner { animation: spin 1s linear infinite; } @keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

function Dashboard() {
  const [activeTab, setActiveTab] = useState('products')

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div style={styles.dashboard}>
      <header style={styles.dashHeader}>
        <div style={styles.dashHeaderContent}>
          <h1 style={{ fontFamily: 'var(--font-display)', margin: 0 }}>Kushwaha Group — Admin Panel</h1>
          <button onClick={handleLogout} style={styles.btnLogout}><LogOut size={16}/> Logout</button>
        </div>
      </header>

      <div style={styles.tabs}>
        <button 
          style={activeTab === 'products' ? styles.tabActive : styles.tab} 
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button 
          style={activeTab === 'quotes' ? styles.tabActive : styles.tab} 
          onClick={() => setActiveTab('quotes')}
        >
          Quote Requests
        </button>
      </div>

      <div style={styles.content}>
        {activeTab === 'products' ? <ProductsManager /> : <QuoteRequestsManager />}
      </div>
    </div>
  )
}

// --- PRODUCTS MANAGER ---
function ProductsManager() {
  const [products, setProducts] = useState([])
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState(null)
  
  // Form state
  const [formData, setFormData] = useState({
    name: '', product_type: 'screw', machine_type: 'injection',
    material: '', diameter_range: '', ld_ratio: '', description: '', is_featured: false
  })
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
    setFormData({
      name: p.name, product_type: p.product_type, machine_type: p.machine_type,
      material: p.material || '', diameter_range: p.diameter_range || '', 
      ld_ratio: p.ld_ratio || '', description: p.description || '', is_featured: p.is_featured
    })
    setExistingImage(p.image_url || '')
    setFile(null)
    
    if (p.specifications) {
      const parsed = typeof p.specifications === 'string' ? JSON.parse(p.specifications) : p.specifications
      setSpecKeys(Object.keys(parsed).join(','))
      setSpecVals(Object.values(parsed).join(','))
    } else {
      setSpecKeys('')
      setSpecVals('')
    }
    setFormOpen(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure? This cannot be undone.')) return
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
        if (file.size > 2 * 1024 * 1024) throw new Error('Image must be under 2MB.')
        if (!['image/jpeg','image/png','image/webp'].includes(file.type)) throw new Error('Only JPG, PNG or WEBP allowed.')

        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const { error: uploadError } = await supabase.storage.from('product-images').upload(fileName, file)
        if (uploadError) throw uploadError
        
        const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(fileName)
        finalImageUrl = publicUrl
      }

      // Parse specs
      let specs = {}
      const keys = specKeys.split(',').map(k => k.trim()).filter(Boolean)
      const vals = specVals.split(',').map(v => v.trim())
      keys.forEach((k, i) => { if (vals[i]) specs[k] = vals[i] })

      const payload = {
        ...formData,
        specifications: specs,
        image_url: finalImageUrl
      }

      if (editingId) {
        const { error: updateError } = await supabase.from('products').update(payload).eq('id', editingId)
        if (updateError) throw updateError
      } else {
        const { error: insertError } = await supabase.from('products').insert([payload])
        if (insertError) throw insertError
      }

      setFormOpen(false)
      fetchProducts()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {!formOpen && (
        <div style={{ marginBottom: '20px' }}>
          <button style={styles.btnSolid} onClick={() => {
            setEditingId(null); setFile(null); setExistingImage(''); setSpecKeys(''); setSpecVals('');
            setFormData({ name: '', product_type: 'screw', machine_type: 'injection', material: '', diameter_range: '', ld_ratio: '', description: '', is_featured: false })
            setFormOpen(true)
          }}>
            <Plus size={16}/> Add New Product
          </button>
        </div>
      )}

      {formOpen && (
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
          {error && <div style={styles.errorBanner}>{error}</div>}
          <form onSubmit={handleSubmit} style={styles.formGrid}>
            <input placeholder="Product Name *" required style={styles.input} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <select style={styles.input} value={formData.product_type} onChange={e => setFormData({...formData, product_type: e.target.value})}>
              <option value="screw">Screw</option><option value="barrel">Barrel</option>
            </select>
            <select style={styles.input} value={formData.machine_type} onChange={e => setFormData({...formData, machine_type: e.target.value})}>
              <option value="injection">Injection</option><option value="extrusion">Extrusion</option>
              <option value="blow_moulding">Blow Moulding</option><option value="custom">Custom</option>
            </select>
            <input placeholder="Material (e.g. EN41B)" style={styles.input} value={formData.material} onChange={e => setFormData({...formData, material: e.target.value})} />
            <input placeholder="Diameter Range (e.g. 20-300mm)" style={styles.input} value={formData.diameter_range} onChange={e => setFormData({...formData, diameter_range: e.target.value})} />
            <input placeholder="L/D Ratio (e.g. Up to 36:1)" style={styles.input} value={formData.ld_ratio} onChange={e => setFormData({...formData, ld_ratio: e.target.value})} />
            <textarea placeholder="Description" style={{...styles.input, gridColumn: '1 / -1'}} rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            
            <div style={{ gridColumn: '1 / -1' }}>
              <label style={styles.label}>Specifications (Comma separated keys and values mapping)</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input placeholder="Keys: Flight Depth, Root Dia, RPM" style={{...styles.input, flex: 1}} value={specKeys} onChange={e => setSpecKeys(e.target.value)} />
                <input placeholder="Values: 4mm, 50mm, 300" style={{...styles.input, flex: 1}} value={specVals} onChange={e => setSpecVals(e.target.value)} />
              </div>
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={styles.label}>Image Upload (Max 2MB, JPG/PNG/WEBP)</label>
              {existingImage && <div style={{marginBottom: '10px'}}><img src={existingImage} style={{height: '60px'}} alt="Current"/></div>}
              <input type="file" accept="image/jpeg, image/png, image/webp" onChange={e => setFile(e.target.files[0])} style={styles.input}/>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', gridColumn: '1 / -1' }}>
              <input type="checkbox" checked={formData.is_featured} onChange={e => setFormData({...formData, is_featured: e.target.checked})} />
              Is Featured
            </label>

            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '10px' }}>
              <button type="submit" disabled={loading} style={styles.btnSolid}>{loading ? 'Saving...' : 'Save Product'}</button>
              <button type="button" onClick={() => setFormOpen(false)} style={styles.btnOutline}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Image</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Machine / Type</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td style={styles.td}>
                {p.image_url ? <img src={p.image_url} style={{width: '40px', height: '40px', objectFit:'cover', borderRadius:'4px'}} /> : <ImageIcon color="#ccc"/>}
              </td>
              <td style={styles.td}><strong>{p.name}</strong></td>
              <td style={styles.td}>{p.machine_type} {p.product_type}</td>
              <td style={styles.td}>
                <button onClick={() => handleEdit(p)} style={styles.iconBtn}><Edit2 size={16} color="var(--color-navy)"/></button>
                <button onClick={() => handleDelete(p.id)} style={styles.iconBtn}><Trash2 size={16} color="red"/></button>
              </td>
            </tr>
          ))}
          {products.length === 0 && <tr><td colSpan="4" style={{textAlign:'center', padding:'20px'}}>No products found.</td></tr>}
        </tbody>
      </table>
    </div>
  )
}

// --- QUOTE REQUESTS MANAGER ---
function QuoteRequestsManager() {
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  
  // Pagination & Search
  const [page, setPage] = useState(0)
  const LIMIT = 20
  const [search, setSearch] = useState('')
  const [expandedRow, setExpandedRow] = useState(null)

  useEffect(() => {
    fetchQuotes()
  }, [page, search])

  const fetchQuotes = async () => {
    setLoading(true)
    let query = supabase
      .from('quote_requests')
      .select('*')
      .order('created_at', { ascending: false })
      .range(page * LIMIT, (page + 1) * LIMIT - 1)

    if (search) {
      query = query.or(`client_name.ilike.%${search}%,email.ilike.%${search}%`)
    }

    const { data } = await query
    if (data) setQuotes(data)
    setLoading(false)
  }

  const handleStatusChange = async (id, newStatus) => {
    await supabase.from('quote_requests').update({ status: newStatus }).eq('id', id)
    fetchQuotes()
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <input 
          type="text" 
          placeholder="Search name or email..." 
          style={{...styles.input, width: '300px', marginBottom: 0}}
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(0); }}
        />
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button disabled={page === 0} onClick={() => setPage(page - 1)} style={styles.btnOutline}><ChevronLeft size={16}/></button>
          <span>Page {page + 1}</span>
          <button disabled={quotes.length < LIMIT} onClick={() => setPage(page + 1)} style={styles.btnOutline}><ChevronRight size={16}/></button>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Client</th>
              <th style={styles.th}>Contact</th>
              <th style={styles.th}>Product / Machine</th>
              <th style={styles.th}>Message</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? <tr><td colSpan="6" style={{textAlign:'center', padding:'20px'}}>Loading...</td></tr> : null}
            {!loading && quotes.length === 0 && <tr><td colSpan="6" style={{textAlign:'center', padding:'20px'}}>No quote requests yet.</td></tr>}
            {!loading && quotes.map(q => (
              <tr key={q.id}>
                <td style={styles.td}>{new Date(q.created_at).toLocaleDateString()}</td>
                <td style={styles.td}>
                  <strong>{q.client_name}</strong><br/>
                  <span style={{ fontSize:'0.8rem', color:'var(--color-steel)' }}>{q.company_name}</span>
                </td>
                <td style={styles.td}>
                  <a href={`mailto:${q.email}`}>{q.email}</a><br/>
                  <a href={`tel:${q.phone}`}>{q.phone}</a>
                </td>
                <td style={styles.td}>
                  {q.product_interest}<br/>
                  <span style={{ fontSize:'0.8rem', color:'var(--color-steel)' }}>{q.machine_type} | Qty: {q.quantity}</span>
                </td>
                <td style={styles.td}>
                  {q.message && q.message.length > 50 && expandedRow !== q.id ? (
                    <span>{q.message.substring(0, 50)}... <button onClick={() => setExpandedRow(q.id)} style={styles.linkBtn}>Read more</button></span>
                  ) : (
                    <span>{q.message} {expandedRow === q.id && <button onClick={() => setExpandedRow(null)} style={styles.linkBtn}>Less</button>}</span>
                  )}
                </td>
                <td style={styles.td}>
                  <select 
                    value={q.status || 'new'} 
                    onChange={e => handleStatusChange(q.id, e.target.value)}
                    style={{...styles.input, padding: '4px', fontSize: '0.85rem'}}
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

const styles = {
  center: { minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  loginPage: { minHeight: '100vh', backgroundColor: 'var(--color-navy)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  loginCard: { backgroundColor: '#fff', padding: '40px', borderRadius: '8px', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '16px' },
  loginTitle: { fontFamily: 'var(--font-display)', color: 'var(--color-navy)', fontSize: '2rem', textAlign: 'center', marginBottom: '10px' },
  errorBanner: { backgroundColor: '#FEE2E2', color: '#B91C1C', padding: '12px', borderRadius: '4px', fontSize: '0.9rem', textAlign: 'center' },
  input: { padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%', fontFamily: 'var(--font-body)', fontSize: '0.95rem' },
  btnSolid: { backgroundColor: 'var(--color-amber)', color: '#fff', padding: '12px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
  btnOutline: { backgroundColor: 'transparent', color: 'var(--color-navy)', padding: '10px 20px', border: '1px solid var(--color-border)', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 },
  iconBtn: { background: 'none', border: 'none', cursor: 'pointer', padding: '4px' },
  dashboard: { minHeight: '100vh', backgroundColor: 'var(--color-bg)' },
  dashHeader: { backgroundColor: 'var(--color-navy)', color: '#fff', padding: '20px' },
  dashHeaderContent: { maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  btnLogout: { background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
  tabs: { maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '1px', borderBottom: '1px solid var(--color-border)', paddingTop: '20px' },
  tab: { padding: '12px 24px', backgroundColor: 'transparent', border: 'none', borderBottom: '3px solid transparent', cursor: 'pointer', fontWeight: 600, color: 'var(--color-steel)', fontSize: '1rem' },
  tabActive: { padding: '12px 24px', backgroundColor: 'transparent', border: 'none', borderBottom: '3px solid var(--color-amber)', cursor: 'pointer', fontWeight: 600, color: 'var(--color-navy)', fontSize: '1rem' },
  content: { maxWidth: '1200px', margin: '40px auto', padding: '0 20px' },
  card: { backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: 'var(--shadow-card)', marginBottom: '30px' },
  cardTitle: { fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--color-navy)', marginBottom: '20px' },
  formGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' },
  label: { display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-steel)', marginBottom: '6px' },
  table: { width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', boxShadow: 'var(--shadow-card)', borderRadius: '8px', overflow: 'hidden' },
  th: { padding: '16px', textAlign: 'left', backgroundColor: 'var(--color-navy)', color: '#fff', fontWeight: 600, fontSize: '0.9rem' },
  td: { padding: '16px', borderBottom: '1px solid var(--color-border)', fontSize: '0.95rem', color: 'var(--color-navy)' },
  linkBtn: { background: 'none', border: 'none', color: 'var(--color-amber)', cursor: 'pointer', textDecoration: 'underline', padding: 0 }
}
