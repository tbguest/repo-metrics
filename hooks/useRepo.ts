import { Session } from "next-auth";
import useSWR from "swr";
import { RepoDoc } from "../models";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const fetchWithSession = (url: string, session: any) => {
  const uid = session?.userId || false;
  return fetch(`${url}?id=${uid}`).then((res) => res.json());
};

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

export const useRepoList = (
  initialData: RepoDoc[],
  session: Session | null
) => {
  const options = session
    ? {
        fallbackData: initialData,
      }
    : {
        fallbackData: initialData,
        revalidateIfStale: false,
        revalidateOnReconnect: false,
        revalidateOnFocus: false,
        revalidateOnMount: false,
      };
  const { data, error } = useSWR(session && "/api/repos", fetcher, options);
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};
