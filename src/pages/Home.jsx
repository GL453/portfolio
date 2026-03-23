import { useState, useEffect } from "react"
import Loading from "../components/Loading/LoadingSection"
import PlaneFlight from "../components/PlaneFlight/PlaneFlight"
import OpeningAnimation from "../components/OpeningSection/OpeningAnimation"
import PlaneEnter from "../components/PlaneEnter/PlaneEnter"

export default function HomePage() {
  const [showLoading, setShowLoading] = useState(true)
  const [fadeOutLoading, setFadeOutLoading] = useState(false)
  const [showPlane, setShowPlane] = useState(false)
  const [showOpening, setShowOpening] = useState(false)
  const [showPlaneEnter, setShowPlaneEnter] = useState(false) 

  useEffect(() => {
    const timeline = [
      { time: 4000, action: () => setFadeOutLoading(true) },
      { time: 5000, action: () => {
          setShowLoading(false)
          setShowPlane(true)
        }
      },
      { time: 6900, action: () => setShowOpening(true) },
      { time: 11170, action: () => setShowPlaneEnter(true) } 
    ]

    const timers = timeline.map(item =>
      setTimeout(item.action, item.time)
    )

    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
      
      {/* Loading */}
      {showLoading && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            transition: "opacity 0.5s ease",
            opacity: fadeOutLoading ? 0 : 1,
            zIndex: 10
          }}
        >
          <Loading />
        </div>
      )}

      {/* PlaneFlight */}
      {showPlane && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <PlaneFlight />
        </div>
      )}

      {/* OpeningAnimation */}
      {showOpening && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <OpeningAnimation />
        </div>
      )}

      {/* PlaneEnter */}
      {showPlaneEnter && (
        <div
          style={{
            position: "absolute",
            bottom: "40%",           
            left: 0,
            width: "100%",
            height: "auto",      
            display: "flex",
            justifyContent: "center",  
            zIndex: 15,                
          }}
        >
          <PlaneEnter />
        </div>
      )}

    </div>
  );
}