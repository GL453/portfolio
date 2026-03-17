import React from "react";
import "./Experience.css";


import CylinderCarousel from "../Cylinder/CylinderCarousel";
import Carousel3D from "../Carousel/Carousel3D";

export default function Experience() {
  return (
    <section className="experience">
      <div className="experience__container">

        {/* Title */}
        <div className="experience__header">
          <h3 className="experience__title">Professional Experience</h3>
        </div>

        {/* Item 1 */}
        <div className="experience__item">

          <div className="experience__content">
            <div className="experience__text">
              <h4 className="experience__role">
                <span>Frontend Developer Intern</span><br />
                <span className="experience__company">
                  — Intelura, London
                </span>
              </h4>

              <p className="experience__date">Jan 2026 – Present</p>

              <ul className="experience__desc">
                <li>Developed responsive web pages using HTML, Tailwind CSS, JavaScript, and React.</li>
                <li>Designed UI components and improved interaction flows.</li>
                <li>Delivered key frontend modules independently.</li>
                <li>Collaborated using Git and agile workflows.</li>
              </ul>
            </div>
          </div>

          {/* 替换为组件 */}
          <div className="experience__display">
            <CylinderCarousel />
          </div>

        </div>

        {/* Item 2 */}
        <div className="experience__item experience__item--reverse">

          {/* 替换为组件 */}
          <div className="experience__display">
            <Carousel3D />
          </div>

          <div className="experience__content experience__displayffh">
            <div className="experience__text">
              <h4 className="experience__role">
                <span>Marketing & Brand Assistant Intern</span><br />
                <span className="experience__company">
                  — Filming for Humanity, London
                </span>
              </h4>

              <p className="experience__date">Aug 2025 – Nov 2025</p>

              <ul className="experience__desc">
                <li>Conducted market research and brand positioning analysis.</li>
                <li>Supported digital marketing initiatives.</li>
                <li>Improved brand communication consistency.</li>
                <li>Worked collaboratively across teams.</li>
              </ul>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}