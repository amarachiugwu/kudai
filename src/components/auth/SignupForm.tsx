import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useAppDispatch } from "../../state/store"; // Import useAppDispatch from the store
import { useState } from "react";
import { toast } from "react-toastify";
import { register } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";


function SignupForm() {
  const dispatch = useAppDispatch(); // Use useAppDispatch from the store
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [isLowercaseValid, setIsLowercaseValid] = useState(false);
  const [isUppercaseValid, setIsUppercaseValid] = useState(false);
  const [isNumberValid, setIsNumberValid] = useState(false);
  const [isSymbolValid, setIsSymbolValid] = useState(false);
  const [isMinLengthValid, setIsMinLengthValid] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (event: any, setFieldValue: any) => {
    const password = event.target.value;
    setFieldValue("pswCriteria", password);

    // Check lowercase criteria
    setIsLowercaseValid(/[a-z]/.test(password));

    // Check uppercase criteria
    setIsUppercaseValid(/(?=.*?[A-Z])/.test(password));

    // Check number criteria
    setIsNumberValid(/(?=.*?\d)/.test(password));

    // Check symbol criteria
    setIsSymbolValid(/(?=.*?[$%*#])/.test(password));

    // Check minimum length criteria
    setIsMinLengthValid(password.length >= 8);
  };

  type SignUpSchema = {
    email: string;
    firstname: string;
    lastname: string;
    password: string;
    pswCriteria?: string;
  };

  const initialValues: SignUpSchema = {
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    pswCriteria: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    firstname: Yup.string().required("Firstname is required"),
    lastname: Yup.string().required("Lastname is required"),
    password: Yup.string().required("Password is required"),
    pswCriteria: Yup.string()
      .required("Criteria must be met")
      .test("lowercase", "Criteria must be met", (value) => {
        if (/[a-z]/.test(value)) {
          return true;
        }
        return false;
      })
      .test("uppercase", "Criteria must be met", (value) => {
        if (/(?=.*?[A-Z])/.test(value)) {
          return true;
        }
        return false;
      })
      .test("number", "Criteria must be met", (value) => {
        if (/(?=.*?\d)/.test(value)) {
          return true;
        }
        return false;
      })
      .test("symbol", "Criteria must be met", (value) => {
        if (/(?=.*?[$%*#])/.test(value)) {
          return true;
        }
        return false;
      })
      .test("min-length", "Password must be at least 8 characters", (value) => {
        if (value.length >= 8) {
          return true;
        }
        return false;
      }),
  });



  const onSubmit =  async (values: SignUpSchema, { setSubmitting }: any) => {

    try {
      setSubmitting(true)
      // Dispatch register action with form values
      await dispatch(register({
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.password
      })).then(() => {
        navigate('/')
      });
    }catch (error: any) {
      toast.error(error, {
        position: "top-right",
        autoClose: 2000, 
      })} finally {
      setSubmitting(false);
    }
  };


  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, setFieldValue, isSubmitting, errors }) => (
        <Form className="block grid-cols-6 gap-3 md:grid">
          <div className="col-span-2 text-left md:col-span-6 form-item">
            <label htmlFor="firstname" className="form-label">
              Firstname
            </label>

            <Field
              type="firstname"
              id="firstname"
              name="firstname"
              disabled={isSubmitting}
              autoComplete="firstname address"
              placeholder="Enter firstname"
              className={`mt-1 block w-full rounded-md border-gray-30 bg-transparent text-gray-80 shadow-sm hover:border-gray-80  focus:border-blue-10 focus:ring-0 input ${
                isSubmitting && "cursor-not-allowed"
              } ${errors.firstname && "input-invalid"}`}
              aria-describedby="firstname address"
            />

            <ErrorMessage
              name="firstname"
              component="span"
              className="invalid"
            />
          </div>

          <div className="col-span-2 text-left md:col-span-6 form-item">
            <label htmlFor="lastname" className="form-label">
              Lastname
            </label>

            <Field
              type="lastname"
              id="lastname"
              name="lastname"
              disabled={isSubmitting}
              autoComplete="lastname address"
              placeholder="Enter lastname"
              className={`mt-1 block w-full rounded-md border-gray-30 bg-transparent text-gray-80 shadow-sm hover:border-gray-80  focus:border-blue-10 focus:ring-0 input ${
                isSubmitting && "cursor-not-allowed"
              } ${errors.lastname && "input-invalid"}`}
              aria-describedby="lastname address"
            />

            <ErrorMessage
              name="lastname"
              component="span"
              className="invalid"
            />
          </div>

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
              className={`mt-1 block w-full rounded-md border-gray-30 bg-transparent text-gray-80 shadow-sm hover:border-gray-80  focus:border-blue-10 focus:ring-0 input ${
                isSubmitting && "cursor-not-allowed"
              } ${errors.email && "input-invalid"}`}
              aria-describedby="email address"
            />

            <ErrorMessage name="email" component="span" className="invalid" />
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
                className={`mt-1 block w-full rounded-md border-gray-30 bg-transparent text-gray-80 shadow-sm hover:border-gray-80  focus:border-blue-10 focus:ring-0 input ${
                  isSubmitting && "cursor-not-allowed"
                } ${errors.password && "input-invalid"}`}
                aria-describedby="password"
                onChange={(e: any) => {
                  handleChange(e);
                  handlePasswordChange(e, setFieldValue);
                }}
              />

              <Field type="hidden" id="pswCriteria" name="pswCriteria" />

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

            <ErrorMessage
              name="pswCriteria"
              component="span"
              className="invalid"
            />

            <div className="flex">
              <div className="w-1/2">
                <div className="mt-1">
                  <span>
                    {isLowercaseValid ? (
                      <img
                        className="inline"
                        src="/assets/icons/good.svg"
                        height={16}
                        width={16}
                        alt={"good"}
                      />
                    ) : (
                      <img
                        className="inline"
                        src="/assets/icons/bad.svg"
                        height={16}
                        width={16}
                        alt={"bad"}
                      />
                    )}
                  </span>

                  <span
                    className={`ml-2 text-sm ${
                      isLowercaseValid ? "text-gray-30" : "text-gray-20"
                    }`}
                  >
                    Lower case
                  </span>
                </div>

                <div className="mt-1">
                  <span>
                    {isNumberValid ? (
                      <img
                        className="inline"
                        src="/assets/icons/good.svg"
                        height={16}
                        width={16}
                        alt={"good"}
                      />
                    ) : (
                      <img
                        className="inline"
                        src="/assets/icons/bad.svg"
                        height={16}
                        width={16}
                        alt={"bad"}
                      />
                    )}
                  </span>
                  <span
                    className={`ml-2 text-sm ${
                      isNumberValid ? "text-gray-30" : "text-gray-20"
                    }`}
                  >
                    Number
                  </span>
                </div>

                <div className="mt-1">
                  <span>
                    {isMinLengthValid ? (
                      <img
                        className="inline"
                        src="/assets/icons/good.svg"
                        height={16}
                        width={16}
                        alt={"good"}
                      />
                    ) : (
                      <img
                        className="inline"
                        src="/assets/icons/bad.svg"
                        height={16}
                        width={16}
                        alt={"bad"}
                      />
                    )}
                  </span>
                  <span
                    className={`ml-2 text-sm ${
                      isMinLengthValid ? "text-gray-30" : "text-gray-20"
                    }`}
                  >
                    8 characters
                  </span>
                </div>
              </div>

              <div className="w-1/2">
                <div className="mt-1">
                  <span>
                    {isUppercaseValid ? (
                      <img
                        className="inline"
                        src="/assets/icons/good.svg"
                        height={16}
                        width={16}
                        alt={"good"}
                      />
                    ) : (
                      <img
                        className="inline"
                        src="/assets/icons/bad.svg"
                        height={16}
                        width={16}
                        alt={"bad"}
                      />
                    )}
                  </span>
                  <span
                    className={`ml-2 text-sm ${
                      isUppercaseValid ? "text-gray-30" : "text-gray-20"
                    }`}
                  >
                    Upper case
                  </span>
                </div>

                <div className="mt-1">
                  <span>
                    {isSymbolValid ? (
                      <img
                        className="inline"
                        src="/assets/icons/good.svg"
                        height={16}
                        width={16}
                        alt={"good"}
                      />
                    ) : (
                      <img
                        className="inline"
                        src="/assets/icons/bad.svg"
                        height={16}
                        width={16}
                        alt={"bad"}
                      />
                    )}
                  </span>
                  <span
                    className={`ml-2 text-sm ${
                      isSymbolValid ? "text-gray-30" : "text-gray-20"
                    }`}
                  >
                    Symbol $%*#
                  </span>
                </div>
              </div>
            </div>

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
                  SIGNUP
                </button>
              </div>
            </div>
          ) : (
            <div className="col-span-2  md:col-span-6 ">loading</div>
          )}
          <div className="mt-[24px] text-sm text-gray-20 md:col-span-6 md:mt-0">
            Already have an account?
            <Link to="/login">
              <span className="text-blue-10 hover:text-blue-0 hover:text-yellow-40 active:text-gray-80">
                Login instead
              </span>
            </Link>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default SignupForm;
