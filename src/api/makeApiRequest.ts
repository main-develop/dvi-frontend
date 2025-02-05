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
    const response = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json",
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
