import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { LockedCanvas } from "@/components/LockedCanvas";
import { motion } from "framer-motion";
import { useAppLayout } from "@/hooks/useAppLayout";  


export default function Dashboard({ showQuizPrompt = false }: { showQuizPrompt?: boolean }) {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const { topOffset } = useAppLayout();

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
    <LockedCanvas>
      {/* WELCOME CARD */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "absolute",
          top: 111 + topOffset,
          left: 372,
          width: 995,
          height: 152,
          backgroundColor: "#FFFFFF",
          borderRadius: 17,
          boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
        }}
      >
        <h1
          style={{
            position: "absolute",
            top: 24,
            left: 65,
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
            position: "absolute",
            top: 90,
            left: 65,
            width: 589,
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 400,
            fontSize: 18,
            lineHeight: "100%",
            color: "#000",
          }}
        >
          Moving from Stuck & Stagnant to Clear & Confident
        </p>
      </motion.div>

      {/* ROADMAP */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        style={{
          position: "absolute",
          top: 285 + topOffset,
          left: 372,
          width: 995,
          height: 185,
          backgroundColor: "#FFFFFF",
          borderRadius: 0,
          boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
        }}
      >
        <h2
          style={{
            position: "absolute",
            top: 37,
            left: 49,
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 500,
            fontSize: 24,
          }}
        >
          Your AIDE Roadmap
        </h2>

        <div
          style={{
            position: "absolute",
            top: 82,
            left: 53,
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
            position: "absolute",
            top: 124,
            left: 42,
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 400,
            fontSize: 20,
          }}
        >
          Awareness → Intention → Decisiveness → Execution
        </p>
      </motion.div>

      {/* DAILY PROMPT */}
      <div
        onClick={() => window.open("https://calendar.google.com", "_blank")}
        style={{
          position: "absolute",
          width: 482,
          height: 179,
          top: 493 + topOffset,
          left: 372,
          border: "2px solid #F3C17E",
          cursor: "pointer",
        }}
      >
        <h3
          style={{
            position: "absolute",
            top: 34,
            left: 62,
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
            position: "absolute",
            top: 90,
            left: 62,
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 500,
            fontSize: 20,
            lineHeight: "32px",
            color: "#FFFFFF",
          }}
        >
          Set one clear intention for today and take one step toward it.
        </p>
      </div>

      {/* PROGRESS TRACKER */}
      <div
        style={{
          position: "absolute",
          width: 467,
          height: 179,
          top: 493 + topOffset,
          left: 900,
          border: "2px solid #F3C17E",
        }}
      >
        <h3
          style={{
            position: "absolute",
            top: 34,
            left: 47,
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
            position: "absolute",
            top: 90,
            left: 47,
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 500,
            fontSize: 20,
            lineHeight: "32px",
            color: "#FFFFFF",
          }}
        >
          You’ve completed 2 of 4 stages this month.
        </p>
      </div>

      {/* QUICK TIPS */}
      <div
        style={{
          position: "absolute",
          width: 995,
          height: 208,
          top: 689 + topOffset,
          left: 372,
          border: "2px solid #F3C17E",
        }}
      >
        <h3
          style={{
            position: "absolute",
            top: 35,
            left: 62,
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 700,
            fontSize: 26,
            color: "#FFFFFF",
          }}
        >
          Quick Tips
        </h3>

        <ul
          style={{
            position: "absolute",
            top: 82,
            left: 45,
            fontFamily: "Montserrat, sans-serif",
            fontWeight: 500,
            fontSize: 20,
            lineHeight: "32px",
            color: "#FFFFFF",
          }}
        >
          <li>Start your day with clarity.</li>
          <li>Break goals into smaller steps.</li>
          <li>Review wins weekly.</li>
        </ul>
      </div>
    </LockedCanvas>
  );
}
