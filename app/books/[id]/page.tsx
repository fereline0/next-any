import { notFound } from "next/navigation";

import Book from "@/components/pages/Book/page";
import authorService from "@/services/author.service";
import bookService from "@/services/book.service";
import categoriesService from "@/services/categories.service";
import { Suspense } from "react";
import Loading from "@/components/shared/Loading/page";

export const revalidate = 0;

export default async function BookPage({
  params,
}: {
  params: {
    id: number;
  };
}) {
  const book = await bookService(params.id);

  if (book.error || book.data === null) {
    return notFound();
  }

  const author = await authorService(book.data.authorId);

  if (author.error || author.data === null) {
    return notFound();
  }

  const categories = await categoriesService();

  if (categories.error || categories.data === null) {
    return notFound();
  }

  return (
    <Suspense fallback={<Loading />}>
      <Book
        author={author.data}
        book={book.data}
        categories={categories.data}
      />
    </Suspense>
  );
}
