// src/App.tsx
import React from "react";
import "./App.css";
import BlenderObjectCard from "./components/BlenderObjectCard";

const model = "/Cake_Pop.gltf";

const App: React.FC = () => {
  return (
    <div className="grid">
      <BlenderObjectCard modelPath={model} />
    </div>
  );
};

export default App;
