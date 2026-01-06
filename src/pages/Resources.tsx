import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/* ================================
   FIGMA / LAYOUT CONSTANTS
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

      if (data?.first_name) {
        setFirstName(data.first_name);
      }
    };

    fetchProfile();
  }, [navigate]);

  /* ================================
     SCALE TO VIEWPORT (UNIFORM)
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
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        background: "#DF1516",
        overflow: "hidden",
      }}
    >
      {/* ===== SIDEBAR & TOPBAR (UNCHANGED) ===== */}
      <Sidebar showTasksAndResources />
      <TopBar />

      {/* ===== CONTENT AREA (OFFSET BY SIDEBAR + TOPBAR) ===== */}
      <div
        style={{
          position: "absolute",
          left: SIDEBAR_WIDTH,
          top: TOPBAR_HEIGHT,
          right: 0,
          bottom: 0,
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
          {/* ===== RED FRAME ===== */}
          <div
            style={{
              position: "relative",
              width: FRAME_WIDTH,
              height: FRAME_HEIGHT,
              borderRadius: 30,
            }}
          >
            {/* ================= HEADER CARD ================= */}
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
                backgroundColor: "#FFFFFF",
                borderRadius: 17,
                boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
                padding: "24px 36px",
              }}
            >
              <p
                style={{
                  fontFamily: "Arial",
                  fontSize: 45,
                  lineHeight: "45px",
                }}
              >
                Here’s Your Resource Library,{" "}
                <span style={{ color: "#DF1516" }}>
                  {firstName || "Name"}!
                </span>
              </p>

              <p
                style={{
                  marginTop: 18,
                  fontFamily: "Montserrat",
                  fontSize: 18,
                }}
              >
                Access your personalized materials to enhance your AIDE journey.
              </p>
            </motion.div>

            {/* ================= CARD 1 ================= */}
            <div
              style={{
                position: "absolute",
                top: 285,
                left: 372,
                width: 474,
                height: 214,
                backgroundColor: "#F6C888",
                boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
                padding: 28,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: 24,
                    fontWeight: 500,
                  }}
                >
                  Mindset Reset Guide
                </p>
                <p
                  style={{
                    marginTop: 16,
                    fontFamily: "Montserrat",
                    fontSize: 18,
                  }}
                >
                  Download or explore to apply AIDE principles effectively.
                </p>
              </div>

              <Button
                style={{
                  width: 203,
                  height: 44,
                  borderRadius: 17,
                  fontSize: 20,
                }}
                className="bg-[#DF1516] text-white"
              >
                Access Now
              </Button>
            </div>

            {/* ================= CARD 2 ================= */}
            <div
              style={{
                position: "absolute",
                top: 285,
                left: 893,
                width: 474,
                height: 214,
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
                padding: 28,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: 24,
                    fontWeight: 500,
                  }}
                >
                  Business Growth Blueprint
                </p>
                <p
                  style={{
                    marginTop: 16,
                    fontFamily: "Montserrat",
                    fontSize: 18,
                  }}
                >
                  Download or explore to apply AIDE principles effectively.
                </p>
              </div>

              <Button
                style={{
                  width: 208,
                  height: 44,
                  borderRadius: 17,
                  fontSize: 20,
                }}
                className="bg-[#DF1516] text-white"
              >
                Access Now
              </Button>
            </div>

            {/* ================= CARD 3 ================= */}
            <div
              style={{
                position: "absolute",
                top: 516,
                left: 372,
                width: 474,
                height: 214,
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
                padding: 28,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: 24,
                    fontWeight: 500,
                  }}
                >
                  Execution Masterclass
                </p>
                <p
                  style={{
                    marginTop: 16,
                    fontFamily: "Montserrat",
                    fontSize: 18,
                  }}
                >
                  Download or explore to apply AIDE principles effectively.
                </p>
              </div>

              <Button
                style={{
                  width: 203,
                  height: 44,
                  borderRadius: 17,
                  fontSize: 20,
                }}
                className="bg-[#DF1516] text-white"
              >
                Access Now
              </Button>
            </div>

            {/* ================= CARD 4 ================= */}
            <div
              style={{
                position: "absolute",
                top: 516,
                left: 893,
                width: 474,
                height: 214,
                backgroundColor: "#F6C888",
                boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
                padding: 28,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: "Montserrat",
                    fontSize: 24,
                    fontWeight: 500,
                  }}
                >
                  Leadership & Influence Playbook
                </p>
                <p
                  style={{
                    marginTop: 16,
                    fontFamily: "Montserrat",
                    fontSize: 18,
                  }}
                >
                  Develop leadership skills that help you inspire and influence
                  people effectively.
                </p>
              </div>

              <Button
                style={{
                  width: 208,
                  height: 44,
                  borderRadius: 17,
                  fontSize: 20,
                }}
                className="bg-[#DF1516] text-white"
              >
                Access Now
              </Button>
            </div>

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
              <p
                style={{
                  fontFamily: "Montserrat",
                  fontSize: 26,
                  fontWeight: 700,
                }}
              >
                Quick Tips
              </p>

              <ul
                style={{
                  marginTop: 20,
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
        </div>
      </div>
    </div>
  );
}
