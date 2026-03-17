import React, { forwardRef } from "react";

const Skyplane = forwardRef(function Skyplane(
  {
    className = "",
    wrapperClassName = "",
    position,
    active = false,
    onClick,
    children,
    ...props
  },
  ref
) {
  return (
    <div
      className={`skyplane-wrapper ${wrapperClassName}`}
      style={{ position: "absolute", ...position }}
    >
      <div
        ref={ref}
        className={`skyplane ${active ? "skyplane-active" : ""} ${className}`}
        onClick={onClick}
        {...props}
      >
        
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 309 152"
          fill="none"
        >
         
          {/* 上层机翼 */}
          <g transform="matrix(0.99999,-0.00518,0.00518,0.99999,-0.66857,1.54834)">
            <path
              fill="#F5A9FF"
              d="m82.78 35.086 215.877 94.559L79 92l3.78-56.914Z"
            />
            <path
              fill="url(#paint0_linear_2272_56525)"
              d="m82.78 35.086 215.877 94.559L79 92l3.78-56.914Z"
            />
            <path
              fill="url(#pattern-scroll-smooth-plane-0)"
              fillOpacity=".34"
              d="m82.78 35.086 215.877 94.559L79 92l3.78-56.914Z"
            />
            <path
              fill="url(#paint1_linear_2272_56525)"
              d="m82.781 35.085 52.044-23.564 163.833 118.123-215.877-94.56Z"
            />
            <path
              fill="url(#pattern-scroll-smooth-plane-1)"
              fillOpacity=".6"
              style={{ mixBlendMode: "multiply" }}
              d="m82.781 35.085 52.044-23.564 163.833 118.123-215.877-94.56Z"
            />
          </g>

          {/* 下层机翼 */}
          <g transform="matrix(0.99999,0.00518,-0.00518,0.99999,0.68136,-1.54636)">
            <path
              fill="url(#paint2_linear_2272_56525)"
              d="M76.828 107.147 291.17 126.73l-216.516 4.229 2.175-23.812Z"
            />
            <path
              fill="#000"
              fillOpacity=".2"
              d="M76.828 107.147 291.17 126.73l-216.516 4.229 2.175-23.812Z"
            />
            <path
              fill="url(#paint3_linear_2272_56525)"
              d="M76.828 107.147 291.17 126.73l-216.516 4.229 2.175-23.812Z"
            />
            <path
              fill="url(#pattern-scroll-smooth-plane-2)"
              fillOpacity=".34"
              d="M76.828 107.147 291.17 126.73l-216.516 4.229 2.175-23.812Z"
            />
            <path
              fill="url(#paint4_linear_2272_56525)"
              d="M298.777 130.425 1.903 103.302l53.998-44.957 242.876 72.08Z"
            />
            <path
              fill="url(#pattern-scroll-smooth-plane-3)"
              fillOpacity=".6"
              style={{ mixBlendMode: "multiply" }}
              d="M298.777 130.425 1.903 103.302l53.998-44.957 242.876 72.08Z"
            />
          </g>

          {/* 渐变 */}
          <defs>
            <linearGradient
              id="paint0_linear_2272_56525"
              x1="154.593"
              y1="48.892"
              x2="160.643"
              y2="131.658"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset=".199" stopColor="#6F4D70" />
              <stop offset="1" stopColor="#12195A" />
            </linearGradient>

            <linearGradient
              id="paint1_linear_2272_56525"
              x1="66.623"
              y1="2.042"
              x2="112.939"
              y2="199.069"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset=".27" stopColor="#FEC5FB" />
              <stop offset=".838" stopColor="#003cc5" />
            </linearGradient>

            <linearGradient
              id="paint2_linear_2272_56525"
              x1="112.454"
              y1="132.998"
              x2="109.954"
              y2="94.498"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#2F3CC0" />
              <stop offset=".706" stopColor="#FFD6EC" />
            </linearGradient>

            <linearGradient
              id="paint3_linear_2272_56525"
              x1="246.499"
              y1="203"
              x2="260.599"
              y2="92.441"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset=".199" stopColor="#6F4D70" />
              <stop offset=".845" stopColor="#12195A" />
            </linearGradient>

            <linearGradient
              id="paint4_linear_2272_56525"
              x1="-18.792"
              y1="49.95"
              x2="-15.789"
              y2="152.351"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset=".27" stopColor="#FEC5FB" />
              <stop offset=".838" stopColor="#0b63f6" />
            </linearGradient>
          </defs>

        </svg>
      </div>
            {/* 文字 label */}
      {children && <div className="skyplane-label">{children}</div>}
    </div>
  );
});

export default Skyplane;