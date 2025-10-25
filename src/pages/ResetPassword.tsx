import { useState, FormEvent } from "react";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import aideLogo from "@/assets/aide-logo.png";

import "@fontsource/montserrat/800.css";
import "@fontsource/poppins/400.css";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePasswordReset = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth`,
      });

      if (error) throw new Error(error.message);

      toast({
        title: "Password Reset Email Sent",
        description: "Check your inbox to reset your password.",
      });

      navigate("/auth");
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Reset failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const slideIn: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 70,
        damping: 14,
        delay: 0.2,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary font-[Poppins] p-6">
      <motion.div
        variants={slideIn}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-3xl shadow-lg p-10 w-full max-w-lg flex flex-col items-center"
      >
        <img
          src={aideLogo}
          alt="AIDE Logo"
          className="h-20 mb-8"
        />

        <h1 className="text-4xl font-[Montserrat] font-extrabold text-primary mb-4">
          Reset Password
        </h1>
        <p className="text-foreground text-center mb-8 leading-relaxed">
          Enter your email address below and we’ll send you a link to reset your password.
        </p>

        <form onSubmit={handlePasswordReset} className="w-full space-y-6">
          <Input
            type="email"
            placeholder="Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="h-14 rounded-full border-2 border-primary bg-white text-foreground placeholder:text-primary/60 focus-visible:ring-primary"
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-full bg-primary text-white font-semibold text-lg hover:bg-primary/90 transition-all duration-300"
          >
            {loading ? "SENDING..." : "SEND RESET LINK"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => navigate("/auth")}
          className="mt-8 text-primary hover:underline font-medium transition-colors"
        >
          Back to Sign In
        </button>
      </motion.div>
    </div>
  );
}
