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

      {/* Right Panel - Sign Up (Red) */}
{/* Right Panel - Sign Up (Red) */}
<motion.div
  initial={{ opacity: 0, x: 60, scale: 0.95 }}
  animate={{ opacity: 1, x: 0, scale: 1 }}
  transition={{ duration: 1.1, delay: 0.5 }}
  className="flex-1 bg-[#DF1516] flex items-center justify-center p-8 md:p-12"
>
  <div className="w-full max-w-[760px] flex flex-col items-center scale-[1.1]">
    {/* Heading */}
    <motion.h2
      className="text-[44px] font-extrabold text-white font-['Montserrat'] text-center leading-[100%] mb-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.6 }}
    >
      Create an Account
    </motion.h2>

    {/* Google Sign-in */}
    <motion.div
      className="mt-8 mb-5 w-[620px]"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.9, duration: 0.4 }}
    >
      <Button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full h-[88px] rounded-[28px] bg-white text-[#DF1516] font-semibold text-[22px] hover:bg-white/90 flex items-center justify-center gap-3"
      >
        <FcGoogle size={28} />
        Continue With Google
      </Button>
    </motion.div>

    {/* Divider Text */}
    <motion.p
      className="text-white text-center font-['Poppins'] text-[22px] mt-1 mb-6 leading-[100%]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
    >
      or use your Email for registration
    </motion.p>

    {/* Sign Up Form */}
    <motion.form
      onSubmit={handleSignUp}
      className="flex flex-col items-center gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1, duration: 0.6, ease: 'easeOut' }}
    >
      {/* Row: Full Name + Email */}
      <div className="flex gap-4">
        <Input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-[295px] h-[88px] rounded-[28px] border border-white/60 bg-white/95 text-[#000] text-[22px] font-['Poppins'] placeholder:text-[#000000]/60 px-6 focus:outline-none focus:ring-0"
        />
        <Input
          type="email"
          placeholder="Your Email"
          value={signUpEmail}
          onChange={(e) => setSignUpEmail(e.target.value)}
          className="w-[295px] h-[88px] rounded-[28px] border border-white/60 bg-white/95 text-[#000] text-[22px] font-['Poppins'] placeholder:text-[#000000]/60 px-6 focus:outline-none focus:ring-0"
        />
      </div>

      {/* Password Field */}
      <Input
        type="password"
        placeholder="Password"
        value={signUpPassword}
        onChange={(e) => setSignUpPassword(e.target.value)}
        className="w-[620px] h-[88px] rounded-[28px] border border-white/60 bg-white/95 text-[#000] text-[22px] font-['Poppins'] placeholder:text-[#000000]/60 px-6 focus:outline-none focus:ring-0"
      />

      {/* Sign Up Button */}
      <Button
        type="submit"
        disabled={loading}
        className="mt-3 w-[620px] h-[88px] bg-white text-[#DF1516] text-[22px] font-semibold rounded-[28px] hover:bg-white/90 transition-all duration-300"
      >
        {loading ? "CREATING ACCOUNT..." : "SIGN UP"}
      </Button>
    </motion.form>
  </div>
</motion.div>
    </div>
  );
}
