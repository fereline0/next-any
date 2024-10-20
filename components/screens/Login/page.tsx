"use client";

import { useState } from "react";
import { Card, CardBody } from "@nextui-org/card";
import { Button } from "@nextui-org/button";

import Marginer from "@/components/shared/Marginer/page";
import { Input } from "@nextui-org/input";
import { IoLogInOutline } from "react-icons/io5";
import { signIn, useSession } from "next-auth/react";

export default function Login() {
  const session = useSession();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const res = await signIn("credentials", {
      redirect: false,
      name,
      password,
    });

    if (res?.error) {
      setError(res.error);
    }
  };

  return (
    <div className="sm:flex items-center justify-center">
      <Card className="max-w-full w-full sm:max-w-80" shadow="none">
        <CardBody>
          <Marginer y={8}>
            {error && (
              <Card shadow="none" className="bg-red-50">
                <CardBody>{error}</CardBody>
              </Card>
            )}
            <Input
              type="text"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              color="primary"
              startContent={<IoLogInOutline size={20} />}
              fullWidth
              onClick={handleLogin}
            >
              Login
            </Button>
          </Marginer>
        </CardBody>
      </Card>
    </div>
  );
}
