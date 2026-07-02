import { useState, useMemo, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button, Text } from "../ui";

// const style = { color: "red" };

const Generator = () => {
  const [value, setValue] = useState(() => uuidv4());

  // zamroenie refernecji, referential equality
  const memoizedValue = useMemo(() => {
    return (
      <>
        My new <span>text</span>
      </>
    );
  }, []);

  const handleClick = useCallback(() => {
    setValue(uuidv4());
  }, []);

  return (
    <div>
      <Text>Click to regenerate</Text>
      {/* <Text>
        My new <span>text</span>
      </Text> */}
      <Text>{memoizedValue}</Text>
      <Text>{value}</Text>
      {/* <Button onClick={() => handleClick}>Generate</Button> */}
      <Button onClick={handleClick}>Generate</Button>
    </div>
  );
};

export default Generator;
