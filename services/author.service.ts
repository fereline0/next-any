import IAuthor from "@/interfaces/author.interface";
import IService from "@/interfaces/service.interface";
import fetcher from "@/utils/fetcher";

export default async (
  id: number,
  page: number,
  limit: number,
): Promise<IService<IAuthor>> => {
  try {
    const searchParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    const res = await fetcher(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Authors/${id}/`,
      searchParams,
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
