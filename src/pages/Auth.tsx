import { useState } from "react";
import { motion, Variants, easeOut } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import aideLogo from "@/assets/aide-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

import "@fontsource/montserrat/800.css";
import "@fontsource/poppins/400.css";

export default function Auth() {
  const [fullName, setFullName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // ---------- ANIMATION VARIANTS ----------
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: easeOut,
      },
    }),
  };

  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: (i: number = 0) => ({
      opacity: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: easeOut,
      },
    }),
  };

  // ---------- AUTH HANDLERS ----------
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
    } catch (err) {
      const description =
        err instanceof Error ? err.message : "An unknown error occurred";
      toast({
        title: "Sign up failed",
        description,
        variant: "destructive",
      });
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
    } catch (err) {
      const description =
        err instanceof Error ? err.message : "An unknown error occurred";
      toast({
        title: "Sign in failed",
        description,
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
    } catch (err) {
      const description =
        err instanceof Error ? err.message : "An unknown error occurred";
      toast({
        title: "Google sign in failed",
        description,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // ---------- UI ----------
  return (
    <div className="min-h-screen flex flex-row overflow-hidden font-[Poppins]">
      {/* LEFT: Sign In */}
      <motion.div
        initial={{ opacity: 0, x: -60, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="flex-1 bg-white flex items-center justify-center p-16"
      >
        <div className="w-full max-w-md">
          <motion.img
            src={aideLogo}
            alt="AIDE Logo"
            className="h-20 mb-10"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          />

          <motion.h1
            className="text-5xl font-[Montserrat] font-extrabold text-primary mb-4"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            Hello, Friend!
          </motion.h1>

          <motion.p
            className="text-foreground mb-8 leading-relaxed"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={1}
          >
            Sign in to continue your personalized journey with{" "}
            <span className="font-bold">AIDE</span> — where mindset mastery meets
            business growth.
          </motion.p>

          <motion.form
            onSubmit={handleSignIn}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="space-y-4"
          >
            <motion.div variants={fadeUp} custom={2}>
              <Input
                type="email"
                placeholder="Your Email"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                className="h-14 rounded-full border-2 border-primary bg-white text-foreground placeholder:text-primary/60 focus-visible:ring-primary"
              />
            </motion.div>

            <motion.div
              variants={fadeUp}
              custom={3}
              className="flex gap-2 items-center"
            >
              <Input
                type="password"
                placeholder="Password"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                className="h-14 rounded-full border-2 border-primary bg-white text-foreground placeholder:text-primary/60 focus-visible:ring-primary"
              />
              <Button
                type="submit"
                disabled={loading}
                className="h-14 px-10 rounded-full bg-primary text-white font-semibold hover:bg-primary/90"
              >
                {loading ? "SIGNING IN..." : "SIGN IN"}
              </Button>
            </motion.div>

            <motion.button
              type="button"
              onClick={() => navigate("/reset-password")}
              className="text-primary hover:underline transition-colors text-sm"
              variants={fadeUp}
              custom={4}
            >
              Forgot Password?
            </motion.button>
          </motion.form>
        </div>
      </motion.div>

      {/* RIGHT: Sign Up */}
      <motion.div
        initial={{ opacity: 0, x: 60, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.5 }}
        className="flex-[1.2] bg-primary flex items-center justify-center p-16"
      >
        <div className="w-full max-w-md">
          <motion.h2
            className="text-5xl font-[Montserrat] font-extrabold text-white mb-8 text-center"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            Create an Account
          </motion.h2>

          <motion.div
            className="mb-6"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full h-14 rounded-full bg-white text-primary font-semibold hover:bg-white/90 flex items-center justify-center gap-3"
            >
              <FcGoogle size={24} />
              Continue With Google
            </Button>
          </motion.div>

          <motion.p
            className="text-white text-center mb-6"
            variants={fadeUp}
            custom={2}
          >
            or use your email for registration
          </motion.p>

          <motion.form
            onSubmit={handleSignUp}
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="space-y-4"
          >
            <motion.div
              variants={fadeUp}
              custom={3}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
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
            </motion.div>

            <motion.div variants={fadeUp} custom={4}>
              <Input
                type="password"
                placeholder="Password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                className="h-14 rounded-full bg-white/95 border-0 text-foreground placeholder:text-muted-foreground"
              />
            </motion.div>

            <motion.div variants={fadeUp} custom={5}>
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 rounded-full bg-white text-primary font-bold text-lg hover:bg-white/90"
              >
                {loading ? "SIGNING UP..." : "SIGN UP"}
              </Button>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}
