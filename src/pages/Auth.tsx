import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import aideLogo from "@/assets/aide-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function Auth() {
  const [fullName, setFullName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Scroll-triggered animations
  const leftControls = useAnimation();
  const rightControls = useAnimation();
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === leftRef.current) leftControls.start("visible");
            if (entry.target === rightRef.current) rightControls.start("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    if (leftRef.current) observer.observe(leftRef.current);
    if (rightRef.current) observer.observe(rightRef.current);

    return () => observer.disconnect();
  }, [leftControls, rightControls]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const nameParts = fullName.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      const { error } = await supabase.auth.signUp({
        email: signUpEmail,
        password: signUpPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: { first_name: firstName, last_name: lastName },
        },
      });

      if (error) throw error;

      toast({
        title: "Account created successfully!",
        description: "Redirecting to dashboard...",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: signInEmail,
        password: signInPassword,
      });
      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "Redirecting to dashboard...",
      });

      navigate("/dashboard");
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/dashboard` },
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        title: "Google sign in failed",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  // Animation presets
  const sectionVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1.2, ease: "easeOut" },
    },
  };

  const fadeItem = {
    hidden: { opacity: 0, y: 25 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15 + 0.3, duration: 0.7 },
    }),
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden bg-white">
      {/* Left Panel - Sign In */}
      {/* (Unchanged, omitted for brevity) */}

      {/* Right Panel - Sign Up */}
      <motion.div
        ref={rightRef}
        variants={sectionVariants}
        initial="hidden"
        animate={rightControls}
        className="md:flex-[0.6] bg-[#DF1516] flex items-center justify-center p-10 sm:p-14 md:p-24"
      >
        <div className="w-full max-w-3xl flex flex-col items-center">
          <motion.h2
            className="text-4xl sm:text-5xl font-extrabold text-white mb-10 text-center font-['Montserrat']"
            variants={fadeItem}
            custom={0}
            initial="hidden"
            animate="visible"
          >
            Create an Account
          </motion.h2>

          <Button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-[603px] h-[83px] rounded-[0px] bg-white text-[#DF1516] 
                       font-semibold hover:bg-white/90 flex items-center justify-center gap-2 text-[18px]"
          >
            <FcGoogle size={38} />
            Continue With Google
          </Button>

          <p className="text-white text-center my-8 font-['Poppins'] text-[20px]">
            or use your Email for registration
          </p>

          <motion.form onSubmit={handleSignUp} className="flex flex-col items-center space-y-6">
            {/* Full Name */}
            <Input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-[283px] h-[83px] border border-white bg-white/95 
                         text-black placeholder:text-gray-500 text-[24px] 
                         font-normal font-['Poppins'] placeholder:text-[19px] 
                         placeholder:font-normal"
            />

            {/* Your Email */}
            <Input
              type="email"
              placeholder="Your Email"
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
              className="w-[283px] h-[83px] border border-white bg-white/95 
                         text-black placeholder:text-gray-500 text-[24px] 
                         font-normal font-['Poppins'] placeholder:text-[19px] 
                         placeholder:font-normal"
            />

            {/* Password */}
            <Input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
              className="w-[603px] h-[83px] border border-white bg-white/95 
                         text-black placeholder:text-gray-500 text-[24px] 
                         font-normal font-['Poppins'] placeholder:text-[19px] 
                         placeholder:font-normal"
            />

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-[603px] h-[83px] bg-white text-[#DF1516] 
                         font-bold text-2xl hover:bg-white/90 font-['Poppins']"
            >
              {loading ? "SIGNING UP..." : "SIGN UP"}
            </Button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}
