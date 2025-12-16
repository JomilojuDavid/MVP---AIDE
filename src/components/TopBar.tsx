import { Settings, Bell } from "lucide-react";
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
        gap-[20px]
        pointer-events-auto
      "
    >
      {/* SETTINGS — 42.6 × 41 */}
      <button
        onClick={() => navigate("/settings")}
        className="
          w-[42.6px] 
          h-[41px] 
          flex 
          items-center 
          justify-center
          transform
          transition-all
          duration-200
          hover:scale-110
          hover:brightness-125
          active:scale-95
        "
      >
        <Settings
          style={{ width: "42.6px", height: "41px" }}
          strokeWidth={2} // semi-bold stroke
          className="text-white"
        />
      </button>

      {/* BELL — 44 × 44 */}
      <button
        onClick={() => navigate("/notifications")}
        className="
          relative 
          w-[44px] 
          h-[44px] 
          flex 
          items-center 
          justify-center
          transform
          transition-all
          duration-200
          hover:scale-110
          hover:brightness-125
          active:scale-95
        "
      >
        <Bell
          style={{ width: "44px", height: "44px" }}
          strokeWidth={3} // slightly bolder
          className="text-white"
        />

        {/* BADGE — EXACT FIGMA */}
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
      </button>
    </div>
  );
};
