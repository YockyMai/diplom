import React from "react";
import { Box, Button, Group, PasswordInput, TextInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import { useAppDispatch, useAppSelector } from "../hooks/react-redux";
import { login, setFromUrl } from "../store/slices/userSlice";
import { Lock, UserCircle } from "tabler-icons-react";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const dispatch = useAppDispatch();
  const { loginInProgress } = useAppSelector((state) => state.userState);

  const fromUrl = useAppSelector((state) => state.userState.fromUrl);
  const navigate = useNavigate();

  console.log(fromUrl);

  const schema = z.object({
    email: z.string().email({ message: "Неверный формат email" }),
    password: z
      .string()
      .min(2, { message: "Пароль должен быть длинее 2 символов" }),
  });
  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      email: "",
      password: "",
    },
  });

  return (
    <Box mx="auto">
      <form
        style={{ width: "340px" }}
        onSubmit={form.onSubmit((values) => {
          dispatch(
            login({
              email: values.email,
              password: values.password,
            })
          ).then(() => {
            if (fromUrl) {
              navigate(fromUrl);
              dispatch(setFromUrl(null));
            }
          });
        })}
      >
        <TextInput
          icon={<UserCircle />}
          required
          label="Email"
          placeholder="example@mail.com"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          icon={<Lock />}
          required
          label="Пароль"
          mt="sm"
          placeholder="Пароль"
          {...form.getInputProps("password")}
        />

        <Group position="right" mt="xl">
          <Button loading={loginInProgress} type="submit">
            Войти
          </Button>
        </Group>
      </form>
    </Box>
  );
};
