import zod from "zod";

export const PersonalInformationSchema = zod.object({
  firstName: zod
    .string()
    .regex(/^[A-Za-z]+$/, {
      message: "Only alphabetic characters are allowed",
    })
    .min(2, { message: "First name must not be less than 2 characters" })
    .max(50, { message: "First name must not exceed 50 characters" })
    .optional()
    .or(zod.literal("")),
  lastName: zod
    .string()
    .regex(/^[A-Za-z]+$/, {
      message: "Only alphabetic characters are allowed",
    })
    .min(2, { message: "Last name must not be less than 2 characters" })
    .max(50, { message: "Last name must not exceed 50 characters" })
    .optional()
    .or(zod.literal("")),
  gender: zod.enum(["Male", "Female", "Rather not say"]),
});

export type personalInformationSchema = zod.infer<
  typeof PersonalInformationSchema
>;
