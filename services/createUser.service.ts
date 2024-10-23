export default async (name: string, login: string, password: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, login, password }),
  });

  if (!res.ok) {
    throw new Error("Failed to create user");
  }

  return res.json();
};
