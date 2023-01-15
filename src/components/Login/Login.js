/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRef, useEffect, useState } from "react";
export const Login = () => {
  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const [ username, setUsername ] = useState("");
  const [ pwd, setPwd ] = useState("");

  return (
    <section>
      <h1>Sign in</h1>

      <form>
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
