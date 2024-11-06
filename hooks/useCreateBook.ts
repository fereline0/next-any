import fetcher from "@/utils/fetcher";
import useSWRMutation from "swr/mutation";

export default (
  title: string,
  description: string,
  price: string,
  image: string,
  authorId: string,
  categoryIds: number[],
) => {
  return useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/api/Books`,
    (url: string) =>
      fetcher(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          price,
          image,
          authorId,
          categoryIds,
        }),
      }),
  );
};
