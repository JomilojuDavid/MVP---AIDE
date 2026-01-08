import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const FRAME_WIDTH = 1512;
const FRAME_HEIGHT = 982;
const SIDEBAR_WIDTH = 293;
const TOPBAR_HEIGHT = 68;

export default function Tasks() {
  const [firstName, setFirstName] = useState("");
  const [scale, setScale] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return navigate("/auth");

      const { data } = await supabase
        .from("profiles")
        .select("first_name")
        .eq("id", user.id)
        .single();

      if (data?.first_name) setFirstName(data.first_name);
    };

    fetchProfile();
  }, [navigate]);

  useEffect(() => {
    const updateScale = () => {
      const usableWidth = window.innerWidth - SIDEBAR_WIDTH;
      const usableHeight = window.innerHeight - TOPBAR_HEIGHT;
      setScale(
        Math.min(
          usableWidth / FRAME_WIDTH,
          usableHeight / FRAME_HEIGHT
        )
      );
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#DF1516", overflow: "hidden" }}>
      <Sidebar showTasksAndResources />
      <TopBar />

      <div
        style={{
          position: "absolute",
          left: SIDEBAR_WIDTH,
          top: TOPBAR_HEIGHT,
          right: 0,
          bottom: 0,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: FRAME_WIDTH,
            height: FRAME_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            position: "relative",
          }}
        >
          {/* HEADER */}
          <motion.div
            style={{
              position: "absolute",
              top: 111,
              left: 372,
              width: 995,
              height: 152,
              background: "#fff",
              borderRadius: 17,
              boxShadow: "0px 4px 4px #00000040",
              padding: "24px 36px",
            }}
          >
            <p style={{ fontFamily: "Arial", fontSize: 45 }}>
              Complete Your AIDE Tasks,{" "}
              <span style={{ color: "#DF1516" }}>{firstName || "Name"}!</span>
            </p>
            <p style={{ marginTop: 18, fontFamily: "Montserrat", fontSize: 18 }}>
              Each step brings you closer to clarity, confidence, and execution.
            </p>
          </motion.div>

          {/* TASKS CARD */}
          <div
            style={{
              position: "absolute",
              top: 285,
              left: 372,
              width: 995,
              height: 439,
              background: "#fff",
              boxShadow: "0px 4px 4px #00000040",
              position: "relative", // ✅ FIX
            }}
          >
            {[
              { y: 53, title: "Complete Awareness Journal", body: "Reflect on your current mindset and note key insights." },
              { y: 143, title: "Set weekly intention", body: "Define 3 clear goals for the week to stay aligned." },
              { y: 239, title: "Make One Decisive Move", body: "Take one action that moves you closer to your goal." },
              { y: 339, title: "Execute Your Action Plan", body: "Put your weekly plan into motion and review results." },
            ].map((item, i) => (
              <div key={i}>
                <input
                  type="checkbox"
                  style={{
                    position: "absolute",
                    top: item.y,
                    left: 67,
                    width: 28,
                    height: 24,
                    border: "1px solid #000",
                    appearance: "none",
                  }}
                />

                <p
                  style={{
                    position: "absolute",
                    top: item.y - 6,
                    left: 117,
                    fontFamily: "Montserrat",
                    fontSize: 24,
                    fontWeight: 500,
                  }}
                >
                  {item.title}
                </p>

                <p
                  style={{
                    position: "absolute",
                    top: item.y + 45,
                    left: 119,
                    fontFamily: "Montserrat",
                    fontSize: 18,
                  }}
                >
                  {item.body}
                </p>
              </div>
            ))}

            <Button
              style={{
                position: "absolute",
                bottom: 24,
                right: 24,
                width: 203,
                height: 44,
                borderRadius: 17,
                fontSize: 20,
              }}
              className="bg-[#DF1516] text-white"
            >
              Start Tasks
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
