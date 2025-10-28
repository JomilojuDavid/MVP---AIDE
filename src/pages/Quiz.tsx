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
  const [entrepreneurType, setEntrepreneurType] = useState("");
  const [goals, setGoals] = useState("");
  const [challenge, setChallenge] = useState("");

  const handleNext = () => {
    if (!entrepreneurType || !goals || !challenge) {
      toast.error("Please answer all questions");
      return;
    }
    navigate("/quizstep2");
  };

  return (
    <div className="flex h-screen font-['Poppins'] overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col justify-between bg-white w-[220px] rounded-r-[35px] p-5 shadow-lg">
        <div className="flex flex-col items-center text-center">
          <img src={aideLogo} alt="AIDE Logo" className="h-14 mb-2" />
          <p className="text-xs text-gray-800 font-semibold leading-tight">
            Where mindset mastery <br /> meets business growth
          </p>
        </div>

        <div className="flex items-center gap-3 justify-center">
          <img
            src="https://randomuser.me/api/portraits/women/45.jpg"
            alt="Support"
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-semibold text-gray-800">Support</span>
        </div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 bg-primary relative flex flex-col justify-center items-center p-4 sm:p-6 md:p-10 overflow-hidden"
      >
        <div className="absolute top-5 right-6">
          <Button variant="ghost" size="icon" className="w-9 h-9 text-white hover:text-white/80">
            <Settings className="w-6 h-6" />
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col justify-between items-center w-full max-w-[850px] min-h-[80vh] gap-6"
        >
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white rounded-3xl p-6 sm:p-8 w-full shadow-[0_4px_25px_rgba(0,0,0,0.08)]"
          >
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-foreground text-center">
              AIDE Onboarding Quiz
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground text-center">
              Let's get to know you a bit better.
            </p>
          </motion.div>

          {/* Questions */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white rounded-3xl p-6 sm:p-8 w-full flex flex-col gap-6 sm:gap-7 shadow-[0_4px_25px_rgba(0,0,0,0.08)]"
          >
            {/* Q1 */}
            <div>
              <h3 className="text-[1.2rem] sm:text-[1.3rem] font-semibold mb-4 text-foreground">
                What type of entrepreneur best describes you?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {["Visionary", "Strategist", "Builder", "Creative"].map((type) => (
                  <Button
                    key={type}
                    onClick={() => setEntrepreneurType(type)}
                    className={cn(
                      "h-auto min-h-[70px] px-5 py-4 text-[0.9rem] font-medium transition-all border-2 border-[#ff000033] whitespace-normal text-left rounded-[2px]",
                      entrepreneurType === type
                        ? "bg-secondary text-foreground"
                        : "bg-white text-foreground hover:bg-[#F3C17E]"
                    )}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            {/* Q2 */}
            <div>
              <h3 className="text-[1.2rem] sm:text-[1.3rem] font-semibold mb-3 text-foreground">
                What’s your biggest goal for joining AIDE?
              </h3>
              <Textarea
                value={goals}
                onChange={(e) => setGoals(e.target.value)}
                placeholder="Write here..."
                className="bg-transparent border-0 border-b-2 border-[#ff000033] text-[0.95rem] rounded-none focus:ring-0 focus:border-[#ff000066] placeholder:text-muted-foreground min-h-[60px]"
              />
            </div>

            {/* Q3 */}
            <div>
              <h3 className="text-[1.2rem] sm:text-[1.3rem] font-semibold mb-3 text-foreground">
                What’s the biggest challenge you’re facing right now?
              </h3>
              <Textarea
                value={challenge}
                onChange={(e) => setChallenge(e.target.value)}
                placeholder="Write here..."
                className="bg-transparent border-0 border-b-2 border-[#ff000033] text-[0.95rem] rounded-none focus:ring-0 focus:border-[#ff000066] placeholder:text-muted-foreground min-h-[60px]"
              />
            </div>

            {/* Next */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
              className="flex justify-end mt-4"
            >
              <button
                onClick={handleNext}
                className="text-primary text-lg font-bold hover:underline transition-transform hover:scale-[1.03]"
              >
                NEXT &gt;&gt;
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
