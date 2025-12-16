import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import ResponsiveCanvas from "@/components/ResponsiveCanvas";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Assessment() {
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

      if (profile?.first_name) {
        setFirstName(profile.first_name);
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <div className="relative w-screen h-screen bg-primary">
      {/* Sidebar and TopBar */}
      <Sidebar showTasksAndResources />
      <TopBar />

      {/* Main content in ResponsiveCanvas */}
      <ResponsiveCanvas width={1512} height={982}>
        {/* Weekly AIDE Assessment Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            top: "111px",
            left: "372px",
            width: "995px",
            height: "111px",
            backgroundColor: "#FFFFFF",
            borderRadius: "17px",
            boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "45px",
              fontWeight: 400,
              lineHeight: "100%",
            }}
          >
            Your Weekly AIDE Assessment,{" "}
            <span style={{ color: "#DF1516" }}>{firstName || "Name"}!</span>
          </p>
        </motion.div>

        {/* Ready to Take Assessment Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            position: "absolute",
            top: "245px",
            left: "372px",
            width: "995px",
            height: "401px",
            backgroundColor: "#FFFFFF",
            borderRadius: "0px",
            boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: "48px",
              fontWeight: 400,
              textAlign: "center",
              width: "699px",
            }}
          >
            Ready to take your AIDE Assessment?
          </h1>

          <p
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "28px",
              fontWeight: 400,
              textAlign: "center",
              width: "767px",
              marginTop: "24px",
            }}
          >
            This assessment takes less than 5 minutes and helps us personalize your
            growth experience.
          </p>

          <Button
            className="mt-8 bg-[#DF1516] hover:bg-[#c01314]"
            style={{
              width: "257px",
              height: "52px",
              borderRadius: "17px",
              fontFamily: "Montserrat, sans-serif",
              fontSize: "20px",
              fontWeight: 500,
            }}
            aria-label="Take Assessment"
          >
            Take Assessment
          </Button>
        </motion.div>

        {/* Quick Tips Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{
            position: "absolute",
            top: "689px",
            left: "372px",
            width: "995px",
            height: "208px",
            border: "2px solid #F3C17E",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            padding: "32px",
          }}
        >
          <h2
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "26px",
              fontWeight: 700,
              color: "white",
            }}
          >
            Quick Tips
          </h2>

          <ul
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "20px",
              fontWeight: 500,
              lineHeight: "32px",
              marginTop: "16px",
              color: "white",
            }}
          >
            <li>• Start your day with clarity.</li>
            <li>• Break goals into smaller steps.</li>
            <li>• Review wins weekly.</li>
          </ul>
        </motion.div>
      </ResponsiveCanvas>
    </div>
  );
}
