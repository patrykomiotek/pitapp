import { Helmet } from "react-helmet-async";
import { ROUTE } from "../routes";
import { Header } from "@/shared/ui";
import { AuthInfo } from "@/shared/components/Auth/AuthInfo";
import { AuthProvider } from "@/shared/components/Auth/AuthContext";
import { Counter } from "@/features/counter/Counter";

export const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>{ROUTE.HOME.title}</title>
      </Helmet>
      <div>
        <Header>Home page</Header>
        <Counter />
        <AuthProvider>
          <AuthInfo />
        </AuthProvider>
      </div>
    </>
  );
};
