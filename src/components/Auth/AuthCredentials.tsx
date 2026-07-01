import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const AuthCredentials = () => {
  const context = useContext(AuthContext);
  return (
    <div>
      <p>User is logged in: {context.isLoggedId ? "YES" : "NO"}</p>
    </div>
  );
};
