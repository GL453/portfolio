import React, { useState } from "react";
import SkyBackground from "../components/SkyBk/SkyBackground";
import Skyplane from "../components/SkyBk/SkyPlane";
import styles from "./End.module.css";
import { useNavigate } from "react-router-dom";


export default function End() {
  const [showText, setShowText] = useState(false);
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const handlePlaneClick = () => {
    if (clicked) return; 
    setClicked(true); 

    // 2秒后跳转首页
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };
  
  return (
    <div className={styles["end-page"]}>
      
      {/* 背景层 */}
      <div className={styles["bg-layer"]}>
        <SkyBackground />
      </div>

      {/* 飞机层 */}
      {/* 飞机层 */}
      <div className={styles["plane-layer"]}>
        <Skyplane
          className={`${styles["end-plane"]} ${clicked ? styles["fly-out-left"] : ""}`}
          onAnimationEnd={() => !clicked && setShowText(true)} 
          onClick={handlePlaneClick}
          style={{ cursor: "pointer" }}
        />
      </div>

      {/* 文本层 */}
      <div
        className={`${styles["text-layer"]} ${
          showText ? styles["show"] : ""
        }`}
      >
        <h1>Thank you for visiting</h1>
        <p>Hope you enjoyed the journey</p>
      </div>
    </div>
  );
}