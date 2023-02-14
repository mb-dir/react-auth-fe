import { Link } from "react-router-dom";
import { Users } from "../Users";
import { Employees } from "../Employees/Employees";

export const Admin = () => {
  return (
    <section>
      <h1>Admins Page</h1>
      <br />
      <Users />
      <Employees />
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};
