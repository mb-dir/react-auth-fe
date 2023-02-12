import axios from "../api/axios";

const useAxios = () => {
  const fetchData = async (url, options = null) => {
    try {
      console.log(url, options);
      const { data } = await axios({
        method: options.method || "get",
        url,
        withCredentials: options.withCredentials || false,
        data: options.payload,
        headers: options.headers,
      });
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return fetchData;
};

export default useAxios;
