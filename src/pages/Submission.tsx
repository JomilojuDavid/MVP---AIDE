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
          top: 180,
          left: "50%",
          transform: "translateX(-50%)",
          width: 850,
          backgroundColor: "#FFFFFF",
          borderRadius: 16,
          boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
          border: "1px solid #E0E0E0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingBottom: 50,
        }}
      >
        {/* ORANGE BANNER */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            width: "100%",
            backgroundColor: "#F5C98A",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            padding: "50px 60px",
            textAlign: "center",
          }}
        >
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

        {/* CTA BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          style={{ marginTop: 50 }}
        >
          <Button
            onClick={() => navigate("/dashboard")}
            className="bg-[#DF1516] hover:bg-[#c01314] uppercase tracking-wide text-white"
            style={{
              width: 520,
              height: 60,
              borderRadius: 30,
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: "1px",
            }}
          >
            Start Your Journey to Mindset Mastery
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
