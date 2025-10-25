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
      toast({ title: "Account created successfully!" });
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
      toast({ title: "Welcome back!" });
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
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 + i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen flex overflow-hidden font-[Poppins]">
      {/* Left Panel - Sign In */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 bg-white flex flex-col items-start justify-center px-24 py-12 relative"
      >
        {/* AIDE Logo (top-left) */}
        <img
          src={aideLogo}
          alt="AIDE Logo"
          className="absolute top-[35px] left-[45px]"
          style={{
            width: "200px",
            height: "100px",
            objectFit: "contain",
            opacity: 1,
            transform: "rotate(0deg)",
          }}
        />

        {/* Hello Friend */}
        <motion.h1
          className="text-[#DF1516] font-[Montserrat] font-extrabold text-[38px] leading-[100%] text-left mb-5"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Hello, Friend!
        </motion.h1>

        {/* Body Text */}
        <motion.p
          className="text-[#1a1a1a] text-[20px] font-[Poppins] font-normal leading-[100%] text-left mb-10 max-w-md"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Sign in to continue your personalized journey with{" "}
          <span className="font-semibold text-[#000000]">AIDE</span> — where
          mindset mastery meets business growth.
        </motion.p>

        {/* Sign In Form */}
        <motion.form
          onSubmit={handleSignIn}
          className="w-full max-w-md space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <Input
              type="email"
              placeholder="Your Email"
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
              className="h-12 w-[85%] rounded-[25px] border border-[#DF1516] bg-white text-black placeholder:text-[#DF1516]/70 text-[18px] px-5"
            />
          </motion.div>

          {/* Password + Sign In Button Inside */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="relative w-[85%]"
          >
            <Input
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
              className="h-12 w-full rounded-[25px] border border-[#DF1516] bg-white text-black placeholder:text-[#DF1516]/70 text-[18px] px-5 pr-[130px]"
            />
            <Button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-[4px] h-[40px] px-7 rounded-[25px] bg-[#DF1516] text-white text-[16px] font-semibold hover:bg-[#b51213] transition-all"
            >
              {loading ? "..." : "Sign In"}
            </Button>
          </motion.div>

          <motion.button
            type="button"
            onClick={() => navigate("/reset-password")}
            className="text-black font-[Poppins] font-semibold text-[16px] hover:underline mt-3 ml-[5px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Forgot Password?
          </motion.button>
        </motion.form>
      </motion.div>

      {/* Right Panel - Sign Up */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="flex-1 bg-[#DF1516] flex flex-col items-center justify-center px-16 py-12"
      >
        <motion.h2
          className="text-white font-[Montserrat] font-extrabold text-[38px] leading-[100%] text-center mb-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          Create an Account
        </motion.h2>

        <motion.div
          className="mb-6 w-full max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <Button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full h-12 rounded-[25px] bg-white text-[#DF1516] font-semibold hover:bg-white/90 flex items-center justify-center gap-2 text-[16px]"
          >
            <FcGoogle size={22} />
            Continue With Google
          </Button>
        </motion.div>

        <motion.p
          className="text-white text-center mb-4 text-[18px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.3 }}
        >
          or use your Email for registration
        </motion.p>

        <motion.form
          onSubmit={handleSignUp}
          className="w-full max-w-md space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 gap-3"
          >
            <Input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-12 rounded-[25px] bg-white border border-transparent text-black text-[18px] px-5 placeholder:text-gray-500"
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
              className="h-12 rounded-[25px] bg-white border border-transparent text-black text-[18px] px-5 placeholder:text-gray-500"
            />
          </motion.div>

          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <Input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
              className="h-12 rounded-[25px] bg-white border border-transparent text-black text-[18px] px-5 placeholder:text-gray-500"
            />
          </motion.div>

          <motion.div variants={itemVariants} initial="hidden" animate="visible">
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-[25px] bg-white text-[#DF1516] font-bold text-[16px] hover:bg-white/90 transition-all"
            >
              {loading ? "..." : "Sign Up"}
            </Button>
          </motion.div>
        </motion.form>
      </motion.div>
    </div>
  );
}
