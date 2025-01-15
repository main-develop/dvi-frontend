import zod from "zod";

export const ChangePasswordSchema = zod.object({
  newPassword: zod
    .string()
    .min(8, {
      message: "Password must contain at least 8 characters",
    })
    .max(128, { message: "Password must not exceed 128 characters" })
    .regex(/^[A-Za-z0-9!@#$%^&*()_+=\-{}[\]:;"'<>,.?/\\|~`]+$/, {
      message: "Password contains invalid characters",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/\d/, { message: "Password must contain at least one digit" })
    .regex(/[@!#$%^&*(),.?":{}|<>]/, {
      message: "Password must contain at least one special character",
    }),
  oldPassword: zod.string().min(1, { message: "This field is required" }),
});

export type changePasswordSchema = zod.infer<typeof ChangePasswordSchema>;

export const changePasswordFields: Array<{
  id: keyof changePasswordSchema;
  type: string;
  label: string;
}> = [
  { id: "newPassword", type: "password", label: "New password" },
  {
    id: "oldPassword",
    type: "password",
    label: "Confirm with the current password",
  },
];
