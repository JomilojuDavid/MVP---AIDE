import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

interface DashboardProps {
  showQuizPrompt?: boolean;
}

export default function Dashboard({ showQuizPrompt = false }: DashboardProps) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");
  const [scale, setScale] = useState<number>(1);

  const CANVAS_WIDTH = 1512;
  const CANVAS_HEIGHT = 982;

  // Dynamically calculate scale based on viewport
  useEffect(() => {
    const handleResize = () => {
      const scaleX = window.innerWidth / CANVAS_WIDTH;
      const scaleY = window.innerHeight / CANVAS_HEIGHT;
      const newScale = Math.min(scaleX, scaleY, 1); // Never scale above original size
      setScale(newScale);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/auth");
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("first_name")
        .eq("id", user.id)
        .single();

      if (profile?.first_name) {
        setFirstName(profile.first_name);
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <div className="relative w-screen h-screen bg-primary overflow-hidden">
      {/* Sidebar and TopBar remain fixed */}
      <Sidebar showTasksAndResources />
      <TopBar />

      {/* === Main Canvas Container: Scaled & Perfectly Centered === */}
      <div className="absolute inset-0 flex items-center justify-center">
        <main
          className="relative"
          style={{
            width: `${CANVAS_WIDTH}px`,
            height: `${CANVAS_HEIGHT}px`,
            borderRadius: "30px",
            transform: `scale(${scale})`,
            transformOrigin: "center center", // Center scaling
          }}
        >
          {/* === Welcome Card === */}
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
              backgroundColor: "#FFFFFF",
              borderRadius: "17px",
              boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
            }}
          >
            <h1
              style={{
                position: "absolute",
                top: "24px",
                left: "65px",
                fontFamily: "Arial, sans-serif",
                fontWeight: 400,
                fontSize: "45px",
                lineHeight: "45px",
              }}
            >
              Welcome, <span style={{ color: "#DF1516" }}>{firstName || "Name"}!</span>
            </h1>

            <p
              style={{
                position: "absolute",
                top: "90px",
                left: "65px",
                width: "589px",
                height: "28px",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 400,
                fontSize: "18px",
                lineHeight: "100%",
                letterSpacing: "0%",
                opacity: 1,
              }}
            >
              Moving from Stuck & Stagnant to Clear & Confident
            </p>
          </motion.div>

          {/* === AIDE Roadmap === */}
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
              backgroundColor: "#FFFFFF",
              borderRadius: "0px",
              boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
            }}
          >
            <h2
              style={{
                position: "absolute",
                top: "37px",
                left: "49px",
                fontFamily: "Montserrat, sans-serif",
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
                backgroundColor: "#FFFFFF",
              }}
            >
              <div
                style={{
                  width: showQuizPrompt ? "40px" : "482px",
                  height: "100%",
                  borderRadius: "50px",
                  backgroundColor: "#DF1516",
                  border: "3px solid #DF1516",
                }}
              />
            </div>

            <p
              style={{
                position: "absolute",
                top: "124px",
                left: "42px",
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 400,
                fontSize: "20px",
              }}
            >
              Awareness → Intention → Decisiveness → Execution
            </p>
          </motion.div>

          {/* === Daily Prompt === */}
          <div
            onClick={() => window.open("https://calendar.google.com", "_blank")}
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
                fontFamily: "Montserrat, sans-serif",
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
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 500,
                fontSize: "20px",
                lineHeight: "32px",
                color: "#FFFFFF",
              }}
            >
              Set one clear intention for today and take one step toward it.
            </p>
          </div>

          {/* === Progress Tracker === */}
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
                fontFamily: "Montserrat, sans-serif",
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
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 500,
                fontSize: "20px",
                lineHeight: "32px",
                color: "#FFFFFF",
              }}
            >
              You’ve completed 2 of 4 stages this month.
            </p>
          </div>

          {/* === Quick Tips === */}
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
                fontFamily: "Montserrat, sans-serif",
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
                fontFamily: "Montserrat, sans-serif",
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
  );
}
