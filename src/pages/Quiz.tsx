import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 md:ml-64 p-8 md:p-12">
        <div className="max-w-5xl mx-auto">
          {/* Quiz Card */}
          <div className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">AIDE Onboarding Quiz</h1>
            <p className="text-lg md:text-xl mb-12">
              Answer a few quick questions so we can personalize your roadmap.
            </p>

            <div className="space-y-10">
              {/* Question 1 */}
              <div>
                <h3 className="text-2xl font-bold mb-6">
                  1. What stage best describes your business?
                </h3>
                <div className="flex flex-wrap gap-4">
                  {["Ideal Stage", "Early Growth", "Scaling"].map((option) => (
                    <Button
                      key={option}
                      onClick={() => setQuestion1(option)}
                      className={cn(
                        "h-14 px-8 text-lg font-medium rounded-full border-2 transition-all",
                        question1 === option
                          ? "bg-primary-foreground text-primary border-primary-foreground"
                          : "bg-primary text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
                      )}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Question 2 */}
              <div>
                <h3 className="text-2xl font-bold mb-6">
                  2. What's your biggest challenge right now?
                </h3>
                <div className="flex flex-wrap gap-4">
                  {["Focus", "Execution", "Strategy", "Strategy"].map((option, idx) => (
                    <Button
                      key={`${option}-${idx}`}
                      onClick={() => setQuestion2(option)}
                      className={cn(
                        "h-14 px-8 text-lg font-medium rounded-full border-2 transition-all",
                        question2 === option
                          ? "bg-primary-foreground text-primary border-primary-foreground"
                          : "bg-primary text-primary-foreground border-primary-foreground hover:bg-primary-foreground/10"
                      )}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Question 3 */}
              <div>
                <h3 className="text-2xl font-bold mb-6">
                  3. What's your main goal for the next 90 days?
                </h3>
                <Textarea
                  value={question3}
                  onChange={(e) => setQuestion3(e.target.value)}
                  placeholder="Type your answer here..."
                  className="min-h-32 bg-primary-foreground text-foreground placeholder:text-muted-foreground border-none text-lg rounded-2xl resize-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-8">
            <Button
              onClick={handleSubmit}
              className="bg-background text-primary border-2 border-primary hover:bg-primary hover:text-primary-foreground h-16 px-12 text-xl font-bold rounded-full uppercase transition-all"
            >
              Submit Quiz
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
