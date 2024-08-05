// src/App.tsx
import React from "react";
import "./App.css";
import BookCard from "./components/BookCard";

const model = "/Cake_Pop.gltf";

const App: React.FC = () => {
  return (
    <div className="grid">
      <BookCard />
    </div>
  );
};

export default App;
