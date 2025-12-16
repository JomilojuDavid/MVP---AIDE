import { ReactNode } from "react";
import { useAppLayout } from "@/hooks/useAppLayout";

/**
 * LockedCanvas (Option A)
 * ----------------------
 * Global, fixed-size canvas that matches Figma exactly.
 * - 1512 × 982
 * - No scaling
 * - No scrolling
 * - Consistent across all routes
 */
interface LockedCanvasProps {
  children: ReactNode;
}

export function LockedCanvas({ children }: LockedCanvasProps) {
  const { topOffset } = useAppLayout();

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Fixed canvas */}
      <div
        style={{
          position: "absolute",
          top: topOffset,
          left: "50%",
          width: 1512,
          height: 982,
          transform: "translateX(-50%)",
          transformOrigin: "top center",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default LockedCanvas;
