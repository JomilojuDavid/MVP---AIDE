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
    <div className="flex h-screen font-['Poppins'] overflow-hidden bg-primary">

      {/* LEFT SIDEBAR (Matches screenshot exactly) */}
      <div className="hidden md:flex flex-col bg-white w-[200px] pl-10 pt-10 pb-10 rounded-r-[45px] justify-between">

        {/* LOGO – positioned EXACTLY like screenshot */}
        <div>
          <img src={aideLogo} alt="AIDE Logo" className="h-16 mb-3" />
          <p className="text-[11px] text-gray-900 font-medium leading-tight">
            Where mindset mastery <br /> meets business growth
          </p>
        </div>

        {/* SUPPORT SECTION */}
        <div className="flex items-center gap-3 mb-5">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Support"
            className="w-9 h-9 rounded-full object-cover"
          />
          <span className="text-sm font-semibold text-gray-800">Support</span>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 relative p-6 md:p-12 flex flex-col items-center overflow-auto">

        {/* SETTINGS ICON */}
        <div className="absolute top-8 right-8">
          <Settings className="w-6 h-6 text-white" />
        </div>

        {/* PAGE WRAPPER (Matches screenshot total width) */}
        <div className="w-full max-w-[1000px] flex flex-col gap-10">

          {/* HEADER BOX (matches screenshot EXACT SPACING AND WIDTH) */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-10 rounded-[15px] shadow-lg"
          >
            <h1 className="text-4xl font-bold text-center">
              AIDE Onboarding Quiz
            </h1>
            <p className="text-lg text-center mt-2 text-gray-600">
              Answer a few quick questions so we can personalize your roadmap.
            </p>
          </motion.div>

          {/* MAIN QUESTION CARD */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="bg-white rounded-[15px] p-10 shadow-lg flex flex-col"
          >
            <div className="flex flex-col gap-10">

              {/* QUESTION 1 */}
              <div>
                <h3 className="text-2xl font-semibold mb-5 text-gray-900">
                  Which of the AIDE stages do you feel you need to strengthen most?
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    {
                      label: "Awareness — I need clarity on what’s really holding me back",
                      value: "Awareness",
                    },
                    {
                      label: "Intention — I need stronger goals and focus",
                      value: "Intention",
                    },
                    {
                      label: "Decisiveness — I need to stop hesitating and make moves",
                      value: "Decisiveness",
                    },
                    {
                      label: "Execution — I need consistency and follow-through",
                      value: "Execution",
                    },
                  ].map((item) => (
                    <Button
                      key={item.value}
                      onClick={() => setAideStage(item.value)}
                      className={cn(
                        "h-auto py-5 px-6 text-[1rem] rounded-[6px] border border-[#E5B780] bg-white text-left shadow-sm transition-all",
                        aideStage === item.value
                          ? "bg-[#F3C17E] font-semibold"
                          : "hover:bg-[#F9D8A5]"
                      )}
                    >
                      {item.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* QUESTION 2 */}
              <div>
                <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                  What’s one thing you’d like to see improve in your business or life right now?
                </h3>

                {/* Underlined textarea (matches width + thickness from screenshot) */}
                <Textarea
                  value={improvement}
                  onChange={(e) => setImprovement(e.target.value)}
                  placeholder="Write here..."
                  className="border-0 border-b-2 border-[#E5B780] bg-transparent rounded-none focus-visible:ring-0 text-lg pb-2"
                />
              </div>
            </div>

            {/* NEXT BUTTON */}
            <div className="flex justify-end mt-8">
              <Button
                onClick={handleSubmit}
                className="text-primary text-lg font-bold bg-transparent hover:bg-transparent hover:underline"
              >
                NEXT &gt;&gt;
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
