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

  /** AUTO SCALE */
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

  /** Remember Me load */
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
  const handleSignUp = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const nameParts = fullName.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ");

      const { error } = await supabase.auth.signUp({
        email: signUpEmail,
        password: signUpPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/quiz`,
          data: { first_name: firstName, last_name: lastName },
        },
      });

      if (error) throw error;

      toast({ title: "Account created successfully!" });
      navigate("/quiz-step2");
    } catch (error) {
      toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  /** SIGN IN */
  const handleSignIn = async e => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: signInEmail,
        password: signInPassword,
      });

      if (error) throw error;

      rememberMe
        ? localStorage.setItem("rememberedEmail", signInEmail)
        : localStorage.removeItem("rememberedEmail");

      toast({ title: "Welcome back!" });
      navigate("/quiz");
    } catch (error) {
      toast({ title: "Sign in failed", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  /** GOOGLE LOGIN */
  const handleGoogle = async () => {
    setLoading(true);
    try {
      await supabase.auth.signInWithOAuth({
        provider: "google",
        options: { redirectTo: `${window.location.origin}/dashboard` },
      });
    } catch (error) {
      toast({ title: "Google Sign In failed", description: error.message, variant: "destructive" });
      setLoading(false);
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 70 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const fadeItem = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: 0.15 + i * 0.12 },
    }),
  };

  return (
    <div className="min-h-screen w-full bg-white overflow-hidden flex relative">

      {/* LOGO — TOP LEFT */}
      <img
        src={aideLogo}
        onClick={() => navigate("/")}
        className="absolute top-10 left-10 h-20 cursor-pointer z-20"
        alt="Logo"
      />

      {/* LEFT PANEL */}
      <motion.div
        ref={leftRef}
        variants={sectionVariants}
        initial="hidden"
        animate={leftControls}
        className="w-[45%] bg-white flex flex-col items-center justify-center px-20"
      >
        <div
          className="w-full max-w-lg"
          style={{ transform: "scale(var(--auth-scale))", transformOrigin: "top center" }}
        >
          <motion.h1
            variants={fadeItem}
            custom={0}
            className="text-[#DF1516] font-bold text-[40px] mb-6 leading-tight"
          >
            Hello, Friend!
          </motion.h1>

          <motion.p
            variants={fadeItem}
            custom={1}
            className="text-[20px] text-gray-700 leading-relaxed mb-12 max-w-md"
          >
            Sign in to continue your personalized journey with <b>AIDE</b>—where mindset
            mastery meets business growth.
          </motion.p>

          {/* SIGN IN FORM */}
          <motion.form variants={fadeItem} custom={2} onSubmit={handleSignIn} className="space-y-6 w-full">
            <Input
              type="email"
              placeholder="Your Email"
              className="h-[60px] text-[18px] rounded-full px-6 border-[#DF1516]"
              value={signInEmail}
              onChange={e => setSignInEmail(e.target.value)}
            />

            <div className="flex rounded-full border border-[#DF1516] overflow-hidden h-[60px]">
              <Input
                type="password"
                placeholder="Password"
                className="flex-1 border-none text-[18px] px-6"
                value={signInPassword}
                onChange={e => setSignInPassword(e.target.value)}
              />

              <Button className="w-[130px] bg-[#DF1516] text-white rounded-none">
                {loading ? "..." : "SIGN IN"}
              </Button>
            </div>

            <div className="flex items-center justify-between text-[15px]">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={e => setRememberMe(e.target.checked)}
                  className="w-5 h-5 accent-[#DF1516]"
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
        className="w-[55%] bg-[#DF1516] flex items-center justify-center px-20"
      >
        <div
          className="w-full max-w-2xl"
          style={{ transform: "scale(var(--auth-scale))", transformOrigin: "top center" }}
        >
          <motion.h2
            variants={fadeItem}
            custom={0}
            className="text-white font-bold text-[40px] text-center mb-10"
          >
            Create an Account
          </motion.h2>

          {/* GOOGLE BUTTON */}
          <button
            onClick={handleGoogle}
            className="flex w-[80%] mx-auto h-[70px] rounded-full overflow-hidden bg-white mb-10 border border-white"
          >
            <div className="w-[80px] flex items-center justify-center border-r border-white bg-white">
              <FcGoogle size={34} />
            </div>
            <span className="flex-1 flex items-center justify-center text-[#DF1516] font-semibold text-[18px]">
              Continue With Google
            </span>
          </button>

          <p className="text-white text-center text-[18px] mb-8">
            or use your Email for registration
          </p>

          {/* SIGN UP FORM */}
          <motion.form variants={fadeItem} custom={1} onSubmit={handleSignUp} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Input
                type="text"
                placeholder="Full Name"
                className="h-[60px] rounded-full text-[18px] px-6"
                value={fullName}
                onChange={e => setFullName(e.target.value)}
              />

              <Input
                type="email"
                placeholder="Your Email"
                className="h-[60px] rounded-full text-[18px] px-6"
                value={signUpEmail}
                onChange={e => setSignUpEmail(e.target.value)}
              />
            </div>

            <Input
              type="password"
              placeholder="Password"
              className="h-[60px] rounded-full text-[18px] px-6"
              value={signUpPassword}
              onChange={e => setSignUpPassword(e.target.value)}
            />

            <Button
              type="submit"
              className="w-full h-[70px] bg-white text-[#DF1516] font-semibold text-[18px] rounded-full"
            >
              {loading ? "..." : "SIGN UP"}
            </Button>
          </motion.form>
        </div>
      </motion.div>

    </div>
  );
}
