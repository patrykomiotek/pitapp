import { useState } from "react";

export const IndexKeys = () => {
  const [items, setItems] = useState(["Ala", "Ola", "Ela"]);

  return (
    <ul>
      {items.map((name, i) => (
        <li key={i}>
          {" "}
          {/* 🔴 zmień na key={name} */}
          {name} <input placeholder="notatka" />
        </li>
      ))}
      <button onClick={() => setItems((s) => s.slice(1))}>Usuń pierwszy</button>
    </ul>
  );
};
