import IService from "@/interfaces/service.interface";
import IPagedResult from "@/interfaces/pagedResult.interface";
import ICart from "@/interfaces/cart.interface";

export default async (
  id: number,
  page: number,
  limit: number,
): Promise<IService<IPagedResult<ICart[]>>> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Users/${id}/Cart?page=${page}&limit=${limit}`,
    );

    const resData = await res.json();

    if (!res.ok) {
      return {
        data: null,
        error: resData.message || "Failed to fetch cart from user",
      };
    }

    const pagedResult: IPagedResult<ICart[]> = resData;

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
