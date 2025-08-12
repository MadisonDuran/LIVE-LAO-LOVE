'use strict' // Enforces strict mode for cleaner, more secure JavaScript

// Store all products from the JSON file here
let products = []; // Initialize an empty array to hold product data

// Determine the base path for fetching resources
const inHtmlFolder = decodeURIComponent(location.pathname).includes('HTML_files');  
// Check if the current path includes 'HTML files' to set the base path correctly
location.pathname.includes('/HTML%20files/') // Check for URL encoding of 'HTML files' to ensure compatibility
const BASE = inHtmlFolder ? '../' : './'; 
// Set the base path to one level up if in 'HTML files' folder, otherwise stay in the current directory

// Fetch products from the JSON file
fetch(`${BASE}products.json`) // Use the base path to locate the JSON file
  .then(res => res.json()) // Convert the JSON response into a JavaScript object
  .then(data => { // Process the fetched data
    products = data; // Save the product list to our 'products' variable
    displayProducts(products); // Show all products on page load
  })
  .catch(err => console.error('Error loading products:', err)); // Log any errors

  // Function to display products dynamically
  function displayProducts(productList) { // Takes an array of products and renders them in the HTML
    const container = document.getElementById('product-list'); // Find where products will be displayed
    if (!container) return; // Stop if container is not found (prevents errors)
    container.innerHTML = "";  // Clear any existing content in the container
    // Loop through each product and create HTML elements
    productList.forEach(p => { // For each product in the list
      // Create a product card with image, name, description, and price
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

  // Function to filter products by category
  function filterProducts(category) { // Takes a category string and filters the products
    if (category === 'All') {
      // Show all products if 'All' is selected
      displayProducts(products);
    } else {
      // Filter products so only matching categories are shown
      const filtered = products.filter(p => p.category.toLowerCase().includes(category.toLowerCase())); // Case-insensitive filter
      // Display the filtered products
      displayProducts(filtered);
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    // Clear previous errors
    form.querySelectorAll('.contact-form__error').forEach(el => el.textContent = '');

    let valid = true;

    // First Name validation
    const firstName = form.querySelector('#firstName');
    if (!firstName.value.trim()) {
      showError(firstName, 'Please enter your first name.');
      valid = false;
    }

    // Last Name validation
    const lastName = form.querySelector('#lastName');
    if (!lastName.value.trim()) {
      showError(lastName, 'Please enter your last name.');
      valid = false;
    }

    // Email validation
    const email = form.querySelector('#email');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim()) {
      showError(email, 'Please enter your email.');
      valid = false;
    } else if (!emailPattern.test(email.value.trim())) {
      showError(email, 'Please enter a valid email address.');
      valid = false;
    }

    // Message validation
    const message = form.querySelector('#message');
    if (!message.value.trim()) {
      showError(message, 'Please enter your message.');
      valid = false;
    }

    // Country validation
    const country = form.querySelector('#country');
    if (!country.value.trim()) {
      showError(country, 'Please enter your country.');
      valid = false;
    }

    if (!valid) e.preventDefault();
  });

  function showError(input, message) {
    let error = input.parentElement.querySelector('.contact-form__error');
    if (error) {
      error.textContent = message;
      error.style.color = 'red';
      error.style.fontSize = '0.95em';
    }
  }
});