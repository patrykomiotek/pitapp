import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "../ui/Button";
import { Text } from "../ui/Text";

const Generator = () => {
  const [value, setValue] = useState("");

  return (
    <div>
      <Text>Click to regenerate</Text>
      <Text>{value}</Text>
      <Button onClick={() => setValue(uuidv4())}>Generate</Button>
    </div>
  );
};

export default Generator;
