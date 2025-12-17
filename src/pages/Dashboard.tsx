import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import LockedCanvas from "@/components/LockedCanvas";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import aideLogo from "@/assets/aide-logo.png";

interface DashboardProps {
  showQuizPrompt?: boolean;
}

export default function Dashboard({ showQuizPrompt = false }: DashboardProps) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");

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

      if (profile?.first_name) setFirstName(profile.first_name);
    };

    fetchProfile();
  }, [navigate]);

  return (
    <div className="relative w-screen h-screen bg-primary overflow-hidden">
      {/* Sidebar */}
      <Sidebar showTasksAndResources />

      {/* TopBar */}
      <TopBar />

      {/* Logo */}
      <img
        src={aideLogo}
        alt="AIDE Logo"
        className="absolute top-[19px] left-[26px] w-[167px] h-[132px]"
      />

      {/* Main content in LockedCanvas */}
      <LockedCanvas width={1512} height={982}>
        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            top: 111,
            left: 372,
            width: 995,
            height: 152,
            backgroundColor: "#FFFFFF",
            borderRadius: 17,
            boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
            padding: "24px",
          }}
        >
          <h1
            style={{
              fontFamily: "Arial, sans-serif",
              fontWeight: 400,
              fontSize: 45,
              lineHeight: "45px",
            }}
          >
            Welcome, <span style={{ color: "#DF1516" }}>{firstName || "Name"}!</span>
          </h1>
          <p
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 400,
              fontSize: 18,
              marginTop: 16,
            }}
          >
            Moving from Stuck & Stagnant to Clear & Confident
          </p>
        </motion.div>

        {/* AIDE Roadmap */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            position: "absolute",
            top: 285,
            left: 372,
            width: 995,
            height: 185,
            backgroundColor: "#FFFFFF",
            borderRadius: 0,
            boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
            padding: "24px",
          }}
        >
          <h2
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 500,
              fontSize: 24,
            }}
          >
            Your AIDE Roadmap
          </h2>
          <div
            style={{
              marginTop: 20,
              width: 798,
              height: 26,
              borderRadius: 50,
              border: "1px solid #F3C17E",
              backgroundColor: "#FFFFFF",
            }}
          >
            <div
              style={{
                width: showQuizPrompt ? "40px" : "482px",
                height: "100%",
                borderRadius: 50,
                backgroundColor: "#DF1516",
                border: "3px solid #DF1516",
              }}
            />
          </div>
          <p
            style={{
              marginTop: 12,
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 400,
              fontSize: 20,
            }}
          >
            Awareness → Intention → Decisiveness → Execution
          </p>
        </motion.div>

        {/* Daily Prompt */}
        <div
          onClick={() => window.open("https://calendar.google.com", "_blank")}
          style={{
            position: "absolute",
            top: 493,
            left: 372,
            width: 482,
            height: 179,
            border: "2px solid #F3C17E",
            cursor: "pointer",
            padding: 24,
          }}
        >
          <h3
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 700,
              fontSize: 26,
              color: "#FFFFFF",
            }}
          >
            Daily Prompt
          </h3>
          <p
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 500,
              fontSize: 20,
              lineHeight: "32px",
              color: "#FFFFFF",
              marginTop: 12,
            }}
          >
            Set one clear intention for today and take one step toward it.
          </p>
        </div>

        {/* Progress Tracker */}
        <div
          style={{
            position: "absolute",
            top: 493,
            left: 900,
            width: 467,
            height: 179,
            border: "2px solid #F3C17E",
            padding: 24,
          }}
        >
          <h3
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 700,
              fontSize: 26,
              color: "#FFFFFF",
            }}
          >
            Progress Tracker
          </h3>
          <p
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 500,
              fontSize: 20,
              lineHeight: "32px",
              color: "#FFFFFF",
              marginTop: 12,
            }}
          >
            You’ve completed 2 of 4 stages this month.
          </p>
        </div>

        {/* Quick Tips */}
        <div
          style={{
            position: "absolute",
            top: 689,
            left: 372,
            width: 995,
            height: 208,
            border: "2px solid #F3C17E",
            padding: 32,
            color: "#FFFFFF",
          }}
        >
          <h3
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 700,
              fontSize: 26,
            }}
          >
            Quick Tips
          </h3>
          <ul
            style={{
              marginTop: 16,
              fontFamily: "Montserrat, sans-serif",
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
      </LockedCanvas>
    </div>
  );
}
