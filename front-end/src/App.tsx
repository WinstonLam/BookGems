// src/App.tsx
import React from "react";
import "./App.css";
import BlenderObjectCard from "./components/BlenderObjectCard";

const model = "/Cake_Pop.gltf";

const App: React.FC = () => {
  return (
    <div className="grid">
      <BlenderObjectCard />
    </div>
  );
};

export default App;
