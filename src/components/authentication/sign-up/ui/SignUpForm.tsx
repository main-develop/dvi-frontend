"use client";

import { useState } from "react";

export const SignUpForm = (): React.JSX.Element => {
  const [selectedOption, setSelectedOption] = useState("Gender");
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <form className="mt-6">
      <div className="flex flex-row justify-between">
        <div className="input-group mt-1 text-sm">
          <div className="form-group">
            <input
              type="text"
              name="first-name"
              id="first-name"
              required={false}
              onChange={(e) =>
                e.target.classList.toggle("filled", e.target.value !== "")
              }
              className="border border-solid rounded-md outline-none w-[136px]"
            />
            <label htmlFor="first-name">First name</label>
          </div>
        </div>
        <div className="input-group mt-1 text-sm">
          <div className="form-group">
            <input
              type="text"
              name="last-name"
              id="last-name"
              required={false}
              onChange={(e) =>
                e.target.classList.toggle("filled", e.target.value !== "")
              }
              className="border border-solid rounded-md outline-none w-[136px]"
            />
            <label htmlFor="last-name">Last name</label>
          </div>
        </div>
      </div>
      <div className="input-group mb-1 mt-3 text-sm">
        <div className="form-group">
          <input
            type="text"
            name="email"
            id="email"
            required={true}
            onChange={(e) =>
              e.target.classList.toggle("filled", e.target.value !== "")
            }
            className="border border-solid rounded-md outline-none w-[100%]"
          />
          <label htmlFor="email">Email address</label>
        </div>
      </div>
      <div className="input-group mb-1 text-sm">
        <div className="form-group mt-3">
          <input
            type="password"
            name="password"
            id="password"
            required={true}
            onChange={(e) =>
              e.target.classList.toggle("filled", e.target.value !== "")
            }
            className="border border-solid rounded-md outline-none w-[100%]"
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="form-group mt-3">
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            required={true}
            onChange={(e) =>
              e.target.classList.toggle("filled", e.target.value !== "")
            }
            className="border border-solid rounded-md outline-none w-[100%]"
          />
          <label htmlFor="confirm-password">Confirm password</label>
        </div>
        <div className="select relative mt-3 items-center justify-between cursor-pointer">
          <div className="selected flex justify-between items-center relative border border-solid rounded-md outline-none">
            <label className="overflow-clip">{selectedOption}</label>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              height="10px"
              width="25px"
              className={`relative arrow ${isOpen ? "rotate-0" : "-rotate-90"}`}
            >
              <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
            </svg>
          </div>
          <div className="options absolute flex flex-col border border-solid rounded-md outline-none overflow-hidden opacity-0 w-[100%]">
            <div onClick={() => handleOptionSelect("Rather not say")}>
              <input
                type="radio"
                name="gender"
                id="undefined"
                className="hidden"
              />
              <label
                className="option inline-block cursor-pointer p-[5px] w-[100%]"
                htmlFor="undefined"
              >
                Rather not say
              </label>
            </div>
            <div onClick={() => handleOptionSelect("Male")}>
              <input type="radio" name="gender" id="male" className="hidden" />
              <label
                className="option inline-block cursor-pointer p-[5px] w-[100%]"
                htmlFor="male"
              >
                Male
              </label>
            </div>
            <div onClick={() => handleOptionSelect("Female")}>
              <input
                type="radio"
                name="gender"
                id="female"
                className="hidden"
              />
              <label
                className="option inline-block cursor-pointer p-[5px] w-[100%]"
                htmlFor="female"
              >
                Female
              </label>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between mb-2 mt-[14px]">
          <div className="flex flex-row">
            <label className="cursor-pointer mb-[14px]">
              <input
                type="checkbox"
                name="remember-me"
                id="remember-me"
                className="hidden"
              />
              <svg
                viewBox="0 0 64 64"
                height="14px"
                width="14px"
                className="overflow-visible"
              >
                <path
                  d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
                  pathLength="575.0541381835938"
                  className="path"
                ></path>
              </svg>
            </label>
            <label className="text-[13px] pl-[6px] -mt-[2px]">
              Remember me
            </label>
          </div>
          <div className="-mt-[2.3px]">
            <a
              rel="noopener noreferrer"
              href="#"
              className="forgot-password text-[13px] hover:text-[#f3f4f6da] transition"
            >
              Forgot password?
            </a>
          </div>
        </div>
      </div>
      <button className="log-in-button block w-[100%] p-3 mt-8 text-center font-semibold border-none rounded-md">
        Sign up
      </button>
    </form>
  );
};
