import { Helmet } from "react-helmet-async";
import Generator from "../shared/components/Generator";
import { ROUTE } from "../routes";

export const GeneratorPage = () => {
  return (
    <>
      <Helmet>
        <title>{ROUTE.GENERATOR.title}</title>
      </Helmet>
      <Generator />
    </>
  );
};
