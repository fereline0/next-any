"use client";

import { useEffect, useState } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { IoLogInOutline } from "react-icons/io5";
import { signIn } from "next-auth/react";
import { Tab, Tabs } from "@nextui-org/tabs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import createUserService from "@/services/createUser.service";
import Marginer from "@/components/shared/Marginer/page";
import loginRequest from "@/requests/login.request";
import { useRouter } from "next/navigation";

export default function Auth() {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();

  const loginValidation = useForm({
    resolver: zodResolver(loginRequest),
    values: { name: name, login: login, password: password },
  });

  const loginButtonDisabled =
    Object.keys(loginValidation.formState.errors).length > 0;

  const registerValidation = useForm({
    resolver: zodResolver(loginRequest),
    values: { name: name, login: login, password: password },
  });

  const registerButtonDisabled =
    Object.keys(registerValidation.formState.errors).length > 0;

  const handleRegister = async () => {
    try {
      await createUserService(name, login, password);
      await handleLogin();
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  };

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      redirect: false,
      login,
      password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      setIsAuthenticated(true);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="sm:flex items-center justify-center">
      <Card className="max-w-full w-full sm:max-w-80">
        <CardBody>
          <Marginer y={8}>
            {error && (
              <Card shadow="none">
                <CardBody>
                  <p>{error}</p>
                </CardBody>
              </Card>
            )}
            <Tabs fullWidth>
              <Tab title="Login">
                <Marginer y={8}>
                  <Input
                    errorMessage={
                      loginValidation.formState.errors.login?.message
                    }
                    isInvalid={!!loginValidation.formState.errors.login}
                    label="Login"
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                  />
                  <Input
                    errorMessage={
                      loginValidation.formState.errors.password?.message
                    }
                    isInvalid={!!loginValidation.formState.errors.password}
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    fullWidth
                    color="primary"
                    disabled={loginButtonDisabled}
                    startContent={<IoLogInOutline size={20} />}
                    onPress={async () =>
                      await loginValidation.handleSubmit(handleLogin)()
                    }
                  >
                    Login
                  </Button>
                </Marginer>
              </Tab>
              <Tab title="Register">
                <Marginer y={8}>
                  <Input
                    errorMessage={
                      registerValidation.formState.errors.name?.message
                    }
                    isInvalid={!!registerValidation.formState.errors.name}
                    label="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                    errorMessage={
                      registerValidation.formState.errors.login?.message
                    }
                    isInvalid={!!registerValidation.formState.errors.login}
                    label="Login"
                    type="text"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                  />
                  <Input
                    errorMessage={
                      registerValidation.formState.errors.password?.message
                    }
                    isInvalid={!!registerValidation.formState.errors.password}
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    fullWidth
                    color="primary"
                    disabled={registerButtonDisabled}
                    startContent={<IoLogInOutline size={20} />}
                    onPress={async () =>
                      await registerValidation.handleSubmit(handleRegister)()
                    }
                  >
                    Register
                  </Button>
                </Marginer>
              </Tab>
            </Tabs>
          </Marginer>
        </CardBody>
      </Card>
    </div>
  );
}
