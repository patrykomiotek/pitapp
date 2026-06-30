import { useEffect, useState } from "react";
import { Text } from "../ui";

export const Counter = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCounter((value) => value + 1);
    }, 1000);

    return () => {
      // destruktor
      clearInterval(id);
    };
  }, []);

  return <Text>{counter}</Text>;
};
