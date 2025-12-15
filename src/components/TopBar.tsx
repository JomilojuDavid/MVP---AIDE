import { Settings, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const TopBar = () => {
  const navigate = useNavigate();

  return (
    <div
      className="
        fixed
        top-[41px]
        right-[30px]
        z-[999]
        flex
        items-center
        gap-[18px]
        pointer-events-auto
      "
    >
      {/* SETTINGS ICON — 42.6 × 41 */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate("/settings")}
        className="w-[42.6px] h-[41px] p-0"
      >
        <Settings
          className="w-[42.6px] h-[41px] text-white"
          strokeWidth={2.2}
        />
      </Button>

      {/* BELL ICON — 44 × 44 */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate("/notifications")}
        className="relative w-[44px] h-[44px] p-0"
      >
        <Bell
          className="w-[44px] h-[44px] text-white"
          strokeWidth={2.2}
        />

        {/* NOTIFICATION BADGE — FIGMA MATCH */}
        <span
          className="
            absolute
            top-[1px]
            right-[1px]
            w-[30px]
            h-[25px]
            bg-[#DF1516]
            border
            border-[#F3C17E]
            rounded-full
            flex
            items-center
            justify-center
            text-white
            text-[16px]
            font-extrabold
            leading-none
          "
        >
          3
        </span>
      </Button>
    </div>
  );
};
