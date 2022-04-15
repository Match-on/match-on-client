import * as React from "react";

interface svginterface {
  color?: string;
}

const SvgComponent: React.FC<svginterface> = () => (
  <svg width="24px" height="24px" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M28.333 6.667H11.667c-.92 0-1.667.746-1.667 1.666v25.22c0 1.33 1.484 2.125 2.591 1.386l6.485-4.323a1.667 1.667 0 0 1 1.848 0l6.485 4.323c1.107.739 2.591-.055 2.591-1.386V8.333c0-.92-.746-1.666-1.667-1.666Z"
      stroke="current"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default SvgComponent;
