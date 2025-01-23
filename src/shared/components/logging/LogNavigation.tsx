"use client";

import { sendNavigationLog } from "@/api/log-requests/sendNavigationLog";
import { makeLog } from "@/utils/logger";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const LogNavigation = (): null => {
  const pathname = usePathname();
  const startTime = new Date().getTime();

  useEffect(() => {
    const sendLog = () => {
      const timeSpentInSeconds = (new Date().getTime() - startTime) / 1000;
      const logAttributes = {
        referrer: document.referrer,
        user_agent: navigator.userAgent,
        time_spent_s: timeSpentInSeconds,
      };

      const log = makeLog("INFO", "page_navigation", pathname, logAttributes);

      sendNavigationLog(JSON.parse(log));
    };

    window.addEventListener("beforeunload", () => {
      setTimeout(sendLog, 0);
    });

    return () => {
      sendLog();
      window.removeEventListener("beforeunload", sendLog);
    };
  }, [pathname]);

  return null;
};
