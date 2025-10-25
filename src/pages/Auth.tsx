import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import aideLogo from "@/assets/aide-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import "@/styles/auth.css";

type MobileSignInProps = {
  signInEmail: string;
  setSignInEmail: (v: string) => void;
  signInPassword: string;
  setSignInPassword: (v: string) => void;
  handleSignIn: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setShowResetModal: (v: boolean) => void;
  loading: boolean;
};

type MobileSignUpProps = {
  fullName: string;
  setFullName: (v: string) => void;
  signUpEmail: string;
  setSignUpEmail: (v: string) => void;
  signUpPassword: string;
  setSignUpPassword: (v: string) => void;
  handleSignUp: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleGoogleSignIn: () => Promise<void>;
  loading: boolean;
};

export default function Auth(): JSX.Element {
  const [fullName, setFullName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isMobileSignUp, setIsMobileSignUp] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");

  const navigate = useNavigate();
  const { toast } = useToast();

  // helper for consistent error toasts
  const handleError = (title: string, error: unknown) => {
    const description = error instanceof Error ? error.message : "An unknown error occurred";
    toast({ title, description, variant: "destructive" });
  };

  // Sign Up
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const nameParts = fullName.trim().split(" ");
      const firstName = nameParts[0] ?? "";
      const lastName = nameParts.slice(1).join(" ") ?? "";

      const { data, error } = await supabase.auth.signUp({
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

      if (data?.session) {
        navigate("/dashboard");
      } else {
        toast({
          title: "Check your email",
          description: "Please verify your email before logging in.",
        });
      }
    } catch (err) {
      handleError("Sign up failed", err);
    } finally {
      setLoading(false);
    }
  };

  // Sign In
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
      handleError("Sign in failed", err);
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth
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
      // OAuth will redirect; no immediate navigate here.
    } catch (err) {
      handleError("Google sign in failed", err);
      setLoading(false);
    }
  };

  // Password reset (modal)
  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast({
        title: "Check your inbox",
        description: "A password reset link has been sent to your email.",
      });

      setShowResetModal(false);
      setResetEmail("");
    } catch (err) {
      handleError("Reset failed", err);
    } finally {
      setLoading(false);
    }
  };

  // animation variants typed with numeric direction
  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction < 0 ? "100%" : "-100%", opacity: 0 }),
  };

  return (
    <div className="min-h-screen w-full flex md:flex-row flex-col overflow-hidden font-[Poppins] relative">
      {/* Mobile Toggle */}
      <div className="md:hidden flex justify-center gap-4 py-4 bg-white border-b z-10">
        <Button
          onClick={() => setIsMobileSignUp(false)}
          className={`rounded-full px-6 ${!isMobileSignUp ? "bg-[#E31837] text-white" : "text-[#E31837]"}`}
        >
          Sign In
        </Button>
        <Button
          onClick={() => setIsMobileSignUp(true)}
          className={`rounded-full px-6 ${isMobileSignUp ? "bg-[#E31837] text-white" : "text-[#E31837]"}`}
        >
          Sign Up
        </Button>
      </div>

      {/* Desktop Panels */}
      <div className="hidden md:flex flex-row w-full">
        {/* Left - Sign In (40%) */}
        <div className="w-[40%] bg-white flex items-center justify-center p-12">
          <div className="w-full max-w-sm text-center">
            <img src={aideLogo} alt="AIDE Logo" className="h-20 mx-auto mb-8" />
            <h1 className="text-[32px] font-[800] text-[#E31837] font-[Montserrat] mb-4">
              Hello, Friend!
            </h1>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Sign in to continue your personalized journey with{" "}
              <span className="font-semibold">AIDE</span>—where mindset mastery meets business growth.
            </p>

            <form onSubmit={handleSignIn} className="space-y-4 text-left">
              <Input
                type="email"
                placeholder="Your Email"
                value={signInEmail}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignInEmail(e.target.value)}
                className="h-14 rounded-full border border-[#E31837] placeholder:text-[#E31837] text-[#E31837]"
                autoComplete="email"
              />

              <div className="flex gap-2">
                <Input
                  type="password"
                  placeholder="Password"
                  value={signInPassword}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignInPassword(e.target.value)}
                  className="h-14 flex-1 rounded-full border border-[#E31837] placeholder:text-[#E31837] text-[#E31837]"
                  autoComplete="current-password"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="h-14 px-8 rounded-full bg-[#E31837] text-white font-semibold hover:bg-[#c7152f]"
                >
                  {loading ? "..." : "SIGN IN"}
                </Button>
              </div>

              <button
                type="button"
                onClick={() => setShowResetModal(true)}
                className="text-sm text-black font-medium hover:underline"
              >
                Forgot Password
              </button>
            </form>
          </div>
        </div>

        {/* Right - Sign Up (60%) */}
        <div className="w-[60%] bg-[#E31837] flex items-center justify-center p-12">
          <div className="w-full max-w-sm">
            <h2 className="text-4xl md:text-5xl font-[800] font-[Montserrat] text-white mb-6 text-center">
              Create an Account
            </h2>

            <Button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full h-14 rounded-full bg-white text-[#E31837] font-semibold hover:bg-white/90 flex items-center justify-center gap-3"
            >
              <FcGoogle size={24} /> Continue With Google
            </Button>

            <p className="text-white text-center mt-6 mb-4">or use your Email for registration</p>

            <form onSubmit={handleSignUp} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
                  className="h-14 rounded-full bg-white/90 border-0 text-[#E31837] placeholder:text-[#E31837]/70"
                />
                <Input
                  type="email"
                  placeholder="Your Email"
                  value={signUpEmail}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignUpEmail(e.target.value)}
                  className="h-14 rounded-full bg-white/90 border-0 text-[#E31837] placeholder:text-[#E31837]/70"
                />
              </div>

              <Input
                type="password"
                placeholder="Password"
                value={signUpPassword}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignUpPassword(e.target.value)}
                className="h-14 rounded-full bg-white/90 border-0 text-[#E31837] placeholder:text-[#E31837]/70"
                autoComplete="new-password"
              />

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-14 rounded-full bg-white text-[#E31837] font-bold text-lg hover:bg-white/90"
              >
                {loading ? "..." : "SIGN UP"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden relative w-full overflow-hidden">
        <AnimatePresence initial={false} custom={isMobileSignUp ? 1 : -1}>
          <motion.div
            key={isMobileSignUp ? "signup" : "signin"}
            custom={isMobileSignUp ? 1 : -1}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4 }}
            className="absolute w-full"
          >
            {isMobileSignUp ? (
              <MobileSignUp
                fullName={fullName}
                setFullName={setFullName}
                signUpEmail={signUpEmail}
                setSignUpEmail={setSignUpEmail}
                signUpPassword={signUpPassword}
                setSignUpPassword={setSignUpPassword}
                handleSignUp={handleSignUp}
                handleGoogleSignIn={handleGoogleSignIn}
                loading={loading}
              />
            ) : (
              <MobileSignIn
                signInEmail={signInEmail}
                setSignInEmail={setSignInEmail}
                signInPassword={signInPassword}
                setSignInPassword={setSignInPassword}
                handleSignIn={handleSignIn}
                setShowResetModal={setShowResetModal}
                loading={loading}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Password Reset Modal */}
      <AnimatePresence>
        {showResetModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="bg-white p-6 rounded-2xl w-[90%] max-w-md shadow-lg"
            >
              <h3 className="text-2xl font-[Montserrat] font-bold text-[#E31837] mb-4 text-center">
                Reset Password
              </h3>

              <form onSubmit={handlePasswordReset} className="space-y-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={resetEmail}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setResetEmail(e.target.value)}
                  className="h-12 rounded-full border border-[#E31837] placeholder:text-[#E31837] text-[#E31837]"
                />

                <div className="flex gap-2 justify-center">
                  <Button
                    type="button"
                    onClick={() => setShowResetModal(false)}
                    className="rounded-full bg-gray-200 text-black px-6"
                  >
                    Cancel
                  </Button>

                  <Button type="submit" disabled={loading} className="rounded-full bg-[#E31837] text-white px-6">
                    {loading ? "Sending..." : "Send Reset Link"}
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* --- Mobile components (typed props) --- */

const MobileSignIn: React.FC<MobileSignInProps> = ({
  signInEmail,
  setSignInEmail,
  signInPassword,
  setSignInPassword,
  handleSignIn,
  setShowResetModal,
  loading,
}) => {
  return (
    <div className="bg-white min-h-[calc(100vh-80px)] flex items-center justify-center p-8">
      <div className="w-full max-w-sm text-center">
        <img src={aideLogo} alt="AIDE Logo" className="h-16 mx-auto mb-6" />
        <h1 className="text-[28px] font-[800] text-[#E31837] font-[Montserrat] mb-3">Hello, Friend!</h1>
        <p className="text-gray-700 mb-5 text-sm leading-relaxed">
          Sign in to continue your personalized journey with <span className="font-semibold">AIDE</span>.
        </p>

        <form onSubmit={handleSignIn} className="space-y-3 text-left">
          <Input
            type="email"
            placeholder="Your Email"
            value={signInEmail}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignInEmail(e.target.value)}
            className="h-12 rounded-full border border-[#E31837] placeholder:text-[#E31837] text-[#E31837]"
            autoComplete="email"
          />

          <div className="flex gap-2">
            <Input
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignInPassword(e.target.value)}
              className="h-12 flex-1 rounded-full border border-[#E31837] placeholder:text-[#E31837] text-[#E31837]"
              autoComplete="current-password"
            />

            <Button type="submit" disabled={loading} className="h-12 px-6 rounded-full bg-[#E31837] text-white font-semibold hover:bg-[#c7152f]">
              {loading ? "..." : "SIGN IN"}
            </Button>
          </div>

          <button type="button" onClick={() => setShowResetModal(true)} className="text-xs text-black font-medium hover:underline">
            Forgot Password
          </button>
        </form>
      </div>
    </div>
  );
};

const MobileSignUp: React.FC<MobileSignUpProps> = ({
  fullName,
  setFullName,
  signUpEmail,
  setSignUpEmail,
  signUpPassword,
  setSignUpPassword,
  handleSignUp,
  handleGoogleSignIn,
  loading,
}) => {
  return (
    <div className="bg-[#E31837] min-h-[calc(100vh-80px)] flex items-center justify-center p-8">
      <div className="w-full max-w-sm">
        <h2 className="text-3xl font-[800] font-[Montserrat] text-white mb-6 text-center">Create an Account</h2>

        <Button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full h-12 rounded-full bg-white text-[#E31837] font-semibold hover:bg-white/90 flex items-center justify-center gap-3"
        >
          <FcGoogle size={22} /> Continue With Google
        </Button>

        <p className="text-white text-center mt-4 mb-3 text-sm">or use your Email for registration</p>

        <form onSubmit={handleSignUp} className="space-y-3">
          <Input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullName(e.target.value)}
            className="h-12 rounded-full bg-white/90 border-0 text-[#E31837] placeholder:text-[#E31837]/70"
          />

          <Input
            type="email"
            placeholder="Your Email"
            value={signUpEmail}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignUpEmail(e.target.value)}
            className="h-12 rounded-full bg-white/90 border-0 text-[#E31837] placeholder:text-[#E31837]/70"
            autoComplete="email"
          />

          <Input
            type="password"
            placeholder="Password"
            value={signUpPassword}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSignUpPassword(e.target.value)}
            className="h-12 rounded-full bg-white/90 border-0 text-[#E31837] placeholder:text-[#E31837]/70"
            autoComplete="new-password"
          />

          <Button type="submit" disabled={loading} className="w-full h-12 rounded-full bg-white text-[#E31837] font-bold text-lg hover:bg-white/90">
            {loading ? "..." : "SIGN UP"}
          </Button>
        </form>
      </div>
    </div>
  );
};
