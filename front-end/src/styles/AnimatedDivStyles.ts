// src/styles/AnimatedDivStyles.ts
import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  hover: {
    color: "rgb(var(--third-color))",
    fill: "rgb(var(--third-color))",
    filter: "drop-shadow(-2px 2px 1px rgba(0, 0, 0, 0.5))",
  },
  active: {
    transform: "translate(-2px, 2px)",
    filter: "none",
  },
};

export default styles;
