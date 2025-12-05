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

  /** ----------------------------------------------------------
   * 🔥 AUTO-SCALING (Option D)
   * Fits entire auth page into *any* screen with no scrolling
   * ---------------------------------------------------------- */
  useEffect(() => {
    const resize = () => {
      const baseWidth = 1440;   // your design width
      const baseHeight = 900;   // your design height

      const scaleX = window.innerWidth / baseWidth;
      const scaleY = window.innerHeight / baseHeight;

      const finalScale = Math.min(scaleX, scaleY, 1); // never upscale

      document.documentElement.style.setProperty("--auth-scale", String(finalScale));
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /** ----------------------------------------------------------
   * Scroll-based fade effects
   * ---------------------------------------------------------- */
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

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: signInEmail,
        password: signInPassword
      });

      if (error) throw error;

      toast({ title: "Welcome back!" });
      navigate("/quiz");
    } catch (error: any) {
      toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

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
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.1 }
    }
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
    <div
      className="min-h-screen w-full bg-white overflow-hidden flex"
      style={{
        transform: "scale(var(--auth-scale))",
        transformOrigin: "top left",
        height: "100vh"
      }}
    >
      {/* ---------- LEFT PANEL (SIGN IN) ----------- */}
      <motion.div
        ref={leftRef}
        variants={sectionVariants}
        initial="hidden"
        animate={leftControls}
        className="w-[40%] bg-white flex flex-col items-center justify-center p-16 relative"
      >
        <img
          src={aideLogo}
          onClick={() => navigate("/dashboard")}
          className="h-20 absolute top-10 left-10 cursor-pointer"
        />

        {/* Correct 80% scale */}
        <div className="scale-[0.8] w-full max-w-md">
          <motion.h1
            variants={fadeItem}
            custom={0}
            className="text-[48px] font-extrabold text-[#DF1516] text-center mb-4"
          >
            Hello, Friend!
          </motion.h1>

          <motion.p
            variants={fadeItem}
            custom={1}
            className="text-[22px] text-gray-800 text-center mb-10 leading-snug"
          >
            Sign in to continue your personalized journey with{" "}
