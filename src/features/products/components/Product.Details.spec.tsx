import { render, screen } from "@testing-library/react";
import { ProductDetails } from "./ProductDetails";
import type { ProductDto } from "../contracts/Product.dto";

describe("ProductDetails component", () => {
  const product: ProductDto = {
    id: "12343",
    fields: {
      name: "Product 1",
      description: "Lorem ipsum",
      price: 123,
      created_at: "test1",
      updated_at: "test321",
    },
  };
  it("should fill html elements", () => {
    const { debug } = render(<ProductDetails product={product} />);
    debug();
    expect(screen.getByText("Product 1")).toBeTruthy();
  });
});
