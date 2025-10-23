import { Home, Settings, Menu, HelpCircle, Brain, BookOpen, CheckSquare, BarChart3 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import aideLogo from "@/assets/aide-logo.png";

interface SidebarProps {
  showTasksAndResources?: boolean;
}

export const Sidebar = ({ showTasksAndResources = false }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: "Home", path: "/dashboard", icon: Home, show: true },
    { name: "Assessment", path: "/quiz", icon: Brain, show: showTasksAndResources },
    { name: "Resources", path: "/resources", icon: BookOpen, show: showTasksAndResources },
    { name: "Tasks", path: "/tasks", icon: CheckSquare, show: showTasksAndResources },
    { name: "Analytics", path: "/analytics", icon: BarChart3, show: showTasksAndResources },
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
          "fixed left-0 top-0 h-screen bg-background text-foreground w-64 flex flex-col transition-transform duration-300 z-40",
          !isOpen && "max-md:-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="p-8">
          <img src={aideLogo} alt="AIDE Logo" className="h-20 w-auto" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-8">
          {navItems.filter(item => item.show).map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center gap-4 px-8 py-4 transition-colors",
                isActive(item.path)
                  ? "text-primary font-semibold"
                  : "text-foreground hover:text-primary"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Support Button */}
        <div className="p-8">
          <button className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
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
