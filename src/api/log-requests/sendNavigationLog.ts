"use server";

import { makeApiRequest } from "../makeApiRequest";

export async function sendNavigationLog(log: Record<string, unknown>) {
  const sentAt = new Date().toISOString();
  log.sent_at = sentAt;

  return makeApiRequest<undefined>(
    `${process.env.API_SEND_NAVIGATION_LOG_URL}`,
    "POST",
    log
  );
}
