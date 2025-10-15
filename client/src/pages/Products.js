import React, { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All");
  const [price, setPrice] = useState("All");

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // Filtering logic
  const filtered = products.filter(p => {
    const matchCategory = category === "All" || p.category === category;
    const matchPrice =
      price === "All" ||
      (price === "Under $20" && parseFloat(p.price) < 20) ||
      (price === "$20-$40" && parseFloat(p.price) >= 20 && parseFloat(p.price) <= 40) ||
      (price === "Over $40" && parseFloat(p.price) > 40);
    return matchCategory && matchPrice;
  });

  return (
    <div>
      <h2>Products</h2>
      <div>
        <label>
          Category:
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option>All</option>
            <option>Food</option>
            <option>Clothing</option>
            <option>Handicrafts</option>
            <option>Home & decor</option>
            <option>Modern Merchandise</option>
          </select>
        </label>
        <label>
          Price:
          <select value={price} onChange={e => setPrice(e.target.value)}>
            <option>All</option>
            <option>Under $20</option>
            <option>$20-$40</option>
            <option>Over $40</option>
          </select>
        </label>
      </div>
      <div className="product-list">
        {filtered.map((p, idx) => (
          <div className="product-card" key={idx}>
            <img src={`/Images/${p.image}`} alt={p.name} />
            <h3>{p.name}</h3>
            <strong>${p.price}</strong>
            <p>{p.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
