import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxios from "../../hooks/useAxios";

export const Register = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const fetchData = useAxios();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");
  const isButtonDisabled =
    ![ passwordValue, confirmPasswordValue ].every(Boolean) ||
    passwordValue !== confirmPasswordValue;

  useEffect(
    () => {
      clearErrors("confirmPassword");
      if (passwordValue !== confirmPasswordValue) {
        setError("confirmPassword", {
          type: "confirmPassword",
          message: "Passwords are not the same",
        });
      }
    },
    [ passwordValue, confirmPasswordValue, setError, clearErrors ]
  );

  const onSubmit = async ({ username, password }) => {
    try {
      await fetchData("/register", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        payload: { user: username, password },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="username">Username</label>
          <input
            {...register("username", {
              required: {
                value: true,
                message: "Username is required",
              },
              pattern: {
                value: USER_REGEX,
                message: "Invalid username format",
              },
            })}
            id="username"
            autoComplete="off"
            type="text"
          />
          <p className="small-info">{errors.username?.message}</p>

          <label htmlFor="password">Password</label>
          <input
            {...register("password", {
              required: {
                value: true,
                message: "Password is required",
              },
              pattern: {
                value: PWD_REGEX,
                message:
                  "Password has to have min 8 characters(inlcude special character, number and capital letter)",
              },
            })}
            id="password"
            autoComplete="off"
            type="password"
          />
          <p className="small-info">{errors.password?.message}</p>

          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            {...register("confirmPassword", {
              required: {
                value: true,
                message: "Password is required",
              },
              pattern: {
                value: PWD_REGEX,
                message:
                  "Password has to have min 8 characters(inlcude special character and number)",
              },
            })}
            id="confirmPassword"
            autoComplete="off"
            type="password"
          />
          <p className="small-info">{errors.confirmPassword?.message}</p>

          <button disabled={isButtonDisabled}>Sign up</button>
        </form>
        <p>Already registered?</p>
        <Link to="/login">Sign in</Link>
      </div>
    </section>
  );
};
