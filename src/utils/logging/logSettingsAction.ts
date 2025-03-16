import { Response } from "@/shared/components/form/FormComponent";
import zod from "zod";
import { makeLog } from "./makeLog";
import { sendLogRequest } from "@/api/log-requests/sendLogRequest";
import { getCookie } from "../getCookie";
import { parseJwt } from "../parseJwt";

export const logSettingsAction = <TSchema extends zod.ZodTypeAny>(
  eventType:
    | "change_personal_information"
    | "change_email"
    | "change_password"
    | "delete_account",
  response: Response,
  data: zod.infer<TSchema>,
  previousInfo?: zod.infer<TSchema>
) => {
  const accessToken = getCookie("accessToken");
  const userId = parseJwt(accessToken)?.sub;

  const previousInfoLength = previousInfo
    ? Object.keys(previousInfo).length
    : 0;

  const logDetails: Record<string, unknown> = {
    user_id: userId,
    success: response.success,
    ...(response.success === false && { message: response.message }),
  };

  if (eventType === "change_personal_information" && response.success) {
    if (previousInfoLength === 0) return;
    else {
      const changedFields = Object.keys(data).reduce(
        (acc, key) => {
          if (data[key] !== previousInfo?.[key]) {
            acc.new_info[key] = data[key];
            acc.previous_info[key] = previousInfo?.[key];
          }
          return acc;
        },
        { new_info: {}, previous_info: {} } as Record<
          string,
          Record<string, unknown>
        >
      );

      if (Object.keys(changedFields.new_info).length > 0) {
        Object.assign(logDetails, changedFields);
      } else return;
    }
  }

  if (eventType === "change_email" && response.success) {
    logDetails.new_email = data.email;
    logDetails.previous_email = previousInfo?.email;
  }

  const log = makeLog(eventType, logDetails);
  sendLogRequest(JSON.parse(log));
};
