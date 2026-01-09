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
    <div className="min-h-screen w-full bg-primary overflow-hidden">
      <Sidebar showTasksAndResources={showTasksAndResources} />
      <TopBar />
      
      {/* Main content area - responsive with sidebar offset on desktop */}
      <main className="min-h-screen w-full md:pl-[260px] pt-20 md:pt-24 px-4 md:px-8 pb-8">
        <div className="max-w-5xl mx-auto w-full flex flex-col gap-4 md:gap-6">
          {children}
        </div>
      </main>
    </div>
  );
}

export default PageLayout;
