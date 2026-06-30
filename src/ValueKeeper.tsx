import { useState, useRef } from "react";

export const ValueKeeper = () => {
  const [stateValue, setStateValue] = useState(0);
  const refValue = useRef(0);
  let letValue = 0;
  return (
    <div>
      <p>State: {stateValue}</p>
      <p>Ref: {refValue.current}</p>
      <p>Let: {letValue}</p>
      <button onClick={() => setStateValue(stateValue + 1)}>+ state</button>
      <button onClick={() => (refValue.current += 1)}>+ ref</button>
      <button onClick={() => letValue++}>+ let</button>
    </div>
  );
};
