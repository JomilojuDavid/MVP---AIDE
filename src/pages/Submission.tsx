import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LockedCanvas } from "@/components/LockedCanvas";
import { useNavigate } from "react-router-dom";
import aideLogo from "@/assets/aide-logo.png";
import { motion } from "framer-motion";
import { SupportModal } from "@/components/SupportModal";

export default function Submission() {
  const navigate = useNavigate();
  const [showSupportModal, setShowSupportModal] = useState(false);

  return (
    <LockedCanvas>
      {/* LOGO */}
      <img
        src={aideLogo}
        alt="AIDE Logo"
        style={{
          position: "absolute",
          top: 24,
          left: 32,
          width: 150,
        }}
      />

      {/* SUCCESS CARD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: "absolute",
<<<<<<< HEAD
          top: 170,
          left: 258,
          width: 995,
          height: 580,
=======
          top: 180,
          left: "50%",
          transform: "translateX(-50%)",
          width: 850,
>>>>>>> e28e2440ac8805942311653034144e7a1e19b7df
          backgroundColor: "#FFFFFF",
<<<<<<< HEAD
          borderRadius: 20,
          boxShadow: "0px 6px 20px rgba(0,0,0,0.18)",
=======
          borderRadius: 16,
          boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
          border: "1px solid #E0E0E0",
>>>>>>> e28e2440ac8805942311653034144e7a1e19b7df
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: 50,
        }}
      >
<<<<<<< HEAD
        {/* YELLOW BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
=======
        {/* ORANGE BANNER */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
>>>>>>> e28e2440ac8805942311653034144e7a1e19b7df
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
<<<<<<< HEAD
            width: 820,
            height: 160,
            backgroundColor: "#F6C888",
            borderRadius: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px 40px",
=======
            width: "100%",
            backgroundColor: "#F5C98A",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            padding: "50px 60px",
>>>>>>> e28e2440ac8805942311653034144e7a1e19b7df
            textAlign: "center",
<<<<<<< HEAD
            marginBottom: 80,
=======
>>>>>>> e28e2440ac8805942311653034144e7a1e19b7df
          }}
        >
<<<<<<< HEAD
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
=======
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 52,
              color: "#333333",
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 16,
            }}
          >
            <span>🎉</span>
            <span>Quiz Completed!</span>
            <span>🎉</span>
          </h1>
          <p
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 20,
              color: "#333333",
              lineHeight: 1.6,
            }}
          >
            Thank you for completing the quiz. Your
            <br />
            personalized roadmap is now ready.
          </p>
        </motion.div>
>>>>>>> e28e2440ac8805942311653034144e7a1e19b7df

          <p
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: 22,
              fontWeight: 400,
              lineHeight: "140%",
              maxWidth: 620,
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
<<<<<<< HEAD
          transition={{ delay: 0.4 }}
=======
          transition={{ delay: 0.45 }}
          style={{ marginTop: 50 }}
>>>>>>> e28e2440ac8805942311653034144e7a1e19b7df
        >
          <Button
            onClick={() => navigate("/dashboard")}
            className="bg-[#DF1516] hover:bg-[#c01314] uppercase tracking-wide text-white"
            style={{
<<<<<<< HEAD
              width: 480,
              height: 72,
              borderRadius: 36,
              fontSize: 20,
=======
              width: 520,
              height: 60,
              borderRadius: 30,
              fontSize: 16,
>>>>>>> e28e2440ac8805942311653034144e7a1e19b7df
              fontWeight: 600,
              letterSpacing: "1px",
            }}
          >
<<<<<<< HEAD
            START YOUR JOURNEY TO MINDSET MASTERY
=======
            Start Your Journey to Mindset Mastery
>>>>>>> e28e2440ac8805942311653034144e7a1e19b7df
          </Button>
        </motion.div>
      </motion.div>

      {/* SUPPORT SECTION */}
      <div
        className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => setShowSupportModal(true)}
        style={{
          position: "absolute",
          bottom: 40,
          left: 40,
        }}
      >
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="Support"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="text-sm font-semibold text-gray-800">Support</span>
      </div>

      <SupportModal open={showSupportModal} onOpenChange={setShowSupportModal} />
    </LockedCanvas>
  );
}
