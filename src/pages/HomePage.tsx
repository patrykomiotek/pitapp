import { Helmet } from "react-helmet-async";
import { ROUTE } from "../routes";
import { Header } from "ui";
import { AuthInfo } from "components/Auth/AuthInfo";
import { AuthProvider } from "components/Auth/AuthContext";

export const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>{ROUTE.HOME.title}</title>
      </Helmet>
      <div>
        <Header>Home page</Header>
        <AuthProvider>
          <AuthInfo />
        </AuthProvider>
      </div>
    </>
  );
};
