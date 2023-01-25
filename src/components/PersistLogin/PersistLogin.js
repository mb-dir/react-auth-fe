import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRefreshToken } from "../../hooks/useRefreshToken";
import { useAuth } from "../../hooks/useAuth";

export const PersistLogin = () => {
  const [ isLoading, setisLoading ] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        refresh();
      } catch (error) {
        console.error(error);
      } finally {
        setisLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setisLoading(false);
  }, []);

  return(
    <>
      {isLoading ? <p>Loading...</p> : <Outlet/>}
    </>
  )
};
