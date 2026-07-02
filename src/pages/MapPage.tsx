import { Helmet } from "react-helmet-async";
import { ROUTE } from "../routes";
import { Header } from "@/shared/ui";
import { AppMap } from "@/shared/components/Map/AppMap";

export const MapPage = () => {
  return (
    <>
      <Helmet>
        <title>{ROUTE.MAP.title}</title>
      </Helmet>
      <div>
        <Header>Map page</Header>
        <AppMap />
      </div>
    </>
  );
};
