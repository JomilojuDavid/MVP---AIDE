import { Settings, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export const TopBar = () => {
  return (
    <div className="absolute top-8 right-8 flex items-center gap-4 z-10">
      <Button
        variant="ghost"
        size="icon"
        className="w-10 h-10 text-white hover:text-white/80"
      >
        <Settings className="w-6 h-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="w-10 h-10 text-white hover:text-white/80 relative"
      >
        <Bell className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-5 h-5 bg-white text-primary text-xs rounded-full flex items-center justify-center font-bold">
          3
        </span>
      </Button>
    </div>
  );
};
