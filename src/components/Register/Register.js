import clsx from "clsx";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

export const Register = () => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const fetchData = useAxios();

  const [ username, setUsername ] = useState("");
  const [ isValidUsername, setIsValidUsername ] = useState(false);

  const [ password, setPassword ] = useState("");
  const [ isValidPassword, setIsValidPassword ] = useState(false);

  const [ confirmPassword, setConfirmPassword ] = useState("");
  const [ arePasswordsSame, setArePasswordsSame ] = useState(false);

  const isButtonDisabled =
    !arePasswordsSame || !isValidPassword || !isValidUsername;

  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  useEffect(
    () => {
      setIsValidUsername(USER_REGEX.test(username));
    },
    [ USER_REGEX, username ]
  );

  useEffect(
    () => {
      setIsValidPassword(PWD_REGEX.test(password));
    },
    [ PWD_REGEX, password ]
  );

  useEffect(
    () => {
      setIsValidPassword(PWD_REGEX.test(password));
    },
    [ PWD_REGEX, password ]
  );

  useEffect(
    () => {
      setArePasswordsSame(password === confirmPassword && password !== "");
    },
    [ confirmPassword, password ]
  );

  const resetData = () => {
    setUsername("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await fetchData(
        "post",
        "register",
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },
        { user: username, password }
      );
      resetData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">
            Username
            <FontAwesomeIcon
              icon={faCheck}
              className={clsx(isValidUsername ? "valid" : "hide")}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={clsx(
                isValidUsername || !username ? "hide" : "invalid"
              )}
            />
          </label>
          <input
            id="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            required
            autoComplete="off"
            ref={usernameRef}
            type="text"
          />

          <label htmlFor="password">
            Password
            <FontAwesomeIcon
              icon={faCheck}
              className={clsx(isValidPassword ? "valid" : "hide")}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={clsx(
                isValidPassword || !password ? "hide" : "invalid"
              )}
            />
          </label>
          <input
            id="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            required
            autoComplete="off"
            type="password"
          />

          <label htmlFor="confirmPassword">
            Confirm password
            <FontAwesomeIcon
              icon={faCheck}
              className={clsx(arePasswordsSame ? "valid" : "hide")}
            />
            <FontAwesomeIcon
              icon={faTimes}
              className={clsx(
                arePasswordsSame || !confirmPassword ? "hide" : "invalid"
              )}
            />
          </label>
          <input
            id="confirmPassword"
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
            required
            autoComplete="off"
            type="password"
          />
          <button disabled={isButtonDisabled}>Sign up</button>
        </form>
        <p>Already registered?</p>
        <Link to="/login">Sign in</Link>
      </div>
    </section>
  );
};
