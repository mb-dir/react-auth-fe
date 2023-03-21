import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useState, useEffect, useCallback } from "react";

export const Employees = () => {
  type employee = {
    _id: string;
    firstname:string;
    lastname: string
  }
  const fetchData = useAxiosPrivate();
  const [ employees, setEmployees ] = useState<employee[]>([]);

  const getEmployees = useCallback(async () => {
      try {
        const res = await fetchData("/employees");
        setEmployees(res);
      } catch (error) {
        console.error(error);
      }
    },[fetchData]);

  useEffect(() => {
      getEmployees();
  }, []);

  const deleteEmployee = async(id:string)=>{
    try {
      await fetchData("/employees", {method: 'delete', payload: {id}});
      getEmployees();
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <article>
      <h2>Employees list</h2>
      {employees?.length ? (
        <ul>{(employees || []).map((employee) => <li key={employee._id}>{`${employee.firstname} ${employee.lastname}`} <button className="smallBtn" onClick={()=>deleteEmployee(employee._id)}>X</button></li>)}</ul>
      ) : (
        <p>No employees</p>
      )}
    </article>
  );
};
