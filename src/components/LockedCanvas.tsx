import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useAppLayout } from "@/hooks/useAppLayout";

interface LockedCanvasProps {
  children: ReactNode;
  width?: number;  // design width
  height?: number; // design height
  minScale?: number;
  maxScale?: number;
}

export default function LockedCanvas({
  children,
  width = 1512,
  height = 982,
  minScale = 0.75,
  maxScale = 1,
}: LockedCanvasProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const { topOffset } = useAppLayout();

  // Responsive scaling
  useEffect(() => {
    const updateScale = () => {
      if (!containerRef.current) return;
      const { innerWidth, innerHeight } = window;

      // Compute scale based on available width and height minus topOffset
      const scaleX = innerWidth / width;
      const scaleY = (innerHeight - topOffset) / height;
      const newScale = Math.min(Math.max(Math.min(scaleX, scaleY), minScale), maxScale);

      setScale(newScale);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [width, height, minScale, maxScale, topOffset]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: `calc(100% - ${topOffset}px)`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: topOffset,
          left: "50%",
          width: width,
          height: height,
          transform: `translateX(-50%) scale(${scale})`,
          transformOrigin: "top center",
        }}
      >
        {children}
      </div>
    </div>
  );
}
