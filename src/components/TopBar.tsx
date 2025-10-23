import { Settings, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export const TopBar = () => {
  return (
    <div className="absolute top-8 right-8 flex items-center gap-4 z-10">
      <Button
        variant="ghost"
        size="icon"
        className="w-10 h-10 rounded-full bg-white hover:bg-white/90 text-foreground"
      >
        <Settings className="w-5 h-5" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="w-10 h-10 rounded-full bg-white hover:bg-white/90 text-foreground relative"
      >
        <Bell className="w-5 h-5" />
        <span className="absolute top-0 right-0 w-5 h-5 bg-primary text-white text-xs rounded-full flex items-center justify-center">
          3
        </span>
      </Button>
    </div>
  );
};
