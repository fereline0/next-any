import { notFound } from "next/navigation";
import booksService from "@/services/books.service";
import Books from "@/components/pages/Books/page";

export const revalidate = 0;

export default async function CategoriesPage({
  searchParams: { page = 1, limit = 20 } = {},
}: {
  searchParams?: {
    page?: number;
    limit?: number;
  };
}) {
  const booksResponse = await booksService(page, limit);

  if (booksResponse.error || booksResponse.data === null) {
    return notFound();
  }

  const { items, total } = booksResponse.data;

  return <Books books={items} total={total} limit={limit} />;
}
