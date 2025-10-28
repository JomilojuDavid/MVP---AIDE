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
      <div className="flex-1 bg-primary relative flex flex-col justify-center items-center p-6 md:p-12">
        {/* Settings Button */}
        <div className="absolute top-8 right-8 z-10">
          <Button
            variant="ghost"
            size="icon"
            className="w-10 h-10 text-white hover:text-white/80"
          >
            <Settings className="w-6 h-6" />
          </Button>
        </div>

        {/* Quiz Layout Container */}
        <div
          className="flex flex-col justify-between items-center"
          style={{
            width: "calc(100% - 240px - 140px)",
            height: "85vh",
            gap: "24px",
          }}
        >
          {/* Title Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 md:p-10 w-full shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground text-center">
              AIDE Onboarding Quiz
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground text-center">
              Answer a few quick questions so we can personalize your roadmap.
            </p>
          </motion.div>

          {/* Question Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-3xl p-8 md:p-10 w-full flex flex-col justify-between shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            style={{
              flex: "1",
              overflow: "hidden",
            }}
          >
            <div
              className="grid gap-5"
              style={{
                flexGrow: 1,
                overflow: "hidden",
              }}
            >
              {/* Question 1 */}
              <div>
                <h3 className="text-[1.7rem] font-semibold mb-5 text-foreground">
                  Which of the AIDE stages do you feel you need to strengthen most?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button
                    onClick={() => setAideStage("Awareness")}
                    className={cn(
                      "h-auto min-h-[80px] px-6 py-4 text-[0.95rem] font-medium rounded-lg transition-all border-2 border-input whitespace-normal text-left",
                      aideStage === "Awareness"
                        ? "bg-secondary text-foreground"
                        : "bg-white text-foreground hover:bg-[#F3C17E]"
                    )}
                  >
                    <span className="block">
                      <span className="font-semibold">Awareness</span> {"{I need clarity on what's really holding me back}"}
                    </span>
                  </Button>
                  <Button
                    onClick={() => setAideStage("Intention")}
                    className={cn(
                      "h-auto min-h-[80px] px-6 py-4 text-[0.95rem] font-medium rounded-lg transition-all border-2 border-input whitespace-normal text-left",
                      aideStage === "Intention"
                        ? "bg-secondary text-foreground"
                        : "bg-white text-foreground hover:bg-[#F3C17E]"
                    )}
                  >
                    <span className="block">
                      <span className="font-semibold">Intention</span> — I need stronger goals and focus
                    </span>
                  </Button>
                  <Button
                    onClick={() => setAideStage("Decisiveness")}
                    className={cn(
                      "h-auto min-h-[80px] px-6 py-4 text-[0.95rem] font-medium rounded-lg transition-all border-2 border-input whitespace-normal text-left",
                      aideStage === "Decisiveness"
                        ? "bg-secondary text-foreground"
                        : "bg-white text-foreground hover:bg-[#F3C17E]"
                    )}
                  >
                    <span className="block">
                      <span className="font-semibold">Decisiveness</span> — I need to stop hesitating and make moves
                    </span>
                  </Button>
                  <Button
                    onClick={() => setAideStage("Execution")}
                    className={cn(
                      "h-auto min-h-[80px] px-6 py-4 text-[0.95rem] font-medium rounded-lg transition-all border-2 border-input whitespace-normal text-left",
                      aideStage === "Execution"
                        ? "bg-secondary text-foreground"
                        : "bg-white text-foreground hover:bg-[#F3C17E]"
                    )}
                  >
                    <span className="block">
                      <span className="font-semibold">Execution</span> — I need consistency and follow-through
                    </span>
                  </Button>
                </div>
              </div>

              {/* Question 2 */}
              <div>
                <h3 className="text-[1.7rem] font-semibold mb-5 text-foreground">
                  What's one thing you'd like to see improve in your business or life right now?
                </h3>
                <Textarea
                  value={improvement}
                  onChange={(e) => setImprovement(e.target.value)}
                  placeholder="Write here..."
                  className="min-h-24 bg-white text-foreground placeholder:text-muted-foreground border-2 border-input text-[1rem] rounded-2xl resize-none"
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
