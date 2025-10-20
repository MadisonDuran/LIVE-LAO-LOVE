import { useState, useEffect, useRef } from 'react';

const products = [
  { img: '/Images/lao-coffee.jpg', name: 'Paksong Lao Coffee', price: 19.90 },
  { img: '/Images/sticky-rice.jpg', name: 'Sticky Rice Pack', price: 19.99 },
  { img: '/Images/sinh-skirt.jpg', name: 'Traditional Sinh Skirt', price: 39.99 },
];

export default function Home() {
  const [index, setIndex] = useState(0); // <-- use index
  const timerRef = useRef(null);

  // Auto-advance every 3.5s
  useEffect(() => {
    startTimer();
    return stopTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % products.length);
    }, 3500);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const prev = () => setIndex((i) => (i - 1 + products.length) % products.length);
  const next = () => setIndex((i) => (i + 1) % products.length);

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

      {/* FEATURED PRODUCTS - SLIDER */}
      <section className="featured">
        <h2>Featured Products</h2>

        {/* Slider wrapper */}
        <div
          className="featured-slider"
          onMouseEnter={stopTimer}
          onMouseLeave={startTimer}
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 16,
            boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
            maxWidth: 980,
            margin: '0 auto',
            background: '#fff',
          }}
        >
          {/* Track */}
          <div
            style={{
              display: 'flex',
              width: `${products.length * 100}%`,
              transform: `translateX(-${index * (100 / products.length)}%)`,
              transition: 'transform 500ms ease',
            }}
          >
            {products.map((p, i) => (
              <div
                key={i}
                style={{
                  minWidth: `${100 / products.length}%`,
                  padding: 24,
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 24,
                  alignItems: 'center',
                }}
              >
                <img
                  src={p.img}
                  alt={p.name}
                  style={{
                    width: '100%',
                    height: 340,
                    objectFit: 'cover',
                    borderRadius: 12,
                  }}
                  draggable={false}
                />
                <div className="card" style={{ boxShadow: 'none', border: 'none' }}>
                  <h3 style={{ margin: 0 }}>{p.name}</h3>
                  <p style={{ marginTop: 8 }}>${p.price.toFixed(2)}</p>
                  <button
                    style={{
                      marginTop: 12,
                      padding: '10px 14px',
                      borderRadius: 10,
                      border: '1px solid #111',
                      background: '#111',
                      color: '#fff',
                      cursor: 'pointer',
                    }}
                    onClick={() => alert(`Added "${p.name}" to cart (demo)`)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Prev / Next */}
          <button
            aria-label="Previous"
            onClick={prev}
            style={navBtnStyle('left')}
          >
            ‹
          </button>
          <button
            aria-label="Next"
            onClick={next}
            style={navBtnStyle('right')}
          >
            ›
          </button>

          {/* Dots */}
          <div
            style={{
              position: 'absolute',
              bottom: 10,
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
              gap: 8,
            }}
          >
            {products.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  border: 'none',
                  background: i === index ? '#111' : '#cfcfcf',
                  cursor: 'pointer',
                }}
              />
            ))}
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

// Small helper for the nav buttons (inline styles so no extra CSS file needed)
function navBtnStyle(side) {
  return {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    [side]: 8,
    width: 40,
    height: 40,
    borderRadius: '50%',
    border: 'none',
    background: 'rgba(0,0,0,0.6)',
    color: '#fff',
    fontSize: 24,
    lineHeight: '40px',
    cursor: 'pointer',
  };
}
