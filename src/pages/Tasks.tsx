import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/* ===== FRAME CONSTANTS (CONSISTENT WITH OTHER PAGES) ===== */
const FRAME_WIDTH = 1512;
const FRAME_HEIGHT = 982;
const SIDEBAR_WIDTH = 293;
const TOPBAR_HEIGHT = 68;

export default function Tasks() {
  const [firstName, setFirstName] = useState("");
  const [scale, setScale] = useState(1);
  const navigate = useNavigate();

  /* ================= AUTH ================= */
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

  /* ================= SCALE ================= */
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
      <Sidebar showTasksAndResources />
      <TopBar />

      {/* ===== CONTENT AREA ===== */}
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
            transformOrigin: "top left",
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
                  fontWeight: 400,
                  fontSize: 45,
                  lineHeight: "100%",
                }}
              >
                Complete Your AIDE Tasks,{" "}
                <span style={{ color: "#DF1516" }}>
                  {firstName || "Name"}!
                </span>
              </p>

              <p
                style={{
                  marginTop: 18,
                  fontFamily: "Montserrat",
                  fontSize: 18,
                  fontWeight: 400,
                }}
              >
                Each step brings you closer to clarity, confidence, and execution.
              </p>
            </motion.div>

            {/* ================= TASKS RECTANGLE ================= */}
            <div
              style={{
                position: "absolute",
                top: 285,
                left: 372,
                width: 995,
                height: 439,
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
              }}
            >
              {/* ===== CHECKBOX STYLE ===== */}
              {[
                { cbTop: 338, titleTop: 332, bodyTop: 383, title: "Complete Awareness Journal", body: "Reflect on your current mindset and note key insights." },
                { cbTop: 428, titleTop: 422, bodyTop: 473, title: "Set weekly intention", body: "Define 3 clear goals for the week to stay aligned." },
                { cbTop: 524, titleTop: 518, bodyTop: 569, title: "Make One Decisive Move", body: "Take one action that moves you closer to your goal." },
                { cbTop: 624, titleTop: 618, bodyTop: 669, title: "Execute Your Action Plan", body: "Put your weekly plan into motion and review results." },
              ].map((item, index) => (
                <div key={index}>
                  <input
                    type="checkbox"
                    style={{
                      position: "absolute",
                      top: item.cbTop,
                      left: 437,
                      width: 28,
                      height: 24,
                      border: "1px solid #000",
                      appearance: "none",
                      background: "#FFF",
                    }}
                  />

                  <p
                    style={{
                      position: "absolute",
                      top: item.titleTop,
                      left: 487,
                      width: 382,
                      height: 29,
                      fontFamily: "Montserrat",
                      fontWeight: 500,
                      fontSize: 24,
                      lineHeight: "100%",
                    }}
                  >
                    {item.title}
                  </p>

                  <p
                    style={{
                      position: "absolute",
                      top: item.bodyTop,
                      left: 489,
                      width: 583,
                      height: 28,
                      fontFamily: "Montserrat",
                      fontWeight: 400,
                      fontSize: 18,
                      lineHeight: "100%",
                    }}
                  >
                    {item.body}
                  </p>
                </div>
              ))}

              {/* ================= START TASKS BUTTON ================= */}
              <Button
                style={{
                  position: "absolute",
                  top: 661,
                  left: 1113,
                  width: 203,
                  height: 44,
                  borderRadius: 17,
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  fontSize: 20,
                }}
                className="bg-[#DF1516] text-white hover:bg-[#c01314]"
              >
                Start Tasks
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
