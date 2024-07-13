// src/components/BlenderObject.tsx
import { Suspense } from "react";
import Popsicle from "../Popsicle";




const BlenderObject = () => {
  return (
    <Suspense fallback={null}>
      <Popsicle />
    </Suspense>
  );
};

export default BlenderObject;
