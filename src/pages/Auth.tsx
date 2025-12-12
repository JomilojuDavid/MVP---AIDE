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
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const leftControls = useAnimation();
  const rightControls = useAnimation();

  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  /** AUTO-SCALING */
  useEffect(() => {
    const resize = () => {
      const baseWidth = 1440;
      const baseHeight = 900;

      const scaleX = window.innerWidth / baseWidth;
      const scaleY = window.innerHeight / baseHeight;
      const finalScale = Math.min(scaleX, scaleY, 1.1);

      document.documentElement.style.setProperty("--auth-scale", String(finalScale));
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /** Load saved email if Remember Me was checked */
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setSignInEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  /** Fades */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
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
  }, []);

  /** SIGN UP */
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
          data: { first_name: firstName, last_name: lastName }
        }
      });

      if (error) throw error;

      toast({ title: "Account created successfully!" });
      navigate("/quiz-step2");
    } catch (error: any) {
      toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  /** SIGN IN */
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: signInEmail,
        password: signInPassword
      });

      if (error) throw error;

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", signInEmail);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      toast({ title: "Welcome back!" });
      navigate("/quiz");
    } catch (error: any) {
      toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  /** GOOGLE SIGN IN */
  const handleGoogle = async () => {
    setLoading(true);
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/dashboard` }
      });
    } catch (error: any) {
      toast({ title: "Google Sign In failed", description: error.message, variant: "destructive" });
      setLoading(false);
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.1 } }
  };

  const fadeItem = {
    hidden: { opacity: 0, y: 25 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.25 + i * 0.15, duration: 0.7 }
    })
  };

  return (
    <div className="min-h-screen w-full flex">

      {/* FIXED LOGO TOP LEFT */}
      <img
        src={aideLogo}
        onClick={() => navigate("/dashboard")}
        className="h-16 absolute top-6 left-8 cursor-pointer z-50"
      />

      {/* LEFT PANEL */}
      <motion.div
        ref={leftRef}
        variants={sectionVariants}
        initial="hidden"
        animate={leftControls}
        className="w-[40%] flex flex-col items-center justify-start pt-40 p-12 bg-white"
      >
        <div
          className="w-full max-w-sm flex flex-col items-center text-center"
          style={{ transform: "scale(var(--auth-scale))", transformOrigin: "top center" }}
        >
          {/* HELLO FRIEND - moved down to align baseline with Google button */}
          <motion.h1
            variants={fadeItem}
            custom={0}
            className="text-[#DF1516] font-extrabold text-[48px] mt-10"
          >
            Hello, Friend!
          </motion.h1>

          {/* BODY TEXT - 3 lines */}
          <motion.p
            variants={fadeItem}
            custom={1}
            className="text-gray-700 text-[22px] mt-6 leading-snug max-w-[360px] break-words"
            style={{ lineHeight: "1.5em" }}
          >
            Sign in to continue your personalized journey with <strong>AIDE</strong>—where mindset mastery meets business growth.
          </motion.p>

          {/* SIGN IN FORM */}
          <motion.form
            variants={fadeItem}
            custom={2}
            onSubmit={handleSignIn}
            className="space-y-6 w-full mt-10"
          >
            <Input
              type="email"
              placeholder="Your Email"
              className="h-[80px] text-[22px] px-6 placeholder:text-[22px] border border-[#DF1516] rounded-none"
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
            />

            <div className="flex border border-[#DF1516] rounded-none">
              <Input
                type="password"
                placeholder="Password"
                className="h-[80px] flex-1 text-[22px] px-6 placeholder:text-[22px] border-none"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
              />
              <Button
                type="submit"
                className="w-[160px] h-[80px] bg-[#DF1516] text-white font-bold text-[22px] rounded-none hover:bg-[#c01314]"
              >
                {loading ? "..." : "SIGN IN"}
              </Button>
            </div>

            <div className="flex justify-between mt-2 text-[18px] text-gray-800">
