import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function Settings() {
  return (
    <div className="flex min-h-screen bg-primary relative">
      <Sidebar showTasksAndResources />
      <TopBar />

      {/* MAIN CONTENT */}
      <main className="flex-1 md:ml-64 pt-28 px-8 md:px-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-8 md:p-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              Account Settings
            </h1>
            <p className="text-xl text-black/70">
              Manage your preferences, notifications, and account information.
            </p>
          </motion.div>

          {/* Settings Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-3xl p-8 md:p-12"
          >
            <p className="text-xl text-foreground mb-8">
              Update your email, password, or notification settings below.
            </p>

            <Button className="bg-primary text-white hover:bg-primary/90 h-14 px-10 font-bold rounded-full">
              Update Settings
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
