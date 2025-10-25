import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import aideLogo from "@/assets/aide-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// ✅ Import Google Fonts via CDN using Helmet alternative (direct injection)
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

  // Add Google Fonts
  useEffect(() => {
    addGoogleFonts();
  }, []);

  // Scroll animation using IntersectionObserver
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
          data: {
            first_name: firstName,
            last_name: lastName,
          },
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
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
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

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* --- Sign In Side (40%) --- */}
      <motion.div
        ref={(el) => (sectionsRef.current[0] = el)}
        initial={{ opacity: 0, x: -60 }}
        animate={visibleSections[0] ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex-[0.4] bg-white flex flex-col items-center justify-center p-12"
        style={{
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <img
          src={aideLogo}
          alt="AIDE Logo"
          style={{
            width: "180px",
            height: "auto",
            position: "absolute",
            top: "35px",
            left: "50px",
          }}
        />

        <div className="w-full max-w-md text-center mt-32">
          <h1
            className="font-extrabold text-[#DF1516] mb-4"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontSize: "40px",
              lineHeight: "100%",
              letterSpacing: "0%",
            }}
          >
            Hello, Friend!
          </h1>

          <p
            className="mb-10 text-[#000000]"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
              fontSize: "20px",
              lineHeight: "100%",
              letterSpacing: "0%",
            }}
          >
            Sign in to continue your personalized journey with{" "}
            <span className="font-semibold text-black">AIDE</span>—where
            mindset mastery meets business growth.
          </p>

          <form onSubmit={handleSignIn} className="space-y-5">
            <Input
              type="email"
              placeholder="Your Email"
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
              className="h-[70px] rounded-[25px] border border-[#DF1516] text-[18px] px-6"
            />
            <div className="relative flex items-center">
              <Input
                type="password"
                placeholder="Password"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                className="h-[70px] w-full rounded-[25px] border border-[#DF1516] text-[18px] px-6"
              />
              <Button
                type="submit"
                disabled={loading}
                className="absolute right-0 h-[90px] rounded-[25px] bg-[#DF1516] text-white px-8 font-semibold hover:bg-[#c01314]"
              >
                {loading ? "SIGNING IN..." : "SIGN IN"}
              </Button>
            </div>

            <button
              type="button"
              className="text-black font-semibold mt-2 text-[16px] text-left ml-1"
            >
              Forgot Password
            </button>
          </form>
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
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
              fontSize: "20px",
            }}
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
