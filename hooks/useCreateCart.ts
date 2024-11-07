import useSWRMutation from "swr/mutation";

import fetcher from "@/utils/fetcher";

export default (bookId: number, userId?: number) => {
  return useSWRMutation(
    userId ? `${process.env.NEXT_PUBLIC_API_URL}/api/Carts` : null,
    (url: string) =>
      fetcher(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, bookId }),
      }),
  );
};
