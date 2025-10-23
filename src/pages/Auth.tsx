import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import aideLogo from "@/assets/aide-logo.png";
import { supabase } from "@/integrations/supabase/client";

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signInEmail || !signInPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: signInEmail,
      password: signInPassword,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Signed in successfully!");
    navigate("/dashboard");
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpEmail || !signUpPassword || !fullName) {
      toast.error("Please fill in all fields");
      return;
    }

    const [firstName, ...lastNameParts] = fullName.trim().split(" ");
    const lastName = lastNameParts.join(" ");

    const { error } = await supabase.auth.signUp({
      email: signUpEmail,
      password: signUpPassword,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Account created successfully!");
    navigate("/dashboard");
  };

  const handleGoogleAuth = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`,
      },
    });

    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Sign In */}
      <div className="hidden md:flex md:w-1/2 bg-background flex-col justify-center px-16 relative">
        <div className="absolute top-8 left-8">
          <img src={aideLogo} alt="AIDE Logo" className="h-16" />
        </div>
        
        <div className="max-w-md">
          <h2 className="text-5xl font-bold mb-6 text-primary">Hello, Friend!</h2>
          <p className="text-xl mb-12 leading-relaxed text-foreground">
            Sign in to continue your personalized journey with <span className="font-bold">AIDE</span>—where mindset mastery meets business growth.
          </p>

          <form onSubmit={handleSignIn} className="space-y-6">
            <Input
              type="email"
              placeholder="Your Email"
              value={signInEmail}
              onChange={(e) => setSignInEmail(e.target.value)}
              className="bg-background border-2 border-primary text-primary placeholder:text-primary/50 h-14 text-lg rounded-full px-6"
            />
            <div className="flex gap-4">
              <Input
                type="password"
                placeholder="Password"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
                className="bg-background border-2 border-primary text-primary placeholder:text-primary/50 h-14 text-lg rounded-full px-6 flex-1"
              />
              <Button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-10 text-lg font-bold rounded-full uppercase"
              >
                Sign In
              </Button>
            </div>
            <button
              type="button"
              className="text-foreground hover:underline text-sm"
            >
              Forgot Password
            </button>
          </form>
        </div>
      </div>

      {/* Right Panel - Sign Up */}
      <div className="w-full md:w-1/2 bg-primary flex flex-col justify-center px-8 md:px-16">
        <div className="max-w-md mx-auto w-full">
          <h2 className="text-5xl font-bold text-primary-foreground mb-12 text-center">
            Create an Account
          </h2>

          <Button
            onClick={handleGoogleAuth}
            className="w-full bg-primary-foreground hover:bg-primary-foreground/90 text-primary h-16 text-lg font-bold rounded-full mb-8 flex items-center justify-center gap-3"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue With Google
          </Button>

          <p className="text-center text-primary-foreground/80 mb-8">
            or use your Email for registration
          </p>

          <form onSubmit={handleSignUp} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-primary-foreground border-none text-foreground h-14 text-lg rounded-full px-6 placeholder:text-muted-foreground"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
                className="bg-primary-foreground border-none text-foreground h-14 text-lg rounded-full px-6 placeholder:text-muted-foreground"
              />
            </div>
            <Input
              type="password"
              placeholder="Password"
              value={signUpPassword}
              onChange={(e) => setSignUpPassword(e.target.value)}
              className="bg-primary-foreground border-none text-foreground h-14 text-lg rounded-full px-6 placeholder:text-muted-foreground"
            />
            <Button
              type="submit"
              className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 h-16 text-xl font-bold rounded-full uppercase"
            >
              Sign Up
            </Button>
          </form>
        </div>
      </div>

      {/* Mobile Sign In Section */}
      <div className="md:hidden w-full bg-background p-8">
        <img src={aideLogo} alt="AIDE Logo" className="h-12 mb-8" />
        <h2 className="text-3xl font-bold mb-4 text-primary">Hello, Friend!</h2>
        <p className="text-lg mb-8 text-foreground">
          Sign in to continue your personalized journey with <span className="font-bold">AIDE</span>
        </p>
        <form onSubmit={handleSignIn} className="space-y-4">
          <Input
            type="email"
            placeholder="Your Email"
            value={signInEmail}
            onChange={(e) => setSignInEmail(e.target.value)}
            className="bg-background border-2 border-primary text-primary placeholder:text-primary/50 h-12 rounded-full"
          />
          <Input
            type="password"
            placeholder="Password"
            value={signInPassword}
            onChange={(e) => setSignInPassword(e.target.value)}
            className="bg-background border-2 border-primary text-primary placeholder:text-primary/50 h-12 rounded-full"
          />
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 font-bold rounded-full"
          >
            SIGN IN
          </Button>
        </form>
      </div>
    </div>
  );
}
