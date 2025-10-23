import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

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
    variant: "card" as const,
  },
  {
    id: 3,
    title: "Execution Masterclass",
    description: "Download or explore to apply AIDE principles effectively.",
    variant: "card" as const,
  },
  {
    id: 4,
    title: "Business Growth Blueprint",
    description: "Download or explore to apply AIDE principles effectively.",
    variant: "secondary" as const,
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
    <div className="flex min-h-screen bg-primary relative">
      <Sidebar showTasksAndResources />
      <TopBar />
      
      <main className="flex-1 md:ml-64 p-8 md:p-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="bg-white rounded-3xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Here's Your Resource Library{firstName ? `, ${firstName}` : ""}!
            </h1>
            <p className="text-xl text-muted-foreground">
              Access your personalized materials to enhance your AIDE journey.
            </p>
          </div>

          {/* Resources Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {resources.map((resource) => (
              <div
                key={resource.id}
                className={`rounded-3xl p-8 ${
                  resource.variant === "secondary"
                    ? "bg-secondary"
                    : "bg-white"
                }`}
              >
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  {resource.title}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {resource.description}
                </p>
                <Button className="bg-primary text-white hover:bg-primary/90 h-12 px-8 font-bold rounded-full">
                  Access Now
                </Button>
              </div>
            ))}
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
