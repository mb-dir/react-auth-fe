import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

export const Editor = () => {
  const fetchData = useAxiosPrivate();
  const { register, formState: { errors }, handleSubmit, setFocus } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
    },
  });

  useEffect(() => {
    setFocus("firstName");
  }, []);

  const onSubmit = async ({ firstName, lastName }) => {
    try {
      await fetchData("/employees", {
        method: "post",
        payload: { firstname: firstName, lastname: lastName },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
      <h1>Editors Page</h1>
      <br />
      <h2>Add new employee</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="firstName">First name</label>
        <input
          {...register("firstName", {
            required: { value: true, message: "This field is required" },
          })}
          type="text"
          id="firstName"
        />
        <p className="small-info">{errors.firstName?.message}</p>

        <label htmlFor="lastName">Last name</label>
        <input
          {...register("lastName", {
            required: { value: true, message: "This field is required" },
          })}
          type="text"
          id="latName"
        />
        <p className="small-info">{errors.lastName?.message}</p>
        <button>Add</button>
      </form>
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};
