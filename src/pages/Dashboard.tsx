import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

interface DashboardProps {
  showQuizPrompt?: boolean;
}

const TOPBAR_OFFSET = 5; // px
const SIDEBAR_WIDTH = 293; // px — sidebar untouched

export default function Dashboard({ showQuizPrompt = false }: DashboardProps) {
  const [firstName, setFirstName] = useState("");
  const [scale, setScale] = useState(1);

  /* ================================
     PROFILE ONLY (NO AUTH REDIRECT)
  ================================= */
  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // ⛔ NO REDIRECT HERE
      if (!session?.user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name")
        .eq("id", session.user.id)
        .single();

      if (profile?.first_name) setFirstName(profile.first_name);
    };

    fetchProfile();
  }, []);

  /* ================================
     INDUSTRY-STANDARD SCALING
  ================================= */
  useEffect(() => {
    const updateScale = () => {
      const scaleX = window.innerWidth / 1512;
      const scaleY = window.innerHeight / 982;
      setScale(Math.min(scaleX, scaleY));
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="relative flex bg-primary h-screen w-screen overflow-hidden">
      <Sidebar showTasksAndResources />
      <TopBar />

      {/* === CENTERING + OPTICAL ADJUSTMENT === */}
      <div
        className="relative flex items-start justify-center w-full h-full"
        style={{
          paddingTop: TOPBAR_OFFSET,
          paddingLeft: SIDEBAR_WIDTH / 2,
        }}
      >
        {/* === SCALE WRAPPER === */}
        <div
          style={{
            width: "1512px",
            height: "982px",
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {/* === DESKTOP CANVAS === */}
          <main
            style={{
              position: "relative",
              width: "1512px",
              height: "982px",
              borderRadius: "30px",
            }}
          >
            {/* === WELCOME CARD === */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                position: "absolute",
                width: "995px",
                height: "152px",
                top: "111px",
                left: "372px",
                background: "#FFFFFF",
                borderRadius: "17px",
                boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
              }}
            >
              <h1
                style={{
                  position: "absolute",
                  top: "24px",
                  left: "65px",
                  fontFamily: "Arial",
                  fontWeight: 400,
                  fontSize: "45px",
                  lineHeight: "45px",
                }}
              >
                Welcome,{" "}
                <span style={{ color: "#DF1516" }}>
                  {firstName || "Name"}!
                </span>
              </h1>

              <p
                style={{
                  position: "absolute",
                  top: "80px",
                  left: "65px",
                  fontFamily: "Montserrat",
                  fontSize: "22px",
                }}
              >
                Moving From Stuck & Stagnant to Clear & Confident.
              </p>
            </motion.div>

            {/* === AIDE ROADMAP === */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{
                position: "absolute",
                width: "995px",
                height: "185px",
                top: "285px",
                left: "372px",
                background: "#FFFFFF",
                boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
              }}
            >
              <h2
                style={{
                  position: "absolute",
                  top: "37px",
                  left: "49px",
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  fontSize: "24px",
                }}
              >
                Your AIDE Roadmap
              </h2>

              <div
                style={{
                  position: "absolute",
                  top: "82px",
                  left: "53px",
                  width: "798px",
                  height: "26px",
                  borderRadius: "50px",
                  border: "1px solid #F3C17E",
                }}
              >
                <div
                  style={{
                    width: showQuizPrompt ? "40px" : "482px",
                    height: "100%",
                    borderRadius: "50px",
                    background: "#DF1516",
                  }}
                />
              </div>

              <p
                style={{
                  position: "absolute",
                  top: "124px",
                  left: "42px",
                  fontFamily: "Montserrat",
                  fontSize: "20px",
                }}
              >
                Awareness → Intention → Decisiveness → Execution
              </p>
            </motion.div>

            {/* === DAILY PROMPT === */}
            <div
              onClick={() => window.open("https://calendar.google.com")}
              style={{
                position: "absolute",
                width: "482px",
                height: "179px",
                top: "493px",
                left: "372px",
                border: "2px solid #F3C17E",
                cursor: "pointer",
              }}
            >
              <h3
                style={{
                  position: "absolute",
                  top: "34px",
                  left: "62px",
                  fontFamily: "Montserrat",
                  fontWeight: 700,
                  fontSize: "26px",
                  color: "#FFFFFF",
                }}
              >
                Daily Prompt
              </h3>

              <p
                style={{
                  position: "absolute",
                  top: "90px",
                  left: "62px",
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  fontSize: "20px",
                  lineHeight: "32px",
                  color: "#FFFFFF",
                }}
              >
                Set one clear intention for today and take one step toward it.
              </p>
            </div>

            {/* === PROGRESS TRACKER === */}
            <div
              style={{
                position: "absolute",
                width: "467px",
                height: "179px",
                top: "493px",
                left: "900px",
                border: "2px solid #F3C17E",
              }}
            >
              <h3
                style={{
                  position: "absolute",
                  top: "34px",
                  left: "47px",
                  fontFamily: "Montserrat",
                  fontWeight: 700,
                  fontSize: "26px",
                  color: "#FFFFFF",
                }}
              >
                Progress Tracker
              </h3>

              <p
                style={{
                  position: "absolute",
                  top: "90px",
                  left: "47px",
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  fontSize: "20px",
                  lineHeight: "32px",
                  color: "#FFFFFF",
                }}
              >
                You’ve completed 2 of 4 stages this month.
              </p>
            </div>

            {/* === QUICK TIPS === */}
            <div
              style={{
                position: "absolute",
                width: "995px",
                height: "208px",
                top: "689px",
                left: "372px",
                border: "2px solid #F3C17E",
              }}
            >
              <h3
                style={{
                  position: "absolute",
                  top: "35px",
                  left: "62px",
                  fontFamily: "Montserrat",
                  fontWeight: 700,
                  fontSize: "26px",
                  color: "#FFFFFF",
                }}
              >
                Quick Tips
              </h3>

              <ul
                style={{
                  position: "absolute",
                  top: "82px",
                  left: "45px",
                  fontFamily: "Montserrat",
                  fontWeight: 500,
                  fontSize: "20px",
                  lineHeight: "32px",
                  color: "#FFFFFF",
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
