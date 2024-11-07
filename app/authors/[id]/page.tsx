import { notFound } from "next/navigation";
import { Suspense } from "react";

import Author from "@/components/pages/Author/page";
import Loading from "@/components/shared/Loading/page";
import authorService from "@/services/author.service";
import booksFromAuthorService from "@/services/booksFromAuthor.service";

export const revalidate = 0;

export default async function AuthorPage({
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
  const author = await authorService(params.id);

  if (author.error || author.data === null) {
    return notFound();
  }

  const booksFromAuthor = await booksFromAuthorService(params.id, page, limit);

  if (booksFromAuthor.error || booksFromAuthor.data === null) {
    return notFound();
  }

  return (
    <Suspense fallback={<Loading />}>
      <Author
        author={author.data}
        books={booksFromAuthor.data.items}
        limit={limit}
        total={booksFromAuthor.data.total}
      />
    </Suspense>
  );
}
