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
    if (!aideStage || !improvement.trim()) {
      toast.error("Please answer all questions");
      return;
    }
    navigate("/quiz");
  };

  const STAGES = [
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
  ];

  return (
    <div className="min-h-screen flex font-['Poppins'] bg-[#DF1516]">
      {/* LEFT SIDEBAR (now bigger, logo clickable) */}
      <aside className="hidden md:flex flex-col justify-between bg-white w-64 p-8 rounded-r-[28px]">
        <div className="pt-2 cursor-pointer" onClick={() => navigate("/dashboard")}>
          <img src={aideLogo} alt="AIDE Logo" className="h-16" />
          <p className="mt-3 text-[11px] text-gray-800 font-medium leading-tight">
            Where mindset mastery <br /> meets business growth
          </p>
        </div>

        <div className="flex items-center gap-3">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Support"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="text-sm font-semibold text-gray-800">Support</span>
        </div>
      </aside>

      {/* MAIN AREA */}
      <main className="flex-1 relative overflow-auto flex justify-center items-start">
        {/* Settings icon */}
        <div className="absolute top-6 right-6 z-20">
          <Settings className="w-6 h-6 text-white" />
        </div>

        {/* CONTENT WRAPPER (NOW SCALED TO 80%) */}
        <div className="w-full flex justify-center pt-12 px-6 md:px-10">
          <div
            className="w-full max-w-[980px] flex flex-col gap-10 origin-top"
            style={{ transform: "scale(0.90)" }}  // ~80% visual shrink
          >
            {/* HEADER CARD */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="bg-white rounded-xl p-10 shadow-[0_8px_20px_rgba(0,0,0,0.15)]"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-center text-black">
                AIDE Onboarding Quiz
              </h1>
              <p className="mt-3 text-lg md:text-xl text-center text-gray-700">
                Answer a few quick questions so we can personalize your roadmap.
              </p>
            </motion.div>

            {/* QUESTION CARD */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-white rounded-xl p-10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex flex-col"
            >
              {/* Q1 */}
              <div className="mb-10">
                <h3 className="text-[1.6rem] md:text-[1.8rem] font-semibold text-gray-900 mb-6">
                  Which of the AIDE stages do you feel you need to strengthen most?
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {STAGES.map((s) => {
                    const selected = aideStage === s.value;
                    return (
                      <button
                        key={s.value}
                        type="button"
                        onClick={() => setAideStage(s.value)}
                        className={cn(
                          "w-full text-left px-6 py-5 border rounded-sm transition-shadow",
                          "shadow-[0_4px_10px_rgba(0,0,0,0.06)]",
                          selected
                            ? "bg-[#F3C17E] border-[#E3A85B] font-semibold"
                            : "bg-white border-[#F0D3A8] hover:bg-[#fff6ee]"
                        )}
                      >
                        <span className="block text-[1rem] leading-snug">
                          {s.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Q2 */}
              <div>
                <h3 className="text-[1.6rem] md:text-[1.8rem] font-semibold text-gray-900 mb-4">
                  What’s one thing you’d like to see improve in your business or life right now?
                </h3>

                <Textarea
                  value={improvement}
                  onChange={(e) => setImprovement(e.target.value)}
                  placeholder="Write here..."
                  className="w-full bg-transparent resize-none text-lg md:text-xl placeholder:text-gray-400 focus-visible:ring-0 border-0 border-b-2 border-[#E5B780] rounded-none pb-2"
                  rows={3}
                />
              </div>

              {/* NEXT BUTTON */}
              <div className="flex justify-end mt-10">
                <button
                  onClick={handleSubmit}
                  className="text-[#DF1516] font-bold text-lg md:text-xl tracking-wide hover:underline"
                >
                  NEXT &gt;&gt;
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
