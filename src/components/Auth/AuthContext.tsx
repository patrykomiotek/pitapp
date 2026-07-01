import { createContext } from "react";

interface IAuthContext {
  isLoggedId: boolean;
}

export const AuthContext = createContext<IAuthContext>({ isLoggedId: false });
