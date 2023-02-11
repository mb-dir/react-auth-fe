import axios from "../api/axios";

const useAxios = () => {
  const fetchData = async (method, url, options = null, body = null) => {
    try {
      console.log(body);
      const { data } = await axios[method](url, body, options);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  return fetchData;
};

export default useAxios;
