import { useEffect, useMemo, useState } from 'react';
import '../style.css';

export default function Products() {
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
        if (!cancelled) {
          // data received from server — not storing in local state per request
          console.debug('Products fetched:', Array.isArray(data) ? data.length : typeof data);
        }
      } catch (e) {
        console.error('Products load error:', e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [url]);

  const clearFilters = () => { setType(''); setMin(''); setMax(''); setQ(''); };

  return (
    <>
      <header>
        <h1>Our Products</h1>
        <nav>
          {/* Navigation menu */}
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/contact">Contact</a>
          {/* removed empty anchor to satisfy accessibility lint */}
        </nav>
      </header>

      {/* PATTERN DIVIDER */}
      {/* Decorative bar below the header */}
      <div className="pattern-divider"></div>

      {/* FILTER BUTTONS */}
      {/* Allows users to sort/filter products by category */}
      <div className="filters">
        {/* 'All' button resets to show all products */}
        <button onClick={clearFilters}>All</button>
        {/* Buttons for filtering specific product categories */}
        <button onClick={() => setType('food')}>Food</button>
        <button onClick={() => setType('clothing')}>Clothing</button>
        <button onClick={() => setType('handicrafts')}>Handicrafts</button>
        <button onClick={() => setType('home_decor')}>Home & Decor</button>
        <button onClick={() => setType('modern_merch')}>Modern Merchandise</button>
      </div>

      {/* PRODUCT GRID */}
      {/* Products will be dynamically added here using JavaScript */}
      <div id="product-list">
        {/* Placeholder text before products load */}
        {loading && <p style={{ color: 'goldenrod' }}>Loading products...</p>}
        {/* Products will load here dynamically with JS */}
      </div>
    </>
  );
}