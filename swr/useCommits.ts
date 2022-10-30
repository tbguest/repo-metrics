import useSWR from "swr";
import { fetcher } from "../lib/fetchers";

export const useCommits = (owner: string, name: string) => {
  const { data, error } = useSWR(
    `/api/github-commits?owner=${owner}&repo=${name}`,
    fetcher
  );
  return { data, error };
};
