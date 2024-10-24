import BooksFromCategory from "@/components/screens/BooksFromCategory/page";
import booksFromCategoryService from "@/services/booksFromCategory.service";

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
  const { items: books, total } = await booksFromCategoryService(
    params.id,
    page,
    limit,
  );

  return <BooksFromCategory total={total} limit={limit} books={books} />;
}
