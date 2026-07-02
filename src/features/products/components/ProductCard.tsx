import { Link } from "react-router-dom";
import { Button, Header } from "../../../shared/ui";
import type { ProductDto } from "../contracts/Product.dto";
import { useAppDispatch } from "@/shared/hooks/redux";
import { addToCart, removeFromCart } from "@/features/cart/cartSlice";

type Props = {
  id: ProductDto["id"];
  product: {
    name: ProductDto["fields"]["name"];
    description: ProductDto["fields"]["description"];
    price: ProductDto["fields"]["price"];
  };
};

export const ProductCard = ({ id, product }: Props) => {
  const { name, description, price } = product;
  const dispatch = useAppDispatch();

  const productDto = {
    id,
    fields: {
      ...product,
      created_at: "",
      updated_at: "",
    },
  };

  return (
    <div key={id} className="m-4 p-4 outline rounded-md">
      <Header>
        <Link to={`/products/${id}`}>{name}</Link>
      </Header>
      <div>
        <p className="font-medium">{description}</p>
        <p className="text-sm text-slate-500">${price}</p>
        <Button onClick={() => dispatch(addToCart(productDto))}>Dodaj</Button>
        <Button onClick={() => dispatch(removeFromCart(productDto))}>
          Usuń
        </Button>
      </div>
    </div>
  );
};
