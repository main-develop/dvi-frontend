import { sendLogRequest } from "@/api/log-requests/sendLogRequest";
import { makeLog } from "./makeLog";
import { Response } from "@/shared/components/form/FormComponent";
import { parseJwt } from "../parseJwt";
import { getCookie } from "../getCookie";

export const logAuthenticationAction = (
  eventType: "sign_up" | "log_in" | "log_out",
  response: Response,
  accessToken?: string
) => {
  const logAttributes: Record<string, unknown> = {
    user_id: "",
    success: response.success,
    ...(response.success === false && { message: response.message }),
  };

  if (["log_in", "log_out"].includes(eventType)) {
    const currentAccessToken = accessToken || getCookie("accessToken");
    const userId = parseJwt(currentAccessToken)?.sub;

    logAttributes.user_id = userId || "";
  }

  const log = makeLog(eventType, logAttributes);
  sendLogRequest(JSON.parse(log));
};
