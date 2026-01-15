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
          top: 160,
          left: 258,
          width: 995,
          height: 480,
          backgroundColor: "#FFFFFF",
          borderRadius: 17,
          boxShadow: "0px 2px 8px rgba(0,0,0,0.1)",
          border: "1px solid #E5E5E5",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* ORANGE BANNER */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            width: "80%",
            backgroundColor: "#F5C98A",
            borderRadius: 8,
            padding: "40px 60px",
            marginTop: 60,
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 48,
              color: "#333333",
              marginBottom: 16,
            }}
          >
            🎉 Quiz Completed! 🎉
          </h1>
          <p
            style={{
              fontFamily: "Georgia, serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 18,
              color: "#333333",
              lineHeight: 1.5,
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
            className="bg-[#DF1516] hover:bg-[#c01314] uppercase tracking-wide"
            style={{
              width: 480,
              height: 64,
              borderRadius: 32,
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: "0.5px",
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
