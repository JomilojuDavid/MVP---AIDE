import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import aideLogo from "@/assets/aide-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const addGoogleFonts = () => {
  const link = document.createElement("link");
  link.href =
    "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;800&family=Poppins:wght@400;600&display=swap";
  link.rel = "stylesheet";
  document.head.appendChild(link);
};

export default function Auth() {
  const [fullName, setFullName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    addGoogleFonts();
  }, []);

  // --- Intersection observer animation ---
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleSections, setVisibleSections] = useState<boolean[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => {
              const updated = [...prev];
              updated[index] = true;
              return updated;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
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
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: { first_name: firstName, last_name: lastName },
        },
      });

      if (error) throw error;
      toast({ title: "Account created successfully!", description: "Redirecting..." });
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
      toast({ title: "Welcome back!", description: "Redirecting..." });
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
      toast({ title: "Google sign in failed", description: error.message, variant: "destructive" });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left Panel - Sign In (White) */}
<motion.div
  initial={{ opacity: 0, x: -60, scale: 0.95 }}
  animate={{ opacity: 1, x: 0, scale: 1 }}
  transition={{ duration: 1, delay: 0.3 }}
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
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
    >
      Hello, Friend!
    </motion.h1>

    <motion.p
      className="text-center text-[22px] font-normal leading-tight text-gray-800 mb-10 font-['Poppins']"
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.75, duration: 0.6 }}
    >
      Sign in to continue your personalized journey with{" "}
      <span className="font-semibold text-black">AIDE</span> — where mindset mastery meets business growth.
    </motion.p>

    <motion.form
      onSubmit={handleSignIn}
      className="space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      {/* Email */}
      <motion.div
        custom={0}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <Input
          type="email"
          placeholder="Your Email"
          value={signInEmail}
          onChange={(e) => setSignInEmail(e.target.value)}
          className="h-[70px] rounded-[30px] border border-[#DF1516] bg-white text-foreground placeholder:text-[#DF1516]/60 focus-visible:ring-[#DF1516] font-['Poppins'] text-[20px]"
        />
      </motion.div>

      {/* Password + Sign In Button */}
      <motion.div
        custom={1}
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="relative"
      >
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

      {/* Forgot Password */}
      <motion.button
        type="button"
        className="text-black hover:text-[#DF1516] transition-colors font-semibold text-[16px] font-['Poppins'] pl-[10px]" // left padding aligns it under password label
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6, ease: 'easeOut' }}
        onClick={() => navigate('/reset-password')}
      >
        Forgot Password?
      </motion.button>
    </motion.form>
  </div>
</motion.div>

      {/* --- Sign Up Side (60%) --- */}
      <motion.div
        ref={(el) => (sectionsRef.current[1] = el)}
        initial={{ opacity: 0, x: 60 }}
        animate={visibleSections[1] ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex-[0.6] bg-[#DF1516] flex items-center justify-center p-16"
      >
        <div className="w-full max-w-lg text-center">
          <h2
            className="text-4xl font-extrabold text-white mb-8"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Create an Account
          </h2>

          <Button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full h-[70px] rounded-[25px] bg-white text-[#DF1516] font-semibold hover:bg-white/90 flex items-center justify-center gap-3"
          >
            <FcGoogle size={24} />
            Continue With Google
          </Button>

          <p
            className="text-white text-center my-6"
            style={{ fontFamily: "Poppins, sans-serif", fontWeight: 400, fontSize: "20px" }}
          >
            or use your Email for registration
          </p>

          <form onSubmit={handleSignUp} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="h-[83px] rounded-[30px] border border-white/70 text-[18px] px-6 bg-white/95"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                className="h-[83px] rounded-[30px] border border-white/70 text-[18px] px-6 bg-white/95"
              />
            </div>

            <Input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
              className="h-[83px] w-full rounded-[30px] border border-white/70 text-[18px] px-6 bg-white/95"
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-[83px] rounded-[30px] bg-white text-[#DF1516] font-bold text-lg hover:bg-white/90"
            >
              {loading ? "SIGNING UP..." : "SIGN UP"}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
