import { Button, Input, Text } from "@/shared/ui";
import { useReducer, useRef, type KeyboardEventHandler } from "react";

type State = {
  counter: number;
};

export enum ActionType {
  INCREMENT = "increment",
  DECREMENT = "decrement",
  CHANGE = "change",
}

type Action =
  | { type: ActionType.INCREMENT }
  | { type: ActionType.DECREMENT }
  | { type: ActionType.CHANGE; payload: number };

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.INCREMENT:
      return { counter: state.counter + 1 };
    case ActionType.DECREMENT:
      return { counter: state.counter - 1 };
    case ActionType.CHANGE:
      return { counter: action.payload };
    default:
      return state;
  }
};

const add = (): Action => ({ type: ActionType.INCREMENT });
const sub = (): Action => ({ type: ActionType.DECREMENT });
const change = (value: number): Action => ({
  type: ActionType.CHANGE,
  payload: value,
});

export const Stepper = () => {
  const [state, dispatch] = useReducer(reducer, { counter: 0 });
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIncrease = () => {
    dispatch(add());
  };

  const handleDecrease = () => {
    dispatch(sub());
  };

  const handleEntered: KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (inputRef.current && event.key === "Enter") {
      dispatch(change(+inputRef.current.value));
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex gap-4">
        <Button onClick={handleDecrease}>-</Button>
        <Text>{state.counter}</Text>
        <Button onClick={handleIncrease}>+</Button>
      </div>
      <Input ref={inputRef} onKeyDown={handleEntered} />
    </div>
  );
};
