import { Button } from "@/components/ui/button";
import { LockedCanvas } from "@/components/LockedCanvas";
import { useNavigate } from "react-router-dom";
import aideLogo from "@/assets/aide-logo.png";
import { motion } from "framer-motion";

export default function Submission() {
  const navigate = useNavigate();

  return (
    <LockedCanvas>
      {/* LOGO */}
      <img
        src={aideLogo}
        alt="AIDE Logo"
        style={{
          position: "absolute",
          top: 28,
          left: 32,
          width: 155,
        }}
      />

      {/* CENTERED SUCCESS CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 995,
          height: 578,
          backgroundColor: "#FFFFFF",
          borderRadius: 20,
          border: "1px solid #D9D9D9",
          boxShadow: "0px 6px 18px rgba(0,0,0,0.18)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* YELLOW BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          style={{
            width: 820,
            height: 160,
            backgroundColor: "#F6C888",
            borderRadius: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "28px 40px",
            textAlign: "center",
            marginBottom: 90,
          }}
        >
          <h1
            style={{
              fontFamily: "Arial, sans-serif",
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
              fontFamily: "Montserrat, sans-serif",
              fontSize: 22,
              fontWeight: 400,
              lineHeight: "140%",
              maxWidth: 640,
            }}
          >
            Thank you for completing the quiz. Your personalized roadmap is now
            ready.
          </p>
        </motion.div>

        {/* CTA BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
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
      </motion.div>
    </LockedCanvas>
  );
}
