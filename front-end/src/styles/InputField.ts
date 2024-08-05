import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  inputField: {
    position: "relative",
    height: "70px",
    width: "215px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  inputFieldOptional: {
    position: "relative",
    height: "38px",
    width: "215px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  input: {
    padding: "10px 10px 15px 10px",
    border: "1px solid rgba(var(--primary-color))",
    borderRadius: "1rem",
    backgroundColor: "white",
    textOverflow: "ellipsis",
  },

  label: {
    position: "absolute",
    left: "10%",
    top: "20%",
    textAlign: "left",
    transition: "0.3s",
    pointerEvents: "none",
    fontSize: "16px",
    width: "100%",
    color: "rgba(var(--text-color))",
  },
  labelHasValue: {
    position: "absolute",
    left: "12%",
    top: "-11%",
    textAlign: "left",
    transition: "0.3s",
    fontSize: "12px",
    pointerEvents: "none",
    width: "100%",
    color: "rgba(var(--text-color))",
  },

  inputError: {
    color: "red",
    opacity: 0,
    height: "15px",
    width: "80%",
    pointerEvents: "none",
    fontSize: "10px",
    transition: "all 0.3s ease-in-out",
    textAlign: "left",
  },

  inputErrorShow: {
    color: "red",
    opacity: 1,
    height: "15px",
    width: "80%",
    pointerEvents: "none",
    fontSize: "10px",
    transition: "all 0.3s ease-in-out",
    textAlign: "left",
  },

  eyeShow: {
    stroke: "rgb(var(--second-color))",
    fill: "transparent",
    width: "30px",
    height: "30px",
    position: "absolute",
    top: 0,
    right: "5%",
    cursor: "pointer",
    transition: "fill 0.3s ease-in-out",
  },
  eyeHide: {
    fill: "rgb(var(--primary-color))",
  },
  charCount: {
    position: "absolute",
    top: "45%",
    right: "9%",
    color: "rgba(var(--text-color))",
    fontSize: "10px",
  },
};

export default styles;
