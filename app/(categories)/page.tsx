import { notFound } from "next/navigation";

import booksService from "@/services/books.service";

export const revalidate = 0;

export default async function CategoriesPage() {
  const books = await booksService();

  if (books.error || books.data === null) {
    return notFound();
  }

  return (
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda fugit
      aperiam ab vero ex praesentium officiis, illum vitae? Excepturi magni
      velit quisquam ad similique nisi dolor nihil tempore nostrum aspernatur.
    </p>
  );
}
