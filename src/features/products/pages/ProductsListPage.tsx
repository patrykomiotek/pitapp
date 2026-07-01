import { useState, useEffect } from "react";
import { Header } from "../../../ui";
import { ProductsList } from "../components/ProductsList";
import type { ProductDto } from "../contracts/Product.dto";
import { fetchProducts } from "../services/products";
// import { ROUTE } from "../../../routes";
// import { Helmet } from "react-helmet-async";

export const ProductsListPage = () => {
  const [data, setData] = useState<ProductDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    let ignore = false;

    const loadData = async () => {
      try {
        const response = await fetchProducts();
        if (!ignore) {
          setData(response.records);
        }
      } catch {
        // fail
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();

    return () => {
      ignore = true;
    };
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p className="text-red">Oh no an error has occurred!</p>;
  }

  return (
    <>
      {/* <Helmet>
        <title>{ROUTE.PRODUCTS.title}</title>
      </Helmet> */}
      <div>
        <Header>Products</Header>

        <div className="flex gap-2 items-center"></div>

        {data && <ProductsList products={data} />}
      </div>
    </>
  );
};
