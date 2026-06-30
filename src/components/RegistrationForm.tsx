import { useState, type ChangeEventHandler, type SubmitEvent } from "react";
import { Text } from "../ui/Text";

interface FormData {
  email: string;
  password: string;
  language: string;
}

export const RegistrationFormWithState = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    language: "Java",
    password: "",
  });

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <Text>
        {formData.email} {formData.password}
      </Text>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="language"
          value={formData.language}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type={"submit"}>Wyslij</button>
      </form>
    </div>
  );
};
