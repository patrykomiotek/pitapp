import { useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Text } from "../ui";

// const style = { color: "red" };

const Generator = () => {
  const [value, setValue] = useState("");

  // zamroenie refernecji, referential equality
  const memoizedValue = useMemo(() => {
    return (
      <>
        My new <span>text</span>
      </>
    );
  }, []);

  return (
    <div>
      <Text>Click to regenerate</Text>
      {/* <Text>
        My new <span>text</span>
      </Text> */}
      <Text>{memoizedValue}</Text>
      <Text>{value}</Text>
      <Button onClick={() => setValue(uuidv4())}>Generate</Button>
    </div>
  );
};

export default Generator;
