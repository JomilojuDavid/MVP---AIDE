import { useLayoutEffect, useRef, useState, CSSProperties } from "react";

export function useAppLayout() {
  const topBarRef = useRef<HTMLDivElement | null>(null);
  const [topOffset, setTopOffset] = useState(0);

  // Automatically compute TopBar height + breathing room
  useLayoutEffect(() => {
    if (!topBarRef.current) return;

    const updateOffset = () => {
      setTopOffset(topBarRef.current!.offsetHeight + 24); // 24px breathing room
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);

    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  // Automatic content style with top offset for all pages
  const contentStyle: CSSProperties = {
    position: "absolute",
    top: topOffset,
    left: 0,
    right: 0,
    bottom: 0,
    overflow: "hidden", // prevents scrolling
  };

  return {
    topBarRef,
    topOffset,
    contentStyle,
  };
}
