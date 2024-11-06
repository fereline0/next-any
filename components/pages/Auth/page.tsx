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
import { useRouter } from "next/navigation";
import md5 from "md5";

import createUserService from "@/services/createUser.service";
import loginRequest from "@/requests/login.request";
import registerRequest from "@/requests/register.request";

export default function Auth() {
  const [name, setName] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const router = useRouter();

  const loginValidation = useForm({
    resolver: zodResolver(loginRequest),
    values: { name, login, password },
  });

  const loginButtonDisabled =
    Object.keys(loginValidation.formState.errors).length > 0;

  const registerValidation = useForm({
    resolver: zodResolver(registerRequest),
    values: { name, login, password },
  });

  const registerButtonDisabled =
    Object.keys(registerValidation.formState.errors).length > 0;

  const handleRegister = async () => {
    const hashedPassword = md5(password);

    const createdUser = await createUserService(name, login, hashedPassword);

    if (createdUser.error) {
      setError(createdUser.error);
    } else {
      await handleLogin();
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
          <div className="space-y-2">
            {error && (
              <Card shadow="none">
                <CardBody>
                  <p>{error}</p>
                </CardBody>
              </Card>
            )}
            <Tabs fullWidth>
              <Tab title="Login">
                <div className="space-y-2">
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
                </div>
              </Tab>
              <Tab title="Register">
                <div className="space-y-2">
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
                </div>
              </Tab>
            </Tabs>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
