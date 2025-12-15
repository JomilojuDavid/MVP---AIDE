import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import aideLogo from "@/assets/aide-logo.png";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import ResponsiveCanvas from "@/components/ResponsiveCanvas";

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

  /** Intersection Observer for fade-in animations */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === leftRef.current) leftControls.start("visible");
            if (entry.target === rightRef.current) rightControls.start("visible");
          }
        });
      },
      { threshold: 0.2 }
    );
    if (leftRef.current) observer.observe(leftRef.current);
    if (rightRef.current) observer.observe(rightRef.current);
    return () => observer.disconnect();
  }, [leftControls, rightControls]);

  const sectionVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.1 } },
  };

  const fadeItem = {
    hidden: { opacity: 0, y: 25 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.25 + i * 0.15, duration: 0.7 },
    }),
  };

  return (
    <ResponsiveCanvas width={1512} height={982}>
      {/* Logo */}
      <img
        src={aideLogo}
        onClick={() => navigate("/dashboard")}
        className="absolute cursor-pointer"
        style={{
          width: "259px",
          height: "125px",
          top: "35px",
          left: "35px",
        }}
        alt="AIDE Logo"
      />

      {/* LEFT PANEL - Sign In */}
      <motion.div
        ref={leftRef}
        variants={sectionVariants}
        initial="hidden"
        animate={leftControls}
        className="absolute bg-white"
        style={{
          width: "700px",
          height: "982px",
          left: 0,
          top: 0,
          paddingTop: "312px",
          paddingLeft: "72px",
        }}
      >
        {/* Hello Friend */}
        <motion.h1
          variants={fadeItem}
          custom={0}
          className="font-montserrat font-extrabold text-center"
          style={{
            width: "442px",
            height: "59px",
            fontSize: "48px",
            lineHeight: "100%",
          }}
        >
          Hello, Friend!
        </motion.h1>

        {/* Sign in text */}
        <motion.p
          variants={fadeItem}
          custom={1}
          className="text-center"
          style={{
            width: "540px",
            height: "108px",
            fontFamily: "Poppins",
            fontWeight: 400,
            fontSize: "24px",
            marginTop: "20px",
          }}
        >
          Sign in to continue your personalized journey with{" "}
          <span style={{ fontWeight: 800 }}>AIDE</span>
        </motion.p>

        {/* Your Email Input */}
        <motion.div
          variants={fadeItem}
          custom={2}
          className="relative mt-10"
          style={{
            width: "465px",
            height: "83px",
            top: "557px",
            left: "0px",
          }}
        >
          <Input
            type="email"
            placeholder="Your Email"
            className="h-full w-full border border-[#DF1516] text-[22px] px-4 rounded-none"
            value={signInEmail}
            onChange={(e) => setSignInEmail(e.target.value)}
          />
        </motion.div>

        {/* Password */}
        <motion.div
          variants={fadeItem}
          custom={3}
          className="relative flex"
          style={{
            width: "465px",
            top: "664px",
          }}
        >
          <Input
            type="password"
            placeholder="Password"
            className="h-[83px] w-[339px] border border-[#DF1516] px-4 text-[22px] rounded-none"
            value={signInPassword}
            onChange={(e) => setSignInPassword(e.target.value)}
          />
          <Button
            type="submit"
            className="h-[83px] w-[161px] bg-[#DF1516] text-white text-[24px] font-bold rounded-none"
          >
            Sign In
          </Button>
        </motion.div>
      </motion.div>

      {/* RIGHT PANEL - Sign Up */}
      <motion.div
        ref={rightRef}
        variants={sectionVariants}
        initial="hidden"
        animate={rightControls}
        className="absolute bg-[#DF1516]"
        style={{
          width: "812px",
          height: "982px",
          left: "700px",
          top: 0,
          paddingTop: "185px",
          paddingLeft: "53px",
        }}
      >
        {/* Create an Account */}
        <motion.h2
          variants={fadeItem}
          custom={0}
          className="text-white font-montserrat font-extrabold text-center"
          style={{
            width: "570px",
            height: "59px",
            fontSize: "48px",
            lineHeight: "100%",
            marginBottom: "50px",
          }}
        >
          Create an Account
        </motion.h2>

        {/* Google Sign In */}
        <motion.div
          variants={fadeItem}
          custom={1}
          className="flex"
          style={{ marginBottom: "20px" }}
        >
          <div
            className="flex items-center justify-center border border-[#DF1516]"
            style={{ width: "97px", height: "83px" }}
          >
            <FcGoogle size={60} />
          </div>
          <div
            className="flex items-center justify-center text-[#DF1516] border border-white font-bold text-[24px]"
            style={{ width: "372px", height: "83px" }}
          >
            Continue With Google
          </div>
        </motion.div>

        {/* Or use email */}
        <p
          className="text-white text-[24px]"
          style={{ marginBottom: "20px", textAlign: "center" }}
        >
          or use your Email for registration
        </p>

        {/* Sign Up Form */}
        <motion.div variants={fadeItem} custom={2} className="flex flex-col gap-6">
          <div className="flex gap-6">
            <Input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="h-[83px] w-[283px] border border-[#F3C17E] rounded-none px-4 text-[22px]"
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
              className="h-[83px] w-[283px] border border-[#F3C17E] rounded-none px-4 text-[22px]"
            />
          </div>

          <Input
            type="password"
            placeholder="Password"
            value={signUpPassword}
            onChange={(e) => setSignUpPassword(e.target.value)}
            className="h-[83px] border border-[#F3C17E] rounded-none px-4 text-[22px]"
          />

          <Button
            type="submit"
            className="h-[83px] w-[603px] bg-[#F3C17E] text-[#DF1516] font-bold rounded-none text-[24px]"
          >
            Sign Up
          </Button>
        </motion.div>
      </motion.div>
    </ResponsiveCanvas>
  );
}
