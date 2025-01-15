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

    if ([200, 201].includes(response.status)) {
      return {
        success: true,
        message: responseData.message,
        type: "successResponse",
        data: responseData as TResponse,
      };
    } else if ([400, 401, 403].includes(response.status)) {
      return {
        success: false,
        message: responseData.message,
        type: "validationError",
      };
    } else {
      return {
        success: false,
        message: "Unexpected error occurred",
        type: "unexpectedError",
      };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.cause : "";
    console.log(`Error during ${method} request to API:\n`, errorMessage);

    return {
      success: false,
      type: "serverError",
      message: "The server is unavailable or there is no internet connection.",
    };
  }
}
