/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRef, useEffect, useState, useContext } from "react";
import { logIn } from "../../services/user";
import AuthContext from "../../context/AuthProvider";
export const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const [ username, setUsername ] = useState("");
  const [ pwd, setPwd ] = useState("");

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const { accessToken, roles } = await logIn(username, pwd);
      setAuth({ user: username, pwd, roles, accessToken });
      setUsername("");
      setPwd("");
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
        <p>Need an account?</p>
        <a href="#">Click here</a>
      </form>
    </section>
  );
};
