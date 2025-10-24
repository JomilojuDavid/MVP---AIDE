import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import aideLogo from "@/assets/aide-logo.png";
import { supabase } from "@/integrations/supabase/client";

export default function Auth() {
  const [isMobileSignIn, setIsMobileSignIn] = useState(true);
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail || !signInPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    const { error } = await supabase.auth.signInWithPassword({
      email: signInEmail,
      password: signInPassword,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Signed in successfully!");
    navigate("/dashboard");
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpEmail || !signUpPassword || !fullName) {
      toast.error("Please fill in all fields");
      return;
    }
    const [firstName, ...lastNameParts] = fullName.trim().split(" ");
    const lastName = lastNameParts.join(" ");
    const { error } = await supabase.auth.signUp({
      email: signUpEmail,
      password: signUpPassword,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { first_name: firstName, last_name: lastName },
      },
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Account created successfully!");
    navigate("/dashboard");
  };

  const handleGoogleAuth = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
    if (error) toast.error(error.message);
  };

  // ===== Animation Variants =====
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };
  const leftPanel = { hidden: { x: -100, scale: 0.95, opacity: 0 }, visible: { x: 0, scale: 1, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } } };
  const rightPanel = { hidden: { x: 100, scale: 0.95, opacity: 0 }, visible: { x: 0, scale: 1, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } } };
  const mobilePanel = { hidden: { y: 30, opacity: 0, scale: 0.97 }, visible: { y: 0, opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } } };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">

      {/* === Mobile View === */}
      <motion.div
        className="md:hidden flex flex-col justify-center items-center bg-primary p-8 min-h-screen w-full"
        variants={mobilePanel}
        initial="hidden"
        animate="visible"
      >
        <motion.img
          src={aideLogo}
          alt="AIDE Logo"
          className="h-20 mb-8"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        />

        <AnimatePresence mode="wait">
          {isMobileSignIn ? (
            <motion.div
              key="signIn"
              className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2 variants={itemVariants} className="text-3xl font-bold text-primary text-center mb-6">Sign In</motion.h2>

              <motion.form onSubmit={handleSignIn} className="space-y-4" variants={containerVariants}>
                <motion.div variants={itemVariants}>
                  <Input type="email" placeholder="Email" value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} className="h-12 rounded-full px-5 border-2 border-primary text-primary" />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Input type="password" placeholder="Password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} className="h-12 rounded-full px-5 border-2 border-primary text-primary" />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Button type="submit" className="w-full h-12 rounded-full bg-primary text-white text-lg font-semibold hover:bg-primary/90">Sign In</Button>
                </motion.div>
              </motion.form>

              <motion.div variants={itemVariants} className="mt-4 text-center">
                <Button onClick={handleGoogleAuth} type="button" className="w-full bg-white border text-primary hover:bg-white/90 rounded-full h-12 font-semibold flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  </svg>
                  Continue with Google
                </Button>
              </motion.div>

              <motion.p variants={itemVariants} className="text-center mt-4 text-sm text-gray-600">
                Don’t have an account?{" "}
                <button onClick={() => setIsMobileSignIn(false)} className="text-primary font-semibold hover:underline">Sign Up</button>
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="signUp"
              className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h2 variants={itemVariants} className="text-3xl font-bold text-primary text-center mb-6">Sign Up</motion.h2>

              <motion.form onSubmit={handleSignUp} className="space-y-4" variants={containerVariants}>
                <motion.div variants={itemVariants}>
                  <Input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="h-12 rounded-full px-5 border-2 border-primary text-primary" />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Input type="email" placeholder="Email" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} className="h-12 rounded-full px-5 border-2 border-primary text-primary" />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Input type="password" placeholder="Password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} className="h-12 rounded-full px-5 border-2 border-primary text-primary" />
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Button type="submit" className="w-full h-12 rounded-full bg-primary text-white text-lg font-semibold hover:bg-primary/90">Sign Up</Button>
                </motion.div>
              </motion.form>

              <motion.div variants={itemVariants} className="mt-4 text-center">
                <Button onClick={handleGoogleAuth} type="button" className="w-full bg-white border text-primary hover:bg-white/90 rounded-full h-12 font-semibold flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  </svg>
                  Continue with Google
                </Button>
              </motion.div>

              <motion.p variants={itemVariants} className="text-center mt-4 text-sm text-gray-600">
                Already have an account?{" "}
                <button onClick={() => setIsMobileSignIn(true)} className="text-primary font-semibold hover:underline">Sign In</button>
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* === Desktop View - Sign In Left Panel === */}
      <motion.div className="hidden md:flex md:w-1/2 bg-white flex-col justify-center px-16 relative" variants={leftPanel} initial="hidden" animate="visible">
        <div className="absolute top-8 left-8">
          <motion.img src={aideLogo} alt="AIDE Logo" className="h-16" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} />
        </div>

        <motion.div className="max-w-md" variants={containerVariants} initial="hidden" animate="visible">
          <motion.h2 variants={itemVariants} className="text-5xl font-bold mb-6 text-primary">Hello, Friend!</motion.h2>
          <motion.p variants={itemVariants} className="text-xl mb-12 leading-relaxed text-black">
            Sign in to continue your personalized journey with <span className="font-bold">AIDE</span>.
          </motion.p>

          <motion.form onSubmit={handleSignIn} className="space-y-6" variants={containerVariants}>
            <motion.div variants={itemVariants}>
              <Input type="email" placeholder="Your Email" value={signInEmail} onChange={(e) => setSignInEmail(e.target.value)} className="bg-white border-2 border-primary text-primary h-14 text-lg rounded-full px-6" />
            </motion.div>
            <motion.div variants={itemVariants} className="flex gap-4 items-center">
              <Input type="password" placeholder="Password" value={signInPassword} onChange={(e) => setSignInPassword(e.target.value)} className="bg-white border-2 border-primary text-primary h-14 text-lg rounded-full px-6 flex-1" />
              <Button type="submit" className="bg-primary text-white hover:bg-primary/90 h-14 px-10 text-lg font-bold rounded-full uppercase whitespace-nowrap">Sign In</Button>
            </motion.div>
            <motion.button variants={itemVariants} type="button" className="text-black hover:underline text-sm block">Forgot Password</motion.button>
          </motion.form>
        </motion.div>
      </motion.div>

      {/* === Desktop View - Sign Up Right Panel === */}
      <motion.div className="hidden md:flex md:w-1/2 bg-primary flex-col justify-center px-8 md:px-16" variants={rightPanel} initial="hidden" animate="visible">
        <motion.div className="max-w-md mx-auto w-full" variants={containerVariants} initial="hidden" animate="visible">
          <motion.h2 variants={itemVariants} className="text-5xl font-bold text-white mb-12 text-center">Create an Account</motion.h2>

          <motion.div variants={itemVariants}>
            <Button onClick={handleGoogleAuth} type="button" className="w-full bg-white hover:bg-white/90 text-primary h-16 text-lg font-bold rounded-full mb-8 flex items-center justify-center gap-3">
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92..."/>
              </svg>
              Continue With Google
            </Button>
          </motion.div>

          <motion.p variants={itemVariants} className="text-center text-white mb-8">or use your Email for registration</motion.p>

          <motion.form onSubmit={handleSignUp} className="space-y-6" variants={containerVariants}>
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="bg-white text-black h-14 text-lg rounded-full px-6 placeholder:text-gray-500" />
              <Input type="email" placeholder="Your Email" value={signUpEmail} onChange={(e) => setSignUpEmail(e.target.value)} className="bg-white text-black h-14 text-lg rounded-full px-6 placeholder:text-gray-500" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Input type="password" placeholder="Password" value={signUpPassword} onChange={(e) => setSignUpPassword(e.target.value)} className="bg-white text-black h-14 text-lg rounded-full px-6 placeholder:text-gray-500" />
            </motion.div>
            <motion.div variants={itemVariants}>
              <Button type="submit" className="w-full bg-white text-primary hover:bg-white/90 h-16 text-xl font-bold rounded-full uppercase">Sign Up</Button>
            </motion.div>
          </motion.form>
        </motion.div>
      </motion.div>

    </div>
  );
}
