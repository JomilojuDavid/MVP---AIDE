import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

/* ================================
   FIGMA CONSTANTS (LOCKED)
================================ */
const FRAME_WIDTH = 1512;
const FRAME_HEIGHT = 982;
const SIDEBAR_WIDTH = 293;
const TOPBAR_HEIGHT = 72;

export default function Resources() {
  const [firstName, setFirstName] = useState("");
  const [scale, setScale] = useState(1);
  const navigate = useNavigate();

  /* ================================
     AUTH
  ================================= */
  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/auth");
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("first_name")
        .eq("id", user.id)
        .single();

      if (data?.first_name) setFirstName(data.first_name);
    };

    fetchProfile();
  }, [navigate]);

  /* ================================
     SCALE (OPTION B)
  ================================= */
  useEffect(() => {
    const updateScale = () => {
      const usableWidth = window.innerWidth - SIDEBAR_WIDTH;
      const usableHeight = window.innerHeight - TOPBAR_HEIGHT;

      const scaleX = usableWidth / FRAME_WIDTH;
      const scaleY = usableHeight / FRAME_HEIGHT;

      setScale(Math.min(scaleX, scaleY));
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="relative flex h-screen w-screen bg-primary overflow-hidden">
      <Sidebar showTasksAndResources />
      <TopBar />

      {/* === RED CONTENT AREA === */}
      <div
        style={{
          marginLeft: SIDEBAR_WIDTH,
          marginTop: TOPBAR_HEIGHT,
          width: `calc(100vw - ${SIDEBAR_WIDTH}px)`,
          height: `calc(100vh - ${TOPBAR_HEIGHT}px)`,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {/* === SCALE WRAPPER === */}
        <div
          style={{
            width: FRAME_WIDTH,
            height: FRAME_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: "top center",
          }}
        >
          {/* === FIGMA FRAME === */}
          <div
            style={{
              position: "relative",
              width: FRAME_WIDTH,
              height: FRAME_HEIGHT,
            }}
          >
            {/* ================= HEADER ================= */}
            <div
              style={{
                position: "absolute",
                top: 111,
                left: 372,
                width: 995,
                height: 152,
                background: "#FFFFFF",
                borderRadius: 17,
                boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
                padding: "24px 40px",
              }}
            >
              <h1
                style={{
                  fontFamily: "Arial",
                  fontSize: 45,
                  fontWeight: 400,
                }}
              >
                Here’s Your Resource Library,{" "}
                <span style={{ color: "#DF1516" }}>
                  {firstName || "Name"}!
                </span>
              </h1>

              <p
                style={{
                  marginTop: 18,
                  fontFamily: "Montserrat",
                  fontSize: 18,
                }}
              >
                Access your personalized materials to enhance your AIDE journey.
              </p>
            </div>

            {/* ================= CARD 1 ================= */}
            <Card
              x={372}
              y={285}
              title="Mindset Reset Guide"
              accent
            />

            {/* ================= CARD 2 ================= */}
            <Card
              x={893}
              y={285}
              title="Business Growth Blueprint"
            />

            {/* ================= CARD 3 ================= */}
            <Card
              x={372}
              y={516}
              title="Execution Masterclass"
            />

            {/* ================= CARD 4 ================= */}
            <Card
              x={893}
              y={516}
              title="Leadership & Influence Playbook"
              accent
              long
            />

            {/* ================= QUICK TIPS ================= */}
            <div
              style={{
                position: "absolute",
                top: 747,
                left: 372,
                width: 995,
                height: 208,
                border: "2px solid #F3C17E",
                padding: 36,
                color: "#FFFFFF",
              }}
            >
              <h3
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: 700,
                  fontSize: 26,
                }}
              >
                Quick Tips
              </h3>

              <ul
                style={{
                  marginTop: 18,
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  fontSize: 20,
                  lineHeight: "32px",
                }}
              >
                <li>Start your day with clarity.</li>
                <li>Break goals into smaller steps.</li>
                <li>Review wins weekly.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================
   CARD COMPONENT
================================ */
function Card({
  x,
  y,
  title,
  accent = false,
  long = false,
}: {
  x: number;
  y: number;
  title: string;
  accent?: boolean;
  long?: boolean;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: y,
        left: x,
        width: 474,
        height: 214,
        background: accent ? "#F6C888" : "#FFFFFF",
        boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
        padding: 28,
      }}
    >
      <h3
        style={{
          fontFamily: "Montserrat",
          fontWeight: 500,
          fontSize: 24,
        }}
      >
        {title}
      </h3>

      <p
        style={{
          marginTop: 18,
          fontFamily: "Montserrat",
          fontSize: 18,
        }}
      >
        {long
          ? "Develop leadership skills that help you inspire and influence people effectively."
          : "Download or explore to apply AIDE principles effectively."}
      </p>

      <Button
        className="bg-[#DF1516] hover:bg-[#c01314] text-white rounded-full px-8 h-11"
        style={{ marginTop: 24 }}
      >
        Access Now
      </Button>
    </div>
  );
}
