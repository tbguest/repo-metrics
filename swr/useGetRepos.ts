import useSWR from "swr";
import { fetcher } from "../lib/fetchers";

export const useGetRepos = (userId: string | null | undefined) => {
  const { data, error, mutate } = useSWR(
    `/api/user/repos${userId ? `?id=${userId}` : ""}`,
    fetcher
  );

  return {
    data: data,
    loading: !error && !data,
    error: error,
    mutate,
  };
};
