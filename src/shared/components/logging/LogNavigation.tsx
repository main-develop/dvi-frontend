"use client";

import { makeLog } from "@/utils/logging/makeLog";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { sendLogRequest } from "@/api/log-requests/sendLogRequest";

export const LogNavigation = (): null => {
  const pathname = usePathname();
  const startTime = new Date().getTime();

  useEffect(() => {
    const sendLog = () => {
      const timeSpentInSeconds = (new Date().getTime() - startTime) / 1000;
      const logAttributes = {
        referrer: document.referrer,
        user_agent: navigator.userAgent,
        page: pathname,
        time_spent_s: timeSpentInSeconds,
      };

      const log = makeLog("INFO", "page_navigation", logAttributes);

      sendLogRequest(JSON.parse(log));
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
