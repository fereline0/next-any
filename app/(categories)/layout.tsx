import { notFound } from "next/navigation";

import categoriesService from "@/services/categories.service";
import Categories from "@/components/pages/Categories/layout";
import { Suspense } from "react";
import Loading from "@/components/shared/Loading/page";

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

  return (
    <Suspense fallback={<Loading />}>
      <Categories categories={categories.data}>{children}</Categories>
    </Suspense>
  );
}
