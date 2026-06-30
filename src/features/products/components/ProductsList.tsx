import { ProductCard } from "./ProductCard";
import type { ProductDto } from "../contracts/Product.dto";

type Props = {
  products: ProductDto[];
};

export const ProductsList = ({ products }: Props) => {
  return (
    <div>
      {products.map((elem) => {
        return (
          <div key={elem.id}>
            <ProductCard id={elem.id} product={elem.fields} />
          </div>
        );
      })}
    </div>
  );
};
