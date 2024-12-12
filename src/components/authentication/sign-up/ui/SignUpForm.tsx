"use client";

import { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  SignUpSchema,
  signUpSchema,
} from "@/types/authentication/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { submitSignUpForm } from "@/api/authentication/submitSignUpForm";

import ArrowIcon from "@/shared/assets/icons/arrow.svg";

const genderOptions = [
  { value: "Rather not say", id: "rather-not-say" },
  { value: "Male", id: "male" },
  { value: "Female", id: "female" },
];

export const SignUpForm = (): React.JSX.Element => {
  const router = useRouter();

  const form = useForm<signUpSchema>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "Rather not say",
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = form;

  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const emailValue = watch("email");
  useEffect(() => {
    if (errorMessage) {
      setErrorMessage(null);
    }
  }, [emailValue, errorMessage]);

  const onSubmit: SubmitHandler<signUpSchema> = async (data) => {
    const response = await submitSignUpForm(data);

    if (response.success) {
      router.push("/authentication/log-in");
    } else {
      setErrorMessage(response.error);
    }
  };

  const [selectedOption, setSelectedOption] = useState("Gender");
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
      <div className="flex flex-row justify-between space-x-2">
        <div className="input-group mt-1 text-sm">
          <div className="form-group">
            <input
              {...register("firstName")}
              type="text"
              id="first-name"
              onChange={(e) =>
                e.target.classList.toggle("filled", e.target.value !== "")
              }
              className="border border-solid rounded-md outline-none w-[136px] sm:w-[140px]"
            />
            <p className="text-[13px] text-red-800 w-[136px] sm:w-[100%]">
              {errors.firstName && errors.firstName.message}
            </p>
            <label htmlFor="first-name">First name</label>
          </div>
        </div>
        <div className="input-group mt-1 text-sm">
          <div className="form-group">
            <input
              {...register("lastName")}
              type="text"
              id="last-name"
              onChange={(e) =>
                e.target.classList.toggle("filled", e.target.value !== "")
              }
              className="border border-solid rounded-md outline-none w-[136px] sm:w-[140px]"
            />
            <p className="text-[13px] text-red-800 w-[136px] sm:w-[100%]">
              {errors.lastName && errors.lastName.message}
            </p>
            <label htmlFor="last-name">Last name</label>
          </div>
        </div>
      </div>
      <div className="input-group mb-1 mt-3 text-sm">
        <div className="form-group">
          <input
            {...register("email")}
            type="text"
            id="email"
            onChange={(e) =>
              e.target.classList.toggle("filled", e.target.value !== "")
            }
            className="border border-solid rounded-md outline-none w-[100%]"
          />
          {errorMessage && (
            <p className="text-[13px] text-red-800">{errorMessage}</p>
          )}
          <p className="text-[13px] text-red-800">
            {errors.email && errors.email.message}
          </p>
          <label htmlFor="email">Email address</label>
        </div>
      </div>
      <div className="input-group mb-1 text-sm">
        <div className="form-group mt-3">
          <input
            {...register("password")}
            type="password"
            id="password"
            onChange={(e) =>
              e.target.classList.toggle("filled", e.target.value !== "")
            }
            className="border border-solid rounded-md outline-none w-[100%]"
          />
          <p className="text-[13px] text-red-800">{errors.password?.message}</p>
          <label htmlFor="password">Password</label>
        </div>
        <div className="form-group mt-3">
          <input
            {...register("confirmPassword")}
            type="password"
            id="confirm-password"
            onChange={(e) =>
              e.target.classList.toggle("filled", e.target.value !== "")
            }
            className="border border-solid rounded-md outline-none w-[100%]"
          />
          <p className="text-[13px] text-red-800">
            {errors.confirmPassword && errors.confirmPassword.message}
          </p>
          <label htmlFor="confirm-password">Confirm password</label>
        </div>
        <div className="select relative mt-3 items-center justify-between cursor-pointer">
          <div className="selected flex justify-between items-center relative border border-solid rounded-md outline-none">
            <label className="overflow-clip">{selectedOption}</label>
            <ArrowIcon
              className={`relative arrow ${isOpen ? "rotate-0" : "-rotate-90"}`}
            ></ArrowIcon>
          </div>
          <div className="options absolute flex flex-col border border-solid rounded-md outline-none overflow-hidden opacity-0 w-[100%]">
            {genderOptions.map((option) => (
              <div
                key={option.id}
                onClick={() => handleOptionSelect(option.value)}
              >
                <input
                  {...register("gender")}
                  type="radio"
                  value={option.value}
                  id={option.id}
                  className="hidden"
                />
                <label
                  className="option inline-block cursor-pointer p-[5px] w-[100%]"
                  htmlFor={option.id}
                >
                  {option.value}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="log-in-button block w-[100%] p-3 mt-8 text-center font-semibold border-none rounded-md"
      >
        Sign up
      </button>
    </form>
  );
};
