import { useState, createContext } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [ auth, setAuth ] = useState({});
  const [ isPersist, setIsPersist ] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );
  return (
    <AuthContext.Provider value={{ auth, setAuth, isPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
