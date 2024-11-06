import ICart from "@/interfaces/cart.interface";
import fetcher from "@/utils/fetcher";
import useSWR from "swr";

export default (bookId: number, userId?: number) => {
  return useSWR<ICart>(
    userId
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/Users/${userId}/Cart/isCreated?bookId=${bookId}`
      : null,
    fetcher,
  );
};
