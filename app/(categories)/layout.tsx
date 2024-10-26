import Categories from "@/components/screens/Categories/page";
import categoriesService from "@/services/categories.service";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await categoriesService();

  if (categories.error || categories.data === null) {
    return notFound();
  }

  return <Categories categories={categories.data}>{children}</Categories>;
}
