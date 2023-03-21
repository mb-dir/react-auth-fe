import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import jwt_decode from "jwt-decode";

export const RequiredAuth = ({ allowedRoles }: {allowedRoles: string[]}) => {
  const { auth } = useAuth();
  const location = useLocation();
  const decoded:any = auth?.accessToken ? jwt_decode(auth.accessToken) : undefined;

  const roles:string[] = decoded?.UserInfo.roles || [];
  const isUserExist = !!auth.user;

  return (roles).find(role => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : isUserExist ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
