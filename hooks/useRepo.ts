import useSWR from "swr";
import { RepoDoc } from "../models";
export const fetcher = (url: string) => fetch(url).then((res) => res.json());

// interface Props {
//   initialData: RepoDoc[];
// }

export const useRepoList = (initialData: RepoDoc[]) => {
  const { data, error, mutate } = useSWR("/api/repositories", fetcher, {
    fallbackData: initialData,
  });
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
    mutate,
  };
};

export const useRepoData = (list: string[], loading: boolean) => {
  const ids = !loading ? list?.map((item: any) => item.node_id) : null;
  const { data: data, error: error } = useSWR(
    !loading ? `/api/gql-repositories?ids=${ids}` : null,
    fetcher
  );
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
};
