import { Button } from "@/components/ui/button";
import LockedCanvas from "@/components/LockedCanvas";
import { useNavigate } from "react-router-dom";
import aideLogo from "@/assets/aide-logo.png";
import { motion } from "framer-motion";

export default function Submission() {
  const navigate = useNavigate();

  return (
    <LockedCanvas>
      {/* VIEWPORT */}
      <div className="relative w-full h-screen bg-white">

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

        {/* CENTERED OUTER CARD */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            style={{
              width: 995,
              height: 578,
              borderRadius: 17,
              background: "#FFFFFF",
              position: "relative",
              boxShadow:
                "inset 0px 4px 4px rgba(0,0,0,0.25), 0px 4px 4px rgba(0,0,0,0.25)",
            }}
          >
            {/* QUIZ COMPLETED CARD */}
            <div
              style={{
                position: "absolute",
                top: 99,
                left: 40,
                width: 914,
                height: 230,
                background: "#F3C17E",
                boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* TITLE */}
              <h1
                style={{
                  width: 736,
                  height: 74,
                  fontFamily: "Arial",
                  fontWeight: 400,
                  fontSize: 64,
                  lineHeight: "100%",
                  textAlign: "center",
                  marginBottom: 32,
                }}
              >
                🎉 Quiz Completed! 🎉
              </h1>

              {/* SUBTEXT */}
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
                Thank you for completing the quiz. Your personalized roadmap is now ready.
              </p>
            </div>

            {/* CTA BUTTON */}
            <Button
              onClick={() => navigate("/dashboard")}
              className="bg-[#DF1516] hover:bg-[#c01314]"
              style={{
                position: "absolute",
                bottom: 52,
                left: "50%",
                transform: "translateX(-50%)",
                width: 650,
                height: 116,
                borderRadius: 17,
                border: "1px solid #FFFFFF",
                fontFamily: "Montserrat",
                fontWeight: 500,
                fontSize: 24,
              }}
            >
              START YOUR JOURNEY TO MINDSET MASTERY
            </Button>
          </motion.div>
        </div>

        {/* SUPPORT */}
        <div
          style={{
            position: "absolute",
            left: 26,
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 46,
              height: 52,
              borderRadius: "50%",
              background: "#EAEAEA",
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
      </div>
    </LockedCanvas>
  );
}
