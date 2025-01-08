import { Session } from "next-auth";

export const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const fetchWithSession = (url: string, session: Session | null) => {
  return fetch(`${url}`).then((res) => res.json());
};
