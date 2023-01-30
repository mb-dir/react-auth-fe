import { useState, createContext } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [ auth, setAuth ] = useState({});
  const [ isPersist, setIsPersist ] = useState(() => {
    return JSON.parse(localStorage.getItem("persist") || false);
  });
  return (
    <AuthContext.Provider value={{ auth, setAuth, isPersist, setIsPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
