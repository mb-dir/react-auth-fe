import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export const RequiredAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const isUserExist = !!auth.user;

  console.log(auth.roles, allowedRoles);

  return (auth.roles || []).find(role => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : isUserExist ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
