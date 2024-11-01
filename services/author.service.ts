import IAuthor from "@/interfaces/author.interface";
import IService from "@/interfaces/service.interface";

export default async (
  id: number,
  page: number,
  limit: number,
): Promise<IService<IAuthor>> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Authors/${id}?page=${page}&limit=${limit}`,
    );

    const resData = await res.json();

    if (!res.ok) {
      return {
        data: null,
        error: resData.message || "Failed to fetch author",
      };
    }

    const author: IAuthor = resData;

    return {
      data: author,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Connection closed",
    };
  }
};
