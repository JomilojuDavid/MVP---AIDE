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

  return (
    <>
      {/* === Mobile Menu Button (unchanged) === */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-primary text-primary-foreground rounded-lg"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* === Sidebar Canvas === */}
      <aside
        className={cn(
          "fixed left-0 top-0 bg-background text-black z-40",
          "w-[260px] h-[982px]",
          "hidden md:block"
        )}
      >
        {/* === Logo === */}
        <Link to="/dashboard">
          <img
            src={aideLogo}
            alt="AIDE Logo"
            style={{
              position: "absolute",
              width: "167px",
              height: "132px",
              top: "76px",
              left: "30px",
              objectFit: "contain",
              cursor: "pointer",
            }}
          />
        </Link>

        {/* === Home === */}
        <Link to="/dashboard">
          <img
            src={iconHome}
            alt="Home"
            style={{
              position: "absolute",
              width: "23.91px",
              height: "23px",
              top: "270px",
              left: "53px",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: "274px",
              left: "85.91px",
              fontFamily: "Arial, sans-serif",
              fontWeight: 400,
              fontSize: "21px",
              color: "#000",
            }}
          >
            Home
          </span>
        </Link>

        {/* === Assessment === */}
        {showTasksAndResources && (
          <Link to="/assessment">
            <img
              src={iconAssessment}
              alt="Assessment"
              style={{
                position: "absolute",
                width: "31.18px",
                height: "30px",
                top: "332px",
                left: "53px",
              }}
            />
            <span
              style={{
                position: "absolute",
                top: "338px",
                left: "89.18px",
                fontFamily: "Arial, sans-serif",
                fontWeight: 400,
                fontSize: "21px",
                color: "#000",
              }}
            >
              Assessment
            </span>
          </Link>
        )}

        {/* === Resources === */}
        {showTasksAndResources && (
          <Link to="/resources">
            <img
              src={iconResources}
              alt="Resources"
              style={{
                position: "absolute",
                width: "31.18px",
                height: "30px",
                top: "401px",
                left: "53px",
              }}
            />
            <span
              style={{
                position: "absolute",
                top: "406px",
                left: "93.18px",
                fontFamily: "Arial, sans-serif",
                fontWeight: 400,
                fontSize: "21px",
                color: "#000",
              }}
            >
              Resources
            </span>
          </Link>
        )}

        {/* === Tasks === */}
        {showTasksAndResources && (
          <Link to="/tasks">
            <img
              src={iconTasks}
              alt="Tasks"
              style={{
                position: "absolute",
                width: "31.18px",
                height: "30px",
                top: "469px",
                left: "53px",
              }}
            />
            <span
              style={{
                position: "absolute",
                top: "474px",
                left: "88.18px",
                fontFamily: "Arial, sans-serif",
                fontWeight: 400,
                fontSize: "21px",
                color: "#000",
              }}
            >
              Tasks
            </span>
          </Link>
        )}

        {/* === Analytics === */}
        {showTasksAndResources && (
          <Link to="/analytics">
            <img
              src={iconAnalytics}
              alt="Analytics"
              style={{
                position: "absolute",
                width: "31.18px",
                height: "30px",
                top: "534px",
                left: "53px",
              }}
            />
            <span
              style={{
                position: "absolute",
                top: "542px",
                left: "88.18px",
                fontFamily: "Arial, sans-serif",
                fontWeight: 400,
                fontSize: "21px",
                color: "#000",
              }}
            >
              Analytics
            </span>
          </Link>
        )}

        {/* === Support === */}
        <div>
          <img
            src={supportWoman}
            alt="Support"
            style={{
              position: "absolute",
              width: "46px",
              height: "52px",
              top: "871px",
              left: "34px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <span
            style={{
              position: "absolute",
              top: "883px",
              left: "100px",
              fontFamily: "Arial, sans-serif",
              fontWeight: 400,
              fontSize: "24px",
              color: "#000",
            }}
          >
            Support
          </span>
        </div>
      </aside>

      {/* === Mobile Sidebar (unchanged behavior) === */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
