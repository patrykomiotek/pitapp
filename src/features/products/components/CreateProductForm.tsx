import { type SubmitHandler, useForm } from "react-hook-form";
import { Button, Input } from "ui";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProductSchema,
  type CreateProductDto,
} from "../contracts/Product.dto";

interface Props {
  onSubmit: (data: CreateProductDto) => void;
}

export const CreateProductForm = ({ onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProductDto>({
    resolver: zodResolver(createProductSchema),
  });

  const formSubmitHandler: SubmitHandler<CreateProductDto> = (data) => {
    onSubmit(data);
  };

  return (
    <div style={{ display: "flex", gap: "1em", flexDirection: "column" }}>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <Input label="Nazwa" {...register("name")} error={errors.name} />
        <Input
          label="Opis"
          {...register("description")}
          error={errors.description}
        />
        <Input
          label="Cena"
          type="number"
          {...register("price", { valueAsNumber: true })}
          error={errors.price}
        />
        <Button type="submit">Dodaj</Button>
      </form>
    </div>
  );
};
