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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 + i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen flex overflow-hidden font-[Poppins]">
      {/* Left Panel - Sign In */}
      <motion.div
        initial={{ opacity: 0, x: -60, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className="flex-1 bg-white flex flex-col items-center justify-center px-16 py-12"
      >
        {/* AIDE Logo */}
        <motion.img
          src={aideLogo}
          alt="AIDE Logo"
          className="mx-auto mb-12"
          style={{
            width: "259px",
            height: "125px",
            opacity: 1,
            transform: "rotate(0deg)",
            position: "relative",
            top: "35px",
            objectFit: "contain",
          }}
        />

        {/* Sign In Header */}
        <motion.h1
          className="text-[#DF1516] font-[Montserrat] font-extrabold text-[48px] leading-[100%] text-center mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Hello, Friend!
        </motion.h1>

        {/* Body Text */}
        <motion.p
          className="text-[#1a1a1a] text-[24px] leading-[100%] text-center mb-10 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          Sign in to continue your personalized journey with{" "}
          <span className="font-semibold text-[#DF1516]">AIDE</span> — where
          mindset mastery meets business growth.
        </motion.p>

        {/* Sign In Form */}
        <motion.form
          onSubmit={handleSignIn}
          className="w-full max-w-md space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <Input
              type="email"
              placeholder="Your Email"
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
              className="h-14 rounded-full border-2 border-[#DF1516] bg-white text-black placeholder:text-[#DF1516]/60 text-lg px-6"
            />
          </motion.div>

          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="flex gap-3 items-center"
          >
            <Input
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
              className="h-14 flex-1 rounded-full border-2 border-[#DF1516] bg-white text-black placeholder:text-[#DF1516]/60 text-lg px-6"
            />
            <Button
              type="submit"
              disabled={loading}
              className="h-14 px-10 rounded-full bg-[#DF1516] text-white font-semibold hover:bg-[#b51213] transition-all text-lg"
            >
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </Button>
          </motion.div>

          <motion.button
            type="button"
            onClick={() => navigate("/reset-password")}
            className="text-[#DF1516] font-medium hover:underline block mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Forgot Password?
          </motion.button>
        </motion.form>
      </motion.div>

      {/* Right Panel - Sign Up */}
      <motion.div
        initial={{ opacity: 0, x: 60, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.5, ease: "easeOut" }}
        className="flex-1 bg-[#DF1516] flex flex-col items-center justify-center px-16 py-12"
      >
        <motion.h2
          className="text-white font-[Montserrat] font-extrabold text-[48px] leading-[100%] text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          Create an Account
        </motion.h2>

        <motion.div
          className="mb-8 w-full max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.4 }}
        >
          <Button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full h-14 rounded-full bg-white text-[#DF1516] font-semibold hover:bg-white/90 flex items-center justify-center gap-3 text-lg"
          >
            <FcGoogle size={24} />
            Continue With Google
          </Button>
        </motion.div>

        <motion.p
          className="text-white text-center mb-6 text-[20px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          or use your Email for registration
        </motion.p>

        <motion.form
          onSubmit={handleSignUp}
          className="w-full max-w-md space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 gap-4"
          >
            <Input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-14 rounded-full bg-white border-0 text-black text-lg px-6 placeholder:text-gray-500"
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
              className="h-14 rounded-full bg-white border-0 text-black text-lg px-6 placeholder:text-gray-500"
            />
          </motion.div>

          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <Input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
              className="h-14 rounded-full bg-white border-0 text-black text-lg px-6 placeholder:text-gray-500"
            />
          </motion.div>

          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-full bg-white text-[#DF1516] font-bold text-lg hover:bg-white/90 transition-all"
            >
              {loading ? "SIGNING UP..." : "SIGN UP"}
            </Button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
}
