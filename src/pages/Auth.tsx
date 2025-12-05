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
            <span className="font-semibold text-black">AIDE</span>.
          </motion.p>

          <motion.form variants={fadeItem} custom={2} onSubmit={handleSignIn} className="space-y-4">
            <Input
              type="email"
              placeholder="Your Email"
              className="h-[65px] border border-[#DF1516] rounded-none text-[24px]"
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
            />

            <div className="flex border border-[#DF1516] rounded-none">
              <Input
                type="password"
                placeholder="Password"
                className="h-[65px] border-none text-[24px] flex-1"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
              />
              <Button className="h-[65px] w-[130px] bg-[#DF1516] text-white rounded-none text-[20px]">
                {loading ? "..." : "SIGN IN"}
              </Button>
            </div>

            <button
              type="button"
              onClick={() => navigate("/reset-password")}
              className="text-[20px] font-semibold hover:text-[#DF1516]"
            >
              Forgot Password?
            </button>
          </motion.form>
        </div>
      </motion.div>

      {/* ---------- RIGHT PANEL (SIGN UP) ----------- */}
      <motion.div
        ref={rightRef}
        variants={sectionVariants}
        initial="hidden"
        animate={rightControls}
        className="w-[60%] bg-[#DF1516] flex items-center justify-center p-20"
      >
        <div className="scale-[0.8] w-full max-w-2xl">
          <motion.h2
            variants={fadeItem}
            custom={0}
            className="text-[48px] text-white font-extrabold text-center mb-12"
          >
            Create an Account
          </motion.h2>

          <div className="flex w-[80%] mx-auto mb-10 border border-white rounded-none">
            <button
              onClick={handleGoogle}
              className="bg-white w-[80px] flex items-center justify-center border-r border-white"
            >
              <FcGoogle size={32} />
            </button>

            <Button className="flex-1 h-[75px] bg-white text-[#DF1516] text-[20px] rounded-none">
              Continue With Google
            </Button>
          </div>

          <p className="text-white text-center text-[22px] mb-8">or use your Email</p>

          <motion.form variants={fadeItem} custom={1} onSubmit={handleSignUp} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Input
                type="text"
                placeholder="Full Name"
                className="h-[75px] rounded-none text-[24px]"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <Input
                type="email"
                placeholder="Your Email"
                className="h-[75px] rounded-none text-[24px]"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
              />
            </div>

            <Input
              type="password"
              placeholder="Password"
              className="h-[75px] rounded-none text-[24px]"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
            />

            <Button
              type="submit"
              className="w-full h-[85px] bg-white text-[#DF1516] text-[24px] font-bold rounded-none"
            >
              {loading ? "..." : "SIGN UP"}
            </Button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}
