import { logOut } from "../services/user";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      await logOut();
    } catch (error) {
      console.error(error);
    }
  };

  return logout;
};

export default useLogout;
