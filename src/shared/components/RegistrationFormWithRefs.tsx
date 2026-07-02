import { useRef, type ChangeEventHandler, type SubmitEvent } from "react";
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

  const handleLanguageChange: ChangeEventHandler<HTMLInputElement> = () => {
    if (languageRef.current && languageRef.current.value === "php") {
      console.log("hello");
      languageRef.current.value = "java";
      languageRef.current.style.border = "#f00 1px solid";
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          ref={emailRef}
          type="text"
          name="email"
          defaultValue="test@wp.pl"
        />
        <Input
          ref={languageRef}
          type="text"
          name="language"
          onChange={handleLanguageChange}
        />
        <Input ref={passwordRef} type="password" name="password" />
        <Button type="submit">Wyslij</Button>
      </form>
    </div>
  );
};
