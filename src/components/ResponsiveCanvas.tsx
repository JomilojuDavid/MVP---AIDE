import { useState, useEffect } from "react";

interface ResponsiveCanvasProps {
  width: number; // Original canvas width
  height: number; // Original canvas height
  children: React.ReactNode; // The content of the page
}

export default function ResponsiveCanvas({ width, height, children }: ResponsiveCanvasProps) {
  const [scale, setScale] = useState<number>(1);

  useEffect(() => {
    const handleResize = () => {
      const scaleX = window.innerWidth / width;
      const scaleY = window.innerHeight / height;
      const newScale = Math.min(scaleX, scaleY, 1); // Never scale above original size
      setScale(newScale);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width, height]);

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div
        style={{
          width: `${width}px`,
          height: `${height}px`,
          transform: `scale(${scale})`,
          transformOrigin: "center center",
        }}
      >
        {children}
      </div>
    </div>
  );
}
