import { Button } from "ui";
import { useAuthContext } from "./AuthContext";

export const AuthCredentials = () => {
  const context = useAuthContext();
  return (
    <div>
      <p>User is logged in: {context.isLoggedIn ? "YES" : "NO"}</p>
      <Button onClick={() => context.toggleLoggedIn()}>Toggle</Button>
    </div>
  );
};
