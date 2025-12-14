import { Settings, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const TopBar = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 right-0 left-64 h-24 bg-primary flex items-center justify-end px-8 z-50">
      <div className="flex items-center gap-4">
        {/* Settings */}
        <Button
          variant="ghost"
          size="icon"
          className="w-14 h-14 text-white hover:text-white hover:bg-white/10"
          onClick={() => navigate("/settings")}
        >
          <Settings className="w-7 h-7 text-white" />
        </Button>

        {/* Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative w-14 h-14 text-white hover:text-white hover:bg-white/10"
          onClick={() => navigate("/notifications")}
        >
          <Bell className="w-7 h-7 text-white" />

          {/* Notification badge */}
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-primary text-xs rounded-full flex items-center justify-center font-bold">
            3
          </span>
        </Button>
      </div>
    </header>
  );
};
