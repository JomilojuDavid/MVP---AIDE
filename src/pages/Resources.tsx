import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SIDEBAR_WIDTH = 293;
const TOPBAR_HEIGHT = 72;

export default function Resources() {
  const [firstName, setFirstName] = useState<string>("");
  const navigate = useNavigate();

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
    <div className="flex min-h-screen bg-primary relative">
      <Sidebar showTasksAndResources />
      <TopBar />

      {/* MAIN CONTENT */}
      <main
        style={{
          marginLeft: SIDEBAR_WIDTH,
          marginTop: TOPBAR_HEIGHT,
          width: "calc(100vw - 293px)",
          height: "calc(100vh - 72px)",
          position: "relative",
          backgroundColor: "#DF1516",
          overflow: "hidden",
        }}
      >
        {/* ================= HEADER ================= */}
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
            background: "#FFFFFF",
            borderRadius: 17,
            boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
            paddingLeft: 65,
            paddingTop: 24,
          }}
        >
          <h1
            style={{
              fontFamily: "Arial",
              fontSize: 45,
              fontWeight: 400,
              lineHeight: "100%",
            }}
          >
            Here’s Your Resource Library,{" "}
            <span style={{ color: "#DF1516" }}>
              {firstName || "Name"}!
            </span>
          </h1>

          <p
            style={{
              marginTop: 24,
              fontFamily: "Montserrat",
              fontSize: 18,
              fontWeight: 400,
              lineHeight: "100%",
            }}
          >
            Access your personalized materials to enhance your AIDE journey.
          </p>
        </motion.div>

        {/* ================= RESOURCE CARDS ================= */}
        <ResourceCard
          top={285}
          left={372}
          title="Mindset Reset Guide"
        />

        <ResourceCard
          top={285}
          left={893}
          title="Business Growth Blueprint"
        />

        <ResourceCard
          top={516}
          left={372}
          title="Execution Masterclass"
        />

        <ResourceCard
          top={516}
          left={893}
          title="Leadership & Influence Playbook"
        />

        {/* ================= QUICK TIPS ================= */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{
            position: "absolute",
            top: 747,
            left: 372,
            width: 995,
            height: 208,
            border: "4px solid #F3C17E",
            paddingLeft: 62,
            paddingTop: 35,
            color: "#FFFFFF",
          }}
        >
          <h3
            style={{
              fontFamily: "Montserrat",
              fontSize: 26,
              fontWeight: 700,
              lineHeight: "100%",
            }}
          >
            Quick Tips
          </h3>

          <ul
            style={{
              marginTop: 22,
              fontFamily: "Montserrat",
              fontSize: 20,
              fontWeight: 500,
              lineHeight: "32px",
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

/* ================= RESOURCE CARD ================= */
function ResourceCard({
  top,
  left,
  title,
}: {
  top: number;
  left: number;
  title: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      style={{
        position: "absolute",
        top,
        left,
        width: 474,
        height: 214,
        background: "#FFFFFF",
        boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
        paddingLeft: 59,
        paddingTop: 37,
      }}
    >
      <h3
        style={{
          fontFamily: "Montserrat",
          fontSize: 24,
          fontWeight: 500,
          lineHeight: "100%",
        }}
      >
        {title}
      </h3>

      <p
        style={{
          marginTop: 22,
          width: 353,
          fontFamily: "Montserrat",
          fontSize: 18,
          fontWeight: 400,
          lineHeight: "100%",
        }}
      >
        Download or explore to apply AIDE principles effectively.
      </p>

      <Button
        className="bg-primary text-white hover:bg-primary"
        style={{
          position: "absolute",
          left: 58,
          bottom: 24,
          width: 203,
          height: 44,
          borderRadius: 17,
          fontFamily: "Montserrat",
          fontSize: 20,
          fontWeight: 500,
        }}
      >
        Access Now
      </Button>
    </motion.div>
  );
}
