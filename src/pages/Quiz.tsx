import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import aideLogo from "@/assets/aide-logo.png";
import { motion } from "framer-motion";

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
    <div className="flex min-h-screen font-['Poppins']">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col justify-between bg-white w-[280px] rounded-r-[40px] p-8">
        {/* Logo and tagline */}
        <div className="flex flex-col items-center text-center">
          <img
            src={aideLogo}
            alt="AIDE Logo"
            className="h-16 md:h-20 mb-3"
          />
          <p className="text-sm text-gray-800 font-medium leading-tight">
            Where mindset mastery <br /> meets business growth
          </p>
        </div>

        {/* Support section */}
        <div className="flex items-center gap-3 justify-center">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Support"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-base font-medium text-gray-800">Support</span>
        </div>
      </div>

      {/* Collapsed top bar (mobile only) */}
      <div className="md:hidden bg-white w-full p-4 flex justify-between items-center border-b border-gray-200">
        <img src={aideLogo} alt="AIDE Logo" className="h-10" />
        <span className="text-sm text-gray-700 font-medium">Support</span>
      </div>

      {/* Main quiz section */}
      <div className="flex-1 bg-primary relative p-8 md:p-12">
        {/* Top Bar */}
        <div className="absolute top-8 left-8 right-8 flex items-center justify-between z-10">
          <div className="hidden md:block" /> {/* keeps layout spacing */}
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 text-white hover:text-white/80"
          >
            <Settings className="w-6 h-6" />
          </Button>
        </div>

        <div className="max-w-5xl mx-auto pt-28">
          {/* Quiz Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 md:p-12 mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              AIDE Onboarding Quiz
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Answer a few quick questions so we can personalize your roadmap.
            </p>
          </motion.div>

          {/* Quiz Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-3xl p-8 md:p-12"
          >
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
          </motion.div>
        </div>
      </div>
    </div>
  );
}

