import React, { useEffect } from "react";
import "./AboutMe.css"; 

export default function AboutPage() {
  useEffect(() => {
    const texts = document.querySelectorAll(".info-text");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.4 }
    );

    texts.forEach((el) => observer.observe(el));

    return () => {
      texts.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="aboutpage">
      {/* header */}
      <div className="aboutme">
        <h3>About Me</h3>
      </div>

      {/* profile-header */}
      <div className="profile-header">
        {/* avatar */}
        <div className="profile-img">
          {/* Ellipses */}
          <div className="ellipses-wrapper">
            <div className="ellipses-container">
              <div className="ellipses ellipses__outer--thin">
                <div className="ellipses ellipses__orbit"></div>
              </div>
              <div className="ellipses ellipses__outer--thick"></div>
            </div>
          </div>
          {/* header img */}
          <div className="avatar-wrapper">
            <img className="avatar-img" src="/images/header.png" alt="header" />
          </div>
        </div>

        {/* profile msg */}
        <div className="profile-msg">
          <div className="profile-name">Guangdong Li</div>
          <div className="profile-contact">
            <div className="contact-item role">Front End Development</div>
            <div className="contact-item location">London, UK</div>
            <a href="tel:+447826307147" className="contact-item contact-link phone">
              +44 7826 307147
            </a>
            <a href="mailto:GL453@live.mdx.ac.uk" className="contact-item contact-link email">
              GL453@live.mdx.ac.uk
            </a>
          </div>
        </div>

        {/* plane svg */}
        <div className="planesvg">
          <img src="/favicon.svg" alt="plane" />
        </div>
      </div>

      {/* about text */}
      <div className="profile-info">
        <p className="info-text">
          I am a front-end developer who enjoys creating modern and engaging web experiences.
          I am passionate about technology and design, and I enjoy turning creative ideas into
          interactive websites. My goal is to continuously grow as a developer and build
          digital products that are both useful and visually appealing.
        </p>

        <p className="info-text">
          I am a curious and self-motivated person who values learning and improvement.
          I enjoy solving problems, exploring new technologies, and paying attention to
          details that enhance user experience. I believe that patience, creativity, and
          persistence are essential qualities for building high-quality web applications.
        </p>

        <p className="info-text info-footer">
          Thank you for taking the time to view my portfolio. I truly appreciate your interest
          in my work, and I hope my projects demonstrate my skills, passion, and dedication
          to front-end development.
        </p>
      </div>
    </section>
  );
}