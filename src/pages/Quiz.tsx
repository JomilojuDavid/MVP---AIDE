import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [question3Short, setQuestion3Short] = useState("");

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
          <img src={aideLogo} alt="AIDE Logo" className="h-14 md:h-16 mb-3" />
          <p className="text-[13px] md:text-sm text-gray-800 font-semibold leading-tight">
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

      {/* Mobile Top Bar */}
      <div className="md:hidden bg-white w-full p-4 flex justify-between items-center border-b border-gray-200 shadow-md">
        <img src={aideLogo} alt="AIDE Logo" className="h-10" />
        <span className="text-sm text-gray-700 font-semibold">Support</span>
      </div>

      {/* Main Quiz Area */}
      <div className="flex-1 bg-primary relative flex flex-col justify-center items-center p-4 sm:p-8 md:p-12">
        {/* Settings Button */}
        <div className="absolute top-6 sm:top-8 right-6 sm:right-8 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 text-white hover:text-white/80"
          >
            <Settings className="w-6 h-6" />
          </Button>
        </div>

        {/* Quiz Container */}
        <div
          className="flex flex-col justify-between items-center w-full transition-all"
          style={{
            width: "clamp(600px, 70vw, 1000px)",
            height: "85vh",
            gap: "2.2rem",
          }}
        >
          {/* Title Box */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 w-full shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-foreground text-center">
              AIDE Onboarding Quiz
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-center">
              Answer a few quick questions so we can personalize your roadmap.
            </p>
          </motion.div>

          {/* Questions Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 w-full flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            style={{
              flex: "1",
              overflow: "hidden",
            }}
          >
            <div
              className="grid gap-5 md:gap-6"
              style={{
                flexGrow: 1,
                overflow: "hidden",
              }}
            >
              {/* Question 1 */}
              <div>
                <h3 className="text-[1.4rem] sm:text-[1.6rem] font-semibold mb-5 text-foreground">
                  1. What stage best describes your business?
                </h3>
                <div className="flex flex-wrap gap-3">
                  {["Idea Stage", "Early Growth", "Scaling"].map((option) => (
                    <Button
                      key={option}
                      onClick={() => setQuestion1(option)}
                      className={cn(
                        "h-11 sm:h-12 px-6 text-[0.95rem] sm:text-[1rem] font-medium rounded-lg transition-all border-2 border-input",
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
                <h3 className="text-[1.4rem] sm:text-[1.6rem] font-semibold mb-5 text-foreground">
                  2. What's your biggest challenge right now?
                </h3>
                <div className="flex flex-wrap gap-3">
                  {["Focus", "Execution", "Strategy", "Commitment"].map(
                    (option) => (
                      <Button
                        key={option}
                        onClick={() => setQuestion2(option)}
                        className={cn(
                          "h-11 sm:h-12 px-6 text-[0.95rem] sm:text-[1rem] font-medium rounded-lg transition-all border-2 border-input",
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
                <h3 className="text-[1.4rem] sm:text-[1.6rem] font-semibold mb-4 text-foreground">
                  3. What's your main goal for the next 90 days?
                </h3>
                <Textarea
                  value={question3}
                  onChange={(e) => setQuestion3(e.target.value)}
                  placeholder="Write here..."
                  className="min-h-24 bg-white text-foreground placeholder:text-muted-foreground border-2 border-input text-[0.95rem] rounded-2xl resize-none mb-3"
                />

                <Input
                  type="text"
                  value={question3Short}
                  onChange={(e) => setQuestion3Short(e.target.value)}
                  placeholder="Summarize your goal in one line..."
                  className="bg-white text-foreground border-2 border-input text-[0.95rem] rounded-xl h-11 placeholder:text-muted-foreground"
                />
              </div>
            </div>

            {/* Next Button */}
            <div className="flex justify-end mt-3">
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
    </div>
  );
}
