import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Assessment() {
  const [firstName, setFirstName] = useState<string>("");
  const navigate = useNavigate();

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

      <main className="flex-1 md:ml-64 pt-24 px-6">
        <div className="max-w-6xl mx-auto space-y-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl p-6"
          >
            <h1 className="text-3xl font-bold">
              Your Weekly AIDE Assessment,{" "}
              <span className="text-primary">{firstName || "Name"}!</span>
            </h1>
          </motion.div>

          {/* Assessment Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-6 text-center"
          >
            <h2 className="text-2xl font-bold mb-4 text-foreground">
              Ready to take your AIDE Assessment?
            </h2>
            <p className="text-lg text-foreground mb-6">
              This assessment takes less than 5 minutes and helps us personalize
              your growth experience.
            </p>
            <Button className="bg-primary text-white hover:bg-primary/90 h-12 px-8 text-base font-bold rounded-full">
              Take Assessment
            </Button>
          </motion.div>

          {/* Quick Tips */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-primary border-2 border-secondary p-6 text-white"
          >
            <h3 className="text-xl font-bold mb-4">Quick Tips</h3>
            <ul className="space-y-2 text-base list-disc list-inside">
              <li>Start your day with clarity.</li>
              <li>Break goals into smaller steps.</li>
              <li>Review wins weekly.</li>
            </ul>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
