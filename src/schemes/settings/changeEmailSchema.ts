import zod from "zod";

export const ChangeEmailSchema = zod.object({
  email: zod
    .string()
    .min(1, { message: "This field is required" })
    .email({ message: "Invalid email" }),
  password: zod.string().min(1, { message: "This field is required" }),
});

export type changeEmailSchema = zod.infer<typeof ChangeEmailSchema>;

export const changeEmailFields: Array<{
  id: keyof changeEmailSchema;
  type: string;
  label: string;
}> = [
  { id: "email", type: "text", label: "New email" },
  {
    id: "password",
    type: "password",
    label: "Confirm with the current password",
  },
];
