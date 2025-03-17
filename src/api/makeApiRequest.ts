import crypto from "crypto";

const SECRET_KEY = process.env.SECRET_KEY;

function generate_signature(payload: Record<string, unknown> | null) {
  if (SECRET_KEY && payload) {
    return crypto
      .createHmac("sha256", SECRET_KEY)
      .update(JSON.stringify(payload))
      .digest("hex");
  }
}

export async function makeApiRequest<
  TResponse extends Record<string, unknown> | undefined,
>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body: Record<string, unknown> | null,
  accessToken?: string
): Promise<{
  success: boolean;
  message: string;
  type:
    | "validationError"
    | "serverError"
    | "unexpectedError"
    | "successResponse";
  data?: TResponse;
}> {
  try {
    const signature = generate_signature(body);

    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
        ...(signature && { "X-Signature": signature }),
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
      body: body ? JSON.stringify(body) : null,
    });

    const responseData = await response.json().catch(() => null);

    //TODO: Handle 5xx errors separately to provide more specific feedback.
    if ([200, 201].includes(response.status)) {
      return {
        success: true,
        message: responseData.message,
        type: "successResponse",
        data: responseData as TResponse,
      };
    } else {
      return {
        success: false,
        message: responseData.message || "Unexpected error occurred",
        type: [400, 401, 403].includes(response.status)
          ? "validationError"
          : "unexpectedError",
      };
    }
  } catch {
    return {
      success: false,
      type: "serverError",
      message: "The server is unavailable or there is no internet connection.",
    };
  }
}
