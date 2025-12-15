import { Button } from "@/components/ui/button";

export default function Assessment() {
  const userName = "Name"; // replace later with real user data

  return (
    <div className="min-h-screen bg-[#DF1516] flex">
      {/* MAIN CONTENT */}
      <main className="flex-1 ml-64 pt-[120px]">
        <div className="relative w-full">

          {/* Your Weekly AIDE Assessment */}
          <div
            className="bg-white mx-auto flex items-center justify-center"
            style={{
              width: 995,
              height: 111,
              borderRadius: 17,
              boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
            }}
          >
            <p
              style={{
                fontFamily: "Arial",
                fontSize: 45,
                fontWeight: 400,
                lineHeight: "100%",
              }}
            >
              Your Weekly AIDE Assessment,{" "}
              <span className="text-[#DF1516]">{userName}!</span>
            </p>
          </div>

          {/* Ready to take your AIDE Assessment */}
          <div
            className="bg-white mx-auto mt-[32px] flex flex-col items-center justify-center"
            style={{
              width: 995,
              height: 401,
              boxShadow: "0px 4px 4px rgba(0,0,0,0.25)",
            }}
          >
            <h1
              className="text-center"
              style={{
                fontFamily: "Arial",
                fontSize: 48,
                fontWeight: 400,
                lineHeight: "100%",
                width: 699,
              }}
            >
              Ready to take your AIDE Assessment?
            </h1>

            <p
              className="mt-6 text-center"
              style={{
                fontFamily: "Montserrat",
                fontSize: 28,
                fontWeight: 400,
                lineHeight: "100%",
                width: 767,
              }}
            >
              This assessment takes less than 5 minutes and helps us personalize
              your growth experience.
            </p>

            <Button
              className="mt-8 bg-[#DF1516] hover:bg-[#c01314]"
              style={{
                width: 257,
                height: 52,
                borderRadius: 17,
                fontFamily: "Montserrat",
                fontSize: 20,
                fontWeight: 500,
              }}
            >
              Take Assessment
            </Button>
          </div>

          {/* Quick Tips */}
          <div
            className="mx-auto mt-[60px] flex flex-col justify-center px-10"
            style={{
              width: 995,
              height: 208,
              border: "2px solid #F3C17E",
            }}
          >
            <h2
              style={{
                fontFamily: "Montserrat",
                fontSize: 26,
                fontWeight: 700,
                lineHeight: "100%",
              }}
            >
              Quick Tips
            </h2>

            <ul
              className="mt-6 space-y-2"
              style={{
                fontFamily: "Montserrat",
                fontSize: 20,
                fontWeight: 500,
                lineHeight: "32px",
              }}
            >
              <li>• Start your day with clarity.</li>
              <li>• Break goals into smaller steps.</li>
              <li>• Review wins weekly.</li>
            </ul>
          </div>

        </div>
      </main>
    </div>
  );
}
