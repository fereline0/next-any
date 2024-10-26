import IService from "@/interfaces/service.interface";
import ICategory from "@/interfaces/category.interface";

export default async (): Promise<IService<ICategory[]>> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/Categories`,
    );

    const resData = await res.json();

    if (!res.ok) {
      return {
        data: null,
        error: resData.message || "Failed to fetch categories",
      };
    }

    const categories: ICategory[] = resData;

    return {
      data: categories,
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : "Connection closed",
    };
  }
};
