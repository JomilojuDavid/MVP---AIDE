import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

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
    <div className="flex min-h-screen bg-primary relative">
      <Sidebar showTasksAndResources />
      <TopBar />
      
      <main className="flex-1 md:ml-64 p-8 md:p-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="bg-white rounded-3xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Complete Your AIDE Tasks, <span className="text-primary">{firstName || "Name"}!</span>
            </h1>
            <p className="text-xl text-foreground">
              Each step brings you closer to clarity, confidence, and execution.
            </p>
          </div>

          {/* Tasks Card */}
          <div className="bg-white rounded-3xl p-8 md:p-12">
            <div className="space-y-8">
              {tasksList.map((task) => (
                <div key={task.id} className="flex items-start gap-4 pb-6 border-b border-border last:border-0">
                  <Checkbox id={task.id} className="mt-1" />
                  <div className="flex-1">
                    <label
                      htmlFor={task.id}
                      className="text-xl font-bold text-foreground cursor-pointer block mb-2"
                    >
                      {task.title}
                    </label>
                    <p className="text-foreground">{task.description}</p>
                  </div>
                </div>
              ))}
              
              <div className="flex justify-end pt-4">
                <Button className="bg-primary text-white hover:bg-primary/90 h-14 px-10 text-lg font-bold rounded-full">
                  Start Tasks
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="bg-primary border-4 border-secondary rounded-3xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-6">Quick Tips</h3>
            <ul className="space-y-3 text-lg list-disc list-inside">
              <li>Start your day with clarity.</li>
              <li>Break goals into smaller steps.</li>
              <li>Review wins weekly.</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
