import { useEffect, useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { Button, Input } from "../ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

interface IRecord {
  id: string;
  fields: IOrder;
}

interface IOrder {
  name: string;
  description: string;
  price?: number;
}

interface IOrderFormData {
  name: string;
  description: string;
  price: string;
}

const ordersSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().min(0.01),
});

const requestHeaders = {
  headers: new Headers({
    "Content-Type": "application/json",
    Authorization: "Bearer ",
  }),
};

const requestPath = "https://api.airtable.com/v0/appYlAiQz59qe5X2j/products";

const OrderForm = () => {
  const [records, setRecords] = useState<IRecord[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IOrderFormData>({
    resolver: zodResolver(ordersSchema),
  });

  useEffect(() => {
    // services -> fetchProducts.ts -> fetchProducts
    // const await = fetchProducts()
    fetch(requestPath, requestHeaders).then((response) =>
      response.json().then(({ records }) => setRecords(records)),
    );
  }, []);

  const formSubmitHandler: SubmitHandler<IOrderFormData> = (data) => {
    const newRecords: Partial<IRecord>[] = [];
    newRecords.push({ fields: { ...data, price: +data.price } });
    fetch(requestPath, {
      ...requestHeaders,
      method: "post",
      body: JSON.stringify({ records: newRecords }),
    }).then((response) =>
      response.json().then(({ records: r }) => setRecords([...records, ...r])),
    );
  };

  return (
    <div style={{ display: "flex", gap: "1em", flexDirection: "column" }}>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <Input label="Nazwa" {...register("name")} />
        <Input label="Opis" {...register("description")} />
        <Input
          label="Cena"
          type="number"
          {...register("price", { valueAsNumber: true })}
        />
        <Button type="submit">Dodaj</Button>
      </form>
      {records.map(({ id, fields: order }) => (
        <div key={id} style={{ border: "1px solid" }}>
          <div>Zamówienie: {order.name}</div>
          <div>Opis: {order.description}</div>
          {order.price && <div>Cena: ${order.price.toFixed(2)}</div>}
        </div>
      ))}
    </div>
  );
};

export default OrderForm;
