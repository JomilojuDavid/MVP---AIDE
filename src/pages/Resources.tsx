import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

/* ================================
   FIGMA LOCKED CONSTANTS
================================ */
const SIDEBAR_WIDTH = 293;
const TOPBAR_HEIGHT = 72;

export default function Resources() {
  const [firstName, setFirstName] = useState("");
  const navigate = useNavigate();

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
    <div className="flex h-screen w-screen bg-primary overflow-hidden">
      <Sidebar showTasksAndResources />
      <TopBar />

      {/* RED BACKGROUND AREA */}
      <div
        style={{
          flex: 1,
          marginLeft: SIDEBAR_WIDTH,
          marginTop: TOPBAR_HEIGHT,
          position: "relative",
          background: "#DF1516",
        }}
      >
        {/* HEADER CARD */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
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
            padding: "28px 36px",
            boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
          }}
        >
          <h1
            style={{
              fontFamily: "Arial",
              fontSize: 45,
              fontWeight: 400,
            }}
          >
            Here’s Your Resource Library,{" "}
            <span style={{ color: "#DF1516" }}>
              {firstName || "Name"}!
            </span>
          </h1>

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

        {/* CARD 1 */}
        <ResourceCard
          top={285}
          left={372}
          bg="#F6C888"
          title="Mindset Reset Guide"
          description="Download or explore to apply AIDE principles effectively."
        />

        {/* CARD 2 */}
        <ResourceCard
          top={285}
          left={893}
          bg="#FFFFFF"
          title="Business Growth Blueprint"
          description="Download or explore to apply AIDE principles effectively."
        />

        {/* CARD 3 */}
        <ResourceCard
          top={516}
          left={372}
          bg="#FFFFFF"
          title="Execution Masterclass"
          description="Download or explore to apply AIDE principles effectively."
        />

        {/* CARD 4 */}
        <ResourceCard
          top={516}
          left={893}
          bg="#F6C888"
          title="Leadership & Influence Playbook"
          description="Develop leadership skills that help you inspire and influence people effectively."
        />

        {/* QUICK TIPS */}
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
          <h3
            style={{
              fontFamily: "Montserrat",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            Quick Tips
          </h3>

          <ul
            style={{
              marginTop: 18,
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
  );
}

/* ================================
   RESOURCE CARD COMPONENT
================================ */
function ResourceCard({
  top,
  left,
  bg,
  title,
  description,
}: {
  top: number;
  left: number;
  bg: string;
  title: string;
  description: string;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        width: 474,
        height: 214,
        background: bg,
        padding: 32,
        boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <h3
          style={{
            fontFamily: "Montserrat",
            fontSize: 24,
            fontWeight: 500,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            marginTop: 14,
            fontFamily: "Montserrat",
            fontSize: 18,
          }}
        >
          {description}
        </p>
      </div>

      <Button
        className="bg-[#DF1516] hover:bg-[#c01314] text-white rounded-[17px] h-[44px] px-8 text-[20px]"
      >
        Access Now
      </Button>
    </div>
  );
}
