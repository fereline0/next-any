import IService from "@/interfaces/service.interface";
import IBook from "@/interfaces/book.interface";

export default async (id: number): Promise<IService<IBook>> => {
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

    const book: IBook = resData;

    return {
      data: book,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Connection closed",
    };
  }
};
