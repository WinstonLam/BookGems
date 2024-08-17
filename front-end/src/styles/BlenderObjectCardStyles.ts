// src/styles/BlenderObjectCardStyles.ts

import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  container: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    height: "100vh",
    overflow: "hidden",
  },
  wrapper: {  
    width: "80%",
    height: "80%",
    display: "flex",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",

  },
  form: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    padding: "16px",
    width: "40%",
    height: "100%", // Set a fixed height to prevent infinite growth
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  canvasContainer: {
    width: "80%",
  },
  colorPickerContainer: {
    zIndex: 1,
  },
};

export default styles;
