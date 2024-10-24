import { notFound } from "next/navigation";

import ICategory from "@/interfaces/category.interface";

export default async (): Promise<ICategory[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/Categories`);

  if (!res.ok) {
    notFound();
  }

  return res.json();
};
