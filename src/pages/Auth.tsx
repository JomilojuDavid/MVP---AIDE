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
  const controls = useAnimation();
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            controls.start("visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [controls]);

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
    } catch (error: unknown) {
      const err = error as Error;
      toast({
        title: "Sign up failed",
        description: err.message,
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
    } catch (error: unknown) {
      const err = error as Error;
      toast({
        title: "Sign in failed",
        description: err.message,
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
    } catch (error: unknown) {
      const err = error as Error;
      toast({
        title: "Google sign in failed",
        description: err.message,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  // Variants for scroll + entrance
  const fadeVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
    },
  };

  return (
    <div
      ref={sectionRef}
      className="min-h-screen flex flex-col md:flex-row overflow-hidden"
    >
      {/* Left Panel - Sign In */}
      <motion.div
        initial={{ opacity: 0, x: -80, scale: 0.95 }}
        animate={controls}
        variants={fadeVariants}
        className="w-full md:w-[40%] bg-white flex flex-col items-center justify-center px-8 md:px-16"
      >
        <div className="w-full max-w-md">
          <motion.img
            src={aideLogo}
            alt="AIDE Logo"
            className="w-[180px] h-auto mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          />

          <motion.h1
            className="text-[42px] font-extrabold text-[#DF1516] text-center mb-4 font-[Montserrat]"
            variants={fadeVariants}
          >
            Hello, Friend!
          </motion.h1>

          <motion.p
            className="text-center text-[20px] font-[Poppins] text-gray-700 mb-10 leading-snug"
            variants={fadeVariants}
          >
            Sign in to continue your personalized journey with{" "}
            <span className="font-semibold text-black">AIDE</span>—where
            mindset mastery meets business growth.
          </motion.p>

          <motion.form
            onSubmit={handleSignIn}
            className="space-y-4"
            variants={fadeVariants}
          >
            <div>
              <Input
                type="email"
                placeholder="Your Email"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                className="h-11 w-full bg-gray-50 border border-gray-300 rounded-md text-gray-700 placeholder:text-gray-500 px-4 focus:ring-[#DF1516]/50"
              />
            </div>

            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="Password"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                className="h-11 flex-1 bg-gray-50 border border-gray-300 rounded-md text-gray-700 placeholder:text-gray-500 px-4 focus:ring-[#DF1516]/50"
              />
              <Button
                type="submit"
                disabled={loading}
                className="h-11 px-8 rounded-md bg-[#DF1516] text-white font-semibold hover:bg-[#c51213] transition-all"
              >
                {loading ? "SIGNING IN..." : "SIGN IN"}
              </Button>
            </div>

            <button
              type="button"
              onClick={() => navigate("/reset-password")}
              className="text-black font-semibold text-[16px] font-[Poppins] mt-2 ml-1 hover:text-[#DF1516] transition-colors"
            >
              Forgot Password?
            </button>
          </motion.form>
        </div>
      </motion.div>

      {/* Right Panel - Sign Up */}
      <motion.div
        initial={{ opacity: 0, x: 80, scale: 0.95 }}
        animate={controls}
        variants={fadeVariants}
        className="w-full md:w-[60%] bg-[#DF1516] flex items-center justify-center px-8 md:px-16"
      >
        <div className="w-full max-w-md">
          <motion.h2
            className="text-4xl font-extrabold text-white text-center mb-6 font-[Montserrat]"
            variants={fadeVariants}
          >
            Create an Account
          </motion.h2>

          <motion.div className="mb-5" variants={fadeVariants}>
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full h-11 rounded-md bg-white text-[#DF1516] font-semibold hover:bg-white/90 flex items-center justify-center gap-3"
            >
              <FcGoogle size={22} />
              Continue With Google
            </Button>
          </motion.div>

          <motion.p
            className="text-white text-center mb-5 font-[Poppins] text-[18px]"
            variants={fadeVariants}
          >
            or use your Email for registration
          </motion.p>

          <motion.form
            onSubmit={handleSignUp}
            className="space-y-3"
            variants={fadeVariants}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="h-11 w-full bg-gray-50 border border-gray-300 rounded-md text-gray-700 placeholder:text-gray-500 px-4"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                className="h-11 w-full bg-gray-50 border border-gray-300 rounded-md text-gray-700 placeholder:text-gray-500 px-4"
              />
            </div>

            <Input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
              className="h-11 w-full bg-gray-50 border border-gray-300 rounded-md text-gray-700 placeholder:text-gray-500 px-4"
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-md bg-white text-[#DF1516] font-bold text-lg hover:bg-white/90 transition-all"
            >
              {loading ? "SIGNING UP..." : "SIGN UP"}
            </Button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}
