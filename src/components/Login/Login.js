/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRef, useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { logIn } from "../../services/user";
import { useNavigate, useLocation } from "react-router-dom";
import useLocalStorage from "../../hooks/useLocalStorage";

export const Login = () => {
  const { setAuth, isPersist, setIsPersist } = useAuth();
  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const [ username, setUsername ] = useLocalStorage("user", "");
  const [ pwd, setPwd ] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const { accessToken, roles } = await logIn(username, pwd);
      setAuth({ user: username, pwd, roles, accessToken });
      setUsername("");
      setPwd("");
      navigate(from, { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  const persistToggle = ()=>{
    setIsPersist(prev => !prev);
  }

  useEffect(()=>{
    localStorage.setItem("persist", isPersist);
  }, [isPersist])

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
          <input type="checkbox" id="persist" checked={isPersist} onChange={persistToggle}/>
          <label htmlFor="persist">Trust this device</label>
        </div>
        <p>Need an account?</p>
        <a href="#">Click here</a>
      </form>
    </section>
  );
};
