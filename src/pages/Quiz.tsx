import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import aideLogo from "@/assets/aide-logo.png";

export default function Quiz() {
  const navigate = useNavigate();
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [question3, setQuestion3] = useState("");

  const handleSubmit = () => {
    if (!question1 || !question2 || !question3) {
      toast.error("Please answer all questions");
      return;
    }
    navigate("/submission");
  };

  return (
    <div className="min-h-screen bg-primary relative p-8 md:p-12">
      {/* Top Bar */}
      <div className="absolute top-8 left-8 right-8 flex items-center justify-between z-10">
        <img src={aideLogo} alt="AIDE Logo" className="h-16" />
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 rounded-full bg-white hover:bg-white/90 text-foreground"
        >
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* Support */}
      <div className="absolute bottom-8 left-8 flex items-center gap-3 z-10">
        <div className="w-12 h-12 rounded-full bg-gray-300" />
        <span className="text-lg font-medium text-white">Support</span>
      </div>

      <div className="max-w-5xl mx-auto pt-28">
        {/* Quiz Header */}
        <div className="bg-white rounded-3xl p-8 md:p-12 mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">AIDE Onboarding Quiz</h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Answer a few quick questions so we can personalize your roadmap.
          </p>
        </div>

        {/* Quiz Card */}
        <div className="bg-white rounded-3xl p-8 md:p-12">
          <div className="space-y-10">
            {/* Question 1 */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">
                1. What stage best describes your business?
              </h3>
              <div className="flex flex-wrap gap-4">
                {["Ideal Stage", "Early Growth", "Scaling"].map((option) => (
                  <Button
                    key={option}
                    onClick={() => setQuestion1(option)}
                    className={cn(
                      "h-14 px-8 text-lg font-medium rounded-lg transition-all",
                      question1 === option
                        ? "bg-secondary text-foreground hover:bg-secondary/90"
                        : "bg-white border-2 border-input text-foreground hover:bg-muted"
                    )}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>

            {/* Question 2 */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">
                2. What's your biggest challenge right now?
              </h3>
              <div className="flex flex-wrap gap-4">
                {["Focus", "Execution", "Strategy", "Commitment"].map((option) => (
                  <Button
                    key={option}
                    onClick={() => setQuestion2(option)}
                    className={cn(
                      "h-14 px-8 text-lg font-medium rounded-lg transition-all",
                      question2 === option
                        ? "bg-secondary text-foreground hover:bg-secondary/90"
                        : "bg-white border-2 border-input text-foreground hover:bg-muted"
                    )}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>

            {/* Question 3 */}
            <div>
              <h3 className="text-2xl font-bold mb-6 text-foreground">
                3. What's your main goal for the next 90 days?
              </h3>
              <Textarea
                value={question3}
                onChange={(e) => setQuestion3(e.target.value)}
                placeholder="Write here..."
                className="min-h-32 bg-white text-foreground placeholder:text-muted-foreground border-2 border-input text-lg rounded-2xl resize-none"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-8">
            <button
              onClick={handleSubmit}
              className="text-primary text-xl font-bold hover:underline"
            >
              NEXT&gt;&gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
