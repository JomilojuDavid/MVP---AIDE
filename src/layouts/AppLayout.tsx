import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Outlet } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

export default function AppLayout() {
  const topBarRef = useRef<HTMLDivElement>(null);
  const [topBarHeight, setTopBarHeight] = useState(0);

  // Measure TopBar height to offset content
  useEffect(() => {
    if (topBarRef.current) {
      setTopBarHeight(topBarRef.current.offsetHeight);
    }
  }, []);

  return (
    <div className="flex w-screen h-screen bg-primary">
      {/* Sidebar */}
      <Sidebar showTasksAndResources />

      {/* Main area (TopBar + Content) */}
      <div className="flex-1 flex flex-col">
        {/* TopBar */}
        <div ref={topBarRef} className="w-full">
          <TopBar />
        </div>

        {/* Main content */}
        <main
          style={{ height: `calc(100vh - ${topBarHeight}px)` }}
          className="w-full"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
