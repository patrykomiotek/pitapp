import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "@/features/counter/counterSlice";
import { cartReducer } from "./features/cart/cartSlice";
// ...

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
    // posts: postsReducer,
    // comments: commentsReducer,
    // users: usersReducer,
  },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;

type ColorType = `color-${number}`;

const color1: ColorType = "color-123";
