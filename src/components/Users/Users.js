import { useState, useEffect } from "react";
import useAxiosPrivate  from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

export const Users = () => {
  const [ users, setUsers ] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const res = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });
        console.log(res)

        isMounted && setUsers(res.data);
      } catch (error) {
        console.log(error);
        navigate('/login', {state: {from: location}, replace: true})
      }
    };
    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>Users list</h2>
      {users?.length ? (
        <ul>{(users || []).map((user, i) => <li key={i}>{user.username}</li>)}</ul>
      ) : (
        <p>No users</p>
      )}
    </article>
  );
};
