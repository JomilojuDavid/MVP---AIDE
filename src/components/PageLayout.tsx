import { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";

interface PageLayoutProps {
  children: ReactNode;
  showTasksAndResources?: boolean;
  scale?: number; // 👈 NEW
}

/**
 * Global page layout
 * - No scrolling
 * - Optional scaling
 * - Works across all pages
 */
export function PageLayout({
  children,
  showTasksAndResources = true,
  scale = 0.8, // 👈 default for most pages
}: PageLayoutProps) {
  return (
    <div className="h-screen w-full bg-primary overflow-hidden">
      <Sidebar showTasksAndResources={showTasksAndResources} />
      <TopBar />

      {/* Main content area */}
      <main className="h-screen w-full md:pl-[260px] pt-20 md:pt-24 overflow-hidden flex justify-center">
        {/* SCALE WRAPPER */}
        <div
          className="origin-top"
          style={{
            transform: `scale(${scale})`,
            width: scale < 1 ? `${100 / scale}%` : "100%",
          }}
        >
          <div className="max-w-5xl mx-auto w-full flex flex-col gap-4 md:gap-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

export default PageLayout;
