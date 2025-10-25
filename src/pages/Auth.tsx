import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import aideLogo from "@/assets/aide-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

import "@/index.css";

/* Import Google Fonts directly for this page */
import { Helmet } from "react-helmet";

export default function Auth() {
  const [fullName, setFullName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
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
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
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
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive",
        });
      }
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
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Google sign in failed",
          description: error.message,
          variant: "destructive",
        });
      }
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800&family=Poppins:wght@400;500;600&display=swap');
          `}
        </style>
      </Helmet>

      <div
        className="min-h-screen flex flex-row overflow-hidden"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {/* LEFT SIDE – SIGN IN */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-1 bg-white flex items-center justify-center p-16"
        >
          <div className="w-full max-w-md">
            <motion.img
              src={aideLogo}
              alt="AIDE Logo"
              className="h-20 mb-12"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />

            <motion.h1
              className="text-[2.5rem] font-[Montserrat] font-extrabold text-[#E31E24] mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Hello, Friend!
            </motion.h1>

            <motion.p
              className="text-gray-800 text-base leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Sign in to continue your personalized journey with{" "}
              <span className="font-bold">AIDE</span>—where mindset mastery
              meets business growth.
            </motion.p>

            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={signInEmail}
                  onChange={(e) => setSignInEmail(e.target.value)}
                  className="h-14 rounded-xl border-2 border-[#E31E24] text-[#E31E24] placeholder:text-[#E31E24] focus-visible:ring-[#E31E24]"
                />
              </div>

              {/* Combined Password + Button bar */}
              <div className="flex w-full">
                <Input
                  type="password"
                  placeholder="Password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  className="h-14 flex-1 rounded-l-xl border-2 border-[#E31E24] border-r-0 text-[#E31E24] placeholder:text-[#E31E24] focus-visible:ring-[#E31E24]"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-14 px-10 rounded-r-xl bg-[#E31E24] text-white font-semibold hover:bg-[#c71a1e] transition-all duration-300 ease-out"
                >
                  {loading ? "SIGNING IN..." : "SIGN IN"}
                </Button>
              </div>

              <button
                type="button"
                className="text-sm font-semibold text-black hover:text-[#E31E24] transition-colors mt-2"
              >
                Forgot Password
              </button>
            </form>
          </div>
        </motion.div>

        {/* RIGHT SIDE – SIGN UP */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex-1 bg-[#E31E24] flex items-center justify-center p-16"
        >
          <div className="w-full max-w-md text-center">
            <motion.h2
              className="text-[2.5rem] font-[Montserrat] font-extrabold text-white mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Create an Account
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-6"
            >
              <Button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full h-14 rounded-xl bg-white text-[#E31E24] font-semibold flex items-center justify-center gap-3 hover:bg-white/90 transition-colors"
              >
                <FcGoogle size={24} />
                Continue With Google
              </Button>
            </motion.div>

            <p className="text-white mb-6 text-base">
              or use your Email for registration
            </p>

            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-14 rounded-xl bg-white text-gray-800 placeholder:text-gray-500 border-0"
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  className="h-14 rounded-xl bg-white text-gray-800 placeholder:text-gray-500 border-0"
                />
              </div>

              <Input
                type="password"
                placeholder="Password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                className="h-14 rounded-xl bg-white text-gray-800 placeholder:text-gray-500 border-0"
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 rounded-xl bg-white text-[#E31E24] font-bold text-lg hover:bg-white/90 transition-all duration-300 ease-out"
              >
                {loading ? "SIGNING UP..." : "SIGN UP"}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
}
