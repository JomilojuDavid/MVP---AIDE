import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ResetPassword from "./pages/ResetPassword";
import Auth from "./pages/Auth";
import Quiz from "./pages/Quiz";
import QuizStep2 from "./pages/QuizStep2";
import Submission from "./pages/Submission";
import Dashboard from "./pages/Dashboard";
import Assessment from "./pages/Assessment";
import Settings from "./pages/Settings";
import Tasks from "./pages/Tasks";
import Resources from "./pages/Resources";
import Analytics from "./pages/Analytics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quiz-step-2" element={<QuizStep2 />} />
          <Route path="/submission" element={<Submission />} />
          <Route
            path="/dashboard"
            element={<Dashboard showQuizPrompt={true} />}
          />
          <Route
            path="/dashboard-full"
            element={<Dashboard showQuizPrompt={false} />}
          />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/analytics" element={<Analytics />} />
          {/* Keep all custom routes above the catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
