import { Helmet } from "react-helmet-async";
import { ROUTE } from "../routes";
import { Header } from "ui";

export const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>{ROUTE.HOME.title}</title>
      </Helmet>
      <div>
        <Header>Home page</Header>
      </div>
    </>
  );
};
