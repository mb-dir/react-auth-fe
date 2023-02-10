import { getRefreshToken } from "../services/tokens";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const res = await getRefreshToken();
    console.log(res);
    setAuth(prev => {
      return {
        ...prev,
        roles: res.roles,
        accessToken: res.accessToken,
      };
    });
    return res.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
