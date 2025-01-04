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
      const responseToken = await response.json();
      const expires = formData.rememberMe
        ? new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toUTCString()
        : null;

      return {
        success: true,
        message: "",
        accessToken: responseToken.accessToken,
        expires: expires,
      };
    } else {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Network error or server not reachable.",
    };
  }
}
