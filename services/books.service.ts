import IService from "@/interfaces/service.interface";
import IPagedResult from "@/interfaces/pagedResult.interface";
import IBookDTO from "@/interfaces/bookDTO.interface";

export default async (
  page: number,
  limit: number,
): Promise<IService<IPagedResult<IBookDTO[]>>> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Books?page=${page}&limit=${limit}`,
    );

    const resData = await res.json();

    if (!res.ok) {
      return {
        data: null,
        error: resData.message || "Failed to fetch books",
      };
    }

    const pagedResult: IPagedResult<IBookDTO[]> = resData;

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
