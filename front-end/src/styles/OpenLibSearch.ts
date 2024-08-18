import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
  searchBar: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    marginRight: "16px",
  },

  iconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  icon: {
    width: "25px",
    height: "25px",
    fill: "transparent",
    cursor: "pointer",
    stroke: "#282844",
    strokeWidth: "2px",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    marginBottom: "16px",
  },
  results: {
    position: "absolute",
    top: "18%",
    display: "flex",
    flexDirection: "column",
    width: "200px",
    height: "150px",
    overflowY: "scroll",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    borderRadius: "1rem",
    padding: "1rem",
    backgroundColor: "#fff",
    zIndex: "1",
  },
  book: {
    cursor: "pointer",
  },
  coverImageContainer: {
    position: "absolute",
    zIndex: 10,
    width: "500px",
    height: "500px",
  },
  coverImage: {
    width: "50%",
    height: "50%",
  },
};

export default styles;
