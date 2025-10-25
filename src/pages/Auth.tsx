import { useState, FormEvent } from "react";
import { motion, Variants } from "framer-motion";
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

  // ---------- Handlers ----------
  const handleSignUp = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
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

      if (error) throw new Error(error.message);

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

  const handleSignIn = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: signInEmail,
        password: signInPassword,
      });

      if (error) throw new Error(error.message);

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

  const handleGoogleSignIn = async (): Promise<void> => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) throw new Error(error.message);
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

  // ---------- Animations ----------
  const slideInLeft: Variants = {
    hidden: { opacity: 0, x: -60, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 70,
        damping: 15,
        delay: 0.3,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  const slideInRight: Variants = {
    hidden: { opacity: 0, x: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 70,
        damping: 15,
        delay: 0.4,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  // ---------- Render ----------
  return (
    <div className="min-h-screen flex flex-row overflow-hidden font-[Poppins]">
      {/* Left Panel - Sign In */}
      <motion.div
        variants={slideInLeft}
        initial="hidden"
        animate="visible"
        className="flex-1 bg-white flex items-center justify-center p-16"
      >
        <div className="w-full max-w-md">
          <motion.img
            src={aideLogo}
            alt="AIDE Logo"
            className="h-20 mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.6,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          />

          <h1 className="text-5xl font-[Montserrat] font-extrabold text-primary mb-6">
            Hello, Friend!
          </h1>

          <p className="text-foreground mb-8 leading-relaxed">
            Sign in to continue your personalized journey with{" "}
            <span className="font-bold">AIDE</span> — where mindset mastery
            meets business growth.
          </p>

          <form onSubmit={handleSignIn} className="space-y-4">
            <Input
              type="email"
              placeholder="Your Email"
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
              className="h-14 rounded-full border-2 border-primary bg-white text-foreground placeholder:text-primary/60 focus-visible:ring-primary"
            />

            <div className="flex gap-2">
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
                className="h-14 px-10 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 whitespace-nowrap transition-all duration-300"
              >
                {loading ? "SIGNING IN..." : "SIGN IN"}
              </Button>
            </div>

            <button
              type="button"
              onClick={() => navigate("/reset-password")}
              className="text-foreground hover:text-primary transition-colors"
            >
              Forgot Password?
            </button>
          </form>
        </div>
      </motion.div>

      {/* Right Panel - Sign Up */}
      <motion.div
        variants={slideInRight}
        initial="hidden"
        animate="visible"
        className="flex-1 bg-primary flex items-center justify-center p-16"
      >
        <div className="w-full max-w-md text-center">
          <h2 className="text-5xl font-[Montserrat] font-extrabold text-white mb-8">
            Create an Account
          </h2>

          <Button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full h-14 rounded-full bg-white text-primary font-semibold hover:bg-white/90 flex items-center justify-center gap-3 mb-6"
          >
            <FcGoogle size={24} />
            Continue With Google
          </Button>

          <p className="text-white mb-6 opacity-90">
            or use your Email for registration
          </p>

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
              className="w-full h-14 rounded-full bg-white text-primary font-bold text-lg hover:bg-white/90 transition-all duration-300"
            >
              {loading ? "SIGNING UP..." : "SIGN UP"}
            </Button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
