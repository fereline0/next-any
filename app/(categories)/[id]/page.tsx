import { notFound } from "next/navigation";

import BooksFromCategory from "@/components/pages/BooksFromCategory/page";
import booksFromCategoryService from "@/services/booksFromCategory.service";

export const revalidate = 0;

export default async function CategoryPage({
  params,
}: {
  params: {
    id: number;
  };
}) {
  const booksFromCategory = await booksFromCategoryService(params.id);

  if (booksFromCategory.error || booksFromCategory.data === null) {
    return notFound();
  }

  return <BooksFromCategory books={booksFromCategory.data} />;
}
