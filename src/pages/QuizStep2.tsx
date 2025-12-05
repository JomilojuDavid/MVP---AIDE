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
      {/* LEFT SIDEBAR */}
      <aside className="hidden md:flex flex-col justify-between bg-white w-56 p-6 rounded-r-[28px]">
        <div className="pt-2">
          <img src={aideLogo} alt="AIDE Logo" className="h-16" />
          <p className="mt-3 text-[11px] text-gray-800 font-medium leading-tight">
            Where mindset mastery <br /> meets business growth
          </p>
        </div>

        <div className="flex items-center gap-3">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="Support"
            className="w-9 h-9 rounded-full object-cover"
          />
          <span className="text-sm font-semibold text-gray-800">Support</span>
        </div>
      </aside>

      {/* MAIN AREA */}
      <main className="flex-1 relative overflow-auto">
        {/* Settings icon - top-right inside red area */}
        <div className="absolute top-6 right-6 z-20">
          <Settings className="w-6 h-6 text-white" />
        </div>

        {/* center column */}
        <div className="w-full h-full flex justify-center items-start py-12 px-6 md:px-12">
          <div
            className="w-full max-w-[980px] flex flex-col gap-8"
            style={{ minHeight: "72vh" }}
          >
            {/* Header card */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="bg-white rounded-xl p-8 md:p-10 shadow-[0_8px_20px_rgba(0,0,0,0.15)]"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-center text-black">
                AIDE Onboarding Quiz
              </h1>
              <p className="mt-3 text-lg md:text-xl text-center text-gray-700">
                Answer a few quick questions so we can personalize your roadmap.
              </p>
            </motion.div>

            {/* Question card */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-white rounded-xl p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex flex-col"
              style={{ flex: 1 }}
            >
              <div className="flex flex-col h-full">
                {/* Q1 */}
                <div className="mb-8">
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
                <div className="flex-1">
                  <h3 className="text-[1.6rem] md:text-[1.8rem] font-semibold text-gray-900 mb-4">
                    What’s one thing you’d like to see improve in your business or life right now?
                  </h3>

                  <div className="pt-2 pb-6">
                    {/* Underline textarea: full width, thin underline, spacing like screenshot */}
                    <Textarea
                      value={improvement}
                      onChange={(e) => setImprovement(e.target.value)}
                      placeholder="Write here..."
                      className="w-full bg-transparent resize-none text-lg md:text-xl placeholder:text-gray-400 focus-visible:ring-0 border-0 border-b-2 border-[#E5B780] rounded-none pb-2"
                      rows={3}
                    />
                  </div>
                </div>

                {/* NEXT button at bottom-right */}
                <div className="flex justify-end">
                  <button
                    onClick={handleSubmit}
                    className="text-[#DF1516] font-bold text-lg md:text-xl tracking-wide hover:underline bg-transparent"
                  >
                    NEXT &gt;&gt;
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
