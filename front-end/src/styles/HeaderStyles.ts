// src/styles/HeaderStyles.ts
import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "80px",
    backgroundColor: "rgb(var(--second-color))",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
  },
  headerContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    height: "90%",
    margin: "0 10%",
    maxWidth: "1250px",
  },
  headerGearIcon: {
    width: "50px",
    height: "50px",
    cursor: "pointer",
    fill: "rgb(var(--text-color))",
    filter: "drop-shadow(-2px 2px 1px rgba(0, 0, 0, 0.5))",
    transition:
      "transform 0.1s ease-in-out, filter 0.1s ease-in-out, fill 0.5s ease-in-out, stroke 0.5s ease-in-out",
  },
  headerLogo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-evenly",
    cursor: "pointer",
    color: "rgb(var(--text-color))",
    textShadow: "2px 2px 2px rgba(var(--primary-color), 0.5)",
    transition: "all 0.5s ease-in-out",
  },
  logoIcon: {
    width: "75px",
  },
};

export default styles;
