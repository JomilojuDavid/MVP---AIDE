import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
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
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  const leftControls = useAnimation();
  const rightControls = useAnimation();

  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setSignInEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.1 } }
  };

  const fadeItem = {
    hidden: { opacity: 0, y: 25 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.25 + i * 0.15, duration: 0.7 }
    })
  };

  return (
    <div className="min-h-screen w-full bg-white overflow-hidden flex">

      {/* LEFT PANEL */}
      <motion.div
        ref={leftRef}
        variants={sectionVariants}
        initial="hidden"
        animate={leftControls}
        className="w-[40%] bg-white px-20 relative"
      >
        {/* LOGO */}
        <img
          src={aideLogo}
          onClick={() => navigate("/dashboard")}
          className="h-24 cursor-pointer absolute top-10 left-20"
        />

        {/* CONTENT BLOCK */}
        <div className="mt-[200px] flex flex-col items-center text-center w-full max-w-md mx-auto">

          <motion.h1
            variants={fadeItem}
            custom={0}
            className="font-extrabold text-[#DF1516] mb-6 text-[44px] leading-[1.1] whitespace-nowrap"
            style={{ fontFamily: "Montserrat" }}
          >
            Hello, Friend!
          </motion.h1>

          <motion.p
            variants={fadeItem}
            custom={1}
            className="text-gray-800 text-[22px] leading-[1.45] mb-12"
            style={{ fontFamily: "Poppins" }}
          >
            Sign in to continue your personalized journey <br />
            with <span className="font-bold text-black">AIDE</span>—where mindset mastery meets <br />
            business growth.
          </motion.p>

          {/* SIGN IN FORM */}
          <motion.form variants={fadeItem} custom={2} onSubmit={() => {}} className="space-y-6 w-full">
            <Input
              type="email"
              placeholder="Your Email"
              className="h-[70px] border border-[#DF1516] rounded-none text-[20px]"
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
            />

            <div className="flex border border-[#DF1516] rounded-none">
              <Input
                type="password"
                placeholder="Password"
                className="h-[70px] border-none flex-1 text-[20px]"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
              />
              <Button className="h-[70px] w-[140px] bg-[#DF1516] text-white rounded-none text-[18px]">
                SIGN IN
              </Button>
            </div>

            <div className="flex items-center justify-between text-[16px]">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-5 h-5 accent-[#DF1516]"
                />
                Remember Me
              </label>

              <button
                type="button"
                onClick={() => navigate("/reset-password")}
                className="font-semibold hover:text-[#DF1516]"
              >
                Forgot Password?
              </button>
            </div>
          </motion.form>
        </div>
      </motion.div>

      {/* RIGHT PANEL */}
      <motion.div
        ref={rightRef}
        variants={sectionVariants}
        initial="hidden"
        animate={rightControls}
        className="w-[60%] bg-[#DF1516] flex items-start justify-center pt-[200px] px-20"
      >
        <div className="w-full max-w-2xl text-center">

          <motion.h2
            variants={fadeItem}
            custom={0}
            className="text-white font-extrabold text-[44px] whitespace-nowrap mb-12"
            style={{ fontFamily: "Montserrat" }}
          >
            Create an Account
          </motion.h2>

          {/* GOOGLE BUTTON */}
          <button
            className="flex w-[70%] mx-auto mb-10 border border-white rounded-none overflow-hidden"
          >
            <div className="bg-white w-[80px] flex items-center justify-center border-r border-white">
              <FcGoogle size={36} />
            </div>
            <span className="flex-1 h-[80px] bg-white text-[#DF1516] flex items-center justify-center text-[22px] font-bold">
              Continue With Google
            </span>
          </button>

          <p
            className="text-white text-[20px] mb-10"
            style={{ fontFamily: "Poppins" }}
          >
            or use your Email for registration
          </p>

          {/* SIGN UP FORM */}
          <motion.form variants={fadeItem} custom={1} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Input
                type="text"
                placeholder="Full Name"
                className="h-[80px] rounded-none text-[20px]"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              <Input
                type="email"
                placeholder="Your Email"
                className="h-[80px] rounded-none text-[20px]"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
              />
            </div>

            <Input
              type="password"
              placeholder="Password"
              className="h-[80px] rounded-none text-[20px]"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
            />

            <Button
              type="submit"
              className="w-full h-[90px] bg-white text-[#DF1516] text-[24px] font-bold rounded-none"
            >
              SIGN UP
            </Button>
          </motion.form>
        </div>
      </motion.div>
    </div>
  );
}
