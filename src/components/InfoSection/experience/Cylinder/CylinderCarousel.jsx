import React, { useEffect, useRef } from "react";
import "./CylinderCarousel.css";

export default function CylinderCarousel() {
  const containerRef = useRef(null);
  const cylinderRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const cylinder = cylinderRef.current;

    let rotation = 0;
    let velocity = 0;

    let isDragging = false;
    let startX = 0;
    let lastX = 0;

    /* ======================
       鼠标按下
    ====================== */
    const handleMouseDown = (e) => {
      isDragging = true;
      startX = e.clientX;
      lastX = e.clientX;
    };

    /* ======================
       鼠标移动
    ====================== */
    const handleMouseMove = (e) => {
      if (!isDragging) return;

      const delta = e.clientX - lastX;
      lastX = e.clientX;

      velocity = delta * 0.3;
      rotation += velocity;
    };

    /* ======================
       鼠标松开
    ====================== */
    const handleMouseUp = () => {
      isDragging = false;
    };

    /* ======================
       触摸支持
    ====================== */
    const handleTouchStart = (e) => {
      isDragging = true;
      startX = e.touches[0].clientX;
      lastX = startX;
    };

    const handleTouchMove = (e) => {
      if (!isDragging) return;

      const x = e.touches[0].clientX;
      const delta = x - lastX;
      lastX = x;

      velocity = delta * 0.3;
      rotation += velocity;
    };

    const handleTouchEnd = () => {
      isDragging = false;
    };

    /* ======================
       动画
    ====================== */
    const animate = () => {
      if (!isDragging) {
        velocity *= 0.95;
        rotation += velocity + 0.1;
      }

      if (cylinder) {
        cylinder.style.transform = `rotateY(${rotation}deg)`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    /* ======================
       绑定事件
    ====================== */
    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    container.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    /* ======================
       清理
    ====================== */
    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);

      container.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div className="carousel-container" ref={containerRef}>
      <div className="inner-container">
        <div className="cylinder" ref={cylinderRef}>

          <div className="card">
            <div className="face front">
              <img src="./images/portfolio/portfolio1.png" alt="portfolio" loading="lazy" />
            </div>
            <div className="face back">Portfolio</div>
          </div>

          <div className="card">
            <div className="face front">
              <img src="./images/portfolio/portfolio2.png" alt="portfolio" loading="lazy" />
            </div>
            <div className="face back">Portfolio</div>
          </div>

          <div className="card">
            <div className="face front">
              <img src="./images/portfolio/portfolio3.png" alt="portfolio" loading="lazy"/>
            </div>
            <div className="face back">Portfolio</div>
          </div>

          <div className="card">
            <div className="face front">
              <img src="./images/portfolio/portfolio4.png" alt="portfolio" loading="lazy"/>
            </div>
            <div className="face back">Portfolio</div>
          </div>

          <div className="card">
            <div className="face front">
              <img src="./images/portfolio/portfolio5.png" alt="portfolio" loading="lazy"/>
            </div>
            <div className="face back">Portfolio</div>
          </div>

          <div className="card">
            <div className="face front">
              <img src="./images/portfolio/portfolio6.png" alt="portfolio" loading="lazy"/>
            </div>
            <div className="face back">Portfolio</div>
          </div>

        </div>
      </div>
    </div>
  );
}