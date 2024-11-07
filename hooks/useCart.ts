import useSWRMutation from "swr/mutation";

import fetcher from "@/utils/fetcher";

export default (id: number) => {
  return useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/api/Carts/${id}`,
    (url: string) =>
      fetcher(url, {
        method: "GET",
      }),
  );
};
