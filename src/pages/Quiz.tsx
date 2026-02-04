import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import aideLogo from "@/assets/aide-logo.png";
import { motion } from "framer-motion";
import supportWoman from "@/assets/support-woman.jpg";
import { SupportModal } from "@/components/SupportModal";

export default function Quiz() {
  const navigate = useNavigate();
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [question3, setQuestion3] = useState("");
  const [showSupportModal, setShowSupportModal] = useState(false);

  const handleSubmit = () => {
    if (!question1 || !question2 || !question3.trim()) {
      toast.error("Please answer all questions");
      return;
    }

    // ✅ Save responses to localStorage
    localStorage.setItem(
      "quizStep1",
      JSON.stringify({ question1, question2, question3 })
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

        <div 
          className="flex items-center gap-3 justify-center cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => setShowSupportModal(true)}
        >
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Support"
            className="w-9 h-9 rounded-full object-cover"
          />
          <span className="text-sm font-semibold text-gray-800">Support</span>
        </div>
      </div>

      <SupportModal open={showSupportModal} onOpenChange={setShowSupportModal} />

      {/* Main Quiz Section */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex-1 bg-primary relative flex flex-col justify-center items-center p-6 md:p-12"
      >
        {/* Settings Button */}
        <div className="absolute top-8 right-8 z-10">
          <Button variant="ghost" size="icon" className="w-10 h-10 text-white hover:text-white/80">
            <Settings className="w-6 h-6" />
          </Button>
        </div>

        {/* Layout Container */}
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
              Answer a few quick questions so we can personalize your roadmap.
            </p>

            {/* ✅ Progress Indicator */}
            <p className="text-center text-sm text-gray-500 mt-2 font-medium">
              Step <span className="text-primary font-bold">1</span> of 2
            </p>
          </motion.div>

          {/* Questions Box */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="bg-white p-8 w-full shadow-[0_4px_25px_rgba(0,0,0,0.1)] flex flex-col justify-between"
          >
            <div className="grid gap-7">

              {/* Question 1 */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  1. What stage best describes your business?
                </h3>
                <div className="flex flex-wrap gap-4">
                  {["Ideal Stage", "Early Growth", "Scaling"].map((option) => (
                    <Button
                      key={option}
                      onClick={() => setQuestion1(option)}
                      className={cn(
                        "h-12 px-6 text-[0.95rem] rounded-[0px] border-[1.5px] border-[#ff000033] transition-all",
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
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  2. What's your biggest challenge right now?
                </h3>
                <div className="flex flex-wrap gap-4">
                  {["Focus", "Execution", "Strategy", "Commitment"].map((option) => (
                    <Button
                      key={option}
                      onClick={() => setQuestion2(option)}
                      className={cn(
                        "h-12 px-6 text-[0.95rem] rounded-[2px] border-[1.5px] border-[#ff000033] transition-all",
                        question2 === option
                          ? "bg-secondary text-foreground"
                          : "bg-white text-foreground hover:bg-[#F3C17E]"
                      )}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Question 3 */}
              <div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">
                  3. What's your main goal for the next 90 days?
                </h3>

                {/* ✅ UNDERLINE ONLY — NO BOX */}
                <Textarea
                  value={question3}
                  onChange={(e) => setQuestion3(e.target.value)}
                  placeholder="Write here..."
                  className="w-full px-1 bg-transparent border-0 border-b-[1.5px] border-[#ff000033] focus-visible:ring-0 focus-visible:border-red-400 text-[1rem] rounded-none resize-none"
                />
              </div>
            </div>

            {/* Next Button */}
            <div className="flex justify-end mt-5">
              <button
                onClick={handleSubmit}
                className="text-primary text-lg font-bold hover:underline transition-all hover:scale-[1.03]"
              >
                NEXT &gt;&gt;
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
