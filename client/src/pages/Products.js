import React, { useEffect, useState} from 'react';

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProducts(data));
    }, []);

    return (
        <div>
            <h2>Products</h2>
            <div className="product-list">
                {products.map((p, idx) => (
                    <div className="product-card" key={idx}>
                        <img src={p.image.replace('../Images/', '/Images/')} alt={p.name} />
                        <h3>{p.name}</h3>
                        <strong>${p.price}</strong>
                        <p>{p.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
