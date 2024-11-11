export const LogInForm = () => {
  return (
    <form className="mt-6">
      <div className="input-group my-1 text-sm">
        <div className="form-group">
          <input
            type="text"
            name="email"
            id="email"
            required
            className="border border-solid rounded-md outline-none w-[100%]"
          />
          <label htmlFor="email">Email address</label>
        </div>
      </div>
      <div className="input-group mb-1 mt-3 text-sm">
        <div className="form-group">
          <input
            type="password"
            name="password"
            id="password"
            required
            className="border border-solid rounded-md outline-none w-[100%]"
          />
          <label htmlFor="password">Password</label>
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
        Log in
      </button>
    </form>
  );
};
