import { Button } from "@/components/ui/button";
import LockedCanvas from "@/components/LockedCanvas";
import { useAppLayout } from "@/hooks/useAppLayout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

export default function Assessment() {
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
      {/* HEADER CARD */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute",
          top: 111 + topOffset,
          left: 372,
          width: 995,
          height: 111,
          backgroundColor: "#FFFFFF",
          borderRadius: 17,
          boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p style={{ fontSize: 45, fontFamily: "Arial" }}>
          Your Weekly AIDE Assessment,{" "}
          <span style={{ color: "#DF1516" }}>{firstName || "Name"}!</span>
        </p>
      </motion.div>

      {/* MAIN ASSESSMENT CARD */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        style={{
          position: "absolute",
          top: 245 + topOffset,
          left: 372,
          width: 995,
          height: 401,
          backgroundColor: "#FFFFFF",
          borderRadius: 17,
          boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 24px",
        }}
      >
        <h1
          style={{
            fontSize: 48,
            textAlign: "center",
            width: 700,
            fontFamily: "Arial",
          }}
        >
          Ready to take your AIDE Assessment?
        </h1>

        <p
          style={{
            fontSize: 28,
            textAlign: "center",
            width: 770,
            marginTop: 24,
            fontFamily: "Montserrat",
          }}
        >
          This assessment takes less than 5 minutes and helps us personalize
          your growth experience.
        </p>

        <Button
          onClick={() => navigate("/assessment/start")}
          className="mt-8 bg-[#DF1516] hover:bg-[#c01314] focus:ring-2 focus:ring-offset-2 focus:ring-[#DF1516]"
          style={{
            width: 257,
            height: 52,
            borderRadius: 17,
            fontSize: 20,
          }}
        >
          Take Assessment
        </Button>
      </motion.div>

      {/* QUICK TIPS */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        style={{
          position: "absolute",
          top: 689 + topOffset,
          left: 372,
          width: 995,
          height: 208,
          border: "2px solid #F3C17E",
          padding: 32,
        }}
      >
        <h2 style={{ fontSize: 26, fontWeight: 700 }}>Quick Tips</h2>
        <ul
          style={{
            marginTop: 16,
            fontSize: 20,
            lineHeight: "32px",
            fontFamily: "Montserrat",
          }}
        >
          <li>Start your day with clarity.</li>
          <li>Break goals into smaller steps.</li>
          <li>Review wins weekly.</li>
        </ul>
      </motion.div>
    </LockedCanvas>
  );
}
