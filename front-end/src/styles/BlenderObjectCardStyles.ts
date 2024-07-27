// src/styles/BlenderObjectCardStyles.ts

import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  card: {
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
    padding: "16px",
    width: "100%",
    height: "500px", // Set a fixed height to prevent infinite growth
    display: "flex",
    flexDirection: "column" as "column", // Explicitly typing this property
  },
  canvasContainer: {
    flexGrow: 1,
  },
};

export default styles;
