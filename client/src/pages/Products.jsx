// client/src/pages/Products.js
import React, { useCallback, useEffect, useState } from 'react';

let API_BASE = process.env.REACT_APP_API_URL;
if (!API_BASE && typeof import.meta !== 'undefined' && import.meta.env) {
  API_BASE = import.meta.env.VITE_API_URL;
}
API_BASE = API_BASE || 'http://localhost:3000';

export default function Products() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  // filters
  const [type, setType] = useState('');
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [q, setQ] = useState('');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setErr('');
    try {
      const params = new URLSearchParams();
      if (type) params.set('type', type);
      if (min) params.set('min', min);
      if (max) params.set('max', max);
      if (q)   params.set('q', q);

      const res = await fetch(`${API_BASE}/api/products?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setErr('Failed to load products. Please try again.');
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [type, min, max, q]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const clearFilters = () => {
    setType('');
    setMin('');
    setMax('');
    setQ('');
  };

  return (
    <div className="products-page" style={{ padding: '1rem', maxWidth: 1100, margin: '0 auto' }}>
      <h2 style={{ marginBottom: '0.75rem' }}>Products</h2>

      <div className="filters" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 180px 120px 120px auto auto',
        gap: '0.75rem',
        margin: '1rem 0'
      }}>
        <input
          placeholder="Search…"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          aria-label="Search products"
        />

        <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Product type">
          <option value="">All Types</option>
          <option value="Paksong Lao Coffee">Food</option>
          <option value="Sticky Rice Pack">Food</option>
          <option value="Jeow Bong Chili Paste">Food</option>
          <option value="Sinh Traditional Skirt">Clothing</option>
          <option value="Handmade Silver Bangle">Clothing</option>
          <option value="Lao Silk Scarf">Clothing</option>
          <option value="Bamboo Basket">Handicrafts</option>
          <option value="Khaen Instrument">Handicrafts</option>
          <option value="Lao Textile Wall Hanging">Home & decor</option>
          <option value="Ceramic Lao Bowl Set">Home & decor</option>
          <option value="Temple inspired Candle">Home & decor</option>
          <option value="Lao Tote Bag">Modern Merchandise</option>
        </select>

        <input
          type="number"
          placeholder="Min $"
          value={min}
          onChange={(e) => setMin(e.target.value)}
          aria-label="Min price"
        />
        <input
          type="number"
          placeholder="Max $"
          value={max}
          onChange={(e) => setMax(e.target.value)}
          aria-label="Max price"
        />

        <button onClick={fetchProducts} disabled={loading} aria-label="Apply filters">
          {loading ? 'Loading…' : 'Apply'}
        </button>
        <button type="button" onClick={clearFilters} disabled={loading}>
          Clear
        </button>
      </div>

      {err && (
        <div role="alert" style={{ color: '#b00020', marginBottom: '0.75rem' }}>
          {err}
        </div>
      )}

      <div
        className="grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem'
        }}
      >
        {items.map((p) => (
          <div
            key={p.id}
            className="card"
            style={{
              border: '1px solid #eee',
              borderRadius: 16,
              padding: '.75rem'
            }}
          >
            <img
              src={p.image_url}
              alt={p.name}
              loading="lazy"
              style={{
                width: '100%',
                height: 180,
                objectFit: 'cover',
                borderRadius: 12,
                background: '#f7f7f7'
              }}
              onError={(e) => {
                // fallback: if an image path breaks, hide it
                e.currentTarget.style.display = 'none';
              }}
            />
            <h3 style={{ margin: '.5rem 0' }}>{p.name}</h3>
            <p style={{ opacity: 0.85, minHeight: 48 }}>{p.description}</p>
            <div className="meta" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="price" style={{ fontWeight: 700 }}>
                ${Number(p.price).toFixed(2)}
              </span>
              <span
                className="pill"
                style={{
                  fontSize: '.75rem',
                  opacity: 0.75,
                  border: '1px solid #ddd',
                  padding: '2px 8px',
                  borderRadius: 999
                }}
              >
                {p.product_type}
              </span>
            </div>
          </div>
        ))}

        {!loading && items.length === 0 && !err && (
          <div style={{ gridColumn: '1 / -1', opacity: 0.7 }}>
            No products found. Try adjusting your filters.
          </div>
        )}
      </div>

      <div className="featured-grid">
        <div className="card">
          <img src="/Images/lao-coffee.jpg" alt="Lao Coffee" />
          <h3>Paksong Lao Coffee</h3>
          <p>$19.90</p>
        </div>
      </div>

      {/* simple responsive tweaks without touching your global CSS */}
      <style>{`
        @media (max-width: 1024px){
          .grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 768px){
          .filters { grid-template-columns: 1fr 1fr !important; }
          .grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px){
          .grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}