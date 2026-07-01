import { createContext, useContext, useState } from "react";

// React Context hook pattern

interface IAuthContext {
  isLoggedIn: boolean;
  toggleLoggedIn: () => void; // Dispatch<SetStateAction<boolean>>;
  logIn: () => void;
  logOut: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): IAuthContext => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const toggleLoggedIn = () => setLoggedIn(!isLoggedIn);
  const logIn = () => setLoggedIn(true);
  const logOut = () => setLoggedIn(false);

  return {
    isLoggedIn,
    toggleLoggedIn,
    logIn,
    logOut,
  };
};

const AuthContext = createContext<IAuthContext | null>(null);

// class Mieso extends Error {}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === null) {
    throw new Error("Oh! Component should be placed inside AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthContext.Provider value={useAuth()}>{children}</AuthContext.Provider>
  );
};
