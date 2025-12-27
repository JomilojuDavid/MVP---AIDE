import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SIDEBAR_WIDTH = 293; // px
const CANVAS_WIDTH = 1512;
const CANVAS_HEIGHT = 982;

const resources = [
  {
    id: 1,
    title: "Mindset Reset Guide",
    description: "Download or explore to apply AIDE principles effectively.",
    variant: "secondary" as const,
  },
  {
    id: 2,
    title: "Business Growth Blueprint",
    description: "Download or explore to apply AIDE principles effectively.",
    variant: "white" as const,
  },
  {
    id: 3,
    title: "Execution Masterclass",
    description: "Download or explore to apply AIDE principles effectively.",
    variant: "secondary" as const,
  },
  {
    id: 4,
    title: "Leadership & Influence Playbook",
    description: "Develop leadership skills that help you inspire and influence people effectively.",
    variant: "white" as const,
  },
];

export default function Resources() {
  const [firstName, setFirstName] = useState<string>("");
  const [scale, setScale] = useState(1);
  const navigate = useNavigate();

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

  // Industry-standard scaling for viewport fit
  useEffect(() => {
    const updateScale = () => {
      const scaleX = window.innerWidth / CANVAS_WIDTH;
      const scaleY = window.innerHeight / CANVAS_HEIGHT;
      setScale(Math.min(scaleX, scaleY));
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="flex h-screen bg-primary overflow-hidden">
      <Sidebar showTasksAndResources />
      <TopBar />

      {/* === CENTERING + SIDEBAR + TOPBAR OFFSET === */}
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          paddingLeft: SIDEBAR_WIDTH / 2,
          paddingTop: 10, // top offset for TopBar
        }}
      >
        {/* === SCALE WRAPPER === */}
        <div
          style={{
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            position: "relative",
          }}
        >
          <main className="flex-1 flex flex-col px-6 pt-8">
            <div className="max-w-4xl mx-auto w-full flex flex-col gap-3 flex-1">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white rounded-2xl py-5 px-8"
              >
                <h1 className="text-3xl font-bold mb-1">
                  Here's Your Resource Library,{" "}
                  <span className="text-primary">{firstName || "Name"}!</span>
                </h1>
                <p className="text-base text-foreground">
                  Access your personalized materials to enhance your AIDE journey.
                </p>
              </motion.div>

              {/* Resources Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-2 gap-4 flex-1"
              >
                {resources.map((resource) => (
                  <div
                    key={resource.id}
                    className={`py-5 px-6 flex flex-col ${
                      resource.variant === "secondary"
                        ? "bg-secondary"
                        : "bg-white"
                    }`}
                  >
                    <h3 className="text-xl font-bold mb-2 text-foreground">
                      {resource.title}
                    </h3>
                    <p className="text-base text-foreground mb-4 flex-1">
                      {resource.description}
                    </p>
                    <div>
                      <Button className="bg-primary text-white hover:bg-primary/90 h-10 px-5 text-sm font-bold rounded-full">
                        Access Now
                      </Button>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Quick Tips */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="bg-primary border-2 border-secondary py-5 px-8 text-white"
              >
                <h3 className="text-xl font-bold mb-3">Quick Tips</h3>
                <ul className="space-y-1 text-base list-disc list-inside">
                  <li>Start your day with clarity.</li>
                  <li>Break goals into smaller steps.</li>
                  <li>Review wins weekly.</li>
                </ul>
              </motion.div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
