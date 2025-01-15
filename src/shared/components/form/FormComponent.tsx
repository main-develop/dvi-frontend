import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import zod from "zod";

export type Response = {
  message: string;
  success: boolean;
  type:
    | "validationError"
    | "serverError"
    | "unexpectedError"
    | "successResponse";
  data?: Record<string, unknown>;
  user?: Record<string, unknown>;
  expires?: string | undefined;
};

type FormComponentProperties<TSchema extends zod.ZodTypeAny> = {
  schema: TSchema;
  defaultValues: zod.infer<TSchema>;
  onSubmit: (data: zod.infer<TSchema>) => Promise<Response>;
  children: (
    form: UseFormReturn<zod.infer<TSchema>>,
    response: Response | undefined,
    isLoading: boolean
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
  const [response, setResponse] = useState<Response | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<zod.infer<TSchema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleSubmit = async (data: zod.infer<TSchema>) => {
    setResponse(undefined);
    setIsLoading(true);

    const response = await onSubmit(data);

    if (response.success && formName !== "personalInformation") {
      form.reset();
    }

    setResponse(response);
    setIsLoading(false);
  };

  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      {children(form, response, isLoading)}
    </form>
  );
};
