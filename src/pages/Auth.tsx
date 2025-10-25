import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import aideLogo from "@/assets/aide-logo.png";

export default function Auth() {
  const [isSignIn, setIsSignIn] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-[#DF1516] text-[#1A1A1A] font-['Poppins'] overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={
          isVisible
            ? { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
            : {}
        }
        className="flex w-[1512px] h-[982px] rounded-[30px] overflow-hidden shadow-2xl"
      >
        {/* Sign In Section */}
        <div
          className={`transition-all duration-700 ease-in-out ${
            isSignIn ? "w-[40%] opacity-100" : "w-0 opacity-0 pointer-events-none"
          } flex flex-col items-center justify-center bg-white text-center px-12 relative`}
        >
          {isSignIn && (
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full"
            >
              <div className="absolute top-[35px] left-[50px]">
                <img
                  src={aideLogo}
                  alt="Aide Logo"
                  style={{
                    width: "259px",
                    height: "125px",
                    opacity: 1,
                  }}
                />
              </div>
              <h1 className="text-[40px] font-extrabold font-['Montserrat'] text-[#DF1516] mt-52">
                Hello, Friend!
              </h1>
              <p className="text-[20px] leading-[100%] mt-4 text-center">
                Sign in to continue your personalized journey <br />
                with <span className="font-semibold text-black">AIDE</span>—where mindset
                mastery meets business growth.
              </p>

              <form className="flex flex-col gap-6 mt-10 w-full max-w-[400px] mx-auto">
                <input
                  type="email"
                  placeholder="Your Email"
                  className="border border-[#DF1516] text-[#DF1516] rounded-[20px] py-4 px-6 text-lg font-normal focus:outline-none"
                />
                <div className="flex w-full border border-[#DF1516] rounded-[20px] overflow-hidden">
                  <input
                    type="password"
                    placeholder="Password"
                    className="flex-1 py-4 px-6 text-[#DF1516] text-lg font-normal focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-[#DF1516] text-white font-semibold text-lg px-8"
                  >
                    SIGN IN
                  </button>
                </div>
                <div className="flex justify-between items-center text-sm font-semibold text-black">
                  <span
                    className="cursor-pointer hover:underline"
                    onClick={() => alert("Forgot Password flow")}
                  >
                    Forgot Password
                  </span>
                </div>
              </form>

              <div className="mt-8">
                <button className="bg-white border border-[#DF1516] text-[#DF1516] rounded-[20px] py-3 px-6 text-lg font-semibold hover:bg-[#DF1516] hover:text-white transition-colors duration-300">
                  Continue with Google
                </button>
              </div>

              <p className="mt-8 text-[16px] text-black font-medium">
                Don’t have an account?{" "}
                <span
                  className="text-[#DF1516] cursor-pointer font-semibold hover:underline"
                  onClick={() => setIsSignIn(false)}
                >
                  Sign Up
                </span>
              </p>
            </motion.div>
          )}
        </div>

        {/* Sign Up Section */}
        <div
          className={`flex flex-col justify-center items-center bg-[#DF1516] text-white w-full transition-all duration-700 ease-in-out ${
            isSignIn ? "w-[60%]" : "w-full"
          }`}
        >
          {!isSignIn && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center px-12"
            >
              <h1 className="text-[48px] font-extrabold font-['Montserrat'] mb-6">
                Create an Account
              </h1>
              <button className="flex items-center justify-center gap-3 bg-white text-[#DF1516] rounded-[20px] py-4 px-10 text-lg font-semibold w-full max-w-[400px] mx-auto hover:bg-gray-100 transition-all">
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-6 h-6"
                />
                Continue With Google
              </button>

              <p className="text-[18px] mt-6 mb-8 font-light">
                or use your Email for registration
              </p>

              <form className="flex flex-col gap-6 w-full max-w-[400px] mx-auto">
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="flex-1 border border-white/60 rounded-[20px] py-4 px-6 text-[#1A1A1A] placeholder:text-[#1A1A1A]/70 text-lg font-normal focus:outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="flex-1 border border-white/60 rounded-[20px] py-4 px-6 text-[#1A1A1A] placeholder:text-[#1A1A1A]/70 text-lg font-normal focus:outline-none"
                  />
                </div>
                <input
                  type="password"
                  placeholder="Password"
                  className="border border-white/60 rounded-[20px] py-4 px-6 text-[#1A1A1A] placeholder:text-[#1A1A1A]/70 text-lg font-normal focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-white text-[#DF1516] font-semibold text-lg rounded-[20px] py-4 hover:bg-gray-100 transition-all"
                >
                  SIGN UP
                </button>
              </form>

              <p className="mt-10 text-[16px] font-medium">
                Already have an account?{" "}
                <span
                  className="text-white underline cursor-pointer font-semibold"
                  onClick={() => setIsSignIn(true)}
                >
                  Sign In
                </span>
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
