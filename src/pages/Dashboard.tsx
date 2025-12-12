import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Button } from "@/components/ui/button";
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
    <div className="flex min-h-screen bg-primary relative">
      <Sidebar showTasksAndResources={true} />
      <TopBar />
      
      <main className="flex-1 md:ml-64 p-8 md:p-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Welcome Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 md:p-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome, <span className="text-primary">{firstName || "Name"}!</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground">Moving from Stuck & Stagnant to Clear & Confident</p>
          </motion.div>

          {/* AIDE Roadmap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-3xl p-8 md:p-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-foreground">Your AIDE Roadmap</h2>
            
            {/* Progress Bar */}
            <div className="relative w-full h-4 bg-[#FFD9D9] rounded-full mb-6 overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: showQuizPrompt ? '5%' : '25%' }}
              />
            </div>

            {/* Stages */}
            <div className="flex flex-wrap gap-2 md:gap-4 items-center text-lg md:text-xl font-medium text-foreground">
              <span>Awareness</span>
              <span>→</span>
              <span>Intention</span>
              <span>→</span>
              <span>Decisiveness</span>
              <span>→</span>
              <span>Execution</span>
            </div>
          </motion.div>

          {showQuizPrompt ? (
            /* Quiz Prompt Card */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6"
            >
              <p className="text-xl md:text-2xl text-foreground">
                To unlock your personalized dashboard, take our quick quiz.
              </p>
              <Button
                onClick={() => navigate("/quiz")}
                className="bg-primary text-white hover:bg-primary/90 h-14 px-10 text-lg font-bold rounded-full uppercase transition-all whitespace-nowrap"
              >
                Take Quiz
              </Button>
            </motion.div>
          ) : (
            /* Full Dashboard Content */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid md:grid-cols-2 gap-6"
            >
              {/* Daily Prompt */}
              <div className="bg-white border-2 border-primary rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 text-primary">Daily Prompt</h3>
                <p className="text-base text-primary">
                  "Set one clear intention for today and take one step toward it."
                </p>
              </div>

              {/* Progress Tracker */}
              <div className="bg-white border-2 border-primary rounded-xl p-6">
                <h3 className="text-xl font-bold mb-3 text-primary">Progress Tracker</h3>
                <p className="text-base text-primary">
                  You've completed 2 of 4 stages this month.
                </p>
              </div>

              {/* Quick Tips */}
              <div className="md:col-span-2 bg-white border-2 border-primary rounded-xl p-6">
                <h3 className="text-xl font-bold mb-4 text-primary">Quick Tips</h3>
                <ul className="space-y-2 text-base text-primary list-disc list-inside">
                  <li>Start your day with clarity.</li>
                  <li>Break goals into smaller steps.</li>
                  <li>Review wins weekly.</li>
                </ul>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
