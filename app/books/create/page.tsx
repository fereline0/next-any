import { notFound } from "next/navigation";
import { Suspense } from "react";

import CreateBook from "@/components/pages/CreateBook/page";
import Loading from "@/components/shared/Loading/page";
import authorsService from "@/services/authors.service";
import categoriesService from "@/services/categories.service";

export const revalidate = 0;

export default async function CreatePage() {
  const categories = await categoriesService();
  const authors = await authorsService(1, 9999999);

  if (categories.error || categories.data === null) {
    return notFound();
  }

  if (authors.error || authors.data === null) {
    return notFound();
  }

  return (
    <Suspense fallback={<Loading />}>
      <CreateBook authors={authors.data.items} categories={categories.data} />
    </Suspense>
  );
}
