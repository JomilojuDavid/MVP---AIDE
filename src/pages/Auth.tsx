import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FcGoogle } from "react-icons/fc";
import aideLogo from "@/assets/aide-logo.png";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const BASE_WIDTH = 1440;
const BASE_HEIGHT = 900;

export default function Auth() {
  const [fullName, setFullName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scale, setScale] = useState(1);

  const navigate = useNavigate();
  const { toast } = useToast();

  const leftControls = useAnimation();
  const rightControls = useAnimation();

  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  /* ---------- UNIFORM SCALING ---------- */
  useEffect(() => {
    const resize = () => {
      const scaleX = window.innerWidth / BASE_WIDTH;
      const scaleY = window.innerHeight / BASE_HEIGHT;
      setScale(Math.min(scaleX, scaleY));
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  /* ---------- AUTH LISTENER ---------- */
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN" && session?.user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("created_at")
          .eq("id", session.user.id)
          .single();

        const isNew =
          profile?.created_at &&
          Date.now() - new Date(profile.created_at).getTime() < 30000;

        navigate(isNew ? "/quiz-step2" : "/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  /* ---------- REMEMBER EMAIL ---------- */
  useEffect(() => {
    const saved = localStorage.getItem("rememberedEmail");
    if (saved) {
      setSignInEmail(saved);
      setRememberMe(true);
    }
  }, []);

  /* ---------- OBSERVER ---------- */
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target === leftRef.current)
              leftControls.start("visible");
            if (entry.target === rightRef.current)
              rightControls.start("visible");
          }
        });
      },
      { threshold: 0.2 }
    );

    leftRef.current && observer.observe(leftRef.current);
    rightRef.current && observer.observe(rightRef.current);

    return () => observer.disconnect();
  }, [leftControls, rightControls]);

  /* ---------- AUTH ACTIONS ---------- */
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: signInEmail,
        password: signInPassword,
      });

      if (error) throw error;

      rememberMe
        ? localStorage.setItem("rememberedEmail", signInEmail)
        : localStorage.removeItem("rememberedEmail");

      toast({ title: "Welcome back!" });
    } catch (err: any) {
      toast({ title: "Sign in failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const [first, ...rest] = fullName.trim().split(" ");

      const { error } = await supabase.auth.signUp({
        email: signUpEmail,
        password: signUpPassword,
        options: {
          data: { first_name: first, last_name: rest.join(" ") },
        },
      });

      if (error) throw error;
      toast({ title: "Account created!" });
    } catch (err: any) {
      toast({ title: "Sign up failed", description: err.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth` },
    });
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-white flex justify-center items-center">
      <div
        style={{
          width: BASE_WIDTH,
          height: BASE_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          position: "relative",
        }}
      >
        {/* LOGO */}
        <img
          src={aideLogo}
          className="h-16 absolute top-6 left-8 cursor-pointer z-50"
          onClick={() => navigate("/dashboard")}
        />

        <div className="flex w-full h-full">
          {/* LEFT */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, y: 80 }}
            animate={leftControls}
            className="w-[40%] flex flex-col items-center justify-center px-12"
          >
            {/* content unchanged */}
            {/* ... */}
          </motion.div>

          {/* RIGHT */}
          <motion.div
            ref={rightRef}
            initial={{ opacity: 0, y: 80 }}
            animate={rightControls}
            className="w-[60%] bg-[#DF1516] flex flex-col items-center justify-center px-16"
          >
            {/* content unchanged */}
            {/* ... */}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
