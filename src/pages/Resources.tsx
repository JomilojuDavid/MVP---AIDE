import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/* ===============================
   RESOURCE DATA
=============================== */
const resources = [
  {
    id: 1,
    title: "Mindset Reset Guide",
    description: "Download or explore to apply AIDE principles effectively.",
    variant: "secondary" as const,
  },
  {
    id: 2,
    title: "Business Growth Blueprint",
    description: "Download or explore to apply AIDE principles effectively.",
    variant: "white" as const,
  },
  {
    id: 3,
    title: "Execution Masterclass",
    description: "Download or explore to apply AIDE principles effectively.",
    variant: "secondary" as const,
  },
  {
    id: 4,
    title: "Leadership & Influence Playbook",
    description:
      "Develop leadership skills that help you inspire and influence people effectively.",
    variant: "white" as const,
  },
];

export default function ResourcesPage() {
  const [firstName, setFirstName] = useState("");

  /* ===============================
     AUTH
=============================== */
  useEffect(() => {
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return; // redirect handled in AppLayout

      const { data } = await supabase
        .from("profiles")
        .select("first_name")
        .eq("id", user.id)
        .single();

      if (data?.first_name) setFirstName(data.first_name);
    };

    fetchProfile();
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-start gap-8 px-6 sm:px-12 py-8">
      {/* ================= HEADER ================= */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-[1200px] bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col gap-4"
      >
        <h1 className="text-[4vw] sm:text-[45px] font-normal leading-tight">
          Here’s Your Resource Library,{" "}
          <span className="text-[#DF1516]">{firstName || "Name"}!</span>
        </h1>
        <p className="text-[1.2vw] sm:text-[18px]">
          Access your personalized materials to enhance your AIDE journey.
        </p>
      </motion.div>

      {/* ================= RESOURCE GRID ================= */}
      <div className="w-full max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-7">
        {resources.map((r) => (
          <div
            key={r.id}
            className={`flex flex-col justify-between rounded-2xl shadow-md p-6 sm:p-8`}
            style={{
              height: 214,
              backgroundColor: r.variant === "secondary" ? "#F6C888" : "#FFFFFF",
            }}
          >
            <div className="flex flex-col gap-2 sm:gap-3">
              <h3 className="text-[4vw] sm:text-[24px] font-medium">{r.title}</h3>
              <p className="text-[3.2vw] sm:text-[18px]">{r.description}</p>
            </div>
            <Button
              className="bg-[#DF1516] hover:bg-[#c01314] text-white rounded-[17px] px-6 sm:px-8 h-[44px] text-[3.5vw] sm:text-[20px]"
            >
              Access Now
            </Button>
          </div>
        ))}
      </div>

      {/* ================= QUICK TIPS ================= */}
      <div
        className="w-full max-w-[1200px] rounded-2xl p-6 sm:p-9 flex flex-col gap-4"
        style={{
          height: 208,
          border: "2px solid #F3C17E",
          color: "#000000",
        }}
      >
        <h3 className="text-[4vw] sm:text-[26px] font-bold">Quick Tips</h3>
        <ul className="text-[3.2vw] sm:text-[20px] leading-[32px] list-disc list-inside">
          <li>Start your day with clarity.</li>
          <li>Break goals into smaller steps.</li>
          <li>Review wins weekly.</li>
        </ul>
      </div>
    </div>
  );
}
