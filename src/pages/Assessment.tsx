import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import ResponsiveCanvas from "@/components/ResponsiveCanvas";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

export default function Assessment() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");

  /* ===== TOPBAR OFFSET SYSTEM ===== */
  const topBarRef = useRef<HTMLDivElement | null>(null);
  const [topOffset, setTopOffset] = useState(0);

  // Measure TopBar height safely (no reflow, no scroll)
  useLayoutEffect(() => {
    if (topBarRef.current) {
      setTopOffset(topBarRef.current.offsetHeight + 24); // 24px breathing room
    }
  }, []);

  /* ===== FETCH USER ===== */
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
    <div className="relative w-screen h-screen bg-primary overflow-hidden">
      {/* FIXED LAYOUT */}
      <Sidebar showTasksAndResources />

      {/* Wrap TopBar so we can measure it */}
      <div ref={topBarRef}>
        <TopBar />
      </div>

      {/* ================= DESKTOP & TABLET ================= */}
      <div className="hidden lg:block">
        <ResponsiveCanvas width={1512} height={982} minScale={0.75} maxScale={1}>
          {/* HEADER */}
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
              background: "#FFFFFF",
              borderRadius: 17,
              boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p style={{ fontSize: 45, fontFamily: "Arial" }}>
              Your Weekly AIDE Assessment,{" "}
              <span style={{ color: "#DF1516" }}>
                {firstName || "Name"}!
              </span>
            </p>
          </motion.div>

          {/* MAIN CARD */}
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
              background: "#FFFFFF",
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
            <h2 style={{ fontSize: 26, fontWeight: 700 }}>
              Quick Tips
            </h2>

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
        </ResponsiveCanvas>
      </div>

      {/* ================= MOBILE ================= */}
      <div
        className="lg:hidden px-4 space-y-6"
        style={{ paddingTop: topOffset + 16 }}
      >
        <div className="bg-white rounded-[17px] p-6 shadow text-center">
          <p className="text-2xl">
            Your Weekly AIDE Assessment,{" "}
            <span className="text-[#DF1516]">
              {firstName || "Name"}!
            </span>
          </p>
        </div>

        <div className="bg-white rounded-[17px] p-6 shadow text-center">
          <h1 className="text-2xl">
            Ready to take your AIDE Assessment?
          </h1>

          <p className="text-lg mt-4">
            This assessment takes less than 5 minutes and helps personalize your
            growth experience.
          </p>

          <Button
            onClick={() => navigate("/assessment/start")}
            className="mt-6 w-full bg-[#DF1516] hover:bg-[#c01314]"
          >
            Take Assessment
          </Button>
        </div>

        <div className="border-2 border-[#F3C17E] p-6">
          <h2 className="font-bold text-xl">Quick Tips</h2>
          <ul className="mt-3 space-y-2">
            <li>Start your day with clarity.</li>
            <li>Break goals into smaller steps.</li>
            <li>Review wins weekly.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
