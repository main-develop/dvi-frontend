import { useEffect, useState } from "react";
import ArrowIcon from "@/shared/assets/icons/arrow.svg";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

type GenderSelectProperties<TFieldValues extends FieldValues> = {
  form: UseFormReturn<TFieldValues>;
  defaultValue?: PathValue<TFieldValues, Path<TFieldValues>>;
};

const genderOptions = [
  { value: "Rather not say", id: "ratherNotSay" },
  { value: "Male", id: "male" },
  { value: "Female", id: "female" },
];

export const GenderSelect = <TFieldValues extends FieldValues>({
  form,
  defaultValue,
}: GenderSelectProperties<TFieldValues>): React.JSX.Element => {
  const [selectedOption, setSelectedOption] = useState("Gender");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (defaultValue !== undefined) {
      form.setValue("gender" as Path<TFieldValues>, defaultValue);
      setSelectedOption(defaultValue as string);
    }
  }, [defaultValue, form]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className="relative select mt-4 items-center justify-between w-[260px] cursor-pointer">
      <div className="selected flex justify-between items-center relative h-11 border border-solid rounded-md outline-none">
        {selectedOption === "Gender" ? (
          <label className="overflow-clip text-sm text-[#62666e] select-none">
            {selectedOption}
          </label>
        ) : (
          <label className="overflow-clip text-sm select-none">
            {selectedOption}
          </label>
        )}
        <ArrowIcon
          className={`relative arrow ${isOpen ? "rotate-0" : "-rotate-90"}`}
        ></ArrowIcon>
      </div>
      <div className="options absolute z-10 flex flex-col border border-solid rounded-md outline-none overflow-hidden opacity-0 w-[100%]">
        {genderOptions.map((option) => (
          <div key={option.id} onClick={() => handleOptionSelect(option.value)}>
            <input
              {...form.register("gender" as Path<TFieldValues>)}
              type="radio"
              value={option.value}
              id={option.id}
              className="hidden"
            />
            <label
              className="option inline-block cursor-pointer p-[5px] w-[100%] select-none"
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
