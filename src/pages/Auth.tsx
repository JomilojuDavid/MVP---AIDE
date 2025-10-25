import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import aideLogo from "@/assets/aide-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Import fonts
import "@fontsource/montserrat/800.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";

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
    hidden: { opacity: 0, y: 15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 + i * 0.1, duration: 0.4 },
    }),
  };

  return (
    <div className="min-h-screen flex overflow-hidden rounded-[30px]">
      {/* Left Panel - Sign In */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="w-[35%] bg-white flex flex-col justify-center relative px-16 py-10"
      >
        <img
          src={aideLogo}
          alt="AIDE Logo"
          className="absolute top-10 left-10 w-[150px] h-auto opacity-100"
        />

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h1
            className="font-[Montserrat] font-extrabold text-[42px] leading-[100%] text-[#DF1516] mb-5"
            style={{ letterSpacing: "0%", textAlign: "center" }}
          >
            Hello, Friend!
          </h1>

          <p
            className="font-[Poppins] text-[20px] font-normal leading-[100%] text-center text-black/80 mb-10"
            style={{ letterSpacing: "0%" }}
          >
            Sign in to continue your personalized journey with{" "}
            <span className="font-semibold text-black">AIDE</span> — where
            mindset mastery meets business growth.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSignIn}
          className="space-y-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Input
            type="email"
            placeholder="Your Email"
            value={signInEmail}
            onChange={(e) => setSignInEmail(e.target.value)}
            className="h-12 rounded-lg border border-[#DF1516] text-[18px] font-[Poppins] placeholder:text-[#DF1516]/70 focus-visible:ring-[#DF1516]"
          />

          <div className="flex items-center">
            <Input
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
              className="h-12 rounded-l-lg border border-[#DF1516] border-r-0 text-[18px] font-[Poppins] placeholder:text-[#DF1516]/70 focus-visible:ring-[#DF1516]"
            />
            <Button
              type="submit"
              disabled={loading}
              className="h-12 px-8 rounded-r-lg bg-[#DF1516] text-white font-semibold font-[Poppins] hover:bg-[#c51212]"
            >
              {loading ? "SIGNING IN..." : "SIGN IN"}
            </Button>
          </div>

          <button
            type="button"
            className="block mx-auto mt-4 text-[16px] font-[Poppins] font-semibold text-black hover:text-[#DF1516] transition-colors"
          >
            Forgot Password
          </button>
        </motion.form>
      </motion.div>

      {/* Right Panel - Sign Up */}
      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-[65%] bg-[#DF1516] flex items-center justify-center px-20 py-10"
      >
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-[Montserrat] font-extrabold text-white text-center mb-6">
            Create an Account
          </h2>

          <Button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full h-12 rounded-lg bg-white text-[#DF1516] font-semibold font-[Poppins] hover:bg-white/90 flex items-center justify-center gap-3 mb-5"
          >
            <FcGoogle size={24} />
            Continue With Google
          </Button>

          <p className="text-white text-center mb-5 font-[Poppins] text-[18px]">
            or use your Email for registration
          </p>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="h-12 rounded-md bg-white border-0 text-[16px] font-[Poppins] placeholder:text-[#555]"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                className="h-12 rounded-md bg-white border-0 text-[16px] font-[Poppins] placeholder:text-[#555]"
              />
            </div>

            <Input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
              className="h-12 rounded-md bg-white border-0 text-[16px] font-[Poppins] placeholder:text-[#555]"
            />

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-md bg-white text-[#DF1516] font-bold text-lg font-[Poppins] hover:bg-white/90"
            >
              {loading ? "SIGNING UP..." : "SIGN UP"}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
