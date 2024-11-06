import Book from "@/components/pages/Book/page";
import Loading from "@/components/shared/Loading/page";
import authorService from "@/services/author.service";
import bookService from "@/services/book.service";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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

  return (
    <Suspense fallback={<Loading />}>
      <Book book={book.data} author={author.data} />
    </Suspense>
  );
}
