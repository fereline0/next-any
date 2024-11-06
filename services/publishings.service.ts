import IService from "@/interfaces/service.interface";
import IPagedResult from "@/interfaces/pagedResult.interface";
import IPublishing from "@/interfaces/publishing.interface";

export default async (
  page: number,
  limit: number,
): Promise<IService<IPagedResult<IPublishing[]>>> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Publishings?page=${page}&limit=${limit}`,
    );

    const resData = await res.json();

    if (!res.ok) {
      return {
        data: null,
        error: resData.message || "Failed to fetch authors",
      };
    }

    const pagedResult: IPagedResult<IPublishing[]> = resData;

    return {
      data: pagedResult,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Connection closed",
    };
  }
};
