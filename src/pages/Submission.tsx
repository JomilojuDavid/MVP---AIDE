import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Submission() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 md:ml-64 p-8 md:p-12 flex items-center justify-center">
        <div className="max-w-4xl w-full space-y-12">
          {/* Success Card */}
          <div className="bg-primary text-primary-foreground rounded-3xl p-12 md:p-16 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 flex items-center justify-center gap-3">
              <span>🎉</span>
              Quiz Submitted!
              <span>🎉</span>
            </h1>
            <p className="text-xl md:text-2xl">
              Thank you for completing the quiz. Your personalized roadmap is now being generated.
            </p>
          </div>

          {/* Action Button */}
          <div className="flex justify-center">
            <Button
              onClick={() => navigate("/dashboard-full")}
              className="bg-background text-primary border-2 border-primary hover:bg-primary hover:text-primary-foreground h-16 px-16 text-xl font-bold rounded-full uppercase transition-all"
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
