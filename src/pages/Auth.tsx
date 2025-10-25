import { useState, FormEvent } from "react";
import { motion, Variants, Transition } from "framer-motion";
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

  // ✅ Shared animation configuration
  const slideTransition: Transition = {
    duration: 0.9,
    ease: [0.4, 0, 0.2, 1],
  };

  const panelVariants: Variants = {
    hiddenLeft: { opacity: 0, x: -100, scale: 0.96 },
    hiddenRight: { opacity: 0, x: 100, scale: 0.96 },
    visible: { opacity: 1, x: 0, scale: 1, transition: slideTransition },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.25 + i * 0.08, duration: 0.5 },
    }),
  };

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
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
      const err = error as { message: string };
      toast({
        title: "Sign up failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: FormEvent<HTMLFormElement>) => {
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
      const err = error as { message: string };
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
        options: { redirectTo: `${window.location.origin}/dashboard` },
      });

      if (error) throw error;
    } catch (error) {
      const err = error as { message: string };
      toast({
        title: "Google sign in failed",
        description: err.message,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-row overflow-hidden">
      {/* Left Panel - Sign In (White) */}
      <motion.div
        variants={panelVariants}
        initial="hiddenLeft"
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
            transition={{ delay: 0.3, duration: 0.5 }}
          />

          <motion.h1
            className="text-5xl font-bold text-primary mb-6 font-['Montserrat']"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Hello, Friend!
          </motion.h1>

          <motion.p
            className="text-foreground mb-8 leading-relaxed font-['Poppins']"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Sign in to continue your personalized journey with{" "}
            <span className="font-bold">AIDE</span> — where mindset mastery meets business growth.
          </motion.p>

          <motion.form
            onSubmit={handleSignIn}
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <motion.div
              custom={0}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <Input
                type="email"
                placeholder="Your Email"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
                className="h-14 rounded-full border-2 border-primary bg-white text-foreground placeholder:text-primary/60 focus-visible:ring-primary"
              />
            </motion.div>

            <motion.div
              custom={1}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="flex gap-2"
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
                className="h-14 px-10 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 whitespace-nowrap"
              >
                {loading ? "SIGNING IN..." : "SIGN IN"}
              </Button>
            </motion.div>

            <motion.button
              type="button"
              className="text-foreground hover:text-primary transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Forgot Password
            </motion.button>
          </motion.form>
        </div>
      </motion.div>

      {/* Right Panel - Sign Up (Red) */}
      <motion.div
        variants={panelVariants}
        initial="hiddenRight"
        animate="visible"
        className="flex-1 bg-primary flex items-center justify-center p-16"
      >
        <div className="w-full max-w-md">
          <motion.h2
            className="text-5xl font-bold text-white mb-8 text-center font-['Montserrat']"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Create an Account
          </motion.h2>

          <motion.div
            className="mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
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
            className="text-white text-center mb-6 font-['Poppins']"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            or use your Email for registration
          </motion.p>

          <motion.form
            onSubmit={handleSignUp}
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <motion.div
              custom={0}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 gap-4"
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

            <motion.div
              custom={1}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <Input
                type="password"
                placeholder="Password"
                value={signUpPassword}
                onChange={(e) => setSignUpPassword(e.target.value)}
                className="h-14 rounded-full bg-white/95 border-0 text-foreground placeholder:text-muted-foreground"
              />
            </motion.div>

            <motion.div
              custom={2}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
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
