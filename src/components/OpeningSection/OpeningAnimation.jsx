// OpeningAnimation.jsx
import React from "react";
import "./OpeningAnimation.css"; 

export default function OpeningAnimation() {
  return (
    <section className="opening-section">
      <div className="opening-title">

        <div className="welcome-wrapper">
          <div className="word-welcome">Welcome</div>
        </div>

        <div className="word-to">to</div>
        <div className="word-name">Guangdong</div>

        <div className="word-portfolio">
          {["P","o","r","t","f","o","l","i","o"].map((letter, index) => (
            <span key={index} style={{ "--i": index + 1 }}>{letter}</span>
          ))}
        </div>

      </div>
    </section>
  );
}