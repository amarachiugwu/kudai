import SignupForm from "../components/auth/SignupForm";

function Signup() {
  return (
    <main className="bg-gray-0 flex min-h-screen w-screen items-center justify-center overflow-x-hidden ">
      <div className="mx-auto flex w-full max-w-[1800px] h-full flex-col items-center md:justify-around lg:flex-row ">
        <div
          className={`mb-20 md:my-10 w-full h-full sm:rounded-md px-5 py-3 sm:w-4/6 sm:bg-white sm:px-8 lg:w-2/6`}
        >
          <div className="text-center">
            <img src="/assets/logo/logo-light.png" alt="logo" className="mx-auto" />
          </div>
          <div className="pb-5 text-center md:pb-12 ">
            <h3 className="mb-1">Sign up!</h3>
            <p className="pb-7">To start enjoying our exellent services!</p>
            <SignupForm />
          </div>
        </div>
      </div>
    </main>
  );
}

export default Signup;
