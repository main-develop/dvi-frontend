import zod from "zod";

export const DeleteAccountSchema = zod.object({
  password: zod.string().min(1, { message: "This field is required" }),
});

export type deleteAccountSchema = zod.infer<typeof DeleteAccountSchema>;
