import useSWRMutation from "swr/mutation";

import fetcher from "@/utils/fetcher";

export default (id?: number) => {
  return useSWRMutation(
    id ? `${process.env.NEXT_PUBLIC_API_URL}/api/Carts/${id}` : null,
    (url: string) =>
      fetcher(url, {
        method: "DELETE",
      }),
  );
};
