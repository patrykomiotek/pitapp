import type { ProductDto } from "../contracts/Product.dto";

interface Props {
  product: ProductDto;
}

export const ProductDetails = ({ product }: Props) => {
  return (
    <div>
      <h2>{product.fields.name}</h2>
      <p>{product.fields.description}</p>
      <p>{product.fields.price}</p>
    </div>
  );
};
