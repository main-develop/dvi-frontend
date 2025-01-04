import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import zod from "zod";

export type Message = {
  message: string;
  success: boolean;
};

type FormComponentProperties<TSchema extends zod.ZodTypeAny> = {
  schema: TSchema;
  defaultValues: zod.infer<TSchema>;
  onSubmit: (data: zod.infer<TSchema>) => Promise<Message>;
  children: (
    form: UseFormReturn<zod.infer<TSchema>>,
    message: Message | undefined
  ) => React.ReactNode;
  formName?: string;
};

export const FormComponent = <TSchema extends zod.ZodTypeAny>({
  schema,
  onSubmit,
  defaultValues,
  children,
  formName,
}: FormComponentProperties<TSchema>): React.JSX.Element => {
  const [message, setMessage] = useState<Message | undefined>(undefined);

  const form = useForm<zod.infer<TSchema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit = async (data: zod.infer<TSchema>) => {
    setMessage(undefined);

    const response = await onSubmit(data);

    if (response.success && formName !== "personalInformation") {
      form.reset();
    }

    setMessage(response);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      {children(form, message)}
    </form>
  );
};
