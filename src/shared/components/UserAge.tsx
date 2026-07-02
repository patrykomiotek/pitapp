import { useState } from "react";

export const UserAge = () => {
  const [name, setName] = useState("user1");
  const [age, setAge] = useState(20);

  setAge(21);

  return (
    <div>
      <p>
        {name}: {age}
      </p>
    </div>
  );
};
