import axios from "../api/axios";

export const signUp = async (username, password) => {
  await axios.post("/register", JSON.stringify({ user: username, password }), {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
};
