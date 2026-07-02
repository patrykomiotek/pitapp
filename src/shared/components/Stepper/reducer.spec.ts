import { reducer, ActionType } from "./Stepper";

describe("Stepper reducer", () => {
  it("should modify state", () => {
    const defaultState = { counter: 123 };
    let state = reducer(defaultState, { type: ActionType.INCREMENT });
    expect(state.counter).toBe(124);

    state = reducer(state, { type: ActionType.DECREMENT });
    expect(state.counter).toBe(123);

    state = reducer(state, { type: ActionType.CHANGE, payload: 444 });
    expect(state.counter).toBe(444);
  });
});
