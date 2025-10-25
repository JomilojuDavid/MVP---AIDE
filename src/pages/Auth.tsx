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

  return (
    <div className="min-h-screen flex overflow-hidden font-[Poppins]">
      {/* Left Panel - Sign In */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex-1 bg-white flex flex-col justify-center px-20 py-12 relative"
      >
        {/* AIDE Logo */}
        <motion.img
          src={aideLogo}
          alt="AIDE Logo"
          className="absolute left-12 top-9"
          style={{
            width: "180px",
            height: "90px",
            objectFit: "contain",
          }}
        />

        {/* Sign In Header */}
        <motion.h1
          className="text-[#DF1516] font-[Montserrat] font-extrabold text-[38px] leading-[100%] text-center mt-20 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Hello, Friend!
        </motion.h1>

        {/* Body Text */}
        <motion.p
          className="text-[#1a1a1a] font-[Poppins] font-normal text-[20px] leading-[100%] text-center mb-12 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Sign in to continue your personalized journey with{" "}
          <span className="font-semibold text-black">AIDE</span> — where
          mindset mastery meets business growth.
        </motion.p>

        {/* Sign In Form */}
        <motion.form
          onSubmit={handleSignIn}
          className="w-full max-w-md mx-auto space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Input
            type="email"
            placeholder="Your Email"
            value={signInEmail}
            onChange={(e) => setSignInEmail(e.target.value)}
            className="h-14 rounded-[20px] border-[1.5px] border-[#DF1516] bg-white text-black placeholder:text-[#DF1516]/60 text-lg px-5"
          />

          <div className="flex gap-3 items-center">
            <Input
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
              className="h-14 flex-1 rounded-[20px] border-[1.5px] border-[#DF1516] bg-white text-black placeholder:text-[#DF1516]/60 text-lg px-5"
            />
            <Button
              type="submit"
              disabled={loading}
              className="h-14 px-10 rounded-[20px] bg-[#DF1516] text-white font-semibold hover:bg-[#b51213] transition-all text-lg"
            >
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </Button>
          </div>

          <button
            type="button"
            onClick={() => navigate("/reset-password")}
            className="text-[#DF1516] font-medium hover:underline block mx-auto mt-4"
          >
            Forgot Password?
          </button>
        </motion.form>
      </motion.div>

      {/* Right Panel - Sign Up */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex-1 bg-[#DF1516] flex flex-col items-center justify-center px-16 py-12"
      >
        <motion.h2
          className="text-white font-[Montserrat] font-extrabold text-[38px] leading-[100%] text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Create an Account
        </motion.h2>

        <div className="mb-8 w-full max-w-md">
          <Button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full h-14 rounded-[20px] bg-white text-[#DF1516] font-semibold hover:bg-white/90 flex items-center justify-center gap-3 text-lg"
          >
            <FcGoogle size={24} />
            Continue With Google
          </Button>
        </div>

        <p className="text-white text-center mb-6 text-[18px] font-[Poppins]">
          or use your Email for registration
        </p>

        <motion.form
          onSubmit={handleSignUp}
          className="w-full max-w-md space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-14 rounded-[20px] bg-white border-[1.5px] border-transparent text-black text-lg px-5 placeholder:text-gray-500"
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
              className="h-14 rounded-[20px] bg-white border-[1.5px] border-transparent text-black text-lg px-5 placeholder:text-gray-500"
            />
          </div>

          <Input
            type="password"
            placeholder="Password"
            value={signUpPassword}
            onChange={(e) => setSignUpPassword(e.target.value)}
            className="h-14 rounded-[20px] bg-white border-[1.5px] border-transparent text-black text-lg px-5 placeholder:text-gray-500"
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-14 rounded-[20px] bg-white text-[#DF1516] font-bold text-lg hover:bg-white/90 transition-all"
          >
            {loading ? "SIGNING UP..." : "SIGN UP"}
          </Button>
        </motion.form>
      </motion.div>
    </div>
  );
}
