import { useRef, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useNavigate, useLocation, Link } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";
import useAxios from "../../hooks/useAxios";

export const Login = () => {
  const { setAuth } = useAuth();
  const fetchData = useAxios();
  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const [ isChecked, setIsChecked ] = useLocalStorage("persist", false);
  const [ username, setUsername ] = useLocalStorage("user", "");
  const [ pwd, setPwd ] = useState("");

  const handleLogin = accessToken => {
    setAuth({ user: username, accessToken });
    setUsername("");
    setPwd("");
    navigate(from, { replace: true });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { accessToken } = await fetchData(
        "/auth",
        {
          method: "post",
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          payload: { user: username, password: pwd }
        },
      );
      handleLogin(accessToken);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <h1>Sign in</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          ref={usernameRef}
          onChange={({ target }) => setUsername(target.value)}
          value={username}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={({ target }) => setPwd(target.value)}
          value={pwd}
          required
        />
        <button>Sign in</button>
        <div className="persistCheck">
          <input
            type="checkbox"
            id="persist"
            checked={isChecked}
            onChange={() => setIsChecked(prev => !prev)}
          />
          <label htmlFor="persist">Trust this device</label>
        </div>
        <p>Need an account?</p>
        <Link to="/register">Click here</Link>
      </form>
    </section>
  );
};
