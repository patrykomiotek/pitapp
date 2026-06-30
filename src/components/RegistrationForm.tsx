import { useState, type ChangeEventHandler, type SubmitEvent } from "react";
import { Text } from "../ui/Text";
import { Button, Input } from "../ui";

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
        <Input
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="language"
          value={formData.language}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button type="submit">Wyslij</Button>
      </form>
    </div>
  );
};
