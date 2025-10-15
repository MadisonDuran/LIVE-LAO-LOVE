import React, { useState } from "react";

const images = [
  "/Images/lao-coffee.jpg",
  "/Images/sticky-rice.jpg",
  "/Images/sinh-skirt.jpg"
];

export default function Home() {
  const [idx, setIdx] = useState(0);

  function next() {
    setIdx((idx + 1) % images.length);
  }
  function prev() {
    setIdx((idx - 1 + images.length) % images.length);
  }

  return (
    <div>
      <h2>Welcome to Live Lao Love!</h2>
      <div className="slider">
        <button onClick={prev}>‹</button>
        <img src={images[idx]} alt="Featured" style={{ width: "300px" }} />
        <button onClick={next}>›</button>
      </div>
      <p>Bringing the Heart of Laos to Your Home.</p>
    </div>
  );
}