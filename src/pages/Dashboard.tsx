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
    <div className="flex h-screen bg-primary overflow-hidden">
      <Sidebar showTasksAndResources />

      <TopBar />

      <main className="flex-1 md:ml-64 pt-8 px-6 flex flex-col">
        <div className="max-w-4xl mx-auto w-full flex flex-col gap-3 flex-1">
          {/* Welcome Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl py-4 px-6"
          >
            <h1 className="text-2xl font-bold mb-1">
              Welcome,{" "}
              <span className="text-primary">{firstName || "Name"}!</span>
            </h1>
            <p className="text-sm text-foreground">
              Moving from Stuck & Stagnant to Clear & Confident
            </p>
          </motion.div>

          {/* AIDE Roadmap */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl py-4 px-6"
          >
            <h2 className="text-lg font-semibold mb-3 text-foreground">
              Your AIDE Roadmap
            </h2>

            {/* Progress Bar */}
            <div className="relative w-full h-3 bg-[#FFD9D9] mb-3 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: showQuizPrompt ? "5%" : "25%" }}
              />
            </div>

            {/* Stages */}
            <div className="flex flex-wrap gap-2 items-center text-sm font-medium text-foreground">
              <span>Awareness</span>
              <span>→</span>
              <span>Intention</span>
              <span>→</span>
              <span>Decisiveness</span>
              <span>→</span>
              <span>Execution</span>
            </div>
          </motion.div>

          {/* Bottom Content */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-3 flex-1"
          >
            {/* Daily Prompt */}
            <div
              onClick={() =>
                window.open("https://calendar.google.com", "_blank")
              }
              className="cursor-pointer bg-primary border-2 border-[#F3C17E] py-3 px-4"
            >
              <h3 className="text-base font-bold mb-2 text-white">
                Daily Prompt
              </h3>
              <p className="text-sm text-white">
                "Set one clear intention for today and take one step toward it."
              </p>
            </div>

            {/* Progress Tracker */}
            <div className="bg-primary border-2 border-[#F3C17E] py-3 px-4">
              <h3 className="text-base font-bold mb-2 text-white">
                Progress Tracker
              </h3>
              <p className="text-sm text-white">
                You've completed 2 of 4 stages this month.
              </p>
            </div>

            {/* Quick Tips */}
            <div className="md:col-span-2 bg-primary border-2 border-[#F3C17E] py-3 px-4">
              <h3 className="text-base font-bold mb-2 text-white">
                Quick Tips
              </h3>
              <ul className="space-y-1 text-sm text-white list-disc list-inside">
                <li>Start your day with clarity.</li>
                <li>Break goals into smaller steps.</li>
                <li>Review wins weekly.</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
