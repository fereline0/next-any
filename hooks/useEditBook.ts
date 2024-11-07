import useSWRMutation from "swr/mutation";

import fetcher from "@/utils/fetcher";

export default (
  id: number,
  title: string,
  description: string,
  price: string,
  image: string,
  authorId: string,
  categoryIds: number[],
) => {
  return useSWRMutation(
    `${process.env.NEXT_PUBLIC_API_URL}/api/Books/${id}`,
    (url: string) =>
      fetcher(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
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
