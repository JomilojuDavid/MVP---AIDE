import React, { useEffect, useState } from "react";
import { supabase } from "@/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const Auth = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showReset, setShowReset] = useState(false); // ✅ Forgot password view toggle
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  const [resetEmail, setResetEmail] = useState("");

  // ✅ Friendly error handler
  const getFriendlyError = (message: string) => {
    if (message.includes("Invalid login credentials"))
      return "Incorrect email or password.";
    if (message.includes("User already registered"))
      return "This email is already registered.";
    if (message.includes("Email not confirmed"))
      return "Please check your email and confirm your account.";
    return message;
  };

  // ✅ Auto redirect if already logged in
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user) {
        navigate("/dashboard");
      }
    };
    checkSession();

    // ✅ Persist session with onAuthStateChange
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          navigate("/dashboard");
        }
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [navigate]);

  // ✅ SIGN UP — create user + insert into profiles
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (signUpPassword.length < 6) {
        toast({
          title: "Weak password",
          description: "Password must be at least 6 characters long.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const nameParts = fullName.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      const { data, error } = await supabase.auth.signUp({
        email: signUpEmail,
        password: signUpPassword,
      });

      if (error) throw error;
      if (!data.user) {
        throw new Error("Sign up failed. Please check your email for verification.");
      }

      const { error: insertError } = await supabase.from("profiles").insert([
        {
          id: data.user.id,
          first_name: firstName,
          last_name: lastName,
          quiz_completed: false,
        },
      ]);

      if (insertError) throw insertError;

      toast({
        title: "Account created successfully!",
        description: "Redirecting to your quiz setup...",
      });

      navigate("/quiz-step2");
    } catch (error: any) {
      toast({
        title: "Sign Up Failed",
        description: getFriendlyError(error.message),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ SIGN IN — check quiz_completed, redirect accordingly
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: signInEmail,
        password: signInPassword,
      });

      if (error) throw error;
      if (!data.user) {
        throw new Error("Unable to sign in. Please try again.");
      }

      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("quiz_completed")
        .eq("id", data.user.id)
        .single();

      if (profileError) throw profileError;

      if (profile?.quiz_completed) {
        navigate("/dashboard");
      } else {
        navigate("/quiz-step2");
      }
    } catch (error: any) {
      toast({
        title: "Sign In Failed",
        description: getFriendlyError(error.message),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ Forgot password handler
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast({
        title: "Password Reset Email Sent",
        description: "Please check your inbox to continue.",
      });

      setShowReset(false);
      setResetEmail("");
    } catch (error: any) {
      toast({
        title: "Reset Failed",
        description: getFriendlyError(error.message),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen px-6 bg-gray-50">
      <div
        className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md transform scale-[0.9] sm:scale-[0.8] transition-all"
        style={{ transition: "transform 0.3s ease" }}
      >
        {/* ✅ Forgot Password View */}
        {showReset ? (
          <form onSubmit={handleResetPassword}>
            <h2 className="text-2xl font-bold mb-6">Reset Password</h2>

            <Input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
              className="mb-6"
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending reset link..." : "Send Reset Link"}
            </Button>

            <p className="text-center text-sm mt-4">
              Remembered your password?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setShowReset(false)}
              >
                Go back
              </span>
            </p>
          </form>
        ) : isLogin ? (
          // ✅ Login Form
          <form onSubmit={handleSignIn}>
            <h2 className="text-2xl font-bold mb-6">Welcome back</h2>

            <Input
              type="email"
              placeholder="Email"
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
              required
              className="mb-4"
            />

            <Input
              type="password"
              placeholder="Password"
              value={signInPassword}
              onChange={(e) => setSignInPassword(e.target.value)}
              required
              className="mb-2"
            />

            <div className="text-right text-sm mb-6">
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setShowReset(true)}
              >
                Forgot password?
              </span>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <p className="text-center text-sm mt-4">
              Don’t have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </span>
            </p>
          </form>
        ) : (
          // ✅ Sign Up Form
          <form onSubmit={handleSignUp}>
            <h2 className="text-2xl font-bold mb-6">Create an account</h2>

            <Input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="mb-4"
            />

            <Input
              type="email"
              placeholder="Email"
              value={signUpEmail}
              onChange={(e) => setSignUpEmail(e.target.value)}
              required
              className="mb-4"
            />

            <Input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
              required
              className="mb-6"
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Sign Up"}
            </Button>

            <p className="text-center text-sm mt-4">
              Already have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setIsLogin(true)}
              >
                Sign In
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
