import React, { useContext } from "react";
import {
  Box,
  Button,
  Group,
  PasswordInput,
  TextInput,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { StepperProvider } from "../pages/Auth";
import { useAppDispatch, useAppSelector } from "../hooks/react-redux";
import { register } from "../store/slices/userSlice";
import { Mail, UserCircle, Lock } from "tabler-icons-react";

export const SignUp = () => {
  const { nextStep, prevStep } = useContext(StepperProvider);
  const isLoading = useAppSelector(
    (state) => state.userState.registerInProgress
  );
  const dispatch = useAppDispatch();

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      repeatPassword: "",
    },
    validate: {
      repeatPassword: (value, values) =>
        value !== values.password ? "Пароли не совпадают" : null,
      name: (value) =>
        value.length < 4 ? "Имя должно содержать минимум 4 символа" : null,
      email: (value) =>
        /^\S+@\S+$/.test(value) ? null : "Неверный формат email",
      password: (value) =>
        value.length < 6 ? "Минимальная длина пароля 6 сиимволов" : null,
    },
  });

  return (
    <Box sx={{ width: 340 }} mx="auto">
      <form
        style={{ width: "340px" }}
        onSubmit={form.onSubmit((values) =>
          dispatch(
            register({
              email: values.email,
              password: values.password,
              username: values.name,
            })
          )
        )}
      >
        <Tooltip
          position={"bottom"}
          label={"Имя должно содержать минимум 4 символа"}
        >
          <TextInput
            icon={<UserCircle />}
            sx={{ width: 340 }}
            required
            label="Имя пользователя"
            placeholder="Иван Иванович"
            {...form.getInputProps("name")}
          />
        </Tooltip>

        <TextInput
          icon={<Mail />}
          mt={"sm"}
          type={"email"}
          required
          label="Email"
          placeholder="example@mail.com"
          {...form.getInputProps("email")}
        />

        <Tooltip
          arrowDistance={50}
          withArrow
          label={"Длина пароля должна быть не меньше 6 символов"}
          position={"bottom"}
        >
          <PasswordInput
            icon={<Lock />}
            sx={{ width: 340 }}
            required
            label="Пароль"
            mt="sm"
            placeholder="Пароль"
            {...form.getInputProps("password")}
          />
        </Tooltip>

        <PasswordInput
          icon={<Lock />}
          required
          label="Повторите пароль"
          mt="sm"
          placeholder="Повторите пароль"
          {...form.getInputProps("repeatPassword")}
        />

        <Group position="right" mt="xl">
          <Button type="submit" loading={isLoading}>
            Регистрация
          </Button>
        </Group>
      </form>
    </Box>
  );
};
