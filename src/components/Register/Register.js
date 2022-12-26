import clsx from "clsx";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";

export const Register = () => {
  const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  const [ username, setUsername ] = useState("");
  const [ isValidUsername, setIsValidUsername ] = useState(false);

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

  return (
    <section>
      <form>
        <label htmlFor="username">
          Username
          <FontAwesomeIcon
            icon={faCheck}
            className={clsx(isValidUsername ? "valid" : "hide")}
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={clsx(isValidUsername || !username ? "hide" : "invalid")}
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
      </form>
    </section>
  );
};
