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
  const [firstName, setFirstName] = useState("");

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

  return (
    <LockedCanvas>
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
          padding: 24,
        }}
      >
        <h1 style={{ fontSize: 45, fontFamily: "Arial" }}>
          Welcome, <span style={{ color: "#DF1516" }}>{firstName || "Name"}!</span>
        </h1>
        <p style={{ fontSize: 18, marginTop: 16 }}>
          Moving from Stuck & Stagnant to Clear & Confident
        </p>
      </motion.div>

      {/* Roadmap */}
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
          boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
          padding: 24,
        }}
      >
        <h2 style={{ fontSize: 24 }}>Your AIDE Roadmap</h2>

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
      </motion.div>

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
          cursor: "pointer",
        }}
      >
        <h3 style={{ fontSize: 26 }}>Daily Prompt</h3>
        <p style={{ fontSize: 20, marginTop: 12 }}>
          Set one clear intention for today and take one step toward it.
        </p>
      </div>

      {/* Progress */}
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
        <h3 style={{ fontSize: 26 }}>Progress Tracker</h3>
        <p style={{ fontSize: 20, marginTop: 12 }}>
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
        }}
      >
        <h3 style={{ fontSize: 26 }}>Quick Tips</h3>
        <ul style={{ fontSize: 20, marginTop: 16 }}>
          <li>Start your day with clarity.</li>
          <li>Break goals into smaller steps.</li>
          <li>Review wins weekly.</li>
        </ul>
      </div>
    </LockedCanvas>
  );
}
