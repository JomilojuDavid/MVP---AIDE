import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { supabase } from "../supabaseClient";

// ✅ Correct font imports (no version-specific paths)
import "@fontsource/montserrat";
import "@fontsource/poppins";

// Custom hook for scroll-triggered animation
const useScrollAnimation = () => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) controls.start("visible");
      },
      { threshold: 0.2 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [controls]);

  return { ref, controls };
};

const Auth: React.FC = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) alert(error.message);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    if (error) alert(error.message);
  };

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const leftRef = useScrollAnimation();
  const rightRef = useScrollAnimation();

  return (
    <div className="min-h-screen flex flex-row overflow-hidden font-[Poppins]">
      {/* ===================== LEFT PANEL - SIGN IN ===================== */}
      <motion.div
        ref={leftRef.ref}
        initial="hidden"
        animate={leftRef.controls}
        variants={fadeUp}
        className="w-[40%] bg-white flex items-center justify-center p-8 md:p-14"
      >
        <div className="w-full max-w-[480px] flex flex-col items-center">
          {/* Logo */}
          <div className="w-[259px] h-[125px] mb-6 self-start">
            <img src="/logo.png" alt="Logo" className="object-contain w-full h-full" />
          </div>

          {/* Headline */}
          <h1
            className="font-[Montserrat] font-extrabold text-[40px] text-center leading-[100%] text-black mb-6"
            style={{ letterSpacing: "0%" }}
          >
            Hello Friend
          </h1>

          {/* Body text */}
          <p
            className="font-[Poppins] text-[20px] font-normal text-center leading-[100%] text-black mb-10"
            style={{ letterSpacing: "0%" }}
          >
            Welcome back to{" "}
            <span className="font-semibold text-black">AIDE</span>. Sign in to
            continue your journey.
          </p>

          {/* Sign-In Form */}
          <form
            onSubmit={handleSignIn}
            className="w-full flex flex-col gap-4 items-center"
          >
            <div className="w-full flex flex-col">
              <label className="text-[20px] font-[Poppins] font-normal mb-2 text-black">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="border border-gray-300 rounded-[20px] h-[60px] px-4 text-[18px] font-[Poppins] focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="w-full flex flex-col relative">
              <label className="text-[20px] font-[Poppins] font-normal mb-2 text-black">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="border border-gray-300 rounded-[20px] h-[60px] px-4 text-[18px] font-[Poppins] w-full pr-[110px] focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 bottom-0 bg-[#DF1516] text-white rounded-r-[20px] px-8 font-[Poppins] text-[18px] font-semibold transition-all hover:bg-red-700"
                >
                  Sign In
                </button>
              </div>
            </div>

            <div className="w-full flex justify-start mt-2">
              <button
                type="button"
                onClick={() => (window.location.href = "/reset-password")}
                className="font-[Poppins] font-semibold text-[16px] text-black hover:underline"
              >
                Forgot Password?
              </button>
            </div>
          </form>
        </div>
      </motion.div>

      {/* ===================== RIGHT PANEL - SIGN UP ===================== */}
      <motion.div
        ref={rightRef.ref}
        initial="hidden"
        animate={rightRef.controls}
        variants={fadeUp}
        className="w-[60%] bg-[#DF1516] flex items-center justify-center p-8 md:p-12"
      >
        <div className="w-full max-w-[700px] flex flex-col items-center scale-[0.85]">
          <h2 className="font-[Montserrat] font-extrabold text-[40px] text-white text-center mb-6">
            Create an Account
          </h2>
          <p className="font-[Poppins] text-[20px] font-normal text-center text-white mb-10">
            Join <span className="font-semibold">AIDE</span> and start your experience.
          </p>

          <form
            onSubmit={handleSignUp}
            className="w-full flex flex-col gap-4 items-center"
          >
            <div className="flex flex-row gap-6 w-full justify-center">
              <div className="flex flex-col">
                <label className="text-white font-[Poppins] text-[20px] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="border border-white rounded-[30px] h-[83px] w-[283px] px-4 text-[18px] font-[Poppins] bg-transparent text-white focus:outline-none"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="flex flex-col">
                <label className="text-white font-[Poppins] text-[20px] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="border border-white rounded-[30px] h-[83px] w-[283px] px-4 text-[18px] font-[Poppins] bg-transparent text-white focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full flex flex-col items-center mt-4">
              <label className="text-white font-[Poppins] text-[20px] mb-2">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="border border-white rounded-[30px] h-[83px] w-[603px] px-4 text-[18px] font-[Poppins] bg-transparent text-white focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="mt-8 bg-white text-[#DF1516] px-12 py-4 rounded-[30px] font-[Poppins] font-semibold text-[20px] transition-all hover:bg-gray-100"
            >
              Sign Up
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
