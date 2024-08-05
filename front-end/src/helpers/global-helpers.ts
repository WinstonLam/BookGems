// Function to wrap text
export const wrapText = (
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
        while (context.measureText(line.substring(0, splitPos)).width > maxWidth) {
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
  