import { useAppSelector, useAppDispatch } from "@/hooks/redux";

import { decrement, increment } from "./counterSlice";
import { Button, Text } from "@/shared/ui";

export function Counter() {
  // The `state` arg is correctly typed as `RootState` already
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  // omit rendering logic

  return (
    <div className="flex flex-col">
      <div className="flex gap-4">
        <Button onClick={() => dispatch(decrement())}>-</Button>
        <Text>{count}</Text>
        <Button onClick={() => dispatch(increment())}>+</Button>
      </div>
    </div>
  );
}
