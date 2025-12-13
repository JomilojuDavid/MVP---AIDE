import { Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import aideLogo from "@/assets/aide-logo.png";
import iconHome from "@/assets/icon-home.png";
import iconAssessment from "@/assets/icon-assessment.png";
import iconResources from "@/assets/icon-resources.png";
import iconTasks from "@/assets/icon-tasks.png";
import iconAnalytics from "@/assets/icon-analytics.png";
import supportWoman from "@/assets/support-woman.jpg";

interface SidebarProps {
  showTasksAndResources?: boolean;
}

export const Sidebar = ({ showTasksAndResources = false }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: "Home", path: "/dashboard", icon: iconHome, show: true },
    { name: "Assessment", path: "/assessment", icon: iconAssessment, show: showTasksAndResources },
    { name: "Resources", path: "/resources", icon: iconResources, show: showTasksAndResources },
    { name: "Tasks", path: "/tasks", icon: iconTasks, show: showTasksAndResources },
    { name: "Analytics", path: "/analytics", icon: iconAnalytics, show: showTasksAndResources },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-primary-foreground rounded-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-screen bg-background text-black w-64 flex flex-col transition-transform duration-300 z-40",
          !isOpen && "max-md:-translate-x-full"
        )}
      >
        {/* Logo - Clickable */}
        <div className="p-6 pb-2">
          <Link to="/dashboard">
            <img src={aideLogo} alt="AIDE Logo" className="h-16 w-auto cursor-pointer" />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-4">
          {navItems.filter(item => item.show).map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center gap-4 px-8 py-3 transition-colors rounded-lg",
                isActive(item.path)
                  ? "bg-secondary text-primary font-semibold"
                  : "text-black hover:bg-secondary/50"
              )}
            >
              <img src={item.icon} alt={item.name} className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Support Button with Woman Image */}
        <div className="p-6">
          <button className="flex items-center gap-3 text-black hover:text-black/80 transition-colors">
            <img 
              src={supportWoman} 
              alt="Support" 
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-medium">Support</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
