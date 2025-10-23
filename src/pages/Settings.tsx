import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Button } from "@/components/ui/button";

export default function Settings() {
  return (
    <div className="flex min-h-screen bg-primary relative">
      <Sidebar showTasksAndResources />
      <TopBar />
      
      <main className="flex-1 md:ml-64 p-8 md:p-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="bg-white rounded-3xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              Account Settings
            </h1>
            <p className="text-xl text-muted-foreground">
              Manage your preferences, notifications, and account information.
            </p>
          </div>

          {/* Settings Card */}
          <div className="bg-white rounded-3xl p-8 md:p-12">
            <p className="text-xl text-foreground mb-8">
              Update your email, password, or notification settings below.
            </p>
            <Button className="bg-primary text-white hover:bg-primary/90 h-14 px-10 font-bold rounded-full">
              Update Settings
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
