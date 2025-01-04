import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { Message } from "./FormComponent";
import { useEffect } from "react";

type InputFieldProperties<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  type: string;
  id: Path<TFieldValues>;
  label: string;
  defaultValue?: PathValue<TFieldValues, Path<TFieldValues>>;
  message?: Message;
  className?: string;
};

const getMessage = (id: string) => {
  const messages: Record<string, string> = {
    email: "This email address is already taken",
    password: "Invalid password",
    oldPassword: "Invalid password",
  };
  return messages[id] || null;
};

export const InputField = <TFieldValues extends FieldValues>({
  form,
  type,
  id,
  label,
  defaultValue,
  message,
  className,
}: InputFieldProperties<TFieldValues>): React.JSX.Element => {
  const fieldError = form.formState.errors[id];

  useEffect(() => {
    if (defaultValue !== undefined) {
      form.setValue(id, defaultValue);
    }
  }, [defaultValue, form, id]);

  return (
    <div className="form-group">
      <input
        {...form.register(id)}
        type={type}
        id={id}
        className={`${form.watch(id) ? "filled" : ""} ${className ? className : "border border-solid rounded-md outline-none w-[260px]"}`}
      />
      {fieldError ? (
        <p className="text-[13px] text-red-800 w-[136px] sm:w-[100%]">
          {fieldError.message as string}
        </p>
      ) : message?.message === getMessage(id as string) ? (
        <p className="text-[13px] text-red-800 w-[136px] sm:w-[100%]">
          {message.message}
        </p>
      ) : null}
      <label htmlFor={id} className="select-none">
        {label}
      </label>
    </div>
  );
};
