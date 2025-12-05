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
          emailRedirectTo: `${window.location.origin}/quiz`,
          data: { first_name: firstName, last_name: lastName },
        },
      });

      if (error) throw error;

      toast({
        title: "Account created successfully!",
        description: "Redirecting to dashboard...",
      });

      navigate("/quiz-step2");
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

      navigate("/quiz");
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

  const sectionVariants = {
    hidden: { opacity: 0, y: 80, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 1.2 },
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
      <motion.div
        ref={leftRef}
        variants={sectionVariants}
        initial="hidden"
        animate={leftControls}
        className="md:flex-[0.4] bg-white flex items-center justify-center p-6 sm:p-8 md:p-14 relative"
      >
        {/* 80% Scaling Wrapper */}
        <div className="scale-[0.8] transform origin-center w-full max-w-md mx-auto relative">
          <motion.img
            src={aideLogo}
            alt="AIDE Logo"
            onClick={() => navigate("/dashboard")}
            className="h-[74px] md:h-[84px] absolute top-6 left-6 md:top-10 md:left-10 cursor-pointer"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
          />

          <motion.h1
            className="text-center text-[42px] sm:text-[46px] md:text-[48px] font-extrabold text-[#DF1516] mb-5 font-['Montserrat']"
            variants={fadeItem}
            custom={0}
            initial="hidden"
            animate="visible"
          >
            Hello, Friend!
          </motion.h1>

          <motion.p
            className="text-center text-[20px] sm:text-[22px] md:text-[24px] font-normal leading-tight text-gray-800 mb-10 font-['Poppins']"
            variants={fadeItem}
            custom={1}
            initial="hidden"
            animate="visible"
          >
            Sign in to continue your personalized journey with{" "}
            <span className="font-semibold text-black">AIDE</span> — where
            mindset mastery meets business growth.
          </motion.p>

          <motion.form
            onSubmit={handleSignIn}
            className="space-y-4"
            variants={fadeItem}
            custom={2}
            initial="hidden"
            animate="visible"
          >
            <Input
              type="email"
              placeholder="Your Email"
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
              className="h-[65px] sm:h-[70px] rounded-[0px] border border-[#DF1516]
                         text-[26px] font-normal font-['Poppins'] 
                         placeholder:text-[21px] placeholder:font-normal
                         placeholder:text-[#DF1516] focus-visible:ring-[#DF1516]"
            />
            <div className="relative flex border border-[#DF1516]">
              <Input
                type="password"
                placeholder="Password"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                className="flex-1 h-[70px] border-none rounded-none text-[26px] font-normal font-['Poppins']
                           placeholder:text-[21px] placeholder:font-normal placeholder:text-[#DF1516]"
              />
              <Button
                type="submit"
                disabled={loading}
                className="h-[70px] w-[140px] rounded-none bg-[#DF1516] text-white 
                           font-semibold text-[20px] hover:bg-[#DF1516]/90 transition-all"
              >
                {loading ? "..." : "SIGN IN"}
              </Button>
            </div>

            <button
              type="button"
              onClick={() => navigate("/reset-password")}
              className="text-black hover:text-[#DF1516] transition-colors 
                         font-semibold text-[20px] font-['Poppins'] pl-[10px]"
            >
              Forgot Password?
            </button>
          </motion.form>
        </div>
      </motion.div>

      {/* Right Panel - Sign Up */}
      <motion.div
        ref={rightRef}
        variants={sectionVariants}
        initial="hidden"
        animate={rightControls}
        className="md:flex-[0.6] bg-[#DF1516] flex items-center justify-center p-10 sm:p-14 md:p-24"
      >
        {/* 80% Scaling Wrapper */}
        <div className="scale-[0.8] transform origin-center w-full max-w-2xl mx-auto">
          <motion.h2
            className="text-[44px] sm:text-[48px] font-extrabold text-white mb-12 text-center font-['Montserrat']"
            variants={fadeItem}
            custom={0}
            initial="hidden"
            animate="visible"
          >
            Create an Account
          </motion.h2>

          <div className="flex w-[85%] sm:w-[80%] mx-auto mb-10 border border-[#DF1516] rounded-none overflow-hidden">
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="flex items-center justify-center bg-white w-[80px] border-r border-[#DF1516]"
            >
              <FcGoogle size={32} />
            </button>
            <Button
              type="button"
              disabled={loading}
              className="flex-1 h-[75px] bg-white text-[#DF1516] 
                         font-medium text-[20px] font-['Poppins'] hover:bg-white/90 rounded-none"
            >
              Continue With Google
            </Button>
          </div>

          <p className="text-white text-center my-10 font-['Poppins'] text-[22px]">
            or use your Email for registration
          </p>

          <motion.form onSubmit={handleSignUp} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
              <Input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="h-[75px] rounded-[0px] border border-white 
                           bg-white/95 text-black placeholder:text-gray-500 
                           text-[26px] font-normal font-['Poppins'] 
                           placeholder:text-[22px] placeholder:font-normal"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                className="h-[75px] rounded-[0px] border border-white 
                           bg-white/95 text-black placeholder:text-gray-500 
                           text-[26px] font-normal font-['Poppins'] 
                           placeholder:text-[22px] placeholder:font-normal"
              />
            </div>

            <Input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
              className="h-[75px] w-full rounded-[0px] border border-white 
                         bg-white/95 text-black placeholder:text-gray-500 
                         text-[26px] font-normal font-['Poppins'] 
                         placeholder:text-[22px] placeholder:font-normal"
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-[85px] sm:h-[90px] rounded-[0px] bg-white text-[#DF1516] 
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
