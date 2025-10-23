import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Submission() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-background items-center justify-center p-8">
      <Sidebar />
      
      <main className="flex-1 md:ml-64 flex items-center justify-center">
        <div className="max-w-4xl w-full">
          {/* Success Card */}
          <div className="bg-card border-4 border-muted rounded-3xl p-12 md:p-16">
            <div className="bg-secondary rounded-3xl p-12 text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 flex items-center justify-center gap-3 text-foreground">
                <span>🎉</span>
                Quiz Completed!
                <span>🎉</span>
              </h1>
              <p className="text-xl md:text-2xl text-foreground">
                Thank you for completing the quiz. Your personalized roadmap is now ready.
              </p>
            </div>

            {/* Action Button */}
            <div className="flex justify-center">
              <Button
                onClick={() => navigate("/dashboard")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-16 px-16 text-xl font-bold rounded-full uppercase"
              >
                START YOUR JOURNEY TO MINDSET MASTERY
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
