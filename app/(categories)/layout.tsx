import Categories from "@/components/screens/Categories/page";
import categoriesService from "@/services/categories.service";

export const revalidate = 0;

export default async function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await categoriesService();

  return <Categories categories={categories}>{children}</Categories>;
}
