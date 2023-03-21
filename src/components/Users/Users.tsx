import { useState, useEffect } from "react";
import useAxiosPrivate  from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

export const Users = () => {

  type user = {
    username: string;
  }

  const [ users, setUsers ] = useState<user[]>([]);
  const fetchData = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await fetchData("/users", {method: "get"})
        const usernames:user[] = res.map((user:user)=>user.username);
        setUsers(usernames);
      } catch (error) {
        console.error(error);
        navigate('/login', {state: {from: location}, replace: true})
      }
    };
    getUsers();
  }, []);

  return (
    <article>
      <h2>Users list</h2>
      {users?.length ? (
        <ul>{(users || []).map((user, i) => <li key={i}>{<>{user}</>}</li>)}</ul>
      ) : (
        <p>No users</p>
      )}
    </article>
  );
};
