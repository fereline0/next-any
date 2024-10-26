import IService from "@/interfaces/service.interface";
import IUser from "@/interfaces/user.interface";

export default async (token: string | undefined): Promise<IService<IUser>> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/CurrentUser `,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const resData = await res.json();

    if (!res.ok) {
      return {
        data: null,
        error: resData.message || "Failed to fetch current user",
      };
    }

    const user: IUser = resData;

    return {
      data: user,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Connection closed",
    };
  }
};
