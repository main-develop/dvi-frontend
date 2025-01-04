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
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}
