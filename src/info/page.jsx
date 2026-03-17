import React, { useState } from "react";
import SkyBackground from "../components/SkyBk/SkyBackground";
import Skyplane from "../components/SkyBk/SkyPlane";
import "./SkyPage.css";
import { useNavigate } from "react-router-dom";

import PageAboutMe from "../components/InfoSection/about/AboutMe";
import PageEducation from "../components/InfoSection/education/Education";
import PageExperience from "../components/InfoSection/experience/Exp/Experience";
import PageSkills from "../components/InfoSection/skill/Skills";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [specialClicked, setSpecialClicked] = useState(false); // 👈 点击状态
  const navigate = useNavigate();

  const planes = [
    { top: "8%", left: "36%", label: "About Me", page: <PageAboutMe /> },
    { top: "18%", left: "80%", label: "Education", page: <PageEducation /> },
    { top: "30%", left: "50%", label: "Professional Experience", page: <PageExperience /> },
    { top: "40%", left: "80%", label: "Technical Skills", page: <PageSkills /> },
    { top: "50%", left: "60%", label: "", special: true }, 
  ];

  const closePanel = () => setActiveIndex(null);

  const handleSpecialClick = () => {
    if (specialClicked) return; // 防止重复点击
    setSpecialClicked(true);

    // 2秒后跳转
    setTimeout(() => {
      navigate("/end");
    }, 2000);
  };

  return (
    <div className="sky-page" style={{ position: "relative" }}>
      <SkyBackground />

      {planes.map((plane, index) => {
        const isSpecial = plane.special;

        return (
          <Skyplane
            key={index}
            position={{ top: plane.top, left: plane.left }}
            className={isSpecial && specialClicked ? "fly-out-right" : ""}
            active={!isSpecial && activeIndex === index}
            onClick={() => {
              if (!isSpecial) {
                setActiveIndex(index);
              } else {
                handleSpecialClick();
              }
            }}
            style={{ cursor: isSpecial ? "pointer" : "default" }}
          >
            {plane.label}
          </Skyplane>
        );
      })}

      {activeIndex !== null && <div className="overlay" onClick={closePanel}></div>}

      <div className={`left-panel ${activeIndex !== null ? "active" : ""}`}>
        <button className="close-btn" onClick={closePanel}>×</button>
        {activeIndex !== null && planes[activeIndex].page}
      </div>
    </div>
  );
}