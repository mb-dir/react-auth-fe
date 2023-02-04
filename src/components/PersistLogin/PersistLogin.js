import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRefreshToken } from "../../hooks/useRefreshToken";
import { useAuth } from "../../hooks/useAuth";
import useLocalStorage from "../../hooks/useLocalStorage";

export const PersistLogin = () => {
  const [ isLoading, setisLoading ] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();
  const [isPersist] = useLocalStorage("persist", false);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setisLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setisLoading(false);
  }, []);

  return (
    <>
      {!isPersist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}
    </>
  );
};
