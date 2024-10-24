import IUser from "@/interfaces/user.interface";

export default async (token: string | undefined): Promise<IUser> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/CurrentUser`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!res.ok) {
    throw new Error();
  }

  return res.json();
};
