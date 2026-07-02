import { useState, useEffect } from "react";
import { Header } from "../../../shared/ui";
import type { ProductDto } from "../contracts/Product.dto";
import { fetchProduct } from "../services/products";
import { ProductDetails } from "../components/ProductDetails";
import { useParams } from "react-router-dom";
import { useApi } from "@/shared/hooks/useApi";
import { useQuery } from "@tanstack/react-query";
// import { ROUTE } from "../../../routes";
// import { Helmet } from "react-helmet-async";

// /products/:id

// const {data, isLoading, isError } = useApi<ProductDto[]>('/products')
// const {data, isLoading, isError } = useApi<ProductDto | null>('/products/:id')

export const ProductDetailsPage = () => {
  // const [data, setData] = useState<ProductDto | null>(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [isError, setIsError] = useState(false);
  const { id } = useParams<{ id: string }>();
  // const { data, isError, isLoading } = useApi<ProductDto | null>(
  //   () => fetchProduct(id!),
  //   null,
  // );
  const { data, isError, isLoading } = useQuery({
    queryKey: ["product-details", id],
    queryFn: () => fetchProduct(id!),
  });

  // useEffect(() => {
  //   let ignore = false;

  //   const loadData = async () => {
  //     try {
  //       const response = await fetchProduct(id!);
  //       if (!ignore) {
  //         setData(response);
  //       }
  //     } catch {
  //       // fail
  //       setIsError(true);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   loadData();

  //   return () => {
  //     ignore = true;
  //   };
  // }, []);

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
        <Header>Product</Header>

        <div className="flex gap-2 items-center"></div>

        {data && <ProductDetails product={data} />}
      </div>
    </>
  );
};
