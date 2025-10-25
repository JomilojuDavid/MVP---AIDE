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
    <div className="flex h-screen font-['Poppins'] overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col justify-between bg-white w-[240px] rounded-r-[40px] p-6 shadow-lg">
        {/* Logo and tagline */}
        <div className="flex flex-col items-center text-center">
          <img src={aideLogo} alt="AIDE Logo" className="h-16 mb-3" />
          <p className="text-sm text-gray-800 font-semibold leading-tight">
            Where mindset mastery <br /> meets business growth
          </p>
        </div>

        {/* Support section */}
        <div className="flex items-center gap-3 justify-center">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Support"
            className="w-9 h-9 rounded-full object-cover"
          />
          <span className="text-sm font-semibold text-gray-800">Support</span>
        </div>
      </div>

      {/* Collapsed top bar (mobile only) */}
      <div className="md:hidden bg-white w-full p-4 flex justify-between items-center border-b border-gray-200 shadow-md">
        <img src={aideLogo} alt="AIDE Logo" className="h-10" />
        <span className="text-sm text-gray-700 font-semibold">Support</span>
      </div>

      {/* Main quiz section */}
      <div className="flex-1 bg-primary relative flex flex-col items-center justify-center p-4 md:p-8">
        {/* Top Settings Button */}
        <div className="absolute top-6 right-6 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 text-white hover:text-white/80"
          >
            <Settings className="w-6 h-6" />
          </Button>
        </div>

        {/* Quiz container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-3xl shadow-md w-full max-w-4xl h-[85vh] flex flex-col justify-between p-6 md:p-10"
        >
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-foreground mb-2">
              AIDE Onboarding Quiz
            </h1>
            <p className="text-base md:text-lg text-muted-foreground">
              Answer a few quick questions so we can personalize your roadmap.
            </p>
          </div>

          {/* Questions */}
          <div className="flex-1 flex flex-col justify-center space-y-5 overflow-hidden">
            {/* Question 1 */}
            <div>
              <h3 className="text-xl font-bold mb-3 text-foreground text-center">
                1. What stage best describes your business?
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {["Ideal Stage", "Early Growth", "Scaling"].map((option) => (
                  <Button
                    key={option}
                    onClick={() => setQuestion1(option)}
                    className={cn(
                      "h-12 px-6 text-base font-medium rounded-xl transition-all border-2 border-input",
                      question1 === option
                        ? "bg-secondary text-foreground"
                        : "bg-white text-foreground hover:bg-[#F3C17E]"
                    )}
                  >
                    {option}
                  </Button>
                ))}
              </div>
            </div>

            {/* Question 2 */}
            <div>
              <h3 className="text-xl font-bold mb-3 text-foreground text-center">
                2. What's your biggest challenge right now?
              </h3>
              <div className="flex flex-wrap justify-center gap-3">
                {["Focus", "Execution", "Strategy", "Commitment"].map(
                  (option) => (
                    <Button
                      key={option}
                      onClick={() => setQuestion2(option)}
                      className={cn(
                        "h-12 px-6 text-base font-medium rounded-xl transition-all border-2 border-input",
                        question2 === option
                          ? "bg-secondary text-foreground"
                          : "bg-white text-foreground hover:bg-[#F3C17E]"
                      )}
                    >
                      {option}
                    </Button>
                  )
                )}
              </div>
            </div>

            {/* Question 3 */}
            <div>
              <h3 className="text-xl font-bold mb-3 text-foreground text-center">
                3. What's your main goal for the next 90 days?
              </h3>
              <Textarea
                value={question3}
                onChange={(e) => setQuestion3(e.target.value)}
                placeholder="Write here..."
                className="min-h-[80px] bg-white text-foreground placeholder:text-muted-foreground border-2 border-input text-base rounded-2xl resize-none mx-auto w-3/4"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="text-primary text-lg font-bold hover:underline"
            >
              NEXT&gt;&gt;
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
