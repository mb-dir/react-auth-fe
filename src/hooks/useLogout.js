import useAxios from "./useAxios";
import useAuth from "./useAuth";

const useLogout = () => {
  const { setAuth } = useAuth();
  const fetchData = useAxios();

  const logout = async () => {
    try {
      await fetchData("/logout", {
        method: "get",
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      setAuth({});
    } catch (error) {
      console.error(error);
    }
  };

  return logout;
};

export default useLogout;
