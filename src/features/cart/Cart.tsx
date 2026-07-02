import { useMemo } from "react";
import { useAppSelector } from "@/shared/hooks/redux";

export const Cart = () => {
  const data = useAppSelector((state) => state.cart.products);

  const sumPrice = useMemo(() => {
    return data.reduce(function (a, b) {
      return a + b.fields.price;
    }, 0);
  }, [data]);

  return (
    <>
      <div className="flex gap-2 items-center"></div>
      <p>Suma: {sumPrice}</p>
    </>
  );
};
