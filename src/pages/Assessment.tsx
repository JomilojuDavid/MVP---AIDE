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

      <main className="flex-1 md:ml-64 pt-8 px-6 flex flex-col">
        <div className="max-w-4xl mx-auto w-full flex flex-col gap-4 flex-1">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-2xl py-4 px-6"
          >
            <h1 className="text-2xl font-bold">
              Your Weekly AIDE Assessment,{" "}
              <span className="text-primary">{firstName || "Name"}!</span>
            </h1>
          </motion.div>

          {/* Assessment Card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white py-8 px-6 text-center flex-1 flex flex-col justify-center"
          >
            <h2 className="text-2xl font-bold mb-3 text-foreground">
              Ready to take your AIDE Assessment?
            </h2>
            <p className="text-base text-foreground mb-5">
              This assessment takes less than 5 minutes and helps us personalize
              your growth experience.
            </p>
            <div>
              <Button className="bg-primary text-white hover:bg-primary/90 h-10 px-6 text-sm font-bold rounded-full">
                Take Assessment
              </Button>
            </div>
          </motion.div>

          {/* Quick Tips */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-primary border-2 border-secondary py-4 px-6 text-white"
          >
            <h3 className="text-lg font-bold mb-2">Quick Tips</h3>
            <ul className="space-y-1 text-sm list-disc list-inside">
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
