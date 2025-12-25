import { Settings, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const TopBar = () => {
  const navigate = useNavigate();

  return (
    <>
      {/* === Settings (Gear) Icon === */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate("/settings")}
        style={{
          position: "absolute",
          width: "42.62px",
          height: "41px",
          top: "43px",
          left: "1356px",
          padding: 0,
          color: "#FFFFFF",
        }}
      >
        <Settings
          style={{
            width: "42.62px",
            height: "41px",
          }}
        />
      </Button>

      {/* === Notifications (Bell) === */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => navigate("/notifications")}
        style={{
          position: "absolute",
          width: "44px",
          height: "44px",
          top: "41px",
          left: "1417px",
          padding: 0,
          color: "#FFFFFF",
        }}
      >
        <Bell
          style={{
            width: "44px",
            height: "44px",
          }}
        />

        {/* === Notification Ellipse === */}
        <div
          style={{
            position: "absolute",
            width: "30px",
            height: "25px",
            top: "1px", // 42 - 41
            left: "26px", // 1443 - 1417
            backgroundColor: "#DF1516",
            border: "1px solid #F3C17E",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 800,
              fontSize: "16px",
              lineHeight: "16px",
              color: "#FFFFFF",
            }}
          >
            3
          </span>
        </div>
      </Button>
    </>
  );
};
