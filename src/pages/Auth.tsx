import React, { useState } from "react";
import { supabase } from "@/supabase/client";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const Auth = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [fullName, setFullName] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");

  // ✅ SIGN UP — create user + insert into profiles
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const nameParts = fullName.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      const { data, error } = await supabase.auth.signUp({
        email: signUpEmail,
        password: signUpPassword,
      });

      if (error) throw error;

      // ✅ Insert into profiles table
      await supabase.from("profiles").insert([
        {
          id: data.user?.id,
          first_name: firstName,
          last_name: lastName,
          quiz_completed: false,
        },
      ]);

      toast({
        title: "Account created successfully!",
        description: "Redirecting...",
      });

      navigate("/quiz-step2"); // ✅ Redirect new users to quiz
    } catch (error: any) {
      toast({
        title: "Sign Up Failed",
        description: error.message,
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

      // ✅ Fetch profile info
      const { data: profile } = await supabase
        .from("profiles")
        .select("quiz_completed")
        .eq("id", data.user?.id)
        .single();

      if (profile?.quiz_completed) {
        navigate("/dashboard"); // ✅ Completed quiz → Dashboard
      } else {
        navigate("/quiz-step2"); // ✅ Needs to take quiz
      }
    } catch (error: any) {
      toast({
        title: "Sign In Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen px-6 bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        {isLogin ? (
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
              className="mb-6"
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            <p className="text-center text-sm mt-4">
              Don't have an account?{" "}
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </span>
            </p>
          </form>
        ) : (
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
