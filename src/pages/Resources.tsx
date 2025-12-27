import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/* ================================
   DESIGN CONSTANTS (FROM FIGMA)
================================ */
const FRAME_WIDTH = 1512;
const FRAME_HEIGHT = 982;
const SIDEBAR_WIDTH = 293;
const TOPBAR_HEIGHT = 72;

const resources = [
  {
    id: 1,
    title: "Mindset Reset Guide",
    description: "Download or explore to apply AIDE principles effectively.",
    variant: "secondary" as const,
  },
  {
    id: 2,
    title: "Business Growth Blueprint",
    description: "Download or explore to apply AIDE principles effectively.",
    variant: "white" as const,
  },
  {
    id: 3,
    title: "Execution Masterclass",
    description: "Download or explore to apply AIDE principles effectively.",
    variant: "secondary" as const,
  },
  {
    id: 4,
    title: "Leadership & Influence Playbook",
    description:
      "Develop leadership skills that help you inspire and influence people effectively.",
    variant: "white" as const,
  },
];

export default function Resources() {
  const [firstName, setFirstName] = useState("");
  const [scale, setScale] = useState(1);
  const navigate = useNavigate();

  /* ================================
     AUTH
  ================================= */
  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
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
     SCALE (MAX POSSIBLE, NO OVERLAP)
  ================================= */
  useEffect(() => {
    const updateScale = () => {
      const usableWidth = window.innerWidth - SIDEBAR_WIDTH;
      const usableHeight = window.innerHeight - TOPBAR_HEIGHT;

      const scaleX = usableWidth / FRAME_WIDTH;
      const scaleY = usableHeight / FRAME_HEIGHT;

      // 👇 allow it to be BIG (no artificial cap)
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

      {/* === RED CANVAS (REAL TOPBAR OFFSET) === */}
      <div
        style={{
          flex: 1,
          paddingLeft: SIDEBAR_WIDTH,
          paddingTop: TOPBAR_HEIGHT,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start", // 👈 IMPORTANT
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
          {/* === FIXED DESKTOP FRAME === */}
          <main
            style={{
              position: "relative",
              width: FRAME_WIDTH,
              height: FRAME_HEIGHT,
            }}
          >
            {/* HEADER */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                position: "absolute",
                top: 111,
                left: 372,
                width: 995,
                height: 120,
                background: "#FFFFFF",
                borderRadius: 20,
                padding: "28px 36px",
              }}
            >
              <h1 style={{ fontSize: 40, fontWeight: 600 }}>
                Here’s Your Resource Library,{" "}
                <span style={{ color: "#DF1516" }}>
                  {firstName || "Name"}!
                </span>
              </h1>
              <p style={{ marginTop: 10, fontSize: 20 }}>
                Access your personalized materials to enhance your AIDE journey.
              </p>
            </motion.div>

            {/* RESOURCE GRID */}
            <div
              style={{
                position: "absolute",
                top: 270,
                left: 372,
                width: 995,
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 28,
              }}
            >
              {resources.map((r) => (
                <div
                  key={r.id}
                  style={{
                    height: 210,
                    padding: 36,
                    background:
                      r.variant === "secondary" ? "#F6C888" : "#FFFFFF",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: 26, fontWeight: 600 }}>
                      {r.title}
                    </h3>
                    <p style={{ marginTop: 14, fontSize: 20 }}>
                      {r.description}
                    </p>
                  </div>

                  <Button className="bg-[#DF1516] hover:bg-[#c01314] text-white rounded-full w-fit px-8 h-11 text-base">
                    Access Now
                  </Button>
                </div>
              ))}
            </div>

            {/* QUICK TIPS */}
            <div
              style={{
                position: "absolute",
                top: 740,
                left: 372,
                width: 995,
                height: 220,
                border: "2px solid #F3C17E",
                padding: 36,
                color: "#FFFFFF",
              }}
            >
              <h3 style={{ fontSize: 28, fontWeight: 700 }}>Quick Tips</h3>
              <ul style={{ marginTop: 18, fontSize: 22, lineHeight: "34px" }}>
                <li>Start your day with clarity.</li>
                <li>Break goals into smaller steps.</li>
                <li>Review wins weekly.</li>
              </ul>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
