import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { useEffect } from "react";

type InputFieldProperties<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  type: string;
  id: Path<TFieldValues>;
  label: string;
  defaultValue?: PathValue<TFieldValues, Path<TFieldValues>>;
  message?: string;
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
  const errorMessage =
    form.formState.errors[id]?.message ||
    (message === getMessage(id) ? message : null);

  useEffect(() => {
    if (defaultValue !== undefined && form.watch(id) !== defaultValue) {
      form.setValue(id, defaultValue);
    }
  }, [defaultValue, form, id]);

  return (
    <div className="form-group">
      <input
        {...form.register(id)}
        type={type}
        id={id}
        className={`border border-solid rounded-md outline-none ${form.watch(id) ? "filled" : ""} ${className ? className : ""}`}
      />
      {errorMessage && (
        <p
          className={`text-[13px] text-red-800 ${className?.includes("authentication") && id.includes("Name") ? "w-[140px]" : ""}`}
        >
          {errorMessage as string}
        </p>
      )}
      <label htmlFor={id} className="select-none">
        {label}
      </label>
    </div>
  );
};
