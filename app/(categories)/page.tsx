import booksService from "@/services/books.service";

export const revalidate = 0;

export default async function CategoriesPage({
  searchParams: { page = 1, limit = 20 } = {},
}: {
  searchParams?: {
    page?: number;
    limit?: number;
  };
}) {
  const books = await booksService(page, limit);

  return (
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda fugit
      aperiam ab vero ex praesentium officiis, illum vitae? Excepturi magni
      velit quisquam ad similique nisi dolor nihil tempore nostrum aspernatur.
    </p>
  );
}
