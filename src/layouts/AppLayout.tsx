import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { useAppLayout } from "@/hooks/useAppLayout";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  const {
    topBarRef,
    contentStyle, // global offset + locked spacing
  } = useAppLayout();

  return (
    <div className="relative w-screen h-screen bg-primary overflow-hidden">
      {/* Sidebar */}
      <Sidebar showTasksAndResources />

      {/* TopBar (measured for offset) */}
      <div ref={topBarRef} className="fixed top-0 left-0 right-0 z-50">
        <TopBar />
      </div>

      {/* Main Content (ALL pages rendered here) */}
      <main
        style={contentStyle}
        className="absolute inset-0"
      >
        <Outlet />
      </main>
    </div>
  );
}
