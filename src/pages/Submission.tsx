import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import aideLogo from "@/assets/aide-logo.png";

export default function Submission() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-background items-center justify-center p-8 relative">
      {/* Logo */}
      <div className="absolute top-8 left-8">
        <img src={aideLogo} alt="AIDE Logo" className="h-16" />
      </div>

      {/* Support */}
      <div className="absolute bottom-8 left-8 flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-gray-200" />
        <span className="text-lg font-medium text-foreground">Support</span>
      </div>
      
      <main className="flex items-center justify-center w-full">
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
                className="bg-primary text-white hover:bg-primary/90 h-16 px-16 text-xl font-bold rounded-full uppercase"
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
