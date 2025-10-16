import { useEffect, useRef, useState } from 'react';

// eslint-disable-next-line
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
    <>
      {/* Hero Section */}
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

      <div className="pattern divider"></div>
    </>
  );
}
