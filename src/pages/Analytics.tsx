import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Analytics() {
  const [firstName, setFirstName] = useState<string>("");
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
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl py-5 px-8"
          >
            <h1 className="text-3xl font-bold text-primary mb-1">
              Performance Analytics
            </h1>
            <p className="text-base text-foreground">
              Track your growth and engagement based on your AIDE activity.
            </p>
          </motion.div>

          {/* Metrics Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-4 gap-4"
          >
            <div className="bg-white py-4 px-5">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                Assessment Completed
              </h3>
              <p className="text-5xl font-bold text-foreground">0</p>
            </div>

            <div className="bg-secondary py-4 px-5">
              <h3 className="text-sm font-medium text-foreground mb-1">
                Tasks Done
              </h3>
              <p className="text-5xl font-bold text-foreground">0</p>
            </div>

            <div className="bg-secondary py-4 px-5">
              <h3 className="text-sm font-medium text-foreground mb-1">
                Time Spent
              </h3>
              <p className="text-5xl font-bold text-foreground">0<span className="text-2xl">hr</span></p>
            </div>

            <div className="bg-white py-4 px-5">
              <h3 className="text-sm font-medium text-muted-foreground mb-1">
                Average Progress
              </h3>
              <p className="text-5xl font-bold text-foreground">0<span className="text-2xl">%</span></p>
            </div>
          </motion.div>

          {/* Goal Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-white py-5 px-8"
          >
            <div className="flex items-center gap-2 mb-3">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-foreground">Goal Tracker</h3>
            </div>
            <p className="text-base text-foreground mb-4">
              You've achieved 0% of your monthly goals. Keep up the consistency!
            </p>
            <div className="relative w-full h-6 bg-secondary rounded-full overflow-hidden">
              <div className="absolute top-0 left-0 h-full w-3 bg-primary rounded-full" />
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white py-5 px-8 flex-1"
          >
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h3 className="text-xl font-bold text-foreground">Recent Activity</h3>
            </div>
            <ul className="space-y-2 text-base text-foreground">
              <li>• Completed "Intention Module" - 2 days ago</li>
              <li>• Attended "Execution Workshop" - 1 week ago</li>
              <li>• Set new personal goal: "Launch my plan" - 3 days ago</li>
            </ul>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
