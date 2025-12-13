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

      if (profile?.first_name) {
        setFirstName(profile.first_name);
      }
    };

    fetchProfile();
  }, [navigate]);

  return (
    <div className="flex h-screen bg-primary relative overflow-hidden">
      <Sidebar showTasksAndResources={true} />
      <TopBar />
      
      <main className="flex-1 md:ml-64 p-6 md:p-8 overflow-auto pt-20">
        <div className="max-w-7xl mx-auto space-y-5">
          {/* Welcome Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-6 md:p-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Welcome, <span className="text-primary">{firstName || "Name"}!</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground">Moving from Stuck & Stagnant to Clear & Confident</p>
          </motion.div>

          {/* AIDE Roadmap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl p-6 md:p-8"
          >
            <h2 className="text-2xl md:text-3xl font-semibold mb-5 text-foreground">Your AIDE Roadmap</h2>
            
            {/* Progress Bar */}
            <div className="relative w-full h-4 bg-[#FFD9D9] mb-5 overflow-hidden rounded-full">
              <div 
                className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: showQuizPrompt ? '5%' : '25%' }}
              />
            </div>

            {/* Stages */}
            <div className="flex flex-wrap gap-3 md:gap-4 items-center text-base md:text-lg font-medium text-foreground">
              <span>Awareness</span>
              <span>→</span>
              <span>Intention</span>
              <span>→</span>
              <span>Decisiveness</span>
              <span>→</span>
              <span>Execution</span>
            </div>
          </motion.div>

          {/* Dashboard Content - Always show */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid md:grid-cols-2 gap-5"
          >
            {/* Daily Prompt */}
            <div onClick={() => window.open('https://calendar.google.com', '_blank')} className="cursor-pointer bg-primary border-2 border-[#F3C17E] p-5">
              <h3 className="text-xl font-bold mb-3 text-white">Daily Prompt</h3>
              <p className="text-base text-white">
                "Set one clear intention for today and take one step toward it."
              </p>
            </div>

            {/* Progress Tracker */}
            <div className="bg-primary border-2 border-[#F3C17E] p-5">
              <h3 className="text-xl font-bold mb-3 text-white">Progress Tracker</h3>
              <p className="text-base text-white">
                You've completed 2 of 4 stages this month.
              </p>
            </div>

            {/* Quick Tips */}
            <div className="md:col-span-2 bg-primary border-2 border-[#F3C17E] p-5">
              <h3 className="text-xl font-bold mb-4 text-white">Quick Tips</h3>
              <ul className="space-y-2 text-base text-white list-disc list-inside">
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

