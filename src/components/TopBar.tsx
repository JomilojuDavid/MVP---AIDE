import { Settings, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const TopBar = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed top-6 right-6 flex items-center gap-3 z-50">
      <Button
        variant="ghost"
        size="icon"
        className="w-12 h-12 text-white hover:text-white/80 hover:bg-white/10"
        onClick={() => navigate('/settings')}
      >
        <Settings className="w-8 h-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="w-12 h-12 text-white hover:text-white/80 hover:bg-white/10 relative"
        onClick={() => navigate('/notifications')}
      >
        <Bell className="w-8 h-8" />
        <span className="absolute top-0 right-0 w-5 h-5 bg-white text-primary text-xs rounded-full flex items-center justify-center font-bold">
          3
        </span>
      </Button>
    </div>
  );
};
