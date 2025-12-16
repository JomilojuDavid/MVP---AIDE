import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { useAppLayout } from "@/hooks/useAppLayout";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { topBarRef } = useAppLayout();

  return (
    <div className="relative w-screen h-screen bg-primary overflow-hidden">
      <Sidebar showTasksAndResources />

      <div ref={topBarRef}>
        <TopBar />
      </div>

      {children}
    </div>
  );
}
