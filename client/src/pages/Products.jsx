import { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:5000'; // 👈 point directly at your API

export default function Products() {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('idle'); // 'loading' | 'error' | 'success'
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(false);

  const clearFilters = () => {
    setType('');
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setStatus('loading');
        setLoading(true);
        const res = await fetch('/products');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setItems(data);
        setStatus('success');
      } catch (err) {
        console.error('Fetch products failed:', err);
        setStatus('error');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter items based on selected type
  const filteredItems = type ? items.filter(item => item.product_type === type) : items;

  if (status === 'loading') return <p>Loading products…</p>;
  if (status === 'error') return <p>Couldn't load products. Check API.</p>;

  return (
    <>
      <header>
        <h1>Our Products</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      <div className="pattern-divider"></div>

      <div className="filters">
        <button onClick={clearFilters}>All</button>
        <button onClick={() => setType('food')}>Food</button>
        <button onClick={() => setType('clothing')}>Clothing</button>
        <button onClick={() => setType('handicrafts')}>Handicrafts</button>
        <button onClick={() => setType('home_decor')}>Home & Decor</button>
        <button onClick={() => setType('modern_merch')}>Modern Merchandise</button>
      </div>

      <div id="product-list">
        {loading && <p style={{ color: 'goldenrod' }}>Loading products...</p>}
        {filteredItems.map(item => (
          <div key={item.id} className="product-card">
            <img src={item.imageUrl} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <strong>${item.price}</strong>
          </div>
        ))}
      </div>
    </>
  );
}