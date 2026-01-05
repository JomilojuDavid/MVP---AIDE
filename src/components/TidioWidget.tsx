import { useEffect } from "react";

declare global {
  interface Window {
    tidioChatApi?: {
      open: () => void;
      hide: () => void;
      show: () => void;
      on: (event: string, callback: () => void) => void;
    };
  }
}

const TIDIO_PUBLIC_KEY = "mssrvvupqgrdzi78bgqqx6hqrsnncijw";

export const TidioWidget = () => {
  useEffect(() => {
    // Check if script already exists
    if (document.getElementById("tidio-script")) return;

    const script = document.createElement("script");
    script.id = "tidio-script";
    script.src = `//code.tidio.co/${TIDIO_PUBLIC_KEY}.js`;
    script.async = true;
    document.body.appendChild(script);

    // Hide the default Tidio bubble on load
    const onTidioChatApiReady = () => {
      if (window.tidioChatApi) {
        window.tidioChatApi.hide();
      }
    };

    if (window.tidioChatApi) {
      window.tidioChatApi.on("ready", onTidioChatApiReady);
    } else {
      document.addEventListener("tidioChat-ready", onTidioChatApiReady);
    }

    return () => {
      document.removeEventListener("tidioChat-ready", onTidioChatApiReady);
    };
  }, []);

  return null;
};

export const openTidioChat = () => {
  if (window.tidioChatApi) {
    window.tidioChatApi.show();
    window.tidioChatApi.open();
  }
};
