import { useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "../ui";

interface RegistrationDto {
  email: string;
  password: string;
  language?: string;
}

const registrationSchema = z.object({
  email: z.email(),
  password: z.string().min(3, "Hasło za krotkie"),
  language: z.string().optional(),
});

export const RegistrationFormWithRHF = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationDto>({
    resolver: zodResolver(registrationSchema),
  });

  const formSubmitHandler: SubmitHandler<RegistrationDto> = (data) => {
    console.log({ data });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <Input type="text" {...register("email")} error={errors.email} />

        <Input type="text" {...register("language")} error={errors.language} />

        <Input
          type="password"
          {...register("password")}
          error={errors.password}
        />

        <Button type="submit">Wyslij</Button>
      </form>
    </div>
  );
};
