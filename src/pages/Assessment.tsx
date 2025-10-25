import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

export default function Assessment() {
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
              Your Weekly AIDE Assessment, <span className="text-primary">{firstName || "Name"}!</span>
            </h1>
          </div>

          {/* Assessment Card */}
          <div className="bg-white rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Ready to take your AIDE Assessment?
            </h2>
            <p className="text-xl text-foreground mb-8">
              This assessment takes less than 5 minutes and helps us personalize your growth experience.
            </p>
            <Button className="bg-primary text-white hover:bg-primary/90 h-14 px-10 text-lg font-bold rounded-full">
              Take Assessment
            </Button>
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
