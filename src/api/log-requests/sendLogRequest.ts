"use server";

import { makeApiRequest } from "../makeApiRequest";

const apiUrls = [
  {
    eventType: "page_navigation",
    url: process.env.API_SEND_NAVIGATION_LOG_URL,
  },
  { eventType: "sign_up", url: process.env.API_SEND_SIGN_UP_LOG_URL },
  { eventType: "log_in", url: process.env.API_SEND_LOG_IN_LOG_URL },
  { eventType: "log_out", url: process.env.API_SEND_LOG_OUT_LOG_URL },
  {
    eventType: "change_personal_information",
    url: process.env.API_SEND_PERSONAL_INFORMATION_LOG_URL,
  },
  { eventType: "change_email", url: process.env.API_SEND_CHANGE_EMAIL_LOG_URL },
  {
    eventType: "change_password",
    url: process.env.API_SEND_CHANGE_PASSWORD_LOG_URL,
  },
  {
    eventType: "delete_account",
    url: process.env.API_SEND_DELETE_ACCOUNT_LOG_URL,
  },
];

export async function sendLogRequest(log: Record<string, unknown>) {
  const sentAt = new Date().toISOString();
  log.sent_at = sentAt;

  const apiUrl = apiUrls.find((a) => a.eventType === log.event_type)?.url;

  return makeApiRequest<undefined>(apiUrl as string, "POST", log);
}
