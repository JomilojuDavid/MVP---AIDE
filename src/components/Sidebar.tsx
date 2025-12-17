import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ClipboardList,
  BarChart3,
  BookOpen,
  Settings,
} from "lucide-react";

interface SidebarProps {
  showTasksAndResources?: boolean;
}

const navItemBase =
  "flex items-center gap-4 px-6 py-3 rounded-xl transition-colors select-none";

export function Sidebar({ showTasksAndResources = true }: SidebarProps) {
  const location = useLocation();

  const navItems = [
    {
      label: "Dashboard",
      to: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Assessment",
      to: "/assessment",
      icon: ClipboardList,
    },
    ...(showTasksAndResources
      ? [
          {
            label: "Tasks",
            to: "/tasks",
            icon: ClipboardList,
          },
          {
            label: "Resources",
            to: "/resources",
            icon: BookOpen,
          },
        ]
      : []),
    {
      label: "Analytics",
      to: "/analytics",
      icon: BarChart3,
    },
    {
      label: "Settings",
      to: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside
      className="
        fixed
        left-0
        top-0
        h-screen
        w-[320px]
        bg-primary
        z-[998]
        flex
        flex-col
        pt-[72px]
      "
    >
      {/* NAV ITEMS — MOVED UP */}
      <nav className="flex flex-col gap-2 mt-[-12px]">
        {navItems.map(({ label, to, icon: Icon }) => {
          const isActive = location.pathname === to;

          return (
            <NavLink key={to} to={to}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className={`
                  ${navItemBase}
                  ${
                    isActive
                      ? "bg-white/15"
                      : "hover:bg-white/10"
                  }
                `}
              >
                <Icon
                  size={26}
                  strokeWidth={isActive ? 2.4 : 2}
                  className="text-white"
                />

                <span
                  className={`
                    text-[18px]
                    font-medium
                    text-white
                  `}
                >
                  {label}
                </span>
              </motion.div>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
