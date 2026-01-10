import { ReactNode, useEffect, useRef, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";

interface PageLayoutProps {
  children: ReactNode;
  showTasksAndResources?: boolean;
  disableAutoScale?: boolean; // for Analytics
}

export function PageLayout({
  children,
  showTasksAndResources = true,
  disableAutoScale = false,
}: PageLayoutProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (disableAutoScale) {
      setScale(1);
      return;
    }

    const calculateScale = () => {
      if (!contentRef.current) return;

      const contentHeight = contentRef.current.scrollHeight;

      // Viewport minus top bar spacing
      const availableHeight =
        window.innerHeight - 120; // matches pt-20 / pt-24

      const nextScale = Math.min(
        availableHeight / contentHeight,
        1
      );

      setScale(nextScale);
    };

    calculateScale();
    window.addEventListener("resize", calculateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, [children, disableAutoScale]);

  return (
    <div className="h-screen w-full bg-primary overflow-hidden">
      <Sidebar showTasksAndResources={showTasksAndResources} />
      <TopBar />

      <main className="h-screen w-full md:pl-[16.25rem] pt-20 md:pt-24 overflow-hidden flex justify-center">
        <div
          className="origin-top"
          style={{
            transform: `scale(${scale})`,
            width: scale < 1 ? `${100 / scale}%` : "100%",
          }}
        >
          <div
            ref={contentRef}
            className="max-w-5xl mx-auto w-full flex flex-col gap-4 md:gap-6"
          >
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

export default PageLayout;
