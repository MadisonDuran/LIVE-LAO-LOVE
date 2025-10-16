import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="pattern-bar"></div>
      <p>Sabaidee - Welcome to Lao Culture</p>
      <p>© 2025 Live Lao Love | Embrace Lao Heritage</p>
      <div className="footer__social">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <img src="/Images/Facebook-logo.jpg" alt="Facebook" />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <img src="/Images/Instagram.jpg" alt="Instagram" />
        </a>
        <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer">
          <img src="/Images/tiktok.jpg" alt="Tiktok" />
        </a>
      </div>
    </footer>
  );
}

