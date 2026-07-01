import axios from "axios";
import type { CreateProductDto, ProductDto } from "../contracts/Product.dto";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

type AirtableResponse<T> = {
  records: T;
};

// create, read one
export const fetchProducts = async () => {
  return await api
    .get<AirtableResponse<ProductDto[]>>("/products") // categories, users
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));
};

export const createProduct = async (data: CreateProductDto) => {
  return await api
    .post("/products", { records: [{ fields: data }] })
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));
};

export const fetchProduct = async (id: ProductDto["id"]) => {
  return await api
    .get<ProductDto>(`/products/${id}`)
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));
};
