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
      transition: { delay: 0.2 + i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <div className="min-h-screen flex flex-row overflow-hidden bg-white font-[Poppins]">
      {/* Left Panel - Sign In (White, 35%) */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-[35%] flex flex-col justify-start items-center p-12 relative"
      >
        {/* Logo */}
        <img
          src={aideLogo}
          alt="AIDE Logo"
          className="absolute top-9 left-12 w-[150px] h-auto"
        />

        {/* Headings */}
        <motion.h1
          className="text-[#DF1516] font-[Montserrat] font-extrabold text-[42px] mt-40 text-center leading-[100%]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Hello, Friend!
        </motion.h1>

        <motion.p
          className="text-black font-[Poppins] font-normal text-[20px] leading-[100%] mt-6 text-center max-w-[90%]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Sign in to continue your personalized journey with{" "}
          <span className="font-semibold text-black">AIDE</span> — where mindset
          mastery meets business growth.
        </motion.p>

        {/* Sign In Form */}
        <motion.form
  onSubmit={handleSignIn}
  className="mt-10 w-[80%] flex flex-col gap-4"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.5, duration: 0.6 }}
>
  <Input
    type="email"
    placeholder="Your Email"
    value={signInEmail}
    onChange={(e) => setSignInEmail(e.target.value)}
    className="h-12 rounded-xl border border-[#DF1516]/60 text-[18px] placeholder:text-[#DF1516]/70 px-5"
  />

  {/* Password field + Sign In button combo */}
  <div className="flex items-center border border-[#DF1516]/60 rounded-xl h-12 overflow-hidden">
    <Input
      type="password"
      placeholder="Password"
      value={signInPassword}
      onChange={(e) => setSignInPassword(e.target.value)}
      className="h-full w-full border-0 text-[18px] placeholder:text-[#DF1516]/70 focus:ring-0 focus:outline-none px-5"
    />
    <Button
      type="submit"
      disabled={loading}
      className="bg-[#DF1516] text-white h-full px-8 text-[16px] font-semibold hover:bg-[#c91213] rounded-none"
    >
      {loading ? "SIGNING IN..." : "SIGN IN"}
    </Button>
  </div>

  {/* Forgot Password */}
  <motion.button
    type="button"
    onClick={() => navigate('/reset-password')}
    className="text-black text-[16px] font-semibold mt-3 pl-1 hover:text-[#DF1516] transition-colors self-start"
  >
    Forgot Password?
  </motion.button>
</motion.form>
     </motion.div>

      {/* Right Panel - Sign Up (Red, 65%) */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.1, ease: "easeOut" }}
        className="w-[65%] bg-[#DF1516] flex flex-col items-center justify-center p-16"
      >
        <motion.h2
          className="text-white font-[Montserrat] font-extrabold text-[40px] mb-6 text-center leading-[100%]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Create an Account
        </motion.h2>

        <Button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-[80%] h-12 rounded-xl bg-white text-[#DF1516] font-semibold hover:bg-white/90 flex items-center justify-center gap-3 mb-4"
        >
          <FcGoogle size={24} />
          Continue with Google
        </Button>

        <p className="text-white text-[18px] mb-4 font-[Poppins]">
          or use your Email for registration
        </p>

        <motion.form
          onSubmit={handleSignUp}
          className="w-[80%] flex flex-col gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <Input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-12 rounded-xl bg-white border-0 text-[18px] placeholder:text-gray-500 px-5"
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
              className="h-12 rounded-xl bg-white border-0 text-[18px] placeholder:text-gray-500 px-5"
            />
          </div>

          <Input
            type="password"
            placeholder="Password"
            value={signUpPassword}
            onChange={(e) => setSignUpPassword(e.target.value)}
            className="h-12 rounded-xl bg-white border-0 text-[18px] placeholder:text-gray-500 px-5"
          />

          <Button
            type="submit"
            disabled={loading}
            className="w-full h-12 rounded-xl bg-white text-[#DF1516] font-bold text-lg hover:bg-white/90"
          >
            {loading ? "SIGNING UP..." : "SIGN UP"}
          </Button>
        </motion.form>
      </motion.div>
    </div>
  );
}
