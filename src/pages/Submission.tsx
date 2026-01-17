import { Button } from "@/components/ui/button";
import LockedCanvas from "@/components/LockedCanvas";
import { useNavigate } from "react-router-dom";
import aideLogo from "@/assets/aide-logo.png";
import supportWoman from "@/assets/support-woman.jpg";
import { SupportModal } from "./SupportModal";
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
          top: 19,
          left: 26,
          width: 167,
          height: 132,
        }}
      />

      {/* OUTER CARD */}
      <div
        style={{
          position: "absolute",
          top: 202,
          left: 258,
          width: 995,
          height: 578,
          background: "#FFFFFF",
          borderRadius: 17,
          boxShadow:
            "inset 0px 4px 4px rgba(0,0,0,0.25), 0px 4px 4px rgba(0,0,0,0.25)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* QUIZ COMPLETED INNER CARD */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: "absolute",
            top: 99,
            width: 914,
            height: 230,
            background: "#F3C17E",
            boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 28,
          }}
        >
          <h1
            style={{
              width: 736,
              height: 74,
              fontFamily: "Arial, sans-serif",
              fontWeight: 400,
              fontSize: 64,
              lineHeight: "100%",
              textAlign: "center",
            }}
          >
            🎉 Quiz Completed!
          </h1>

          <p
            style={{
              width: 559,
              height: 58,
              fontFamily: "Montserrat",
              fontWeight: 500,
              fontSize: 24,
              lineHeight: "100%",
              textAlign: "center",
            }}
          >
            Thank you for completing the assessment
          </p>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          style={{
            position: "absolute",
            top: 387,
            width: 650,
            height: 116,
            borderRadius: 17,
            border: "1px solid #FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={() => navigate("/dashboard")}
            className="bg-[#DF1516] hover:bg-[#c01314]"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 17,
              fontFamily: "Montserrat",
              fontWeight: 500,
              fontSize: 24,
            }}
          >
            Start Your Journey
          </Button>
        </motion.div>
      </div>

      {/* SUPPORT */}
      <div
        style={{
          position: "absolute",
          left: 26,
          bottom: 37,
          display: "flex",
          alignItems: "center",
          gap: 11,
        }}
      >
        <img
          src={supportAvatar}
          alt="Support"
          style={{
            width: 46,
            height: 52,
            objectFit: "cover",
          }}
        />

        <span
          style={{
            width: 160,
            height: 28,
            fontFamily: "Arial",
            fontWeight: 400,
            fontSize: 24,
            lineHeight: "100%",
          }}
        >
          Support
        </span>
      </div>
    </LockedCanvas>
  );
}
