import zod from "zod";

export const LogInSchema = zod.object({
  email: zod.string().min(1, { message: "This field is required" }).email(),
  password: zod.string().min(1, { message: "This field is required" }),
  rememberMe: zod.boolean().optional().default(false),
});

export type logInSchema = zod.infer<typeof LogInSchema>;

export const logInFields: Array<{
  type: string;
  id: keyof logInSchema;
  label: string;
}> = [
  { type: "text", id: "email", label: "Email address" },
  { type: "password", id: "password", label: "Password" },
];
