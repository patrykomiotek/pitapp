import { z } from "zod";

export interface ProductDto {
  id: string;
  fields: {
    name: string;
    description: string;
    price: number;
    created_at: string;
    updated_at: string;
  };
}

export const createProductSchema = z.object({
  name: z.string().min(1, { error: "Name is required" }),
  description: z.string().min(3, { error: "Description is required" }), // refine(data, ctx)
  price: z.number().min(1, { error: "Price is required" }),
});

export type CreateProductDto = z.infer<typeof createProductSchema>;

type ProductDtoOptional = Partial<ProductDto>;
type ProductDtoRequired = Required<ProductDtoOptional>;
type ProductDtoPicked = Pick<ProductDto, "fields">;
type ProductDtoOmit = Omit<ProductDto, "id">;
type ProductDtoReadonly = Readonly<ProductDto>;

const sum = (a: number, b: number) => a + b;

type FunctionReturn = ReturnType<typeof sum>;
