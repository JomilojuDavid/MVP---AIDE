import { useState } from "react";
import { motion } from "framer-motion";
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
      const message =
        error instanceof Error ? error.message : "Unknown error occurred.";
      toast({
        title: "Sign up failed",
        description: message,
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
      const message =
        error instanceof Error ? error.message : "Unknown error occurred.";
      toast({
        title: "Sign in failed",
        description: message,
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
      const message =
        error instanceof Error ? error.message : "Unknown error occurred.";
      toast({
        title: "Google sign in failed",
        description: message,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  return (
    <div className="min-h-screen flex overflow-hidden font-[Poppins]">
      {/* Left Panel - Sign In */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-[40%] bg-white flex items-center justify-center p-12 shadow-lg"
      >
        <div className="w-full max-w-md">
          <img src={aideLogo} alt="AIDE Logo" className="h-16 mb-10" />
          <h1
            className="text-[42px] font-[800] text-[#D72638] mb-4"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Hello, Friend!
          </h1>
          <p className="text-gray-700 mb-8 leading-relaxed">
            Sign in to continue your personalized journey with{" "}
            <span className="font-semibold">AIDE</span> — where mindset mastery
            meets business growth.
          </p>

          <form onSubmit={handleSignIn} className="space-y-5">
            <motion.div custom={0} variants={itemVariants} initial="hidden" animate="visible">
              <Input
                type="email"
                placeholder="Your Email"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                className="h-14 rounded-full border-2 border-[#D72638] bg-white text-gray-800 placeholder:text-[#D72638]/60 focus-visible:ring-[#D72638]"
              />
            </motion.div>

            <motion.div
              custom={1}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="flex gap-2"
            >
              <Input
                type="password"
                placeholder="Password"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                className="h-14 rounded-full border-2 border-[#D72638] bg-white text-gray-800 placeholder:text-[#D72638]/60 focus-visible:ring-[#D72638]"
              />
              <Button
                type="submit"
                disabled={loading}
                className="h-14 px-10 rounded-full bg-[#D72638] text-white font-semibold hover:bg-[#c21f2f] transition-all"
              >
                {loading ? "SIGNING IN..." : "SIGN IN"}
              </Button>
            </motion.div>

            <motion.button
              type="button"
              className="text-gray-600 hover:text-[#D72638] transition-colors text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Forgot Password?
            </motion.button>
          </form>
        </div>
      </motion.div>

      {/* Right Panel - Sign Up */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-[60%] bg-[#D72638] flex items-center justify-center p-16 text-white"
      >
        <div className="w-full max-w-md">
          <h2
            className="text-[42px] font-[800] mb-8 text-center"
            style={{ fontFamily: "Montserrat, sans-serif" }}
          >
            Create an Account
          </h2>

          <div className="mb-6">
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full h-14 rounded-full bg-white text-[#D72638] font-semibold hover:bg-white/90 flex items-center justify-center gap-3"
            >
              <FcGoogle size={24} />
              Continue With Google
            </Button>
          </div>

          <p className="text-center text-white/90 mb-6">
            or use your Email for registration
          </p>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="h-14 rounded-full bg-white/95 border-0 text-gray-800 placeholder:text-gray-500"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                className="h-14 rounded-full bg-white/95 border-0 text-gray-800 placeholder:text-gray-500"
              />
            </div>

            <Input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
              className="h-14 rounded-full bg-white/95 border-0 text-gray-800 placeholder:text-gray-500"
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-full bg-white text-[#D72638] font-bold text-lg hover:bg-white/90"
            >
              {loading ? "SIGNING UP..." : "SIGN UP"}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
