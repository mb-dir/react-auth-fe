import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import useAxios from "../../hooks/useAxios";
import { useForm } from "react-hook-form";

export const Login = () => {
  const { setAuth } = useAuth();
  const fetchData = useAxios();
  const { register, handleSubmit, formState: {errors} } = useForm({
    defaultValues: {
      username: "",
      password: "",
      checkbox: false,
    },
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";


  const handleLogin = (accessToken, {username, password}) => {
    setAuth({ user: username, accessToken });
    navigate(from, { replace: true });
  };

  const onSubmit = async ({username, password}) => {
    try {
      const userData = {user: username, password}
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
            required: {
              value: true,
              message: "Username is required"
            },
            minLength: {
              value: 4,
              message: "Username has to have min 4 characters",
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
              message: "Password is required"
            },
            minLength: {
              value: 6,
              message: "Password has to have min 6 characters",
            },
            pattern:{
              value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
              message: "Password has to inlcude special character and number"
            }
          })}
          type="password"
          id="password"
        />
        <p className="small-info">{errors.password?.message}</p>
        <button>Sign in</button>
        <div className="persistCheck">
          <input
            {...register("checkbox")}
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
