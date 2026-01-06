import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const tasksList = [
  {
    id: "awareness",
    title: "Complete Awareness Journal",
    description: "Reflect on your current mindset and note key insights.",
  },
  {
    id: "intention",
    title: "Set weekly intention",
    description: "Define 3 clear goals for the week to stay aligned.",
  },
  {
    id: "decisiveness",
    title: "Make One Decisive Move",
    description: "Take one action that moves you closer to your goal.",
  },
  {
    id: "execution",
    title: "Execute Your Action Plan",
    description: "Put your weekly plan into motion and review results.",
  },
];

export default function Tasks() {
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

      <main className="flex-1 md:ml-64 px-6 pt-14 overflow-y-auto">
        <div className="max-w-[880px] mx-auto w-full flex flex-col gap-6">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl py-6 px-10"
          >
            <h1 className="text-3xl font-semibold mb-2">
              Complete Your AIDE Tasks,{" "}
              <span className="text-primary">{firstName || "Name"}!</span>
            </h1>
            <p className="text-base text-foreground">
              Each step brings you closer to clarity, confidence, and execution.
            </p>
          </motion.div>

          {/* Tasks Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white py-6 px-10 rounded-2xl"
          >
            <div className="space-y-6">
              {tasksList.map((task, index) => (
                <div key={task.id} className="flex items-start gap-4">
                  
                  {/* Square Checkbox */}
                  <input
                    type="checkbox"
                    id={task.id}
                    className="
                      mt-1
                      h-4 w-4
                      border border-secondary
                      appearance-none
                      checked:bg-primary
                      checked:border-primary
                    "
                  />

                  {/* Text */}
                  <div className="flex-1">
                    <label
                      htmlFor={task.id}
                      className="block text-lg font-medium text-foreground cursor-pointer"
                    >
                      {task.title}
                    </label>
                    <p className="text-base text-foreground">
                      {task.description}
                    </p>
                  </div>

                  {/* CTA */}
                  {index === tasksList.length - 1 && (
                    <Button className="bg-primary text-white hover:bg-primary/90 h-10 px-6 text-sm font-semibold rounded-full">
                      Start Tasks
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-primary border-2 border-secondary py-6 px-10 text-white"
          >
            <h3 className="text-xl font-semibold mb-4">Quick Tips</h3>
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
