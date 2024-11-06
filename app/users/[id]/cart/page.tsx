import Cart from "@/components/pages/Cart/page";
import Loading from "@/components/shared/Loading/page";
import cartFromUserService from "@/services/cartFromUser.service";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const revalidate = 0;

export default async function CartsPage({
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
  const cartFromUser = await cartFromUserService(params.id, page, limit);

  if (cartFromUser.error || !cartFromUser.data) {
    return notFound();
  }

  const { items, total } = cartFromUser.data;

  return (
    <Suspense fallback={<Loading />}>
      <Cart cartFromUser={items} total={total} limit={limit} />
    </Suspense>
  );
}
