import { useRef, type SubmitEvent } from "react";
import { Button, Input } from "../ui";

interface FormData {
  email: string;
  password: string;
  language: string;
}

export const RegistrationFormWithRefs = () => {
  const emailRef = useRef<HTMLInputElement>(null); // DOM -> <input />
  const languageRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const email = emailRef.current?.value || "";
    const language = languageRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    console.log({
      email,
      language,
      password,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input ref={emailRef} type="text" name="email" />
        <Input ref={languageRef} type="text" name="language" />
        <Input ref={passwordRef} type="password" name="password" />
        <Button type="submit">Wyslij</Button>
      </form>
    </div>
  );
};
