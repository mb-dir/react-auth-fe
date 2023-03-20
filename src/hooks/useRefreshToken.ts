import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useRefreshToken = () => {
  const { setAuth } = useAuth();
  const fetchData = useAxios();
  const refresh = async () => {
    const res = await fetchData("/refresh", {
      method: "get",
      withCredentials: true,
    });
    setAuth((prev: { roles: string[]; accessToken: string }) => {
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
