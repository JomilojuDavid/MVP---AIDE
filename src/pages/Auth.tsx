import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [fullName, setFullName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const handleSignUp = (e: React.FormEvent) => e.preventDefault();
  const handleSignIn = (e: React.FormEvent) => e.preventDefault();

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.97 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: 0.2 + i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-primary text-white overflow-hidden px-4">
      {/* Desktop Panels */}
      <motion.div
        initial={{ opacity: 0, x: -60, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        className="hidden md:flex flex-1 items-center justify-center"
      >
        <h1 className="text-5xl font-extrabold tracking-tight">Welcome Back!</h1>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 60, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.5, ease: "easeOut" }}
        className="hidden md:flex flex-1 items-center justify-center"
      >
        <div className="w-full max-w-md">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-xl"
          >
            <motion.div
              className="flex justify-center mb-6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
            >
              <Button
                type="button"
                variant="outline"
                className="w-full flex items-center justify-center gap-3 bg-white text-black rounded-full h-14 hover:scale-[1.02] transition-transform duration-300"
              >
                <FcGoogle size={22} />
                Continue with Google
              </Button>
            </motion.div>

            <AnimatePresence mode="wait">
              {isSignUp ? (
                <motion.form
                  key="signup"
                  onSubmit={handleSignUp}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: 30 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  {[0, 1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      custom={i}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {i === 0 && (
                        <Input
                          type="text"
                          placeholder="Full Name"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="auth-input"
                        />
                      )}
                      {i === 1 && (
                        <Input
                          type="email"
                          placeholder="Your Email"
                          value={signUpEmail}
                          onChange={(e) => setSignUpEmail(e.target.value)}
                          className="auth-input"
                        />
                      )}
                      {i === 2 && (
                        <Input
                          type="password"
                          placeholder="Password"
                          value={signUpPassword}
                          onChange={(e) => setSignUpPassword(e.target.value)}
                          className="auth-input"
                        />
                      )}
                      {i === 3 && (
                        <Button
                          type="submit"
                          className="auth-btn bg-white text-primary hover:bg-white/90"
                        >
                          Sign Up
                        </Button>
                      )}
                    </motion.div>
                  ))}
                </motion.form>
              ) : (
                <motion.form
                  key="signin"
                  onSubmit={handleSignIn}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-4"
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      custom={i}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {i === 0 && (
                        <Input
                          type="email"
                          placeholder="Email"
                          value={signInEmail}
                          onChange={(e) => setSignInEmail(e.target.value)}
                          className="auth-input"
                        />
                      )}
                      {i === 1 && (
                        <Input
                          type="password"
                          placeholder="Password"
                          value={signInPassword}
                          onChange={(e) => setSignInPassword(e.target.value)}
                          className="auth-input"
                        />
                      )}
                      {i === 2 && (
                        <Button
                          type="submit"
                          className="auth-btn bg-white text-primary hover:bg-white/90"
                        >
                          Sign In
                        </Button>
                      )}
                    </motion.div>
                  ))}
                </motion.form>
              )}
            </AnimatePresence>

            <motion.p
              className="text-center mt-6 cursor-pointer underline text-white/80 hover:text-white"
              onClick={() => setIsSignUp(!isSignUp)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {isSignUp ? "Already have an account? Sign In" : "Don’t have an account? Sign Up"}
            </motion.p>
          </motion.div>
        </div>
      </motion.div>

      {/* Mobile View */}
      <div className="md:hidden w-full max-w-sm py-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="bg-white/10 backdrop-blur-md rounded-3xl p-6 shadow-lg"
        >
          <motion.div
            className="flex justify-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Button
              type="button"
              variant="outline"
              className="w-full flex items-center justify-center gap-3 bg-white text-black rounded-full h-14 hover:scale-[1.02] transition-transform duration-300"
            >
              <FcGoogle size={22} />
              Continue with Google
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
