import { Button } from "@/components/ui/button";
import LockedCanvas from "@/components/LockedCanvas";
import { useNavigate } from "react-router-dom";
import aideLogo from "@/assets/aide-logo.png";
import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";

export default function Submission() {
  const navigate = useNavigate();

  return (
    <LockedCanvas>
      {/* VIEWPORT WRAPPER — THIS IS THE FIX */}
      <div className="relative h-screen w-full flex items-center justify-center">

        {/* LOGO — matches screenshot position */}
        <img
          src={aideLogo}
          alt="AIDE Logo"
          className="absolute top-[32px] left-[40px] w-[160px]"
        />

        {/* SUPPORT ICON — bottom right */}
        <div className="absolute bottom-[32px] right-[40px] cursor-pointer">
          <HelpCircle size={34} className="text-black opacity-80" />
        </div>

        {/* MAIN SUBMISSION CARD — TRUE CENTER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="flex flex-col items-center justify-center bg-white"
          style={{
            width: 995,
            height: 578,
            borderRadius: 20,
            border: "1px solid #D9D9D9",
            boxShadow: "0px 6px 18px rgba(0,0,0,0.18)",
          }}
        >
          {/* YELLOW MESSAGE CARD */}
          <div
            style={{
              width: 820,
              height: 160,
              backgroundColor: "#F6C888",
              borderRadius: 8,
              padding: "28px 40px",
              textAlign: "center",
              marginBottom: 90,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1
              style={{
                fontSize: 56,
                fontWeight: 400,
                lineHeight: "100%",
                marginBottom: 20,
              }}
            >
              🎉 Quiz Completed! 🎉
            </h1>

            <p
              style={{
                fontSize: 22,
                fontWeight: 400,
                lineHeight: "140%",
                maxWidth: 640,
              }}
            >
              Thank you for completing the quiz. Your personalized roadmap is now
              ready.
            </p>
          </div>

          {/* CTA BUTTON */}
          <Button
            onClick={() => navigate("/dashboard")}
            className="bg-[#DF1516] hover:bg-[#c01314]"
            style={{
              width: 480,
              height: 72,
              borderRadius: 36,
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            START YOUR JOURNEY TO MINDSET MASTERY
          </Button>
        </motion.div>
      </div>
    </LockedCanvas>
  );
}
