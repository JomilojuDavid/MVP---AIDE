import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import aideLogo from "@/assets/aide-logo.png";
import { Button } from "@/components/ui/button";

/**
 * Auth.tsx
 * - Sign Up is default (landing)
 * - Crossfade to Sign In when toggled
 * - Uses a safe online mockup image for red background
 */

const TAB_MOCKUP =
  "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1000&q=80";
const PRIMARY = "#DF1516";

export default function Auth(): JSX.Element {
  const [showSignIn, setShowSignIn] = useState(false); // false => show Sign Up
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // small mount flag so initial animations behave predictably
    setMounted(true);
  }, []);

  // Crossfade variants
  const fade = {
    initial: { opacity: 0, scale: 0.995 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.995, transition: { duration: 0.35, ease: "easeIn" } },
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-[#f7f7f7] p-6"
    >
      <div
        className="w-full max-w-[1512px] h-[982px] rounded-[30px] overflow-hidden shadow-2xl relative"
        style={{ background: "transparent" }}
      >
        <AnimatePresence mode="wait">
          {/* SIGN UP (default landing) */}
          {!showSignIn && mounted && (
            <motion.div
              key="sign-up"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={fade}
              className="absolute inset-0 flex"
            >
              {/* Left white column (logo + sign in greeting style visually on left in original) */}
              <div className="w-[40%] bg-white p-16 flex flex-col items-start">
                {/* Logo top-left */}
                <img src={aideLogo} alt="AIDE Logo" className="w-[259px] h-[125px] object-contain mb-6" />

                {/* Centered greeting on left side */}
                <div className="mt-16 w-full">
                  <h1
                    className="text-[48px] leading-[1] font-extrabold"
                    style={{ fontFamily: "'Montserrat', sans-serif", color: PRIMARY, textAlign: "center" }}
                  >
                    Hello, Friend!
                  </h1>

                  <p
                    className="mt-6 text-[24px] leading-[1] text-center"
                    style={{ fontFamily: "'Poppins', sans-serif", color: "#111" }}
                  >
                    Sign in to continue your personalized journey with{" "}
                    <span style={{ fontWeight: 600 }}>AIDE</span>—where mindset mastery meets business
                    growth.
                  </p>

                  {/* sign-in inputs on the left side as per design (these replicate original) */}
                  <div className="mt-12 max-w-[520px] mx-auto">
                    <input
                      placeholder="Your Email"
                      className="w-full h-[64px] rounded-[24px] border border-[#DF1516] px-6 text-[18px] placeholder:text-[#DF1516]/80 mb-6"
                    />

                    <div className="flex items-stretch w-full rounded-[24px] border border-[#DF1516] overflow-hidden">
                      <input
                        placeholder="Password"
                        type="password"
                        className="flex-1 h-[64px] pl-6 text-[18px] placeholder:text-[#DF1516]/80"
                      />
                      <button
                        type="button"
                        className="h-[64px] px-8 bg-[#DF1516] text-white font-semibold rounded-r-[24px] whitespace-nowrap"
                      >
                        SIGN IN
                      </button>
                    </div>

                    <button
                      onClick={() => navigate("/reset-password")}
                      className="mt-4 text-[16px] font-semibold text-black"
                    >
                      Forgot Password
                    </button>
                  </div>
                </div>
              </div>

              {/* Right red column (signup form) */}
              <div
                className="flex-1 bg-[#DF1516] flex items-center justify-center p-16"
                style={{
                  backgroundImage: `linear-gradient(rgba(223,21,22,0.95), rgba(223,21,22,0.95)), url(${TAB_MOCKUP})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="w-full max-w-[620px]">
                  <h2
                    className="text-[48px] font-extrabold text-white text-center mb-6"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Create an Account
                  </h2>

                  <button
                    type="button"
                    onClick={() => {
                      /* placeholder: will hook to Google later */
                    }}
                    className="mx-auto flex items-center justify-center gap-4 w-full max-w-[520px] h-[64px] rounded-[24px] bg-white text-[#DF1516] font-semibold mb-6"
                  >
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="Google"
                      className="w-6 h-6"
                    />
                    Continue With Google
                  </button>

                  <p className="text-center text-white mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    or use your Email for registration
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      placeholder="Full Name"
                      className="h-[64px] rounded-[24px] px-6 border-0 bg-white/95 text-[#111]"
                    />
                    <input
                      placeholder="Your Email"
                      className="h-[64px] rounded-[24px] px-6 border-0 bg-white/95 text-[#111]"
                    />
                  </div>

                  <input
                    placeholder="Password"
                    className="w-full h-[64px] rounded-[24px] px-6 border-0 bg-white/95 text-[#111] mb-6"
                  />

                  <button
                    type="button"
                    className="w-full h-[64px] rounded-[24px] bg-white text-[#DF1516] font-bold text-lg"
                  >
                    SIGN UP
                  </button>

                  <div className="text-center mt-6">
                    <span className="text-white mr-2">Already have an account?</span>
                    <button
                      onClick={() => setShowSignIn(true)}
                      className="text-white underline font-semibold"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {/* SIGN IN view (crossfades in when showSignIn is true) */}
          {showSignIn && mounted && (
            <motion.div
              key="sign-in"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={fade}
              className="absolute inset-0 flex"
            >
              {/* Left column becomes the sign-in (white on red logic requested: sign in white on red background)
                  To satisfy "sign in a white on a red background" we place a red column on left with white inner card. */}
              <div
                className="w-[40%] bg-[#DF1516] p-16 flex items-center justify-center"
                style={{
                  backgroundImage: `linear-gradient(rgba(223,21,22,0.95), rgba(223,21,22,0.95)), url(${TAB_MOCKUP})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="w-full max-w-[520px] bg-white rounded-[24px] p-10">
                  {/* logo top-left inside white card area */}
                  <div className="absolute top-[35px] left-[35px]">
                    <img src={aideLogo} alt="AIDE Logo" className="w-[150px]" />
                  </div>

                  <h1
                    className="text-[48px] font-extrabold text-[#DF1516] text-center mb-4"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Hello, Friend!
                  </h1>

                  <p className="text-[24px] text-center mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    Sign in to continue your personalized journey with{" "}
                    <span style={{ fontWeight: 600 }}>AIDE</span>—where mindset mastery meets business growth.
                  </p>

                  {/* Email */}
                  <div className="mb-6">
                    <input
                      placeholder="Your Email"
                      className="w-full h-[64px] rounded-[24px] border border-[#DF1516] px-6 text-[18px] placeholder:text-[#DF1516]/80"
                    />
                  </div>

                  {/* Password with sign-in button attached to right */}
                  <div className="mb-4">
                    <div className="flex items-stretch w-full rounded-[24px] border border-[#DF1516] overflow-hidden">
                      <input
                        placeholder="Password"
                        type="password"
                        className="flex-1 h-[64px] pl-6 text-[18px] placeholder:text-[#DF1516]/80"
                      />
                      <button
                        type="button"
                        className="h-[64px] px-8 bg-[#DF1516] text-white font-semibold"
                      >
                        SIGN IN
                      </button>
                    </div>
                  </div>

                  <div className="mb-6">
                    <button
                      onClick={() => navigate("/reset-password")}
                      className="text-[16px] font-semibold text-black"
                    >
                      Forgot Password
                    </button>
                  </div>

                  {/* Google connect (on sign-in side) */}
                  <div className="mb-6">
                    <button className="w-full border border-gray-300 rounded-[18px] py-3 text-gray-700 font-medium hover:bg-gray-100">
                      Connect with Google
                    </button>
                  </div>

                  <div className="text-center">
                    <span className="text-gray-700 mr-2">Don’t have an account?</span>
                    <button
                      onClick={() => setShowSignIn(false)}
                      className="text-[#DF1516] font-semibold underline"
                    >
                      Sign Up
                    </button>
                  </div>
                </div>
              </div>

              {/* Right column becomes the sign-up red area (white form centered on red) */}
              <div className="flex-1 bg-white flex items-center justify-center p-16">
                <div className="w-full max-w-[620px]">
                  <h2
                    className="text-[48px] font-extrabold text-black text-center mb-6"
                    style={{ fontFamily: "'Montserrat', sans-serif" }}
                  >
                    Create an Account
                  </h2>

                  <button
                    type="button"
                    onClick={() => {
                      /* placeholder for google */
                    }}
                    className="mx-auto flex items-center justify-center gap-4 w-full max-w-[520px] h-[64px] rounded-[24px] bg-[#DF1516] text-white font-semibold mb-6"
                    style={{ backgroundColor: PRIMARY }}
                  >
                    <img
                      src="https://www.svgrepo.com/show/475656/google-color.svg"
                      alt="Google"
                      className="w-6 h-6"
                    />
                    Continue With Google
                  </button>

                  <p className="text-center text-[#111] mb-6" style={{ fontFamily: "'Poppins', sans-serif" }}>
                    or use your Email for registration
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <input
                      placeholder="Full Name"
                      className="h-[64px] rounded-[24px] px-6 border border-neutral-200"
                    />
                    <input
                      placeholder="Your Email"
                      className="h-[64px] rounded-[24px] px-6 border border-neutral-200"
                    />
                  </div>

                  <input placeholder="Password" className="w-full h-[64px] rounded-[24px] px-6 border border-neutral-200 mb-6" />

                  <button
                    type="button"
                    className="w-full h-[64px] rounded-[24px] bg-[#DF1516] text-white font-bold text-lg"
                  >
                    SIGN UP
                  </button>

                  <div className="text-center mt-6">
                    <span className="text-gray-700 mr-2">Already have an account?</span>
                    <button onClick={() => setShowSignIn(true)} className="text-[#DF1516] font-semibold underline">
                      Sign In
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
