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
  const [firstName, setFirstName] = useState("");

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

  return (
    <div className="flex w-screen h-screen bg-primary overflow-auto relative">
      {/* Sidebar and TopBar */}
      <Sidebar showTasksAndResources />
      <TopBar />

      {/* Main Content */}
      <main className="flex-1 relative p-6 flex flex-col gap-6 min-h-screen">
        {/* === Welcome Card === */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white shadow-md rounded-lg p-6 w-full max-w-[995px]"
        >
          <h1 className="text-4xl font-normal">
            Welcome, <span className="text-red-600">{firstName || "Name"}!</span>
          </h1>
        </motion.div>

        {/* === AIDE Roadmap === */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white shadow-md rounded-lg p-6 w-full max-w-[995px]"
        >
          <h2 className="text-2xl font-medium mb-4">Your AIDE Roadmap</h2>
          <div className="w-full h-6 bg-transparent border rounded-full border-yellow-300">
            <div
              className="h-full rounded-full bg-red-600"
              style={{ width: showQuizPrompt ? "5%" : "50%" }}
            />
          </div>
          <p className="mt-4 text-lg">
            Awareness → Intention → Decisiveness → Execution
          </p>
        </motion.div>

        {/* === Daily Prompt & Progress Tracker === */}
        <div className="flex gap-6 flex-wrap">
          <div
            onClick={() => window.open("https://calendar.google.com")}
            className="flex-1 bg-yellow-300 cursor-pointer rounded-lg p-6 min-w-[300px]"
          >
            <h3 className="text-xl font-bold text-white mb-2">Daily Prompt</h3>
            <p className="text-white text-lg">
              Set one clear intention for today and take one step toward it.
            </p>
          </div>

          <div className="flex-1 bg-yellow-300 rounded-lg p-6 min-w-[300px]">
            <h3 className="text-xl font-bold text-white mb-2">Progress Tracker</h3>
            <p className="text-white text-lg">
              You’ve completed 2 of 4 stages this month.
            </p>
          </div>
        </div>

        {/* === Quick Tips === */}
        <div className="bg-yellow-300 rounded-lg p-6 w-full max-w-[995px]">
          <h3 className="text-xl font-bold text-white mb-4">Quick Tips</h3>
          <ul className="text-white text-lg list-disc list-inside space-y-2">
            <li>Start your day with clarity.</li>
            <li>Break goals into smaller steps.</li>
            <li>Review wins weekly.</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
