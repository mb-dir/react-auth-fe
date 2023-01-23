import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth }  from "../../hooks/useAuth";

export const RequiredAuth = () => {
  const {auth} = useAuth();
  const location = useLocation();

  return(
    auth?.user ? <Outlet/> : <Navigate to="/login" state={{from: location}} replace/>
  );
}
