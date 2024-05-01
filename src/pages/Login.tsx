import LoginForm from "../components/auth/LoginForm";

function Login() {
  return (
    <main className="bg-gray-0 flex min-h-screen w-screen items-center justify-center overflow-x-hidden px-5 ">
      <div className="mx-auto flex w-full max-w-[1800px] flex-col items-center md:justify-around lg:flex-row ">
        <div
          className={`sm:mt-10 w-full sm:rounded-md px-3 py-3 sm:w-4/6 sm:bg-white sm:px-8  md:mt-0 lg:w-2/6`}
        >
          <div className="text-center">
            <img src="/assets/logo/logo-light.png" alt="logo" className="mx-auto" />
          </div>
          <div className="py-5 text-center md:py-12 ">
            <h3 className="mb-1">Welcome back!</h3>
            <p className="pb-7">Please enter your credentials to sign in!</p>
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
