import IService from "@/interfaces/service.interface";
import IBookDTO from "@/interfaces/bookDTO.interface";

export default async (id: number): Promise<IService<IBookDTO>> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Books/${id}`,
    );

    const resData = await res.json();

    if (!res.ok) {
      return {
        data: null,
        error: resData.message || "Failed to fetch book",
      };
    }

    const bookDTO: IBookDTO = resData;

    return {
      data: bookDTO,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Connection closed",
    };
  }
};
