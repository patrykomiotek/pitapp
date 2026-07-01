import axios, { type AxiosResponse } from "axios";
import type { ProductDto } from "../contracts/Product.dto";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export const getAuthorizationHeader = () => ({
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
});

export const fetchProducts = async (): Promise<{ records: ProductDto[] }> => {
  return await axios
    .get(`${API_BASE_URL}/products`, getAuthorizationHeader())
    .then((res: AxiosResponse<{ records: ProductDto[] }>) => res.data)
    .catch((err) => Promise.reject(err));
};
