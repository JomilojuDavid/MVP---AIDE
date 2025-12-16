import { Button } from "@/components/ui/button";
import { LockedCanvas } from "@/components/LockedCanvas";
import { useNavigate } from "react-router-dom";
import aideLogo from "@/assets/aide-logo.png";
import { motion } from "framer-motion";

export default function Submission() {
  const navigate = useNavigate();

  return (
    <LockedCanvas width={1512} height={982}>
      {/* LOGO */}
      <img
        src={aideLogo}
        alt="AIDE Logo"
        style={{
          position: "absolute",
          top: 19,
          left: 26,
          width: 167,
          height: 132,
        }}
      />

      {/* SUCCESS CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          position: "absolute",
          top: 202,
          left: 258,
          width: 995,
          height: 578,
          backgroundColor: "#FFFFFF",
          borderRadius: 17,
          boxShadow:
            "inset 0px 4px 4px rgba(0,0,0,0.25), 0px 4px 4px rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* QUIZ COMPLETED TEXT */}
        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            width: 736,
            height: 74,
            fontFamily: "Arial, sans-serif",
            fontWeight: 400,
            fontSize: 64,
            lineHeight: "100%",
            textAlign: "center",
            marginBottom: 48,
          }}
        >
          🎉 Quiz Completed!
        </motion.h1>

        {/* CTA BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
        >
          <Button
            onClick={() => navigate("/dashboard")}
            className="bg-[#DF1516] hover:bg-[#c01314]"
            style={{
              width: 420,
              height: 64,
              borderRadius: 32,
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            Start Your Journey
          </Button>
        </motion.div>
      </motion.div>
    </LockedCanvas>
  );
}
