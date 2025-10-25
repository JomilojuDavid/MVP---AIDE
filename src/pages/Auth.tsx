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
    } catch (error: unknown) {
      const err = error as Error;
      toast({
        title: "Sign up failed",
        description: err.message,
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
      const err = error as Error;
      toast({
        title: "Sign in failed",
        description: err.message,
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
    } catch (error: unknown) {
      const err = error as Error;
      toast({
        title: "Google sign in failed",
        description: err.message,
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
    <>
      {/* ✅ Native head tags (no react-helmet) */}
      <head>
        <title>AIDE | Sign In or Create Account</title>
        <meta name="description" content="Access AIDE — your mindset and business growth companion." />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <div className="min-h-screen flex flex-col md:flex-row overflow-hidden font-[Poppins]">
        {/* Left Panel - Sign In */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex-1 bg-white flex items-center justify-center p-12"
        >
          <div className="w-full max-w-md space-y-6">
            <motion.img
              src={aideLogo}
              alt="AIDE Logo"
              className="h-20 mb-10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            />

            <motion.h1
              className="text-4xl font-[Montserrat] font-extrabold text-primary mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Hello, Friend!
            </motion.h1>

            <motion.p
              className="text-foreground mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Sign in to continue your personalized journey with{" "}
              <span className="font-semibold text-primary">AIDE</span> — where mindset mastery meets business growth.
            </motion.p>

            <motion.form
              onSubmit={handleSignIn}
              className="space-y-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Input
                type="email"
                placeholder="Your Email"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                className="h-14 rounded-full border-2 border-primary bg-white text-foreground placeholder:text-primary/60 focus-visible:ring-primary"
              />

              {/* Align password + button inline */}
              <div className="flex gap-3 items-center">
                <Input
                  type="password"
                  placeholder="Password"
                  value={signInPassword}
                  onChange={(e) => setSignInPassword(e.target.value)}
                  className="h-14 flex-1 rounded-full border-2 border-primary bg-white text-foreground placeholder:text-primary/60 focus-visible:ring-primary"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-14 px-10 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 transition-all"
                >
                  {loading ? "..." : "SIGN IN"}
                </Button>
              </div>

              <button
                type="button"
                onClick={() => navigate("/reset-password")}
                className="block text-sm text-primary font-medium hover:underline"
              >
                Forgot Password?
              </button>
            </motion.form>
          </div>
        </motion.div>

        {/* Right Panel - Sign Up */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="flex-1 bg-primary flex items-center justify-center p-12"
        >
          <div className="w-full max-w-md">
            <motion.h2
              className="text-4xl font-[Montserrat] font-extrabold text-white mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Create an Account
            </motion.h2>

            <Button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full h-14 rounded-full bg-white text-primary font-semibold hover:bg-white/90 flex items-center justify-center gap-3 mb-6"
            >
              <FcGoogle size={24} />
              Continue With Google
            </Button>

            <p className="text-white text-center mb-6">or use your email for registration</p>

            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="h-14 rounded-full bg-white/95 border-0 text-foreground placeholder:text-muted-foreground"
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={signUpEmail}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                  className="h-14 rounded-full bg-white/95 border-0 text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <Input
                type="password"
                placeholder="Password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                className="h-14 rounded-full bg-white/95 border-0 text-foreground placeholder:text-muted-foreground"
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 rounded-full bg-white text-primary font-bold text-lg hover:bg-white/90 transition-all"
              >
                {loading ? "..." : "SIGN UP"}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
}


