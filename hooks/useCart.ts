import fetcher from "@/utils/fetcher";
import useSWRMutation from "swr/mutation";

export default (id: number) => {
  return useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/api/Carts/${id}`,
    (url: string) =>
      fetcher(url, {
        method: "GET",
      }),
  );
};
