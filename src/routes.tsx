import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { ProductsListPage } from "./features/products/pages/ProductsListPage";
import { GeneratorPage } from "./pages/GeneratorPage";
import { HomePage } from "./pages/HomePage";

export const ROUTE: Record<string, { path: string; title: string }> = {
  HOME: {
    path: "/",
    title: "Home",
  },
  GENERATOR: {
    path: "/generator",
    title: "Generator",
  },
  PRODUCTS: {
    path: "/products",
    title: "Products",
  },
};

export const routes = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: ROUTE.HOME.path,
        element: <HomePage />,
      },
      {
        path: ROUTE.GENERATOR.path,
        element: <GeneratorPage />,
      },
      {
        path: ROUTE.PRODUCTS.path,
        element: <ProductsListPage />,
      },
    ],
  },
]);
