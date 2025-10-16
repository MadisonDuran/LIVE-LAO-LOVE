import { useEffect, useRef, useState } from 'react';

const slides = [
  '/Images/lao-coffee.jpg',
  '/Images/sticky-rice.jpg',
  '/Images/sinh-skirt.jpg'
];

export default function Home() {
  const [, setI] = useState(0);
  const timer = useRef();

  useEffect(() => {
    timer.current = setInterval(() => setI((n) => (n + 1) % slides.length), 4000);
    return () => clearInterval(timer.current);
  }, []);

  return (
    <div>
      <header className="main-header">
        <h1>Live Lao Love</h1>
        <nav>
          <a href="/">Home</a>
          <a href="/products">Products</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>
      <section className="hero">
        <video autoPlay muted loop playsInline className="hero-video">
          <source src="/Lao-Mekong-river.mp4" type="video/mp4" />
        </video>
        <div className="overlay"></div>
        <div className="hero-content">
          <h2>Live Lao Love</h2>
          <h3>Bringing the Heart of Laos to Your Home</h3>
          <a className="btn" href="/products">Explore Our Collection</a>
        </div>
      </section>
      <section className="featured">
        <h2>Featured Products</h2>
        <div className="featured-grid">
          <div className="card">
            <img src="/Images/lao-coffee.jpg" alt="Lao Coffee" />
            <h3>Paksong Lao Coffee</h3>
            <p>$19.90</p>
          </div>
          <div className="card">
            <img src="/Images/sticky-rice.jpg" alt="Sticky Rice" />
            <h3>Sticky Rice Pack</h3>
            <p>$19.99</p>
          </div>
          <div className="card">
            <img src="/Images/sinh-skirt.jpg" alt="Sinh Skirt" />
            <h3>Traditional Sinh Skirt</h3>
            <p>$39.99</p>
          </div>
        </div>
      </section>
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
