import { Header } from "../../../ui";
import { ProductsList } from "../components/ProductsList";
import type { ProductDto } from "../contracts/Product.dto";

export const ProductsListPage = () => {
  const products: ProductDto[] = [];

  return (
    <div>
      <Header>Products</Header>

      <div className="flex gap-2 items-center"></div>

      {products && <ProductsList products={products} />}
    </div>
  );
};
