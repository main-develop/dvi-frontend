import zod from "zod";

export const SignUpSchema = zod
  .object({
    firstName: zod
      .string()
      .regex(/^[A-Za-z]+$/, {
        message: "Only alphabetic characters are allowed.",
      })
      .min(2, { message: "First name must not be less than 2 characters." })
      .max(50, { message: "First name must not exceed 50 characters." })
      .optional()
      .or(zod.literal("")),
    lastName: zod
      .string()
      .regex(/^[A-Za-z]+$/, {
        message: "Only alphabetic characters are allowed.",
      })
      .min(2, { message: "Last name must not be less than 2 characters." })
      .max(50, { message: "Last name must not exceed 50 characters." })
      .optional()
      .or(zod.literal("")),
    email: zod
      .string()
      .min(1, { message: "This field is required." })
      .email({ message: "Invalid email." }),
    password: zod
      .string()
      .min(8, {
        message: "Password must contain at least 8 characters.",
      })
      .max(128, { message: "Password must not exceed 128 characters." })
      .regex(/^[A-Za-z0-9!@#$%^&*()_+=\-{}[\]:;"'<>,.?/\\|~`]+$/, {
        message: "Password contains invalid characters.",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/\d/, { message: "Password must contain at least one digit." })
      .regex(/[@!#$%^&*(),.?":{}|<>]/, {
        message: "Password must contain at least one special character.",
      }),
    confirmPassword: zod.string(),
    gender: zod.enum(["Male", "Female", "Rather not say"]),
  })
  .refine((data) => data.password.trim() === data.confirmPassword.trim(), {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export type signUpSchema = zod.infer<typeof SignUpSchema>;
