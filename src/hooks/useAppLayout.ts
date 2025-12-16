import { useLayoutEffect, useRef, useState } from "react";

export function useAppLayout() {
  const topBarRef = useRef<HTMLDivElement | null>(null);
  const [topOffset, setTopOffset] = useState(0);

  useLayoutEffect(() => {
    if (!topBarRef.current) return;

    const updateOffset = () => {
      setTopOffset(topBarRef.current!.offsetHeight + 24);
    };

    updateOffset();
    window.addEventListener("resize", updateOffset);

    return () => window.removeEventListener("resize", updateOffset);
  }, []);

  return {
    topBarRef,
    topOffset,
  };
}
