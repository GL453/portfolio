import React, { useEffect, useRef } from "react";
import styles from "./Orbit.module.css";
import BubblyButton from "./ButtonGlobal";

const OrbitSection = () => {
  const orbitWrapperRef = useRef(null);
  const btnWrapperRef = useRef(null);

  useEffect(() => {
    const wrapper = btnWrapperRef.current;
    const orbit = orbitWrapperRef.current;
    let hideTimeout;

    // 鼠标移入显示轨道
    const handleMouseEnter = () => {
      clearTimeout(hideTimeout);
      orbit.classList.add(styles.active);
    };

    // 鼠标移出延迟隐藏
    const handleMouseLeave = () => {
      hideTimeout = setTimeout(() => {
        orbit.classList.remove(styles.active);
      }, 200);
    };

    wrapper.addEventListener("mouseenter", handleMouseEnter);
    wrapper.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      wrapper.removeEventListener("mouseenter", handleMouseEnter);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const n = 6;
    const dotDeg = 360 / n;

    const createDots = (container, total, divisor) => {
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < total; i++) {
        const dot = document.createElement("div");
        dot.className = styles.dot;

        const angle = (i * dotDeg) / divisor;
        dot.style.transform = `rotate(${angle}deg)`;

        fragment.appendChild(dot);
      }
      container.appendChild(fragment);
    };

    const outer = orbitWrapperRef.current.querySelector(`.${styles.outer}`);
    const middle = orbitWrapperRef.current.querySelector(`.${styles.middle}`);
    const inner = orbitWrapperRef.current.querySelector(`.${styles.inner}`);

    createDots(outer, 18, 3);
    createDots(middle, 12, 2);
    createDots(inner, 6, 1);
  }, []);

  return (
    <section className={styles.startsec}>

      <div className={styles.container}>

       
          <div className={styles["orbit-wrapper"]} ref={orbitWrapperRef}>
            <div className={`${styles.outer} ${styles.orbit}`}>
              <div className={`${styles.middle} ${styles.orbit}`}>
                <div className={`${styles.inner} ${styles.orbit}`}></div>
              </div>
            </div>
          </div>
        

      </div>
      
      <div className={styles["btn-orbit-wrapper"]} ref={btnWrapperRef}>
        <BubblyButton onClick={() => window.location.href = "https://GL453.github.io/portfolio/record-page/record.html"}>
          Click to start
        </BubblyButton>
      </div>

    </section>

    
  );
};

export default OrbitSection;