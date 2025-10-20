import { useState, useEffect } from 'react';

const slides = [
  '/Images/lao-coffee.jpg',
  '/Images/sticky-rice.jpg',
  '/Images/sinh-skirt.jpg'
];

export default function Home() {
  const [, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <header>
        <h1>Live Lao Love</h1>
        <nav>
          {/* Navigation menu */}
          <a href="/index">Home</a>
          <a href="/products">Products</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      {/* HERO SECTION */}
      {/* Large intro section with background video and welcome text */}
      <section className="hero">
        {/* Cultural video background */}
        <video autoPlay muted loop playsInline className="hero-video">
          <source src="../Lao-Mekong-river.mp4" type="video/mp4" />
        </video>

        {/* Dark overlay to make text readable on top of the video */}
        <div className="overlay" />

        {/* Hero content: Website title and call to action button */}
        <div className="hero-content">
          <h2>Live Lao Love</h2>
          <h3>Bringing the Heart of Laos to Your Home</h3>
          <a className="btn" href="/HTML_files/products.html">Explore Our Collection</a>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      {/* Highlights some products from the collection */}
      <section className="featured">
        <h2>Featured Products</h2>

        {/* Product Grid Layout */}
        <div className="featured-grid">
          {/* Product Card 1 */}
          <div className="card">
            <img src="/Images/lao-coffee.jpg" alt="Lao Coffee" />
            <h3>Paksong Lao Coffee</h3>
            <p>$19.90</p>
          </div>

          {/* Product Card 2 */}
          <div className="card">
            <img src="/Images/sticky-rice.jpg" alt="Sticky Rice" />
            <h3>Sticky Rice Pack</h3>
            <p>$19.99</p>
          </div>

          {/* Product Card 3 */}
          <div className="card">
            <img src="/Images/sinh-skirt.jpg" alt="Sinh Skirt" />
            <h3>Traditional Sinh Skirt</h3>
            <p>$39.99</p>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      {/* Short description of the store and it's mission */}
      <section className="about-section">
        <h2>About Live Lao Love</h2>
        <p>
          At Live Lao Love, we celebrate Lao heritage through food, fashion, and craft.
          Every product tells a story of tradition, culture, and the beauty of Laos.
          From handmade textiles to authentic flavors, we bring Laos to you.
        </p>
      </section>
    </div>
  );
}