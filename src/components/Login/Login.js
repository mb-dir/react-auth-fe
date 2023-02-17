import { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useForm } from "react-hook-form";

export const Login = () => {
  const { setAuth } = useAuth();
  const fetchData = useAxios();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: {
      username: "",
      password: "",
      checkbox: false,
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  useEffect(
    () => {
      const isPersist = JSON.parse(localStorage.getItem("persist"));
      const username = JSON.parse(localStorage.getItem("user"));

      setValue("username", username);
      if (isPersist) {
        setValue("checkbox", true);
      }
    },
    [ setValue ]
  );

  const handleCheckboxChange = e => {
    const isChecked = e.target.checked;
    localStorage.setItem("persist", isChecked);
  };

  const handleUsernameChange = e => {
    const username = JSON.stringify(e.target.value);
    localStorage.setItem("user", username);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const handleLogin = (accessToken, { username, password }) => {
    setAuth({ user: username, accessToken });
    navigate(from, { replace: true });
  };

  const onSubmit = async ({ username, password }) => {
    try {
      const userData = { user: username, password };
      const { accessToken } = await fetchData("/auth", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
        payload: userData,
      });
      handleLogin(accessToken, userData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <h1>Sign in</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">Username</label>
        <input
          {...register("username", {
            onChange: handleUsernameChange,
            required: {
              value: true,
              message: "Username is required",
            },
            pattern: {
              value: USER_REGEX,
              message: "Invalid username format",
            },
          })}
          type="text"
          id="username"
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
          type="password"
          id="password"
        />
        <p className="small-info">{errors.password?.message}</p>
        <button>Sign in</button>
        <div className="persistCheck">
          <input
            {...register("checkbox", { onChange: handleCheckboxChange })}
            type="checkbox"
            id="persist"
          />
          <label htmlFor="persist">Trust this device</label>
        </div>
        <p>Need an account?</p>
        <Link to="/register">Click here</Link>
      </form>
    </section>
  );
};
