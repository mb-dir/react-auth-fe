import axios from "../api/axios";

export const signUp = async (username, password) => {
  await axios.post("/register", JSON.stringify({ user: username, password }), {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};

export const logIn = async (username, password) => {
  const { data } = await axios.post(
    "/auth",
    JSON.stringify({ user: username, password }),
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );

  return data;
};
