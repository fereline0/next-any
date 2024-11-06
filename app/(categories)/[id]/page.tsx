import { notFound } from "next/navigation";

import booksFromCategoryService from "@/services/booksFromCategory.service";
import Books from "@/components/pages/Books/page";
import { Suspense } from "react";
import Loading from "@/components/shared/Loading/page";

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

  return (
    <Suspense fallback={<Loading />}>
      <Books books={items} limit={limit} total={total} />
    </Suspense>
  );
}
