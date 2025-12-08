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
      const finalScale = Math.min(scaleX, scaleY, 1);

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
    <div className="min-h-screen w-full bg-white overflow-hidden flex">
      

      {/* LEFT PANEL */}
      <motion.div
        ref={leftRef}
        variants={sectionVariants}
        initial="hidden"
        animate={leftControls}
        className="w-[40%] bg-white flex flex-col items-center justify-center p-16"
      >
        <div
          className="w-full max-w-md flex flex-col items-center"
          style={{ transform: "scale(var(--auth-scale))", transformOrigin: "top center" }}
        >

          {/* LOGO */}
          <div className="mb-10">
            <img
              src={aideLogo}
              onClick={() => navigate("/dashboard")}
              className="h-24 cursor-pointer"
            />
          </div>

          {/* HEADING */}
          <motion.h1
            variants={fadeItem}
            custom={0}
            className="font-extrabold text-[#DF1516] text-center mb-6"
          >
            Hello, Friend!
          </motion.h1>

          {/* TEXT */}
          <motion.p
            variants={fadeItem}
            custom={1}
            className="text-gray-800 text-center mb-12 leading-snug"
          >
            Sign in to continue your personalized journey with{" "}
            <span className="font-bold text-black">AIDE</span> — where mindset mastery
            meets business growth.
          </motion.p>

          {/* SIGN IN FORM */}
          <motion.form variants={fadeItem} custom={2} onSubmit={handleSignIn} className="space-y-6 w-full">
            <Input
              type="email"
              placeholder="Your Email"
              className="h-[70px] border border-[#DF1516] rounded-none"
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
            />

            <div className="flex border border-[#DF1516] rounded-none">
              <Input
                type="password"
                placeholder="Password"
                className="h-[70px] border-none flex-1"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
              />
              <Button className="h-[70px] w-[140px] bg-[#DF1516] text-white rounded-none">
                {loading ? "..." : "SIGN IN"}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-6 h-6 accent-[#DF1516]"
                />
                Remember Me
              </label>

              <button
                type="button"
                onClick={() => navigate("/reset-password")}
                className="font-semibold hover:text-[#DF1516]"
              >
                Forgot Password?
              </button>
            </div>
          </motion.form>
        </div>
      </motion.div>


      {/* RIGHT PANEL */}
      <motion.div
        ref={rightRef}
        variants={sectionVariants}
        initial="hidden"
        animate={rightControls}
        className="w-[60%] bg-[#DF1516] flex items-center justify-center p-20"
      >
        <div
          className="w-full max-w-2xl"
          style={{ transform: "scale(var(--auth-scale))", transformOrigin: "top center" }}
        >

          {/* HEADING */}
          <motion.h2
            variants={fadeItem}
            custom={0}
            className="text-white font-extrabold text-center mb-14"
          >
            Create an Account
          </motion.h2>

          {/* GOOGLE SIGN IN */}
          <button
            onClick={handleGoogle}
            className="flex w-[80%] mx-auto mb-12 border border-white rounded-none overflow-hidden"
          >
            <div className="bg-white w-[80px] flex items-center justify-center border-r border-white">
              <FcGoogle size={36} />
            </div>
            <span className="flex-1 h-[80px] bg-white text-[#DF1516] flex items-center justify-center font-bold">
              Continue With Google
            </span>
          </button>

          <p className="text-white text-center mb-10">
            or use your email for registration
          </p>

          {/* SIGN UP FORM */}
          <motion.form variants={fadeItem} custom={1} onSubmit={handleSignUp} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Input
                type="text"
                placeholder="Full Name"
                className="h-[80px] rounded-none"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              <Input
                type="email"
                placeholder="Your Email"
                className="h-[80px] rounded-none"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
              />
            </div>

            <Input
              type="password"
              placeholder="Password"
              className="h-[80px] rounded-none"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
            />

            <Button
              type="submit"
              className="w-full h-[90px] bg-white text-[#DF1516] font-bold rounded-none"
            >
              {loading ? "..." : "SIGN UP"}
            </Button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}
