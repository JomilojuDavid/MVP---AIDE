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

  return (
    <div className="relative flex bg-primary overflow-hidden">
      <Sidebar showTasksAndResources />
      <TopBar />

      {/* === DESKTOP CANVAS === */}
      <main
        className="relative"
        style={{
          width: "1512px",
          height: "982px",
          borderRadius: "30px",
        }}
      >
        {/* ========================= */}
        {/* YOUR WEEKLY AIDE CARD */}
        {/* ========================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "absolute",
            width: "995px",
            height: "111px",
            top: "142px",
            left: "371px",
            backgroundColor: "#FFFFFF",
            borderRadius: "17px",
            boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
            display: "flex",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              marginLeft: "65px",
              fontFamily: "Arial, sans-serif",
              fontWeight: 400,
              fontSize: "45px",
              lineHeight: "45px",
              whiteSpace: "nowrap",
            }}
          >
            Your Weekly AIDE Assessment,{" "}
            <span style={{ color: "#DF1516" }}>
              {firstName || "Name"}!
            </span>
          </h1>
        </motion.div>

        {/* ========================= */}
        {/* READY TO TAKE ASSESSMENT */}
        {/* ========================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{
            position: "absolute",
            width: "995px",
            height: "401px",
            top: "285px",
            left: "372px",
            backgroundColor: "#FFFFFF",
            borderRadius: "17px",
            boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2
            style={{
              marginTop: "53px",
              width: "699px",
              fontFamily: "Arial, sans-serif",
              fontWeight: 400,
              fontSize: "48px",
              lineHeight: "48px",
              textAlign: "center",
            }}
          >
            Ready to take your AIDE Assessment?
          </h2>

          <p
            style={{
              marginTop: "30px",
              width: "767px",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 400,
              fontSize: "28px",
              lineHeight: "28px",
              textAlign: "center",
            }}
          >
            This assessment takes less than 5 minutes and helps us personalize
            your growth experience.
          </p>

          <button
            onClick={() => navigate("/assessment/start")}
            style={{
              marginTop: "42px",
              width: "257px",
              height: "52px",
              borderRadius: "17px",
              backgroundColor: "#DF1516",
              color: "#FFFFFF",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 500,
              fontSize: "20px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Take Assessment
          </button>
        </motion.div>

        {/* ========================= */}
        {/* QUICK TIPS */}
        {/* ========================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{
            position: "absolute",
            width: "995px",
            height: "208px",
            top: "747px",
            left: "371px",
            border: "2px solid #F3C17E",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <h3
            style={{
              marginTop: "35px",
              marginLeft: "62px",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 700,
              fontSize: "26px",
              lineHeight: "26px",
              color: "#FFFFFF",
            }}
          >
            Quick Tips
          </h3>

          <ul
            style={{
              marginTop: "21px",
              marginLeft: "62px",
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
        </motion.div>
      </main>
    </div>
  );
}
