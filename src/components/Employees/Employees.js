import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState, useEffect } from "react";

export const Employees = () => {
  const fetchData = useAxiosPrivate();
  const [ employees, setEmployees ] = useState([]);

  useEffect(() => {
    const getEmployees = async () => {
      try {
        const res = await fetchData("/employees");
        const employeesnames = res.map(employee=>`${employee.firstname} ${employee.lastname}`);
        setEmployees(employeesnames);
      } catch (error) {
        console.error(error);
      }
    };
    getEmployees();
  }, []);

  return (
    <article>
      <h2>Employees list</h2>
      {employees?.length ? (
        <ul>{(employees || []).map((user, i) => <li key={i}>{user}</li>)}</ul>
      ) : (
        <p>No employees</p>
      )}
    </article>
  );
};
