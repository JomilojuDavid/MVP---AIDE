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
            <p style={{ fontFamily: "Arial", fontSize: 45, lineHeight: "100%" }}>
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
              position: "relative",
            }}
          >
            {/* TASK 1 */}
            <input
              type="checkbox"
              style={{
                position: "absolute",
                top: 53,   // 338 - 285
                left: 67,  // 439 - 372
                width: 28,
                height: 24,
                border: "1px solid #000",
                appearance: "none",
              }}
            />

            <p
              style={{
                position: "absolute",
                top: 47,   // 332 - 285
                left: 117, // 489 - 372
                fontFamily: "Montserrat",
                fontSize: 24,
                fontWeight: 500,
              }}
            >
              Complete Awareness Journal
            </p>

            <p
              style={{
                position: "absolute",
                top: 98,   // 383 - 285
                left: 119, // 491 - 372
                fontFamily: "Montserrat",
                fontSize: 18,
              }}
            >
              Reflect on your current mindset and note key insights.
            </p>

            {/* TASK 2 */}
            <input
              type="checkbox"
              style={{
                position: "absolute",
                top: 143, // 428 - 285
                left: 65,
                width: 28,
                height: 24,
                border: "1px solid #000",
                appearance: "none",
              }}
            />

            <p
              style={{
                position: "absolute",
                top: 137,
                left: 115,
                fontFamily: "Montserrat",
                fontSize: 24,
                fontWeight: 500,
              }}
            >
              Set Weekly Intention
            </p>

            <p
              style={{
                position: "absolute",
                top: 188,
                left: 117,
                fontFamily: "Montserrat",
                fontSize: 18,
              }}
            >
              Define 3 clear goals for the week to stay aligned.
            </p>

            {/* TASK 3 */}
            <input
              type="checkbox"
              style={{
                position: "absolute",
                top: 239,
                left: 65,
                width: 28,
                height: 24,
                border: "1px solid #000",
                appearance: "none",
              }}
            />

            <p
              style={{
                position: "absolute",
                top: 233,
                left: 115,
                fontFamily: "Montserrat",
                fontSize: 24,
                fontWeight: 500,
              }}
            >
              Make One Decisive Move
            </p>

            <p
              style={{
                position: "absolute",
                top: 284,
                left: 117,
                fontFamily: "Montserrat",
                fontSize: 18,
              }}
            >
              Take one action that moves you closer to your goal.
            </p>

            {/* TASK 4 */}
            <input
              type="checkbox"
              style={{
                position: "absolute",
                top: 339,
                left: 65,
                width: 28,
                height: 24,
                border: "1px solid #000",
                appearance: "none",
              }}
            />

            <p
              style={{
                position: "absolute",
                top: 333,
                left: 115,
                fontFamily: "Montserrat",
                fontSize: 24,
                fontWeight: 500,
              }}
            >
              Execute Your Action Plan
            </p>

            <p
              style={{
                position: "absolute",
                top: 384,
                left: 117,
                fontFamily: "Montserrat",
                fontSize: 18,
              }}
            >
              Put your weekly plan into motion and review results.
            </p>

            {/* START TASKS BUTTON */}
            <Button
              style={{
                position: "absolute",
                top: 376,  // 661 - 285
                left: 741, // 1113 - 372
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
