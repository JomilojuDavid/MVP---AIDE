import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/* ================================
   FIGMA CONSTANTS (LOCKED)
================================ */
const FRAME_WIDTH = 1512;
const FRAME_HEIGHT = 982;
const SIDEBAR_WIDTH = 293;
const TOPBAR_HEIGHT = 72;
const MAX_UPSCALE = 1.12;

export default function Resources() {
  const [firstName, setFirstName] = useState("");
  const [scale, setScale] = useState(1);
  const navigate = useNavigate();

  /* ================================
     AUTH
================================ */
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
     SCALE — FIGMA FIRST
================================ */
  useEffect(() => {
    const updateScale = () => {
      const usableWidth = window.innerWidth - SIDEBAR_WIDTH;
      const usableHeight = window.innerHeight - TOPBAR_HEIGHT;

      const scaleX = usableWidth / FRAME_WIDTH;
      const scaleY = usableHeight / FRAME_HEIGHT;

      const nextScale = Math.max(
        1,
        Math.min(scaleX, scaleY, MAX_UPSCALE)
      );

      setScale(nextScale);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="relative flex w-screen h-screen bg-primary overflow-hidden">
      {/* ===== SIDEBAR (UNCHANGED) ===== */}
      <Sidebar showTasksAndResources />

      {/* ===== TOPBAR (UNCHANGED) ===== */}
      <TopBar />

      {/* ===== RED CANVAS ===== */}
      <div
        style={{
          flex: 1,
          paddingLeft: SIDEBAR_WIDTH,
          paddingTop: TOPBAR_HEIGHT,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {/* ===== SCALE WRAPPER ===== */}
        <div
          style={{
            width: FRAME_WIDTH,
            height: FRAME_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: "top center",
          }}
        >
          <main
            style={{
              position: "relative",
              width: FRAME_WIDTH,
              height: FRAME_HEIGHT,
            }}
          >
            {/* ================= HEADER ================= */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              style={{
                position: "absolute",
                top: 111,
                left: 372,
                width: 995,
                height: 152,
                background: "#FFFFFF",
                borderRadius: 17,
                boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
              }}
            >
              <h1
                style={{
                  position: "absolute",
                  top: 24,
                  left: 65,
                  width: 802,
                  fontFamily: "Arial",
                  fontWeight: 400,
                  fontSize: 45,
                  lineHeight: "100%",
                }}
              >
                Here’s Your Resource Library,{" "}
                <span style={{ color: "#DF1516" }}>
                  {firstName || "Name"}!
                </span>
              </h1>

              <p
                style={{
                  position: "absolute",
                  top: 99,
                  left: 65,
                  width: 676,
                  fontFamily: "Montserrat",
                  fontWeight: 400,
                  fontSize: 18,
                  lineHeight: "100%",
                }}
              >
                Access your personalized materials to enhance your AIDE journey.
              </p>
            </motion.div>

            {/* ================= RESOURCE CARDS ================= */}

            {/* Mindset Reset Guide */}
            <ResourceCard
              top={285}
              left={372}
              title="Mindset Reset Guide"
              description="Download or explore to apply AIDE principles effectively."
              buttonWidth={203}
            />

            {/* Business Growth Blueprint */}
            <ResourceCard
              top={285}
              left={893}
              title="Business Growth Blueprint"
              description="Download or explore to apply AIDE principles effectively."
              buttonWidth={208}
            />

            {/* Execution Masterclass */}
            <ResourceCard
              top={516}
              left={372}
              title="Execution Masterclass"
              description="Download or explore to apply AIDE principles effectively."
              buttonWidth={203}
            />

            {/* Leadership & Influence Playbook */}
            <ResourceCard
              top={516}
              left={893}
              title="Leadership & Influence Playbook"
              description="Develop leadership skills that help you inspire and influence people effectively."
              buttonWidth={208}
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
                borderRadius: 17,
                padding: 36,
                background: "#FFFFFF",
              }}
            >
              <h3
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: 700,
                  fontSize: 26,
                  marginBottom: 16,
                }}
              >
                Quick Tips
              </h3>

              <ul
                style={{
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  fontSize: 20,
                  lineHeight: "32px",
                  paddingLeft: 20,
                  listStyle: "disc",
                }}
              >
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

/* ================================
   RESOURCE CARD COMPONENT
================================ */
function ResourceCard({
  top,
  left,
  title,
  description,
  buttonWidth,
}: {
  top: number;
  left: number;
  title: string;
  description: string;
  buttonWidth: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width: 474,
        height: 214,
        background: "#FFFFFF",
        borderRadius: 17,
        boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
        padding: 32,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h3
          style={{
            fontFamily: "Montserrat",
            fontWeight: 500,
            fontSize: 24,
            marginBottom: 14,
          }}
        >
          {title}
        </h3>

        <p
          style={{
            fontFamily: "Montserrat",
            fontWeight: 400,
            fontSize: 18,
          }}
        >
          {description}
        </p>
      </div>

      <Button
        style={{
          width: buttonWidth,
          height: 44,
          borderRadius: 17,
          fontFamily: "Montserrat",
          fontWeight: 500,
          fontSize: 20,
        }}
        className="bg-[#DF1516] hover:bg-[#c01314] text-white"
      >
        Access Now
      </Button>
    </div>
  );
}
