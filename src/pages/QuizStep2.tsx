import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import aideLogo from "@/assets/aide-logo.png";
import { motion } from "framer-motion";

export default function QuizStep2() {
  const navigate = useNavigate();
  const [aideStage, setAideStage] = useState("");
  const [improvement, setImprovement] = useState("");

  const handleSubmit = () => {
    if (!aideStage || !improvement) {
      toast.error("Please answer all questions");
      return;
    }
    navigate("/quiz"); // <-- Goes to Quiz.tsx next
  };

  return (
    <div className="flex h-screen font-['Poppins'] overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col justify-between bg-white w-[240px] rounded-r-[40px] p-6 shadow-lg">
        {/* Logo + tagline */}
        <div className="flex flex-col items-center text-center">
          <img src={aideLogo} alt="AIDE Logo" className="h-14 md:h-16 mb-3" />
          <p className="text-[11px] md:text-[12px] text-gray-800 font-medium leading-tight">
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

      {/* Main Quiz Area */}
      <div className="flex-1 bg-primary relative flex flex-col justify-center items-center p-6 md:p-12">

        {/* Settings Icon */}
        <div className="absolute top-8 right-8 z-10">
          <Settings className="w-6 h-6 text-white" />
        </div>

        {/* Content Wrapper */}
        <div className="flex flex-col justify-between items-center w-full"
          style={{
            width: "calc(100% - 240px - 140px)",
            height: "85vh",
            gap: "24px",
          }}>

          {/* Title Box */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-3xl p-8 md:p-10 w-full shadow-[0_4px_30px_rgba(0,0,0,0.10)]"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-3 text-center">
              AIDE Onboarding Quiz
            </h1>
            <p className="text-lg md:text-xl text-center text-muted-foreground">
              Answer the question so we can personalize your roadmap.
            </p>
          </motion.div>

          {/* Question Box */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 md:p-10 w-full shadow-[0_4px_30px_rgba(0,0,0,0.10)] flex flex-col justify-between"
            style={{
              flex: "1",
              overflow: "hidden",
            }}
          >
            <div className="flex flex-col gap-10">

              {/* Question 1 */}
              <div>
                <h3 className="text-[1.6rem] font-semibold mb-5 text-foreground">
                  Which of the AIDE stages do you feel you need to strengthen most?
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {["Awareness", "Intention", "Decisiveness", "Execution"].map(
                    (stage) => (
                      <Button
                        key={stage}
                        onClick={() => setAideStage(stage)}
                        className={cn(
                          "h-auto px-6 py-4 text-[1rem] rounded-[2px] transition-all border border-red-300 text-left whitespace-normal",
                          aideStage === stage
                            ? "bg-secondary text-foreground"
                            : "bg-white hover:bg-[#F3C17E]"
                        )}
                      >
                        <span className="font-semibold">{stage}</span>
                      </Button>
                    )
                  )}
                </div>
              </div>

              {/* Question 2 */}
              <div>
                <h3 className="text-[1.6rem] font-semibold mb-3 text-foreground">
                  What’s one thing you’d like to improve in your business or life right now?
                </h3>

                {/* UNDERLINE INPUT INSTEAD OF BOX */}
                <Textarea
                  value={improvement}
                  onChange={(e) => setImprovement(e.target.value)}
                  placeholder="Write here..."
                  className="border-0 border-b border-red-300 rounded-none bg-transparent text-lg focus-visible:ring-0 focus-visible:border-red-400"
                />
              </div>
            </div>

            {/* Next */}
            <div className="flex justify-end mt-5">
              <button
                onClick={handleSubmit}
                className="text-primary text-lg font-bold hover:underline"
              >
                NEXT &gt;&gt;
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
