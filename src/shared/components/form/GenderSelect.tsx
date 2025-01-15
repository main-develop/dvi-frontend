import { useEffect, useState } from "react";
import ArrowIcon from "@/shared/assets/icons/arrow.svg";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

type GenderSelectProperties<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  defaultValue?: PathValue<TFieldValues, Path<TFieldValues>>;
  className?: string;
};

const genderOptions = [
  { value: "Rather not say", id: "ratherNotSay" },
  { value: "Male", id: "male" },
  { value: "Female", id: "female" },
];

export const GenderSelect = <TFieldValues extends FieldValues>({
  form,
  defaultValue,
  className,
}: GenderSelectProperties<TFieldValues>): React.JSX.Element => {
  const [selectedOption, setSelectedOption] = useState("Gender");

  useEffect(() => {
    if (defaultValue !== undefined) {
      form.setValue("gender" as Path<TFieldValues>, defaultValue);
      setSelectedOption(defaultValue as string);
    }
  }, [defaultValue, form]);

  return (
    <div
      className={`relative items-center justify-between gender-select cursor-pointer ${className ? className : ""}`}
    >
      <div className="relative flex items-center justify-between selected border border-solid rounded-md outline-none">
        <label
          className={`overflow-clip select-none cursor-pointer ${selectedOption === "Gender" ? "text-[#62666e]" : ""}`}
        >
          {selectedOption}
        </label>
        <ArrowIcon className="relative arrow"></ArrowIcon>
      </div>
      <div className="absolute flex flex-col overflow-hidden w-[100%] z-10 options opacity-0 border border-solid rounded-md outline-none">
        {genderOptions.map((option) => (
          <div key={option.id} onClick={() => setSelectedOption(option.value)}>
            <input
              {...form.register("gender" as Path<TFieldValues>)}
              type="radio"
              value={option.value}
              id={option.id}
              className="hidden"
            />
            <label
              className="inline-block w-[100%] p-[5px] option select-none cursor-pointer"
              htmlFor={option.id}
            >
              {option.value}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
