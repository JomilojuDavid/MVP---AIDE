import { Sidebar } from "@/components/Sidebar";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

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
    <div className="flex min-h-screen bg-primary">
      <Sidebar showTasksAndResources />
      
      <main className="flex-1 md:ml-64 p-8 md:p-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-lg">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              Performance Analytics
            </h1>
            <p className="text-xl text-muted-foreground">
              Track your growth and engagement based on your AIDE activity.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-card rounded-3xl p-6 shadow-lg">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Assessment Completed
              </h3>
              <p className="text-5xl font-bold text-foreground">0</p>
            </div>

            <div className="bg-secondary rounded-3xl p-6 shadow-lg">
              <h3 className="text-sm font-medium text-foreground mb-2">
                Tasks Done
              </h3>
              <p className="text-5xl font-bold text-foreground">0</p>
            </div>

            <div className="bg-secondary rounded-3xl p-6 shadow-lg">
              <h3 className="text-sm font-medium text-foreground mb-2">
                Time Spent
              </h3>
              <p className="text-5xl font-bold text-foreground">0<span className="text-2xl">hr</span></p>
            </div>

            <div className="bg-card rounded-3xl p-6 shadow-lg">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">
                Average Progress
              </h3>
              <p className="text-5xl font-bold text-foreground">0<span className="text-2xl">%</span></p>
            </div>
          </div>

          {/* Goal Tracker */}
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <svg className="w-5 h-5 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground">Goal Tracker</h3>
            </div>
            <p className="text-lg text-muted-foreground mb-6">
              You've achieved 0% of your monthly goals. Keep up the consistency!
            </p>
            <div className="relative w-full h-6 bg-muted rounded-full overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: '0%' }}
              />
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-card rounded-3xl p-8 md:p-12 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h3 className="text-2xl font-bold text-foreground">Recent Activity</h3>
            </div>
            <ul className="space-y-4 text-lg text-foreground">
              <li>• Completed "Intention Module" - 2 days ago</li>
              <li>• Attended "Execution Workshop" - 1 week ago</li>
              <li>• Set new personal goal: "Launch my plan" - 3 days ago</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
