import Book from "@/components/pages/Book/page";
import bookService from "@/services/book.service";
import { notFound } from "next/navigation";

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

  return <Book book={book.data} />;
}
