import { notFound } from "next/navigation";

import IBook from "@/interfaces/book.interface";
import IPagedResult from "@/interfaces/pagedResult.interface";

export default async (
  page: number,
  limit: number,
): Promise<IPagedResult<IBook[]>> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/Books/?page=${page}&limit=${limit}
`,
  );

  if (!res.ok) {
    notFound();
  }

  return res.json();
};
