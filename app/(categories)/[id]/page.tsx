import { notFound } from "next/navigation";

import BooksFromCategory from "@/components/pages/BooksFromCategory/page";
import booksFromCategoryService from "@/services/booksFromCategory.service";

export const revalidate = 0;

export default async function CategoryPage({
  params,
  searchParams: { page = 1, limit = 20 } = {},
}: {
  params: {
    id: number;
  };
  searchParams?: {
    page?: number;
    limit?: number;
  };
}) {
  const booksFromCategory = await booksFromCategoryService(
    params.id,
    page,
    limit,
  );

  if (booksFromCategory.error || booksFromCategory.data === null) {
    return notFound();
  }

  const { items, total } = booksFromCategory.data;

  return <BooksFromCategory books={items} limit={limit} total={total} />;
}
