import { ReactNode } from "react";
import { useAppLayout } from "@/hooks/useAppLayout";

/**
 * LockedCanvas
 * ------------
 * Fixed Figma-accurate canvas
 * - 1512 × 982
 * - Centered horizontally & vertically
 * - No scrolling
 * - Children position relative to this frame
 */
interface LockedCanvasProps {
  children: ReactNode;
}

export function LockedCanvas({ children }: LockedCanvasProps) {
  const { topOffset } = useAppLayout();

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: "#000", // optional: helps debug overflow
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: topOffset,
        boxSizing: "border-box",
      }}
    >
      {/* Figma Frame */}
      <div
        style={{
          width: 1512,
          height: 982,
          backgroundColor: "#DF1516",
          borderRadius: 30,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default LockedCanvas;
