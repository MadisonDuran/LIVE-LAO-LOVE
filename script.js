'use strict'

let products = [];

const inHtmlFolder = decodeURIComponent(location.pathname).includes('HTML files');
location.pathname.includes('/HTML%20files/')
const BASE = inHtmlFolder ? '../' : './';

// Fetch products from JSON
fetch(`${BASE}products.json`)
  .then(res => res.json())
  .then(data => {
    products = data;
    displayProducts(products);
  })
  .catch(err => console.error('Error loading products:', err));

  // Display products dynamically 
  function displayProducts(productList) {
    const container = document.getElementById('product-list');
    if (!container) return;
    container.innerHTML = "";
    productList.forEach(p => {
        container.innerHTML += `
        <div class="product-card">
          <img src="${BASE}/Images/${p.image}" alt="${p.name}">
          <h3>${p.name}</h3>
          <p>${p.description}</p>
          <strong>$${p.price}</strong>
          </div>
        `;
    });
  }

  function filterProducts(category) {
    if (category === 'All') {
        displayProducts(products);
    } else {
      const filtered = products.filter(p => p.category.toLowerCase().includes(category.toLowerCase())
    );
      displayProducts(filtered);
    }
  }