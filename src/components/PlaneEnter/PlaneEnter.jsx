import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Plane from "../Plane/PlaneSvg";
import "./PlaneEnter.css";

export default function PlaneEnter() {
  const [flyOut, setFlyOut] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    console.log("Plane clicked");
    setFlyOut(true);

    setTimeout(() => {
      navigate("/info"); 
    }, 2000);
  };

  return (
    <div className="plane-enter-container">
      <div className="plane-enter-wrapper">
        <Plane
          className={flyOut ? "fly-out" : "plane-enter"}
          onClick={handleClick}
        />
      </div>
    </div>
  );
}