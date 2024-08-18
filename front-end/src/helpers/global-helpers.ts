import * as THREE from "three";

// Function to wrap text
const wrapText = (
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number
) => {
  const words = text.split(" ");
  let line = "";
  const lines: Array<string> = [];

  words.forEach((word, index) => {
    let testLine = line + word + " ";
    let metrics = context.measureText(testLine);
    let testWidth = metrics.width;

    // If the test line exceeds the max width and it's not the first word,
    // add the current line to the lines array and start a new line
    if (testWidth > maxWidth && line.length > 0) {
      lines.push(line);
      line = word + " ";
      testLine = line;
    } else {
      line = testLine;
    }

    // Handle long words without spaces
    while (context.measureText(line).width > maxWidth) {
      let splitPos = Math.max(1, line.length - 1);
      while (
        context.measureText(line.substring(0, splitPos)).width > maxWidth
      ) {
        splitPos--;
      }
      lines.push(line.substring(0, splitPos));
      line = line.substring(splitPos) + " ";
    }

    // Add the final line if it's the last word
    if (index === words.length - 1) {
      lines.push(line);
    }
  });

  for (let i = 0; i < lines.length; i++) {
    context.fillText(lines[i], x, y + i * lineHeight);
  }
};

// Function to wrap text and create a texture with text
export const createTextTexture = (
  text: {
    title: string;
    author: string;
  },
  maxWidth: number = 370
): THREE.CanvasTexture => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) return new THREE.CanvasTexture(canvas);

  const size = 400;
  canvas.width = size;
  canvas.height = size;

  // Set background color
  context.fillStyle = "white";
  context.fillRect(0, 0, size, size);
  // Set text properties
  context.fillStyle = "black";
  context.font = "50px Arial";
  context.textAlign = "center";

  const lineHeight = 45;
  const x = size / 2;
  // Draw title at the top
  const yTitle = size / 6.25;
  wrapText(context, text.title, x, yTitle, maxWidth, lineHeight);

  // Draw author at the bottom
  const yAuthor = size / 1.25;
  wrapText(context, text.author, x, yAuthor, maxWidth, lineHeight);

  return new THREE.CanvasTexture(canvas);
};

export const applyBookMaterials = (
  material: THREE.Material,
  color: string,
  bookTexture: THREE.Texture | null,
  coverTexture?: THREE.Texture | null
) => {
  if (material.name === "Cover.001" || material.name === "FrontCover") {
    if (material.name === "Cover.001" || (material.name === "FrontCover" && !coverTexture)){
      (material as THREE.MeshStandardMaterial).color.set(color);
    }

    
    // Use coverTexture if available, otherwise fall back to bookTexture
    if (material.name === "FrontCover") {
      if (coverTexture) {
        (material as THREE.MeshStandardMaterial).map = coverTexture;
        (material as THREE.MeshStandardMaterial).color.set(0xffffff);
      } else if (bookTexture) {
        (material as THREE.MeshStandardMaterial).map = bookTexture;
      }
    }

    material.needsUpdate = true; // Ensure material is updated
  }
};
