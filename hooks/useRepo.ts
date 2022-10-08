import { Session } from "next-auth";
import useSWR from "swr";
import { RepoDoc } from "../models";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const fetchWithUser = (url: string, accessToken: string) => {
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Client-Id": `${process.env.TWITCH_CLIENT_ID}`,
    },
  }).then((res) => res.json());
};

// interface Props {
//   initialData: RepoDoc[];
//   session: Session | null;
// }

// function Dash() {
//   const { data: session } = useSession();

//   const { data, error } = useSWR(
//     session
//       ? [
//           "https://api.twitch.tv/helix/streams/key?broadcaster_id=630124067",
//           session.accessToken,
//         ]
//       : null,
//     fetcher
//   );

//   // Remaining code
// }

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
  const { data, error } = useSWR(
    session && "/api/repositories",
    fetcher,
    options
  );
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
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
