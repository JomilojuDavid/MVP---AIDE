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

  // Scroll animation controls
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 + i * 0.1, duration: 0.5 },
    }),
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen flex overflow-hidden bg-white">
      {/* Left Panel - Sign In */}
      <motion.div
        ref={leftRef}
        variants={sectionVariants}
        initial="hidden"
        animate={leftControls}
        className="flex-[0.4] bg-white flex items-center justify-center p-8 md:p-16 relative"
      >
        <div className="w-full max-w-md">
          <motion.img
            src={aideLogo}
            alt="AIDE Logo"
            className="h-14 mb-10 absolute top-10 left-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          />

          <motion.h1
            className="text-center text-4xl font-extrabold text-[#DF1516] mb-5 font-['Montserrat']"
          >
            Hello, Friend!
          </motion.h1>

          <motion.p
            className="text-center text-[22px] font-normal leading-tight text-gray-800 mb-10 font-['Poppins']"
          >
            Sign in to continue your personalized journey with{" "}
            <span className="font-semibold text-black">AIDE</span> — where mindset mastery meets business growth.
          </motion.p>

          <motion.form onSubmit={handleSignIn} className="space-y-4">
            <motion.div custom={0} variants={itemVariants} initial="hidden" animate="visible">
              <Input
                type="email"
                placeholder="Your Email"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                className="h-[70px] rounded-[30px] border border-[#DF1516] bg-white text-foreground placeholder:text-[#DF1516]/60 focus-visible:ring-[#DF1516] font-['Poppins'] text-[20px]"
              />
            </motion.div>

            <motion.div custom={1} variants={itemVariants} initial="hidden" animate="visible" className="relative">
              <div className="flex items-center relative">
                <Input
                  type="password"
                  placeholder="Password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  className="h-[70px] w-full rounded-[30px] border border-[#DF1516] pr-[150px] text-[20px] font-['Poppins']"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="absolute right-[2px] top-[2px] bottom-[2px] h-[66px] px-10 rounded-[28px] bg-[#DF1516] text-white font-semibold hover:bg-[#DF1516]/90 transition-all duration-300 font-['Poppins'] text-[20px]"
                >
                  {loading ? "SIGNING IN..." : "SIGN IN"}
                </Button>
              </div>
            </motion.div>

            <motion.button
              type="button"
              className="text-black hover:text-[#DF1516] transition-colors font-semibold text-[16px] font-['Poppins'] pl-[10px]"
              onClick={() => navigate("/reset-password")}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6, ease: "easeOut" }}
            >
              Forgot Password?
            </motion.button>
          </motion.form>
        </div>
      </motion.div>

      {/* Right Panel - Sign Up */}
      <motion.div
        ref={rightRef}
        variants={sectionVariants}
        initial="hidden"
        animate={rightControls}
        className="flex-[0.6] bg-[#DF1516] flex items-center justify-center p-8 md:p-16"
      >
        <div className="w-full max-w-md">
          <motion.h2 className="text-4xl font-bold text-white mb-8 text-center font-['Montserrat']">
            Create an Account
          </motion.h2>

          <motion.div className="mb-6">
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full h-[70px] rounded-[30px] bg-white text-[#DF1516] font-semibold hover:bg-white/90 flex items-center justify-center gap-3"
            >
              <FcGoogle size={24} />
              Continue With Google
            </Button>
          </motion.div>

          <motion.p className="text-white text-center mb-6 font-['Poppins']">
            or use your Email for registration
          </motion.p>

          <motion.form onSubmit={handleSignUp} className="space-y-4">
            <motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="h-[83px] rounded-[30px] border border-white bg-white/95 text-black placeholder:text-gray-500 font-['Poppins']"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                className="h-[83px] rounded-[30px] border border-white bg-white/95 text-black placeholder:text-gray-500 font-['Poppins']"
              />
            </motion.div>

            <Input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
              className="h-[83px] w-full rounded-[30px] border border-white bg-white/95 text-black placeholder:text-gray-500 font-['Poppins']"
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-[83px] rounded-[30px] bg-white text-[#DF1516] font-bold text-lg hover:bg-white/90 font-['Poppins']"
            >
              {loading ? "SIGNING UP..." : "SIGN UP"}
            </Button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}
