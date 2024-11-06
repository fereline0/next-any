import fetcher from "@/utils/fetcher";
import useSWRMutation from "swr/mutation";

export default (id?: number) => {
  return useSWRMutation(
    id ? `${process.env.NEXT_PUBLIC_API_URL}/api/Books/${id}` : null,
    (url: string) =>
      fetcher(url, {
        method: "DELETE",
      }),
  );
};
