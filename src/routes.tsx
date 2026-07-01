import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { ProductsListPage } from "./features/products/pages/ProductsListPage";
import { GeneratorPage } from "./pages/GeneratorPage";
import { HomePage } from "./pages/HomePage";
import { CreateProductPage } from "./features/products/pages/CreateProductPage";

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
  CREATE_PRODUCT: {
    path: "/products/create",
    title: "Create Product",
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
      {
        path: ROUTE.CREATE_PRODUCT.path,
        element: <CreateProductPage />,
      },
    ],
  },
]);
