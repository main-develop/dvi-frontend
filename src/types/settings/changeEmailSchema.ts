import zod from "zod";

export const ChangeEmailSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: "This field is required" })
    .email({ message: "Invalid email" }),
  password: zod.string().min(1, { message: "This field is required" }),
});

export type changeEmailSchema = zod.infer<typeof ChangeEmailSchema>;
