import axios from "../api/axios";

const useAxios = () => {
  const fetchData = async (method, url, options = null) => {
    try {
      const { data } = await axios[method](url, JSON.stringify(options));
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return fetchData;
};

export default useAxios;
