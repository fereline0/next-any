import useSWR from "swr";

import IUser from "@/interfaces/user.interface";
import { fetcher } from "@/utils/fetcher";

export default (token: string | undefined) => {
  return useSWR<IUser>(
    token ? `${process.env.NEXT_PUBLIC_API_URL}/api/CurrentUser` : null,
    (url: string) =>
      fetcher(url, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }),
  );
};
