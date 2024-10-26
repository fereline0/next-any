import ILogin from "@/interfaces/login.interface";
import IService from "@/interfaces/service.interface";

export default async (
  login: string,
  password: string,
): Promise<IService<ILogin>> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, password }),
      },
    );

    const resData = await res.json();

    if (!res.ok) {
      return {
        data: null,
        error: resData.message || "Failed to login",
      };
    }

    const authResponse: ILogin = resData;

    return {
      data: authResponse,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Connection closed",
    };
  }
};
