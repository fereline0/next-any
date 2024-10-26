import IService from "@/interfaces/service.interface";
import IUser from "@/interfaces/user.interface";

export default async (
  name: string,
  login: string,
  password: string,
): Promise<IService<IUser>> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, login, password }),
    });

    const resData = await res.json();

    if (!res.ok) {
      return {
        data: null,
        error: resData.message || "Failed to create user",
      };
    }

    const createdUser: IUser = resData;

    return {
      data: createdUser,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Connection closed",
    };
  }
};
