import { Button, Header } from "../../../shared/ui";
import { ProductsList } from "../components/ProductsList";
// import type { ProductDto } from "../contracts/Product.dto";
import { fetchProducts } from "../services/products";
// import { useApi } from "@/shared/hooks/useApi";
import { useQuery } from "@tanstack/react-query";

export const ProductsListPage = () => {
  // const { data, isError, isLoading } = useApi<ProductDto[]>(fetchProducts, []);
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p className="text-red">Oh no an error has occurred!</p>;
  }

  return (
    <>
      <div>
        <Header>Products</Header>

        <div className="flex gap-2 items-center"></div>
        <Button onClick={() => refetch()}>Refetch</Button>

        {data && <ProductsList products={data} />}
      </div>
    </>
  );
};
