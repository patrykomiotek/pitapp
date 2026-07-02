import { Header } from "../../../shared/ui";
import { CreateProductForm } from "../components/CreateProductForm";
import type { CreateProductDto } from "../contracts/Product.dto";
import { createProduct } from "../services/products";

export const CreateProductPage = () => {
  const handleSubmit = async (data: CreateProductDto) => {
    try {
      await createProduct(data);
    } catch {
      // TODO
    }
  };

  return (
    <>
      <div>
        <Header>Create Product</Header>
        <CreateProductForm onSubmit={handleSubmit} />
      </div>
    </>
  );
};
