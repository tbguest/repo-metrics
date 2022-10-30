import { Session } from "next-auth";
import useSWR from "swr";
import { fetchWithSession } from "../lib/fetchers";

export const useUserRepos = (session: Session | null) => {
  // don't wan't to revalidate cache when we're not writing to the DB
  const options = session
    ? {}
    : {
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnFocus: false,
        revalidateOnMount: false,
      };
  const { data, error, mutate } = useSWR(
    ["/api/user/repos", session],
    fetchWithSession,
    options
  );

  return {
    data: data,
    loading: !error && !data,
    error: error,
    mutate,
  };
};
