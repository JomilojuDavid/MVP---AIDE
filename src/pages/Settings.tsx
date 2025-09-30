import { Sidebar } from "@/components/Sidebar";

export default function Settings() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar showTasksAndResources />
      
      <main className="flex-1 md:ml-64 p-8 md:p-12">
        <div className="max-w-5xl mx-auto">
          <div className="bg-primary text-primary-foreground rounded-3xl p-8 md:p-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Settings</h1>
            <p className="text-xl">Manage your account preferences and settings.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
