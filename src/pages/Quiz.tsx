import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import aideLogo from "@/assets/aide-logo.png";
import { motion, useAnimation } from "framer-motion";

export default function Quiz() {
  const navigate = useNavigate();
  const [question1, setQuestion1] = useState("");
  const [question3, setQuestion3] = useState("");

  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) controls.start("visible");
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, [controls]);

  const handleSubmit = () => {
    if (!question1 || !question3) {
      toast.error("Please answer all questions");
      return;
    }
    navigate("/submission");
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen font-['Poppins']">
      {/* LEFT WHITE SIDEBAR */}
      <div className="bg-white md:w-[25%] w-full flex flex-col md:justify-between items-center md:rounded-r-[30px] md:p-8 p-4 border-b md:border-b-0 md:border-r border-gray-200">
        {/* Logo Section */}
        <div className="flex flex-col items-center text-center mt-2 md:mt-6">
          <img
            src={aideLogo}
            alt="AIDE Logo"
            className="w-[120px] md:w-[150px] h-auto mb-1 md:mb-2"
          />
          <p className="text-xs md:text-sm text-gray-800 font-medium leading-tight">
            Where mindset mastery <br className="hidden md:block" /> meets business growth
          </p>
        </div>

        {/* Support Section */}
        <div className="flex flex-col items-center mt-4 md:mt-0 md:mb-4">
          <div className="flex items-center gap-3">
            <img
              src="https://randomuser.me/api/portraits/women/44.jpg"
              alt="Support"
              className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
            />
            <span className="text-gray-900 text-sm md:text-base font-medium">Support</span>
          </div>
        </div>
      </div>

      {/* RIGHT MAIN RED SECTION */}
      <div
        className="flex-1 bg-[#DF1516] relative p-6 md:p-12"
        ref={sectionRef}
      >
        {/* Top Bar */}
        <div className="absolute top-6 right-6 md:top-8 md:right-8 flex items-center justify-end z-10">
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 md:w-10 md:h-10 text-white hover:text-white/80"
          >
            <Settings className="w-5 h-5 md:w-6 md:h-6" />
          </Button>
        </div>

        {/* QUIZ CONTENT */}
        <div className="max-w-5xl mx-auto pt-20 md:pt-24">
          {/* Header */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={controls}
            className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 mb-10 shadow-lg text-center"
          >
            <h1 className="text-3xl md:text-5xl font-['Montserrat'] font-extrabold mb-4 text-[#000000]">
              AIDE Onboarding Quiz
            </h1>
            <p className="text-base md:text-xl text-gray-800 font-normal">
              Answer a few quick questions so we can personalize your roadmap.
            </p>
          </motion.div>

          {/* Quiz Card */}
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate={controls}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-md"
          >
            <div className="space-y-10">
              {/* Question 1 */}
              <motion.div variants={fadeInUp}>
                <h3 className="text-lg md:text-2xl font-semibold mb-6 text-[#000000] text-left">
                  Which of the AIDE stages do you feel you need to strengthen most?
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    "Awareness {I need clarity on what’s really holding me back}",
                    "Intention — I need stronger goals and focus",
                    "Decisiveness — I need to stop hesitating and make moves",
                    "Execution — I need consistency and follow-through",
                  ].map((option) => (
                    <Button
                      key={option}
                      onClick={() => setQuestion1(option)}
                      className={cn(
                        "h-20 px-4 text-sm md:text-base font-medium rounded-2xl border transition-all duration-200 text-left leading-snug",
                        question1 === option
                          ? "bg-[#DF1516]/20 border-[#DF1516] text-[#000000] font-semibold"
                          : "bg-white border-[#E5B88F] text-[#000000] hover:bg-[#DF1516]/10"
                      )}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </motion.div>

              {/* Question 3 */}
              <motion.div variants={fadeInUp}>
                <h3 className="text-lg md:text-2xl font-semibold mb-6 text-[#000000] text-left">
                  What’s one thing you’d like to see improve in your business or life right now?
                </h3>
                <Textarea
                  value={question3}
                  onChange={(e) => setQuestion3(e.target.value)}
                  placeholder="Write here..."
                  className="min-h-32 bg-white text-[#000000] placeholder:text-gray-500 border-b-2 border-[#E5B88F] rounded-none text-base md:text-lg resize-none focus-visible:ring-0 focus-visible:border-[#DF1516]"
                />
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.div
              variants={fadeInUp}
              className="flex justify-end mt-10"
              transition={{ delay: 0.3 }}
            >
              <button
                onClick={handleSubmit}
                className="text-[#DF1516] text-lg md:text-xl font-bold tracking-wide hover:underline focus:outline-none transition-all"
              >
                NEXT &gt;&gt;
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
