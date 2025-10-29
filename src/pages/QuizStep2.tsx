import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Settings } from "lucide-react";
import aideLogo from "@/assets/aide-logo.png";

export default function QuizStep2() {
  const navigate = useNavigate();

  const [question4, setQuestion4] = useState("");
  const [question5, setQuestion5] = useState("");

  // ✅ Load step 1 data on mount
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("quizStep1") || "{}");

    if (!data.question1 || !data.question2 || !data.question3) {
      navigate("/quiz"); // 🚦 Push back to Step 1 if no data
    }
  }, []);

  const handleSubmit = () => {
    if (!question4 || !question5.trim()) {
      toast.error("Please complete all responses");
      return;
    }

    localStorage.setItem(
      "quizStep2",
      JSON.stringify({ question4, question5 })
    );

    navigate("/submission");
  };

  return (
    <div className="flex h-screen font-['Poppins'] overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col justify-between bg-white w-[240px] rounded-r-[40px] p-6 shadow-lg">
        <div className="flex flex-col items-center text-center">
          <img src={aideLogo} alt="AIDE Logo" className="h-14 mb-3" />
          <p className="text-[13px] text-gray-800 font-semibold leading-tight">
            Where mindset mastery <br /> meets business growth
          </p>
        </div>

        <div className="flex items-center gap-3 justify-center">
          <img
            src="https://randomuser.me/api/portraits/men/22.jpg"
            alt="Support"
            className="w-9 h-9 rounded-full object-cover"
          />
          <span className="text-sm font-semibold text-gray-800">Support</span>
        </div>
      </div>

      {/* Main container */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex-1 bg-primary relative flex flex-col justify-center items-center p-6 md:p-12"
      >
        {/* Settings button */}
        <div className="absolute top-8 right-8 z-10">
          <Button variant="ghost" size="icon" className="w-10 h-10 text-white hover:text-white/80">
            <Settings className="w-6 h-6" />
          </Button>
        </div>

        {/* Layout container */}
        <div className="flex flex-col justify-between items-center w-full max-w-[850px] min-h-[85vh] gap-6">

          {/* Title Block */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 w-full shadow-[0_4px_25px_rgba(0,0,0,0.1)]"
          >
            <h1 className="text-4xl font-bold text-center mb-2 text-foreground">
              AIDE Onboarding Quiz
            </h1>
            <p className="text-lg text-muted-foreground text-center">
              Last section — tell us a bit more about you.
            </p>

            {/* ✅ Progress indicator */}
            <p className="text-center text-sm text-gray-500 mt-2 font-medium">
              Step <span className="text-primary font-bold">2</span> of 2
            </p>
          </motion.div>

          {/* Questions Container */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="bg-white rounded-3xl p-8 w-full shadow-[0_4px_25px_rgba(0,0,0,0.1)] flex flex-col justify-between"
          >
            <div className="grid gap-7">

              {/* QUESTION 4 */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  4. How many hours weekly can you commit to AIDE?
                </h3>

                <div className="flex flex-wrap gap-4">
                  {["1–3 hours", "3–8 hours", "10+ hours"].map((option) => (
                    <Button
                      key={option}
                      onClick={() => setQuestion4(option)}
                      className={cn(
                        "h-12 px-6 text-[0.95rem] rounded-[2px] border-[1.5px] border-[#ff000033] transition-all",
                        question4 === option
                          ? "bg-secondary text-foreground"
                          : "bg-white text-foreground hover:bg-[#F3C17E]"
                      )}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              {/* QUESTION 5 (Underline style) */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  5. What outcome would make this program a big win for you?
                </h3>

                <Textarea
                  value={question5}
                  onChange={(e) => setQuestion5(e.target.value)}
                  placeholder="Write here..."
                  className="w-full px-1 bg-transparent border-0 border-b-[1.5px] border-[#ff000033] 
                  focus-visible:ring-0 focus-visible:border-red-400 text-[1rem] rounded-none resize-none"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end mt-5">
              <button
                className="text-primary text-lg font-bold hover:underline transition-all hover:scale-[1.03]"
                onClick={handleSubmit}
              >
                SUBMIT &gt;&gt;
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
