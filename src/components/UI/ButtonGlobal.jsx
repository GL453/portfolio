import { useState } from "react";
import styles from "./BubblyButton.module.css";

export default function BubblyButton({
  children,
  onClick,
  ...props
}) {
  const [animate, setAnimate] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();


    setAnimate(false);

    setTimeout(() => {
      setAnimate(true);
    }, 100);

    setTimeout(() => {
      setAnimate(false);
    }, 700);

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={`${styles.bubblyButton} ${
        animate ? styles.animate : ""
      }`}
      onClick={handleClick}
      {...props}
    >
      {children || "Click to start"}
    </button>
  );
}