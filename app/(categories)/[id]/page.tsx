import BooksFromCategory from "@/components/screens/BooksFromCategory/page";
import booksFromCategoryService from "@/services/booksFromCategory.service";
import { notFound } from "next/navigation";

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

  const { items: books, total } = booksFromCategory.data;

  return <BooksFromCategory books={books} limit={limit} total={total} />;
}
