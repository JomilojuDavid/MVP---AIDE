import { Home, Settings, Menu, HelpCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  showTasksAndResources?: boolean;
}

export const Sidebar = ({ showTasksAndResources = false }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { name: "Home", path: "/dashboard", icon: Home, show: true },
    { name: "Settings", path: "/settings", icon: Settings, show: true },
    { name: "Tasks", path: "/tasks", icon: Home, show: showTasksAndResources },
    { name: "Resources", path: "/resources", icon: Settings, show: showTasksAndResources },
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
          "fixed left-0 top-0 h-screen bg-primary text-primary-foreground w-64 flex flex-col transition-transform duration-300 z-40",
          !isOpen && "max-md:-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="p-8 border-b border-primary-foreground/20">
          <h1 className="text-4xl font-bold tracking-wider" style={{ fontFamily: 'Impact, sans-serif' }}>
            AIDE
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-8">
          {navItems.filter(item => item.show).map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "flex items-center gap-4 px-8 py-4 transition-colors uppercase tracking-wide",
                isActive(item.path)
                  ? "bg-primary-foreground/20"
                  : "hover:bg-primary-foreground/10"
              )}
            >
              <item.icon className="w-6 h-6" />
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Support Button */}
        <div className="p-8 border-t border-primary-foreground/20">
          <button className="flex items-center gap-3 text-primary-foreground hover:opacity-80 transition-opacity">
            <HelpCircle className="w-6 h-6" />
            <span className="font-medium uppercase tracking-wide">Support</span>
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
