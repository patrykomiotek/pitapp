import { Helmet } from "react-helmet-async";
import { ROUTE } from "../routes";
import { Header } from "@/shared/ui";
import { AuthInfo } from "@/shared/components/Auth/AuthInfo";
import { AuthProvider } from "@/shared/components/Auth/AuthContext";

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
