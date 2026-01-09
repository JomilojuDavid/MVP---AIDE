import { ReactNode } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";

interface PageLayoutProps {
  children: ReactNode;
  showTasksAndResources?: boolean;
}

/**
 * Responsive page layout that works consistently across all browsers and screen sizes.
 * Uses flexbox instead of absolute positioning.
 */
export function PageLayout({ children, showTasksAndResources = true }: PageLayoutProps) {
  return (
    <div className="h-screen w-full bg-primary overflow-hidden">
      <Sidebar showTasksAndResources={showTasksAndResources} />
      <TopBar />
      
      {/* Main content area - no scrolling, fixed height */}
      <main className="h-screen w-full md:pl-[260px] pt-20 md:pt-24 px-4 md:px-8 pb-8 overflow-hidden">
        <div className="max-w-5xl mx-auto w-full h-full flex flex-col gap-4 md:gap-6 overflow-hidden">
          {children}
        </div>
      </main>
    </div>
  );
}

export default PageLayout;
