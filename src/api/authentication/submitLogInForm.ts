"use server";

import { logInSchema } from "@/types/authentication/logInSchema";

export async function submitLogInForm(formData: logInSchema) {
  try {
    const response = await fetch(`${process.env.API_LOGIN_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      }),
    });

    if (response.status === 200) {
      console.log("Log in successful:", formData);

      const responseToken = await response.json();
      const expires = formData.rememberMe
        ? new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toUTCString()
        : null;

      return {
        success: true,
        status: response.status,
        accessToken: responseToken.accessToken,
        expires: expires,
      };
    } else {
      const responseError = await response.json();
      console.log(
        `Log in failed with status: ${response.status}. ${responseError.error}`
      );

      return {
        success: false,
        status: response.status,
        error: responseError.error,
      };
    }
  } catch (error) {
    console.log("An error occurred:", error);

    return {
      success: false,
      status: null,
      error: "Network error or server not reachable.",
    };
  }
}
