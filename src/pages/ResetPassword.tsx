import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth`,
    });
    setLoading(false);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({
        title: "Reset link sent!",
        description: "Check your email for password reset instructions.",
      });
      navigate("/auth");
    }
  };

  return (
    <div className="min-h-screen bg-[#DF1516] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white rounded-3xl shadow-lg w-full max-w-md p-10 text-center"
      >
        <h1
          className="text-[#DF1516] text-3xl font-extrabold mb-6"
          style={{ fontFamily: "Montserrat, sans-serif" }}
        >
          Reset Password
        </h1>
        <p
          className="text-[#333] mb-6"
          style={{ fontFamily: "Poppins, sans-serif", fontSize: "18px" }}
        >
          Enter your email address to receive a password reset link.
        </p>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <Input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-[70px] rounded-[25px] border border-[#DF1516] text-[18px] px-6"
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-[70px] rounded-[25px] bg-[#DF1516] text-white text-lg font-semibold hover:bg-[#c01314]"
          >
            {loading ? "SENDING..." : "SEND RESET LINK"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
