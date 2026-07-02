import type { ProductDto } from "@/features/products/contracts/Product.dto.ts";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store.ts";

interface CartState {
  products: ProductDto[];
}

const initialState: CartState = {
  products: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductDto>) => {
      state.products.push(action.payload);
    },
    removeFromCart: (state, action: PayloadAction<ProductDto>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id,
      );
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
// export const useCartSelector: TypedUseSelectorHook<RootState & RootCartState> =
//   useSelector;

export const selectCart = (state: RootState) => state.cart;
