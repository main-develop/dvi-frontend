"use server";

export async function handleLogOut(accessToken: string | null) {
  try {
    const response = await fetch(`${process.env.API_LOGOUT_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (response.status === 200) {
      const responseMessage = await response.json();
      console.log(responseMessage.message);

      return { success: true };
    } else {
      console.log("Failed to log out:", response.status);
      return { success: false };
    }
  } catch (error) {
    console.log("An error occurred:", error);

    return { success: false };
  }
}
