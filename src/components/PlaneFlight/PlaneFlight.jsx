import { useEffect, useRef } from "react";
import Plane from "../Plane/PlaneSvg";
import "./PlaneFlight.css"

export default function PlaneFlight() {

  const planeRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {

    const plane = planeRef.current;
    const path = pathRef.current;

    if (!plane || !path) return;

    const pathLength = path.getTotalLength();
    const duration = 6000;

    let startTime = null;

    function animatePlane(timestamp) {

      if (!startTime) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const t = Math.min(elapsed / duration, 1);

      const point = path.getPointAtLength(pathLength * t);
      const nextPoint = path.getPointAtLength(pathLength * t + 1);

      const angle =
        Math.atan2(nextPoint.y - point.y, nextPoint.x - point.x) *
        (180 / Math.PI);

      plane.style.transform =
        `translate(${point.x}px,${point.y}px) translate(-50%,-50%) rotate(${angle}deg)`;

      if (t < 1) requestAnimationFrame(animatePlane);
    }

    requestAnimationFrame(animatePlane);

  }, []);

  return (

    <div className="scroll-smooth-breeze">

      {/* 飞机组件 */}
      <Plane planeRef={planeRef} />

      {/* 路径 */}
      <div className="path-container">

        <svg viewBox="0 0 1657 131" preserveAspectRatio="xMinYMid meet">

          <path
            ref={pathRef}
            id="flightPathSVG"
            d="M4.09517 56.6702 C4.09517 56.6702 377.305 131.762 516.262 118.255
               C655.219 104.748 649.054 48.6764 621.479 22.6165
               C593.903 -3.44342 507.712 -9.98238 463.482 22.2671
               C401.483 67.4725 528.2 97.3921 649.245 113.862
               C770.291 130.332 2400 117.074 2600.73 116.078"
            fill="none"
            stroke="transparent"
          />

        </svg>

      </div>

    </div>
  );
}