import { useState } from "react";
import { motion, Variants, easeOut } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import aideLogo from "@/assets/aide-logo.png";
import { useNavigate } from "react-router-dom";

import "@fontsource/montserrat/800.css";
import "@fontsource/poppins/400.css";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Animation variants
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: easeOut,
      },
    }),
  };

  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number = 0) => ({
      opacity: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: easeOut,
      },
    }),
  };

  const handleResetPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth`,
      });

      if (error) throw error;

      toast({
        title: "Password reset email sent!",
        description: "Check your inbox for a reset link.",
      });
      setEmail("");
    } catch (err) {
      const description =
        err instanceof Error ? err.message : "An unknown error occurred";
      toast({
        title: "Reset failed",
        description,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center font-[Poppins] p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easeOut }}
        className="bg-white w-full max-w-md rounded-3xl shadow-lg p-10 flex flex-col items-center text-center"
      >
        <motion.img
          src={aideLogo}
          alt="AIDE Logo"
          className="h-16 mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        />

        <motion.h1
          className="text-4xl font-[Montserrat] font-extrabold text-primary mb-4"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          Reset Password
        </motion.h1>

        <motion.p
          className="text-foreground text-base mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
        >
          Enter your email address and we’ll send you a link to reset your
          password.
        </motion.p>

        <motion.form
          onSubmit={handleResetPassword}
          className="w-full space-y-4"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <motion.div variants={fadeUp} custom={2}>
            <Input
              type="email"
              placeholder="Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-14 rounded-full border-2 border-primary bg-white text-foreground placeholder:text-primary/60 focus-visible:ring-primary"
              required
            />
          </motion.div>

          <motion.div variants={fadeUp} custom={3}>
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-full bg-primary text-white font-bold text-lg hover:bg-primary/90"
            >
              {loading ? "SENDING..." : "SEND RESET LINK"}
            </Button>
          </motion.div>

          <motion.button
            type="button"
            onClick={() => navigate("/auth")}
            className="text-primary hover:underline mt-3 text-sm"
            variants={fadeUp}
            custom={4}
          >
            Back to Sign In
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}
