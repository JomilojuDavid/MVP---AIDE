import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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
    <div className="flex min-h-screen bg-background">
      <Sidebar showTasksAndResources={!showQuizPrompt} />
      
      <main className="flex-1 md:ml-64 p-8 md:p-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Welcome Card */}
          <div className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Welcome Back{firstName ? `, ${firstName}` : ""}!
            </h1>
            <p className="text-xl md:text-2xl">From Stuck to Clear & Confident.</p>
          </div>

          {/* AIDE Roadmap */}
          <div className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Your AIDE Roadmap</h2>
            
            {/* Progress Bar */}
            <div className="relative w-full h-4 bg-primary-foreground/20 rounded-full mb-6 overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-primary-foreground rounded-full transition-all duration-500"
                style={{ width: showQuizPrompt ? '25%' : '50%' }}
              />
            </div>

            {/* Stages */}
            <div className="flex flex-wrap gap-2 md:gap-4 items-center text-lg md:text-xl font-medium">
              <span>Awareness</span>
              <span>→</span>
              <span>Intention</span>
              <span>→</span>
              <span>Decisiveness</span>
              <span>→</span>
              <span>Execution</span>
            </div>
          </div>

          {showQuizPrompt ? (
            /* Quiz Prompt Card */
            <div className="bg-card border-2 border-primary rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
              <p className="text-xl md:text-2xl text-foreground">
                To unlock your personalized dashboard, take our quick quiz.
              </p>
              <Button
                onClick={() => navigate("/quiz")}
                className="bg-background text-primary border-2 border-primary hover:bg-primary hover:text-primary-foreground h-14 px-10 text-lg font-bold rounded-full uppercase transition-all whitespace-nowrap"
              >
                Take Quiz
              </Button>
            </div>
          ) : (
            /* Full Dashboard Content */
            <div className="grid md:grid-cols-2 gap-8">
              {/* Daily Prompt */}
              <div className="bg-card border-2 border-primary rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Daily Prompt</h3>
                <p className="text-lg text-muted-foreground">
                  "Set one clear intention for today and take one step toward it."
                </p>
              </div>

              {/* Progress Tracker */}
              <div className="bg-card border-2 border-primary rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">Progress Tracker</h3>
                <p className="text-lg text-muted-foreground">
                  You've completed 2 of 4 stages this month.
                </p>
              </div>

              {/* Quick Tips */}
              <div className="md:col-span-2 bg-card border-2 border-primary rounded-3xl p-8">
                <h3 className="text-2xl font-bold text-foreground mb-6">Quick Tips</h3>
                <ul className="space-y-3 text-lg text-muted-foreground list-disc list-inside">
                  <li>Start your day with clarity.</li>
                  <li>Break goals into smaller steps.</li>
                  <li>Review wins weekly.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
