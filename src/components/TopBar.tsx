import { Settings, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const TopBar = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-4 right-6 z-50 flex items-center gap-3">
      {/* Settings */}
      <Button
        variant="ghost"
        size="icon"
        className="w-10 h-10 text-white hover:text-white hover:bg-white/10 p-0"
        onClick={() => navigate("/settings")}
      >
        <Settings className="w-7 h-7 text-white" />
      </Button>

      {/* Notifications */}
      <Button
        variant="ghost"
        size="icon"
        className="relative w-10 h-10 text-white hover:text-white hover:bg-white/10 p-0"
        onClick={() => navigate("/notifications")}
      >
        <Bell className="w-7 h-7 text-white" />

        {/* Notification badge */}
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-primary text-xs rounded-full flex items-center justify-center font-bold">
          3
        </span>
      </Button>
    </div>
  );
};
