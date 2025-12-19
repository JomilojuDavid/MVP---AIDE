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
    navigate("/quiz");
  };

  return (
    <div className="flex h-screen font-['Poppins'] overflow-hidden">

      {/* Sidebar */}
      <div className="hidden md:flex flex-col justify-between 
        bg-white w-[300px] p-8 rounded-r-[40px] shadow-xl">

        {/* Clickable Logo */}
        <div
          className="flex flex-col items-center text-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={aideLogo} alt="AIDE Logo" className="h-16 mb-4" />
          <p className="text-[12px] text-gray-700 font-medium leading-tight">
            Where mindset mastery <br /> meets business growth
          </p>
        </div>

        {/* Support Section */}
        <div className="flex items-center gap-3 justify-center">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Support"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-sm font-semibold text-gray-800">Support</span>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 bg-primary relative flex justify-center items-center p-8">

        {/* Settings Icon */}
        <Settings className="absolute top-8 right-8 w-7 h-7 text-white" onClick={() => navigate("/settings")}  />

        {/* Inner Content Box (80% width) */}
        <div className="w-[80%] flex flex-col gap-8">

          {/* Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-10 shadow-lg w-full"
          >
            <h1 className="text-4xl font-bold text-center mb-3">
              AIDE Onboarding Quiz
            </h1>
            <p className="text-lg text-muted-foreground text-center">
              Answer the question so we can personalize your roadmap.
            </p>
          </motion.div>

          {/* Question Box */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="bg-white p-10 rounded-3xl shadow-lg w-full flex flex-col justify-between"
          >
            <div className="flex flex-col gap-10">

              {/* Question 1 */}
              <div>
                <h3 className="text-[1.6rem] font-semibold mb-5">
                  Which of the AIDE stages do you feel you need to strengthen most?
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: "Awareness", label: "Awareness {I need clarity on what's really holding me back}" },
                    { id: "Intention", label: "Intention — I need stronger goals and focus" },
                    { id: "Decisiveness", label: "Decisiveness — I need to stop hesitating and make moves" },
                    { id: "Execution", label: "Execution — I need consistency and follow-through" },
                  ].map((stage) => (
                    <Button
                      key={stage.id}
                      onClick={() => setAideStage(stage.id)}
                      className={cn(
                        "h-auto px-6 py-5 text-[0.95rem] rounded-[2px] border border-[#ff000033] text-center whitespace-normal leading-snug",
                        aideStage === stage.id
                          ? "bg-secondary text-foreground"
                          : "bg-white text-foreground hover:bg-[#F3C17E]"
                      )}
                    >
                      {stage.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Question 2 */}
              <div>
                <h3 className="text-[1.6rem] font-semibold mb-3">
                  What’s one thing you’d like to improve in your business or life right now?
                </h3>

                <Textarea
                  value={improvement}
                  onChange={(e) => setImprovement(e.target.value)}
                  placeholder="Write here..."
                  className="w-full px-1 bg-transparent border-0 border-b-[1.5px] border-[#ff000033] focus-visible:ring-0 focus-visible:border-red-400 text-[1rem] rounded-none resize-none"
                />
              </div>
            </div>

            {/* Next Button */}
            <div className="flex justify-end pt-6">
              <button
                onClick={handleSubmit}
                className="text-primary text-lg font-bold hover:underline transition-all hover:scale-[1.03]"
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
