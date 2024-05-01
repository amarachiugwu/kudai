import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useAppDispatch } from "../../state/store"; // Import useAppDispatch from the store
import { login } from "../../features/auth/authSlice"; // Import login action
import { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


function LoginForm() {
  const dispatch = useAppDispatch(); // Use useAppDispatch from the store
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState<boolean>(true);

  type LoginSchema = {
    email: string;
    password: string;
  };

  const initialValues: LoginSchema = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const onSubmit = async (values:LoginSchema, { setSubmitting } :any) => {
    setSubmitting(true)
    try {
      dispatch(login(values)).then(() => {
        navigate("/")
      });;
    } catch (error:any) {
      toast.success(error, {
        position: 'top-right',
        autoClose: 2000, // Close the toast after 2 seconds
      });
    } finally {
      setSubmitting(false);
    }
  };



  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, errors }) => (
        <Form className="block grid-cols-6 gap-6 md:grid">
          <div className="col-span-2 text-left md:col-span-6 form-item">
            <label htmlFor="email" className="form-label">
              Email
            </label>

            <Field
              type="email"
              id="email"
              name="email"
              disabled={isSubmitting}
              autoComplete="email address"
              placeholder="Enter email"
              className={`mt-1 block w-full rounded-md border-gray-30 bg-transparent text-gray-80 shadow-sm hover:border-gray-80  focus:border-blue-10 focus:ring-0 input ${ isSubmitting && "cursor-not-allowed" } ${errors.email && "input-invalid"}`}
              aria-describedby="email address"
            />

            <ErrorMessage
              name="email"
              component="span"
              className="invalid"
            />
          </div>

          <div className="col-span-2 md:col-span-6 text-left form-item">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="relative">
              <Field
                type={showPassword ? "password" : "text"}
                id="password"
                name="password"
                autoComplete="current-password"
                placeholder="Enter password"
                disabled={isSubmitting}
                className={`mt-1 block w-full rounded-md border-gray-30 bg-transparent text-gray-80 shadow-sm hover:border-gray-80  focus:border-blue-10 focus:ring-0 input ${ isSubmitting && "cursor-not-allowed" } ${errors.password && "input-invalid"}`}
                aria-describedby="password"
              />

              <div
                className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3  text-sm text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <img
                    src="/assets/icons/hide.svg"
                    height={24}
                    width={24}
                    alt={"hide"}
                  />
                ) : (
                  <img
                    src="/assets/icons/show.svg"
                    height={24}
                    width={24}
                    alt={"show"}
                  />
                )}
              </div>
            </div>
            <ErrorMessage
              name="password"
              component="span"
              className="invalid"
            />
            <Link to="/forgot-password">
              <p className="pt-[14px] text-sm text-blue-10 hover:text-blue-0 hover:text-gray-80 active:text-blue-0">
                Forget Password
              </p>
            </Link>
          </div>

          {!isSubmitting ? (
            <div className="col-span-2 md:col-span-6 ">
              <div className="col-span-2 md:col-span-6 ">
                <button
                  type="submit"
                  className="bg-blue-10 hover:bg-blue-0  w-full rounded   py-2 font-semibold text-gray-0"
                >
                  LOGIN
                </button>
              </div>
            </div>
          ) : (
            <div className="col-span-2  md:col-span-6 ">loading</div>
          )}
          <div className="mt-[24px] text-sm text-gray-20 md:col-span-6 md:mt-0">
            Do not have an account?
            <Link to="/register">
              <span className="text-blue-10 hover:text-blue-0 hover:text-yellow-40 active:text-gray-80">
                {" "}
                Register Here
              </span>
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
