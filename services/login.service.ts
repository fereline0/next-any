export default async (name: string, password: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, password }),
  });

  return res.json();
};
