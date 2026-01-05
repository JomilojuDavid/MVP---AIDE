import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/** ===== FIGMA CONSTANTS ===== */
const FRAME_WIDTH = 1512;
const FRAME_HEIGHT = 982;
const SIDEBAR_WIDTH = 293;
const TOPBAR_HEIGHT = 72;
const MAX_SCALE = 1.12;

export default function Resources() {
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();
  const [scale, setScale] = useState(1);

  /** ===== AUTH ===== */
  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name")
        .eq("id", user.id)
        .single();

      if (profile?.first_name) setFirstName(profile.first_name);
    };

    fetchProfile();
  }, [navigate]);

  /** ===== SCALE TO VIEWPORT ===== */
  useEffect(() => {
    const handleResize = () => {
      const availableWidth = window.innerWidth - SIDEBAR_WIDTH;
      const availableHeight = window.innerHeight - TOPBAR_HEIGHT;

      const scaleX = availableWidth / FRAME_WIDTH;
      const scaleY = availableHeight / FRAME_HEIGHT;

      setScale(Math.min(scaleX, scaleY, MAX_SCALE));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-primary">
      <Sidebar showTasksAndResources />
      <TopBar />

      {/* ===== RED AREA ===== */}
      <main
        className="relative flex-1 overflow-hidden"
        style={{ marginTop: TOPBAR_HEIGHT }}
      >
        {/* ===== FIGMA FRAME ===== */}
        <div
          className="absolute left-1/2 top-0 origin-top"
          style={{
            width: FRAME_WIDTH,
            height: FRAME_HEIGHT,
            transform: `translateX(-50%) scale(${scale})`,
          }}
        >
          {/* ===== HEADER CARD ===== */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute bg-white"
            style={{
              width: 995,
              height: 152,
              left: 372,
              top: 111,
              borderRadius: 17,
              boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
              padding: "24px 32px",
            }}
          >
            <h1
              style={{
                fontFamily: "Arial",
                fontSize: 45,
                lineHeight: "100%",
              }}
            >
              Here’s Your Resource Library,{" "}
              <span className="text-primary">{firstName || "Name"}!</span>
            </h1>

            <p
              className="mt-4"
              style={{
                fontFamily: "Montserrat",
                fontSize: 18,
              }}
            >
              Access your personalized materials to enhance your AIDE journey.
            </p>
          </motion.div>

          {/* ===== RESOURCE CARDS ===== */}
          {[
            {
              title: "Mindset Reset Guide",
              left: 372,
              top: 285,
              bg: "#F6C986",
            },
            {
              title: "Business Growth Blueprint",
              left: 893,
              top: 285,
              bg: "#FFFFFF",
            },
            {
              title: "Execution Masterclass",
              left: 372,
              top: 516,
              bg: "#FFFFFF",
            },
            {
              title: "Leadership & Influence Playbook",
              left: 893,
              top: 516,
              bg: "#F6C986",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="absolute"
              style={{
                width: 474,
                height: 214,
                left: card.left,
                top: card.top,
                background: card.bg,
                borderRadius: 12,
                boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
                padding: 24,
              }}
            >
              <h3
                style={{
                  fontFamily: "Montserrat",
                  fontSize: 24,
                  fontWeight: 500,
                }}
              >
                {card.title}
              </h3>

              <p
                className="mt-4"
                style={{
                  fontFamily: "Montserrat",
                  fontSize: 18,
                }}
              >
                Download or explore to apply AIDE principles effectively.
              </p>

              <Button
                className="absolute bg-primary text-white"
                style={{
                  width: 203,
                  height: 44,
                  left: 24,
                  bottom: 24,
                  borderRadius: 17,
                  fontSize: 20,
                  fontWeight: 500,
                }}
              >
                Access Now
              </Button>
            </div>
          ))}

          {/* ===== QUICK TIPS ===== */}
          <div
            className="absolute border-2 border-secondary text-white"
            style={{
              width: 995,
              height: 208,
              left: 372,
              top: 747,
              padding: 32,
            }}
          >
            <h3
              style={{
                fontFamily: "Montserrat",
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              Quick Tips
            </h3>

            <ul
              className="mt-4 space-y-2 list-disc list-inside"
              style={{
                fontFamily: "Montserrat",
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
      </main>
    </div>
  );
}
