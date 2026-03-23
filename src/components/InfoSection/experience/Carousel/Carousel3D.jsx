import React, { useEffect, useRef } from "react";
import "./Carousel3D.css";

export default function Carousel3D() {
  const dragRef = useRef(null);
  const spinRef = useRef(null);
  const groundRef = useRef(null);

  useEffect(() => {
    let radius = 240;
    let autoRotate = true;
    let rotateSpeed = -60;
    let imgWidth = 120;
    let imgHeight = 170;

    const odrag = dragRef.current;
    const ospin = spinRef.current;
    const ground = groundRef.current;

    const aImg = ospin.getElementsByTagName("img");
    const aVid = ospin.getElementsByTagName("video");
    const aEle = [...aImg, ...aVid];

    // 设置尺寸
    ospin.style.width = imgWidth + "px";
    ospin.style.height = imgHeight + "px";
    ground.style.width = radius * 3 + "px";
    ground.style.height = radius * 3 + "px";

    /* ======================
       初始化排列
    ====================== */
    function init(delayTime) {
      for (let i = 0; i < aEle.length; i++) {
        aEle[i].style.transform =
          "rotateY(" +
          i * (360 / aEle.length) +
          "deg) translateZ(" +
          radius +
          "px)";
        aEle[i].style.transition = "transform 1s";
        aEle[i].style.transitionDelay =
          delayTime || (aEle.length - i) / 4 + "s";
      }
    }

    setTimeout(() => init(), 1000);

    /* ======================
       旋转控制
    ====================== */
    let tX = 0;
    let tY = 10;

    function applyTransform(obj) {
      if (tY > 180) tY = 180;
      if (tY < 0) tY = 0;

      obj.style.transform = `rotateX(${-tY}deg) rotateY(${tX}deg)`;
    }

    function playSpin(yes) {
      ospin.style.animationPlayState = yes ? "running" : "paused";
    }

    // 自动旋转
    if (autoRotate) {
      const animationName = rotateSpeed > 0 ? "spin" : "spinRevert";
      ospin.style.animation = `${animationName} ${Math.abs(
        rotateSpeed
      )}s infinite linear`;
    }

    /* ======================
       拖拽交互
    ====================== */
    let sX, sY, desX = 0, desY = 0;

    const handlePointerDown = (e) => {
      clearInterval(odrag.timer);

      sX = e.clientX;
      sY = e.clientY;

      const handlePointerMove = (e) => {
        let nX = e.clientX;
        let nY = e.clientY;

        desX = nX - sX;
        desY = nY - sY;

        tX += desX * 0.1;
        tY += desY * 0.1;

        applyTransform(odrag);

        sX = nX;
        sY = nY;
      };

      const handlePointerUp = () => {
        odrag.timer = setInterval(() => {
          desX *= 0.95;
          desY *= 0.95;

          tX += desX * 0.1;
          tY += desY * 0.1;

          applyTransform(odrag);
          playSpin(false);

          if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
            clearInterval(odrag.timer);
            playSpin(true);
          }
        }, 17);

        window.removeEventListener("pointermove", handlePointerMove);
        window.removeEventListener("pointerup", handlePointerUp);
      };

      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
    };

    /* ======================
       滚轮缩放
    ====================== */
    const handleWheel = (e) => {
      const d = e.wheelDelta / 20 || -e.detail;
      radius += d;
      init(1);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("wheel", handleWheel);

    /* ======================
       清理
    ====================== */
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div className="carousel3d">
      <div className="carousel3d__drag" ref={dragRef}>
        <div className="carousel3d__spin" ref={spinRef}>

          <img src="./images/works/1H_Individual-Logo.png" alt="Logo" loading="lazy"/>
          <img src="./images/works/2H_Business_Cover.jpg" alt="Logo" loading="lazy"/>
          <img src="./images/works/3H_Individual_Cover.jpg" alt="Logo" loading="lazy"/>
          <img src="./images/works/8H_Business-Logo.png" alt="Logo" loading="lazy"/>
          <img src="./images/works/OptionA-Creator_Membership.jpg" alt="Logo" loading="lazy"/>
          <img src="./images/works/OptionB(Plus)-Business_Membership.png" alt="Logo" loading="lazy"/>

          <p className="carousel3d__title">Some works from the series</p>

        </div>

        <div className="carousel3d__ground" ref={groundRef}></div>
      </div>

      <div className="carousel3d__music"></div>
    </div>
  );
}