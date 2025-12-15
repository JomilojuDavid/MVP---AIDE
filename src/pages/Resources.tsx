import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
            className="bg-white rounded-2xl py-4 px-6"
          >
            <h1 className="text-2xl font-bold mb-1">
              Here's Your Resource Library, <span className="text-primary">{firstName || "Name"}!</span>
            </h1>
            <p className="text-sm text-foreground">
              Access your personalized materials to enhance your AIDE journey.
            </p>
          </motion.div>

          {/* Resources Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 gap-3 flex-1"
          >
            {resources.map((resource) => (
              <div
                key={resource.id}
                className={`py-4 px-5 flex flex-col ${
                  resource.variant === "secondary"
                    ? "bg-secondary"
                    : "bg-white"
                }`}
              >
                <h3 className="text-lg font-bold mb-2 text-foreground">
                  {resource.title}
                </h3>
                <p className="text-sm text-foreground mb-3 flex-1">
                  {resource.description}
                </p>
                <div>
                  <Button className="bg-primary text-white hover:bg-primary/90 h-8 px-4 text-xs font-bold rounded-full">
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
