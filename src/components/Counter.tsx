import { useEffect, useState } from "react";
import { Text } from "../ui";

// componentDidMount, componentDidUpdate, componentWillUnmount
export const Counter = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    // montowania albo update
    const id = setInterval(() => {
      setCounter((value) => value + 1);
    }, 1000);

    return () => {
      // odmontowywanie
      // destruktor
      clearInterval(id);
    };
  }, []);

  return <Text>{counter}</Text>;
};
