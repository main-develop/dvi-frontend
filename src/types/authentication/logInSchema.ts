import zod from "zod";

export const LogInSchema = zod.object({
  email: zod.string().min(1, { message: "This field is required." }).email(),
  password: zod.string().min(1, { message: "This field is required." }),
});

export type logInSchema = zod.infer<typeof LogInSchema>;
