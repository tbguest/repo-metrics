import useSWR from "swr";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useRepoList = () => {
  const { data, error, mutate } = useSWR("/api/repositories", fetcher);
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
