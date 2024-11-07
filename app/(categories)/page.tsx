import { notFound } from "next/navigation";
import { Suspense } from "react";

import booksService from "@/services/books.service";
import Books from "@/components/pages/Books/page";
import Loading from "@/components/shared/Loading/page";

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

  return (
    <Suspense fallback={<Loading />}>
      <Books books={items} limit={limit} total={total} />
    </Suspense>
  );
}
