import { useState, useEffect } from "react";
import { Header } from "../../../ui";
import { ProductsList } from "../components/ProductsList";
import type { ProductDto } from "../contracts/Product.dto";
import { fetchProducts } from "../services/products";
// import { ROUTE } from "../../../routes";
// import { Helmet } from "react-helmet-async";

export const ProductsListPage = () => {
  const [products, setProducts] = useState<ProductDto[]>([]);

  useEffect(() => {
    let ignore = false;

    const loadData = async () => {
      try {
        const response = await fetchProducts();
        if (!ignore) {
          setProducts(response.records);
        }
      } catch {
        // fail
      }
    };

    loadData();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <>
      {/* <Helmet>
        <title>{ROUTE.PRODUCTS.title}</title>
      </Helmet> */}
      <div>
        <Header>Products</Header>

        <div className="flex gap-2 items-center"></div>

        {products && <ProductsList products={products} />}
      </div>
    </>
  );
};
