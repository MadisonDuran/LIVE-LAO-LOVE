import { useState, useEffect } from 'react';

const slides = [
  '/Images/lao-coffee.jpg',
  '/Images/sticky-rice.jpg',
  '/Images/sinh-skirt.jpg'
];

export default function Home() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
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
        {/* SLIDER */}
        <div className="slider" style={{
          width: '100%',
          height: '300px',
          background: `url(${slides[index]}) center/cover no-repeat`,
          marginBottom: 32,
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 8
          }}>
            {slides.map((_, i) => (
              <button
                key={i}
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  border: 'none',
                  background: i === index ? '#FFD700' : '#fff',
                  opacity: i === index ? 1 : 0.5,
                  cursor: 'pointer'
                }}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
        {/* PRODUCT CARDS */}
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
