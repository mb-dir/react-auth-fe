import { useState, createContext } from "react";

interface AuthContextType {
  auth: Record<string, any>;
  setAuth: React.Dispatch<React.SetStateAction<Record<string, any>>>;
}

const AuthContext = createContext<AuthContextType>({
  auth: {},
  setAuth: () => {},
});

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const [ auth, setAuth ] = useState<Record<string, any>>({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
