import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "framer-motion";
import aideLogo from "@/assets/aide-logo.png";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const tabMockup =
  "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1000&q=80";

export default function Auth() {
  const navigate = useNavigate();
  const [isSignIn, setIsSignIn] = useState(false);

  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const fadeVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#DF1516]">
      <div className="w-[90%] md:w-[1512px] h-[982px] bg-white rounded-[30px] overflow-hidden flex flex-col md:flex-row shadow-xl">
        {/* --- Left Side (Sign In) --- */}
        <motion.div
          ref={ref}
          variants={fadeVariants}
          initial="hidden"
          animate={controls}
          className="relative w-full md:w-[40%] bg-white flex flex-col justify-center items-center px-10 md:px-16"
        >
          <div className="absolute top-[35px] left-[35px]">
            <img
              src={aideLogo}
              alt="AIDE Logo"
              style={{ width: "150px", height: "auto" }}
            />
          </div>

          {isSignIn ? (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="w-full max-w-[400px] mt-32"
            >
              <h2 className="text-center font-montserrat font-extrabold text-[48px] text-[#DF1516] mb-4">
                Welcome Back
              </h2>
              <p className="text-center font-poppins text-[20px] font-regular text-gray-600 mb-10">
                Sign in to continue to your dashboard
              </p>

              <div className="mb-6">
                <label className="block text-[20px] font-semibold mb-2 font-poppins text-gray-800">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full h-[60px] border border-gray-300 rounded-[18px] px-4 font-semibold text-gray-800 placeholder:font-semibold placeholder:text-gray-400"
                />
              </div>

              <div className="mb-6">
                <label className="block text-[20px] font-semibold mb-2 font-poppins text-gray-800">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-full h-[60px] border border-gray-300 rounded-[18px] px-4 font-semibold text-gray-800 placeholder:font-semibold placeholder:text-gray-400"
                />
              </div>

              <div className="text-right mb-6">
                <button
                  onClick={() => navigate("/reset-password")}
                  className="font-poppins font-semibold text-[16px] text-black hover:text-[#DF1516] transition-all"
                >
                  Forgot Password?
                </button>
              </div>

              <Button className="w-full h-[60px] bg-[#DF1516] text-white font-semibold rounded-[18px] text-lg hover:bg-[#c01213] transition-all">
                Sign In
              </Button>

              <div className="flex items-center justify-center mt-8">
                <button className="w-full border border-gray-300 rounded-[18px] py-3 text-gray-700 font-medium hover:bg-gray-100 transition-all">
                  Connect with Google
                </button>
              </div>

              <div className="text-center mt-8 text-gray-600">
                Don’t have an account?{" "}
                <button
                  onClick={() => setIsSignIn(false)}
                  className="text-[#DF1516] font-semibold hover:underline"
                >
                  Sign Up
                </button>
              </div>
            </motion.div>
          ) : (
            /* --- Sign Up Form --- */
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="w-full max-w-[400px] mt-32"
            >
              <h2 className="text-center font-montserrat font-extrabold text-[48px] text-[#DF1516] mb-4">
                Hello Friend
              </h2>
              <p className="text-center font-poppins text-[20px] text-gray-600 mb-10">
                Enter your details and start your journey with{" "}
                <span className="font-semibold text-black">AIDE</span>
              </p>

              <div className="flex gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-1/2 h-[60px] border border-gray-300 rounded-[18px] px-4 font-regular text-gray-800"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-1/2 h-[60px] border border-gray-300 rounded-[18px] px-4 font-regular text-gray-800"
                />
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full h-[60px] border border-gray-300 rounded-[18px] px-4 font-regular text-gray-800"
                />
              </div>

              <Button className="w-full h-[60px] bg-[#DF1516] text-white font-semibold rounded-[18px] text-lg hover:bg-[#c01213] transition-all">
                Sign Up
              </Button>

              <div className="text-center mt-8 text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={() => setIsSignIn(true)}
                  className="text-[#DF1516] font-semibold hover:underline"
                >
                  Sign In
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* --- Right Side (Red Background with Mockup) --- */}
        <motion.div
          className="relative hidden md:flex w-[60%] bg-[#DF1516] justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          style={{
            backgroundImage: `linear-gradient(rgba(223, 21, 22, 0.8), rgba(223, 21, 22, 0.8)), url(${tabMockup})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </div>
    </div>
  );
}
