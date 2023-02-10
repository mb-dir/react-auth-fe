import axios from "../api/axios";

export const getRefreshToken = async () => {
  const { data } = await axios.get("/refresh", { withCredentials: true });
  return data;
};
