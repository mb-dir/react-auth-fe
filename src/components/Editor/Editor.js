import { useState } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export const Editor = () => {
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const fetchData = useAxiosPrivate();

  return (
    <section>
      <h1>Editors Page</h1>
      <br />
      <h2>Add new employee</h2>
      <form
        onSubmit={async e => {
          e.preventDefault();
          console.log(firstName, lastName);
          try {
            await fetchData("/employees", {
              method: "post",
              payload: { firstname: firstName, lastname: lastName },
            });
          } catch (error) {
            console.error(error);
          }
        }}
      >
        <label htmlFor="firstName">First name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={({ target }) => setFirstName(target.value)}
        />

        <label htmlFor="lastName">Last name</label>
        <input
          type="text"
          id="latName"
          value={lastName}
          onChange={({ target }) => setLastName(target.value)}
        />
        <button>Add</button>
      </form>
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};
