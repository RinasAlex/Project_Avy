import React from "react";
import s from "./ToggleButton.module.css";

export default function ToggleButton({ isToggle, onClick }) {
  return (
    <button onClick={onClick} className={s.toggleBtn}>
      <svg
        className={isToggle ? s.toggleUp : s.toggleDown}
        fill="#000000"
        width="35px"
        height="35px"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g data-name="Layer 2">
          <g data-name="arrow-ios-upward">
            <rect
              width="24"
              height="24"
              transform="rotate(180 12 12)"
              opacity="0"
            />

            <path d="M18 15a1 1 0 0 1-.64-.23L12 10.29l-5.37 4.32a1 1 0 0 1-1.41-.15 1 1 0 0 1 .15-1.41l6-4.83a1 1 0 0 1 1.27 0l6 5a1 1 0 0 1 .13 1.41A1 1 0 0 1 18 15z" />
          </g>
        </g>
      </svg>
    </button>
  );
}
