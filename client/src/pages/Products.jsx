import { useEffect, useMemo, useState } from 'react';
import '../style.css';

const TYPE_OPTIONS = [
  { value: '', label: 'All Types' },
  { value: 'food', label: 'Food' },
  { value: 'clothing', label: 'Clothing' },
  { value: 'handicrafts', label: 'Handicrafts' },
  { value: 'home_decor', label: 'Home & Decor' },
  { value: 'modern_merch', label: 'Modern Merchandise' },
];

export default function Products() {
  const [items, setItems] = useState([]);
  const [type, setType] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);

  const url = useMemo(() => {
    const p = new URLSearchParams();
    if (type) p.set('type', type);
    if (min)  p.set('min', min);
    if (max)  p.set('max', max);
    if (q)    p.set('q', q);
    return p.toString() ? `/api/products?${p.toString()}` : '/api/products';
  }, [type, min, max, q]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(url, { credentials: 'omit', headers: { Accept: 'application/json' } });
        const text = await res.text();
        if (!res.ok) throw new Error(`HTTP ${res.status}: ${text}`);
        const data = JSON.parse(text);
        if (!cancelled) setItems(Array.isArray(data) ? data : []);
      } catch (e) {
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [url]);

  const clearFilters = () => { setType(''); setMin(''); setMax(''); setQ(''); };

  return (
    <div className="container">
      {/* HEADER */}
      <header>
        <h1>Our Products</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      {/* PATTERN DIVIDER */}
      <div className="pattern-divider"></div>

      {/* FILTER BUTTONS */}
      <div className="filters" style={{marginBottom: '16px'}}>
        <button type="button" onClick={clearFilters}>All</button>
        <button type="button" onClick={() => setType('food')}>Food</button>
        <button type="button" onClick={() => setType('clothing')}>Clothing</button>
        <button type="button" onClick={() => setType('handicrafts')}>Handicrafts</button>
        <button type="button" onClick={() => setType('home_decor')}>Home & Decor</button>
        <button type="button" onClick={() => setType('modern_merch')}>Modern Merchandise</button>
      </div>

      {/* FILTER FORM */}
      <form onSubmit={(e)=>e.preventDefault()} style={{display:'grid',gap:12,gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',marginBottom:16}}>
        <label>Type
          <select value={type} onChange={(e)=>setType(e.target.value)}>
            {TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </label>
        <label>Min $
          <input type="number" min="0" step="0.01" value={min} onChange={(e)=>setMin(e.target.value)} />
        </label>
        <label>Max $
          <input type="number" min="0" step="0.01" value={max} onChange={(e)=>setMax(e.target.value)} />
        </label>
        <label style={{gridColumn:'1 / -1'}}>Search
          <input type="text" value={q} onChange={(e)=>setQ(e.target.value)} placeholder="name or description" />
        </label>
        <button type="button" onClick={clearFilters}>Clear</button>
      </form>

      {/* PRODUCT GRID */}
      {loading && <p style={{color:'goldenrod'}}>Loading products...</p>}
      <div id="product-list" className="product-list">
        <div className="product-grid">
          {items.map(p => (
            <article key={p.id} className="product-card">
              <div className="product-image">
                <img
                  src={p.image_url}
                  alt={p.name}
                />
              </div>
              <div className="product-info">
                <h3>{p.name}</h3>
                <p>{p.description}</p>
                <div className="product-meta">
                  <strong>${Number(p.price).toFixed(2)}</strong>
                  <small>{p.product_type?.replace(/_/g,' ')}</small>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
