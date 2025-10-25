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
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: { first_name: firstName, last_name: lastName },
        },
      });

      if (error) throw error;
      toast({ title: "Account created successfully!" });
      navigate("/dashboard");
    } catch (error: any) {
      toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
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
      toast({ title: "Welcome back!" });
      navigate("/dashboard");
    } catch (error: any) {
      toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
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
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.2, ease: "easeOut" } },
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
      {/* Sign In Section */}
      <motion.div
        ref={leftRef}
        variants={sectionVariants}
        initial="hidden"
        animate={leftControls}
        className="md:flex-[0.4] bg-white flex flex-col items-center justify-center p-8 md:p-14 relative"
      >
        <img src={aideLogo} alt="AIDE Logo" className="h-14 md:h-16 absolute top-6 left-6 md:top-10 md:left-10" />

        <motion.h1
          className="text-center text-[38px] md:text-[44px] font-extrabold text-[#DF1516] mb-4 font-['Montserrat']"
          variants={fadeItem}
          custom={0}
          initial="hidden"
          animate="visible"
        >
          Hello, Friend!
        </motion.h1>

        <motion.p
          className="text-center text-[20px] md:text-[22px] font-normal text-gray-800 mb-8 font-['Poppins']"
          variants={fadeItem}
          custom={1}
          initial="hidden"
          animate="visible"
        >
          Sign in to continue your personalized journey with{" "}
          <span className="font-semibold text-black">AIDE</span> — where mindset mastery meets business growth.
        </motion.p>

        <motion.form onSubmit={handleSignIn} className="space-y-4" variants={fadeItem} custom={2}>
          <label className="block text-[20px] font-semibold font-['Poppins'] text-gray-700 pl-3">
            Your Email
          </label>
          <Input
            type="email"
            placeholder="Enter your email"
            value={signInEmail}
            onChange={(e) => setSignInEmail(e.target.value)}
            className="h-[65px] rounded-[12px] border border-[#DF1516] text-[18px] font-['Poppins']"
          />

          <label className="block text-[20px] font-semibold font-['Poppins'] text-gray-700 pl-3">
            Password
          </label>
          <div className="relative">
            <Input
              type="password"
              placeholder="Enter your password"
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
              className="h-[65px] rounded-[12px] border border-[#DF1516] pr-[150px] text-[18px] font-['Poppins']"
            />
            <Button
              type="submit"
              disabled={loading}
              className="absolute right-[2px] top-[2px] bottom-[2px] h-[61px] px-10 rounded-[10px] bg-[#DF1516] text-white font-semibold text-[18px]"
            >
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => navigate("/reset-password")}
            className="text-black hover:text-[#DF1516] text-[16px] font-semibold font-['Poppins'] text-left pl-[10px]"
          >
            Forgot Password?
          </button>
        </motion.form>
      </motion.div>

      {/* Sign Up Section */}
      <motion.div
        ref={rightRef}
        variants={sectionVariants}
        initial="hidden"
        animate={rightControls}
        className="md:flex-[0.6] bg-[#DF1516] flex items-center justify-center p-8 md:p-16"
      >
        <div className="w-full max-w-md">
          <motion.h2
            className="text-[36px] md:text-[40px] font-bold text-white mb-8 text-center font-['Montserrat']"
            variants={fadeItem}
            custom={0}
          >
            Create an Account
          </motion.h2>

          <label className="block text-center text-white text-[18px] font-semibold mb-4 font-['Poppins']">
            Continue with
          </label>

          <div className="relative mb-6">
            <Input
              type="text"
              placeholder="Google Account"
              disabled
              className="h-[65px] rounded-[12px] border border-white bg-white/95 text-gray-600 font-['Poppins'] pr-[150px]"
            />
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="absolute right-[2px] top-[2px] bottom-[2px] h-[61px] px-6 rounded-[10px] bg-white text-[#DF1516] font-semibold text-[18px] flex items-center gap-2"
            >
              <FcGoogle size={24} /> Google
            </Button>
          </div>

          <p className="text-white text-center mb-6 font-['Poppins']">or use your Email for registration</p>

          <motion.form onSubmit={handleSignUp} className="space-y-4">
            <label className="block text-[20px] font-semibold text-white font-['Poppins']">Full Name</label>
            <Input
              type="text"
              placeholder="Enter your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-[75px] rounded-[12px] border border-white bg-white/95 text-black placeholder:text-gray-500 font-['Poppins']"
            />

            <label className="block text-[20px] font-semibold text-white font-['Poppins']">Your Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
              className="h-[75px] rounded-[12px] border border-white bg-white/95 text-black placeholder:text-gray-500 font-['Poppins']"
            />

            <label className="block text-[20px] font-semibold text-white font-['Poppins']">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
              className="h-[75px] rounded-[12px] border border-white bg-white/95 text-black placeholder:text-gray-500 font-['Poppins']"
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-[75px] rounded-[12px] bg-white text-[#DF1516] font-semibold text-[18px] hover:bg-white/90 font-['Poppins']"
            >
              {loading ? "SIGNING UP..." : "SIGN UP"}
            </Button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}
