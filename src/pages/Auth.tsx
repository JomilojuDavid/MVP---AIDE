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
      const err = error as { message?: string };
      toast({
        title: "Sign up failed",
        description: err?.message || "An unknown error occurred",
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
      const err = error as { message?: string };
      toast({
        title: "Sign in failed",
        description: err?.message || "An unknown error occurred",
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
      const err = error as { message?: string };
      toast({
        title: "Google sign in failed",
        description: err?.message || "An unknown error occurred",
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="w-[1512px] h-[982px] mx-auto flex overflow-hidden rounded-[30px] bg-white font-[Poppins]">
      {/* Sign In Section - 35% */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-[623px] h-full flex flex-col bg-white relative px-[94px] pt-[35px]"
      >
        {/* Logo */}
        <img
          src={aideLogo}
          alt="AIDE"
          className="w-[180px] h-[87px] object-contain mb-10"
        />

        {/* Text Section */}
        <div className="text-center mb-10">
          <h1 className="font-[Montserrat] font-extrabold text-[40px] leading-[100%] text-[#DF1516] mb-4">
            Hello, Friend
          </h1>
          <p className="font-[Poppins] font-normal text-[20px] leading-[100%] text-center text-[#000000] max-w-md mx-auto">
            Sign in to continue your personalized journey with{" "}
            <span className="font-semibold text-black">AIDE</span>
          </p>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSignIn} className="flex flex-col gap-6 mt-6">
          <div>
            <label className="block text-[24px] text-[#000000] font-[Poppins] font-normal mb-2">
              Email Address
            </label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
              className="w-full h-[48px] rounded-[10px] border border-[#DF1516] text-[18px] px-4 placeholder:text-[#DF1516]/60"
            />
          </div>

          <div className="relative">
            <label className="block text-[24px] text-[#000000] font-[Poppins] font-normal mb-2">
              Password
            </label>
            <div className="flex items-center border border-[#DF1516] rounded-[10px] h-[48px] overflow-hidden">
              <Input
                type="password"
                placeholder="Enter your password"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                className="flex-1 border-0 h-full px-4 text-[18px] placeholder:text-[#DF1516]/60 focus:ring-0 focus:outline-none"
              />
              <Button
                type="submit"
                disabled={loading}
                className="h-full bg-[#DF1516] text-white font-semibold px-8 rounded-none text-[18px] hover:bg-[#b51213] transition-all"
              >
                {loading ? "..." : "Sign In"}
              </Button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/reset-password")}
            className="text-black font-[Poppins] font-semibold text-[16px] mt-3 self-end"
          >
            Forgot Password?
          </button>
        </form>
      </motion.div>

      {/* Sign Up Section - 65% */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 bg-[#DF1516] flex flex-col items-center justify-center px-16 py-12"
      >
        <h2 className="text-white font-[Montserrat] font-extrabold text-[40px] mb-8 leading-[100%]">
          Create an Account
        </h2>

        <Button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full max-w-md h-[48px] rounded-[10px] bg-white text-[#DF1516] font-semibold flex items-center justify-center gap-3 text-[18px] mb-6 hover:bg-white/90"
        >
          <FcGoogle size={22} />
          Continue With Google
        </Button>

        <p className="text-white font-[Poppins] font-normal text-[18px] mb-6">
          or use your Email for registration
        </p>

        <form
          onSubmit={handleSignUp}
          className="w-full max-w-md flex flex-col gap-4"
        >
          <Input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="h-[48px] rounded-[10px] border border-white bg-white/95 text-black text-[18px] px-4"
          />
          <Input
            type="email"
            placeholder="Your Email"
            value={signUpEmail}
            onChange={(e) => setSignUpEmail(e.target.value)}
            className="h-[48px] rounded-[10px] border border-white bg-white/95 text-black text-[18px] px-4"
          />
          <Input
            type="password"
            placeholder="Password"
            value={signUpPassword}
            onChange={(e) => setSignUpPassword(e.target.value)}
            className="h-[48px] rounded-[10px] border border-white bg-white/95 text-black text-[18px] px-4"
          />
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-[48px] rounded-[10px] bg-white text-[#DF1516] font-bold text-[18px] hover:bg-white/90 transition-all"
          >
            {loading ? "..." : "Sign Up"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
