import { z } from "zod";
// interface IOrderFormData {
//   name: string;
//   description: string;
//   price: string;
// }

export const ordersSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number().min(0.01),
});

export type IOrderFormData = z.infer<typeof ordersSchema>;
