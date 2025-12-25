import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import LockedCanvas from "@/components/LockedCanvas";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface DashboardProps {
  showQuizPrompt?: boolean;
}

export default function Dashboard({ showQuizPrompt = false }: DashboardProps) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>("");

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

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-white">
      {/* FIXED ELEMENTS */}
      <Sidebar showTasksAndResources />
      <TopBar />

      {/* LOCKED FIGMA CANVAS */}
      <LockedCanvas width={1512} height={982}>
        {/* RED BACKGROUND (FIGMA CANVAS) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundColor: "#DF1516",
            borderRadius: 30,
          }}
        />

        {/* Welcome Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
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
            padding: 24,
          }}
        >
          <h1
            style={{
              fontFamily: "Arial",
              fontSize: 45,
              fontWeight: 400,
            }}
          >
            Welcome,{" "}
            <span style={{ color: "#DF1516" }}>
              {firstName || "Name"}!
            </span>
          </h1>

          <p
            style={{
              marginTop: 16,
              fontFamily: "Montserrat",
              fontSize: 18,
            }}
          >
            Moving from Stuck & Stagnant to Clear & Confident
          </p>
        </motion.div>

        {/* Roadmap */}
        <div
          style={{
            position: "absolute",
            top: 285,
            left: 372,
            width: 995,
            height: 185,
            backgroundColor: "#FFFFFF",
            boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
            padding: 24,
          }}
        >
          <h2 style={{ fontSize: 24, fontFamily: "Montserrat" }}>
            Your AIDE Roadmap
          </h2>

          <div
            style={{
              marginTop: 20,
              width: 798,
              height: 26,
              borderRadius: 50,
              border: "1px solid #F3C17E",
            }}
          >
            <div
              style={{
                width: showQuizPrompt ? 40 : 482,
                height: "100%",
                backgroundColor: "#DF1516",
                borderRadius: 50,
              }}
            />
          </div>

          <p style={{ marginTop: 12, fontSize: 20 }}>
            Awareness → Intention → Decisiveness → Execution
          </p>
        </div>

        {/* Daily Prompt */}
        <div
          style={{
            position: "absolute",
            top: 493,
            left: 372,
            width: 482,
            height: 179,
            border: "2px solid #F3C17E",
            padding: 24,
            color: "#FFFFFF",
          }}
        >
          <h3 style={{ fontSize: 26, fontWeight: 700 }}>
            Daily Prompt
          </h3>
          <p style={{ marginTop: 12, fontSize: 20, lineHeight: "32px" }}>
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
            color: "#FFFFFF",
          }}
        >
          <h3 style={{ fontSize: 26, fontWeight: 700 }}>
            Progress Tracker
          </h3>
          <p style={{ marginTop: 12, fontSize: 20 }}>
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
          <h3 style={{ fontSize: 26, fontWeight: 700 }}>
            Quick Tips
          </h3>
          <ul style={{ marginTop: 16, fontSize: 20, lineHeight: "32px" }}>
            <li>Start your day with clarity.</li>
            <li>Break goals into smaller steps.</li>
            <li>Review wins weekly.</li>
          </ul>
        </div>
      </LockedCanvas>
    </div>
  );
}
