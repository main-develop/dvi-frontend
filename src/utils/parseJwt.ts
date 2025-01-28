export function parseJwt(accessToken: string | undefined) {
  try {
    if (accessToken) {
      const base64Payload = accessToken.split(".")[1];
      const jsonPayload = Buffer.from(base64Payload, "base64").toString();

      return JSON.parse(jsonPayload);
    } else return null;
  } catch {
    return null;
  }
}
