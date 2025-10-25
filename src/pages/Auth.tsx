import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import aideLogo from "@/assets/aide-logo.png";

export default function Auth() {
  const [fullName, setFullName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const handleSignUp = (e: FormEvent<HTMLFormElement>) => e.preventDefault();
  const handleSignIn = (e: FormEvent<HTMLFormElement>) => e.preventDefault();

  const handleChange =
    (setter: (value: string) => void) =>
    (e: ChangeEvent<HTMLInputElement>) =>
      setter(e.target.value);

  // Animation variants
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 + i * 0.1, duration: 0.5 },
    }),
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden rounded-3xl shadow-lg">
      {/* Left Panel - Sign In (White, 40%) */}
      <motion.div
        initial={{ opacity: 0, x: -60, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="flex-[0.4] bg-white flex items-center justify-center p-8 md:p-16"
      >
        <div className="w-full max-w-md">
          <motion.img
            src={aideLogo}
            alt="AIDE Logo"
            className="h-20 mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          />

          <motion.h1
            className="text-4xl md:text-5xl font-bold text-primary mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Hello, Friend!
          </motion.h1>

          <motion.p
            className="text-foreground mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            Sign in to continue your personalized journey with{" "}
            <span className="font-bold">AIDE</span>—where mindset mastery meets
            business growth.
          </motion.p>

          <motion.form
            onSubmit={handleSignIn}
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <motion.div custom={0} variants={itemVariants} initial="hidden" animate="visible">
              <Input
                type="email"
                placeholder="Your Email"
                value={signInEmail}
                onChange={handleChange(setSignInEmail)}
                className="h-14 rounded-full border-2 border-primary text-primary placeholder:text-primary/70 focus-visible:ring-primary"
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
                onChange={handleChange(setSignInPassword)}
                className="h-14 rounded-full border-2 border-primary text-primary placeholder:text-primary/70 focus-visible:ring-primary"
              />
              <Button
                type="submit"
                className="h-14 px-10 rounded-full bg-primary text-white font-semibold hover:bg-primary/90 whitespace-nowrap"
              >
                SIGN IN
              </Button>
            </motion.div>

            <motion.button
              type="button"
              className="text-black font-medium hover:text-primary transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Forgot Password
            </motion.button>
          </motion.form>
        </div>
      </motion.div>

      {/* Right Panel - Sign Up (Red, 60%) */}
      <motion.div
        initial={{ opacity: 0, x: 60, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.5 }}
        className="flex-[0.6] bg-primary flex items-center justify-center p-8 md:p-16 rounded-t-3xl md:rounded-l-none md:rounded-r-3xl"
      >
        <div className="w-full max-w-md">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-white mb-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Create an Account
          </motion.h2>

          <motion.div
            className="mb-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.4 }}
          >
            <Button
              type="button"
              className="w-full h-14 rounded-full bg-white text-primary font-semibold hover:bg-white/90 flex items-center justify-center gap-3"
            >
              <FcGoogle size={24} />
              Continue With Google
            </Button>
          </motion.div>

          <motion.p
            className="text-white text-center mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            or use your Email for registration
          </motion.p>

          <motion.form
            onSubmit={handleSignUp}
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.6 }}
          >
            <motion.div
              custom={0}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <Input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={handleChange(setFullName)}
                className="h-14 rounded-full bg-white/95 border-0 text-foreground placeholder:text-muted focus-visible:ring-white"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={signUpEmail}
                onChange={handleChange(setSignUpEmail)}
                className="h-14 rounded-full bg-white/95 border-0 text-foreground placeholder:text-muted focus-visible:ring-white"
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
                onChange={handleChange(setSignUpPassword)}
                className="h-14 rounded-full bg-white/95 border-0 text-foreground placeholder:text-muted focus-visible:ring-white"
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
                className="w-full h-14 rounded-full bg-white text-primary font-bold text-lg hover:bg-white/90"
              >
                SIGN UP
              </Button>
            </motion.div>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}
